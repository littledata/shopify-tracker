/* global LittledataLayer */
declare let window: CustomWindow;
import checkLinker from './checkLinker';
import { getGaCookie } from './getGaCookie';

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
		const productLink = linkSplit && linkSplit[1];
		return productLink === p.handle;
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

function postClientID(getClientId: () => string, platform: string) {
	clearTimeout(postCartTimeout); //don't send multiple requests within a second
	postCartTimeout = setTimeout(function() {
		const clientID = getClientId();
		if (typeof clientID !== 'string') return;

		const updatedAt = new Date().getTime();
		const cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance
		const attributes = {
			updatedAt,
			[`${platform}-clientID`]: clientID,
		};

		cartUpdateReq.onload = function() {
			const updatedCart = JSON.parse(cartUpdateReq.response);
			LittledataLayer.cart = updatedCart;
			const clientIDReq = new XMLHttpRequest();
			clientIDReq.open('POST', `${LittledataLayer.transactionWatcherURL}/clientID`);
			clientIDReq.setRequestHeader('Content-Type', 'application/json');
			clientIDReq.send(
				JSON.stringify({
					...attributes,
					cartID: `${platform}-${updatedCart.token}`,
				}),
			);
		};
		cartUpdateReq.open('POST', '/cart/update.json');
		cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
		cartUpdateReq.send(
			JSON.stringify({
				attributes,
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
	const clientIDProperty: 'google-clientID' | 'segment-clientID' = `${platform}-clientID` as
		| 'google-clientID'
		| 'segment-clientID';

	if (!cart || !cart.attributes || !cart.attributes[clientIDProperty] || !cart.attributes.updatedAt) {
		return postClientID(getClientId, platform);
	}

	const clientIdCreated = new Date(Number(cart.attributes.updatedAt));
	const timeout = 60 * 60 * 1000; // 60 minutes
	const timePassed = Date.now() - Number(clientIdCreated);
	// only need to resent client ID if it's expired from our Redis cache
	if (timePassed > timeout) {
		postCartToLittledata(cart);
		setTimeout(() => {
			postClientID(getClientId, platform);
		}, 10000); // allow 10 seconds for our server to register cart until updating it, otherwise there's a race condition between storing and a webhook triggered by this
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

export function getPersistentClientId() {
	// needed because Safari wipes 1st party cookies
	// so we need to persist over localStorage, if available

	// ignore this and return undefined if we have linker params
	if (checkLinker()) return;

	if (window.localStorage && LittledataLayer.persistentUserId) {
		const localClientId = window.localStorage.getItem('_ga');
		// prefer local storage version, as it was set by this function
		if (localClientId) return localClientId;

		const cookieClientId = getGaCookie();
		if (cookieClientId) {
			// set it to local storage for next time
			window.localStorage.setItem('_ga', cookieClientId);
			return cookieClientId;
		}
	}

	// returning an empty client id will cause gtag to create a new one
	return '';
}

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
	if (!window.LittledataLayer) {
		throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
	}
};

export const advertiseLD = () => {
	if (!LittledataLayer.hideBranding) {
		console.log(
			'%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/littledata \n',
			'color: #088f87;',
		); //eslint-disable-line
	}
};
