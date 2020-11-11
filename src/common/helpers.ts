/* global LittledataLayer */
declare let window: CustomWindow;

import UrlChangeTracker from './UrlChangeTracker';

/**
 *
 * @param fireTag - callback to call when willing to fire pageviews
 */
export const pageView = (fireTag: () => void): void => {
	if (document.hidden === true) {
		// delay page firing until the page is visible
		let triggeredPageView = false;
		document.addEventListener('visibilitychange', function() {
			if (!document.hidden && !triggeredPageView) {
				fireTag();
				triggeredPageView = true;
			}
		});
	} else if (document.readyState === 'loading') {
		//delay until DOM is ready
		document.addEventListener('DOMContentLoaded', function() {
			fireTag();
		});
	} else {
		fireTag();
	}

	// now listen for changes of URL on product and other pages
	// Shopify uses history.replaceState() when variant changes
	if (LittledataLayer.doNotTrackReplaceState !== true) {
		const urlChangeTracker = new UrlChangeTracker(true);
		urlChangeTracker.setCallback(fireTag);
	}
};

export const getElementsByHref = (regex: RegExp | string): HTMLAnchorElement[] => {
	const htmlCollection = document.getElementsByTagName('a');
	const r = new RegExp(regex);
	return Array.prototype.slice
		.call(htmlCollection)
		.filter((element: HTMLAnchorElement) => element.href && r.test(element.href));
};

export const findDataLayerProduct = (link: string): Impression =>
	LittledataLayer.ecommerce.impressions.find(p => {
		const linkSplit = link.split('/products/');
		const productLinkWithParams = linkSplit && linkSplit[1];
		const productLinkWithParamsArray = productLinkWithParams.split('?');
		const productLink = productLinkWithParamsArray && productLinkWithParamsArray[0];
		return productLink ? productLink === p.handle : productLinkWithParams === p.handle;
	});

export const productListClicks = (clickTag: ListClickCallback): void => {
	/* product list clicks */
	if (!LittledataLayer.productClicks) return;
	getElementsByHref('/products/').forEach((element: TimeBombHTMLAnchor) => {
		element.addEventListener('click', function(ev) {
			// only add event to products
			const product = findDataLayerProduct(this.href);

			if (product) {
				ev.preventDefault();
				/* only wait 1 second before redirecting */
				element.timeout = window.setTimeout(function() {
					document.location.href = element.href;
				}, 1000);

				clickTag(product, element);
			} else {
				document.location.href = element.href;
			}
		});
	});
};

let postCartTimeout: any;

const cartOnlyAttributes: LooseObject = {};
export const setCartOnlyAttributes = (setAttributes: LooseObject) => {
	const toSet = Object.keys(setAttributes);
	toSet.forEach((name: string) => {
		const fieldName = `littledata_${name}`;
		cartOnlyAttributes[fieldName] = setAttributes[name];
	});
};

interface PostAttributes {
	littledata_updatedAt?: number;
	'google-clientID'?: string;
	'segment-clientID'?: string;
}
const attributes: PostAttributes = {}; //persist any previous attributes sent from this page

function postClientID(getClientId: () => string, platform: string, sendCartToLittledata: boolean) {
	const attribute = `${platform}-clientID`;
	const clientID = getClientId();
	if (typeof clientID !== 'string' || clientID.length === 0) return;
	(attributes as any)[attribute] = clientID;

	clearTimeout(postCartTimeout);
	// timeout is to allow 2 client IDs posted within 1 second
	// to be included in the same cart update
	postCartTimeout = setTimeout(function() {
		attributes.littledata_updatedAt = new Date().getTime();
		const cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance
		cartUpdateReq.onload = function() {
			const updatedCart = JSON.parse(cartUpdateReq.response);
			LittledataLayer.cart = updatedCart;
			if (sendCartToLittledata) {
				postCartToLittledata(updatedCart);
			}
			const clientIDReq = new XMLHttpRequest();
			clientIDReq.open('POST', `${LittledataLayer.transactionWatcherURL}/v2/clientID/store`);
			clientIDReq.setRequestHeader('Content-Type', 'application/json');
			clientIDReq.send(
				JSON.stringify({
					...attributes,
					cartID: `${updatedCart.token}`,
				}),
			);
		};
		cartUpdateReq.open('POST', '/cart/update.json');
		cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
		const cartAttributes: object = {
			...attributes,
			...cartOnlyAttributes,
		};
		cartUpdateReq.send(
			JSON.stringify({
				attributes: cartAttributes,
			}),
		);
	}, 1000);
}

function postCartToLittledata(cart: Cart.RootObject) {
	const httpRequest = new XMLHttpRequest(); // new HttpRequest instance
	httpRequest.open('POST', `${LittledataLayer.transactionWatcherURL}/cart/store`);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send(JSON.stringify(cart));
}

export function setClientID(getClientId: () => string, platform: 'google' | 'segment') {
	const { cart } = LittledataLayer;
	const cartAttributes = (cart && cart.attributes) || {};
	const clientIDProperty = `${platform}-clientID` as 'google-clientID' | 'segment-clientID';

	if (
		!LittledataLayer[clientIDProperty] && // don't resend for the same page
		!cartAttributes[clientIDProperty] // don't resend for the same cart
	) {
		// set it on data layer, so subsequent setClientID call is ignored
		LittledataLayer[clientIDProperty] = getClientId();
		postClientID(getClientId, platform, false);
	}

	const updatedAt = cartAttributes.littledata_updatedAt;
	if (updatedAt) {
		const clientIdCreated = new Date(Number(updatedAt));

		const timeout = 60 * 60 * 1000; // 60 minutes is the time cart is cached in Redis
		const timePassed = Date.now() - Number(clientIdCreated);
		// only need to resend cart if it's expired from our Redis cache
		if (timePassed > timeout) {
			//cart from LittledataLayer may have no token, so we need to fetch from API before storing
			postClientID(getClientId, platform, true);
		}
	}
}

export function removePii(str: string): string {
	const piiRegexs = [
		{
			key: 'email',
			regex: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
		},
		{
			key: 'postcode',
			regex: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/,
		},
	];

	return piiRegexs.reduce((memo, curr) => memo.replace(curr.regex, 'REMOVED'), str);
}

/**
 * guid
 */
export const guid: string = (function() {
	function s10() {
		return Math.floor(Math.random() * 10e9);
	}
	return `GA1.2.${s10()}.${s10()}`;
})();

// const createCookie = (name, value, days) => {
// 	let expires = ''
// 	if (days) {
// 		const date = new Date();
// 		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
// 		expires = `; expires=${date.toGMTString()}`
// 	}
// 	document.cookie = `${name}=${value}${expires}; path=/;`
// }

export const trackProductImageClicks = (clickTag: (name: string) => void) => {
	if (LittledataLayer.productPageClicks === false) return false;
	getElementsByHref('^https://cdn.shopify.com/s/files/.*/products/').forEach(element => {
		element.addEventListener('click', function() {
			// only add event to product images
			const image = this.getElementsByTagName('img')[0];
			const name = image && image.alt;

			clickTag(name);
		});
	});
};

export const trackSocialShares = (clickTag: (name?: string) => void) => {
	if (LittledataLayer.productPageClicks === false) return false;
	const networks = '(facebook|pinterest|twitter|linkedin|plus.google|instagram)';
	getElementsByHref(`${networks}\.com/(share|pin|intent)`).forEach(element => {
		element.addEventListener('click', function() {
			const match = this.href.match(new RegExp(networks));
			clickTag(match && match[0]);
		});
	});
};

export const validateLittledataLayer = () => {
	window.LittledataScriptVersion = '9.1';
	if (!window.LittledataLayer) {
		throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
	}
};

export const advertiseLD = (app: string) => {
	if (!LittledataLayer.hideBranding) {
		const appURI = app === 'Segment' ? 'segment-com-by-littledata' : 'littledata';
		console.log(
			`%c\nThis store uses Littledata 🚀 to automate its ${app} setup and make better, data-driven decisions. Learn more at http://apps.shopify.com/${appURI} \n`,
			'color: #088f87;',
		);
	}
};
