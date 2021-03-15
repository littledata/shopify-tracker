import { CustomWindow } from '../../index';

import UrlChangeTracker from './UrlChangeTracker';
import { customTask } from '../gaTracker/customTask';
import { getValidGAClientId } from '../common/getCookie';
import { setClientID } from './setClientID';

declare let window: CustomWindow;
interface CartCallback {
	(): Cart.RootObject;
}

const maximumTimeout = 524288000; // about 6 hours in seconds
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

export const getElementsByHref = (regex: RegExp | string): TimeBombHTMLAnchor[] => {
	const htmlCollection = document.getElementsByTagName('a');
	const r = new RegExp(regex);
	return Array.prototype.slice
		.call(htmlCollection)
		.filter(
			(element: HTMLAnchorElement) =>
				element.href && !element.className.includes('visually-hidden') && r.test(element.href),
		);
};

// look for /products/ in absolute or relative URLs
// but not when the URL starts with cdn, or is in query param
export const productUrlRegex = `^(?!\/\/cdn)[-\.:\/,a-z,A-Z]*\/products\/`;

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

export const trackProductImageClicks = (clickTag: (image: HTMLImageElement) => void) => {
	if (LittledataLayer.productPageClicks === false) return false;
	getElementsByHref('^https://cdn.shopify.com/s/files/.*/products/').forEach(element => {
		element.addEventListener('click', function() {
			// only add event to product images
			const image = this.getElementsByTagName('img')[0];
			if (!image) return false;
			clickTag(image);
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
	window.LittledataScriptVersion = '11';
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

export function retrieveAndStoreClientId() {
	let postClientIdTimeout: any;
	//when GA first loads it may not have changed the cookie to accept _ga query param
	//so we should wait 50ms after this
	let nextTimeout = 50;
	waitForGaToLoad(postClientIdTimeout, nextTimeout);
}

export const setCustomTask = (tracker: any) => {
	const MPEndpointLength = LittledataLayer.MPEndpoint && LittledataLayer.MPEndpoint.length;
	if (MPEndpointLength) {
		tracker.set('customTask', customTask(LittledataLayer.MPEndpoint));
	}
};

export const documentReady = (callback: Function) => {
	// see if DOM is already available
	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		// call on next available tick
		setTimeout(callback, 1);
	} else {
		// @ts-ignore
		document.addEventListener('DOMContentLoaded', callback);
	}
};

function waitForGaToLoad(postClientIdTimeout: any, nextTimeout: number) {
	// After GA queue is executed we need to wait
	// until after ga.getAll is available but before hit is sent
	const trackers = window.ga && window.ga.getAll && window.ga.getAll();
	if (trackers && trackers.length) {
		setCustomTask(trackers[0]);
		return setClientID(getGAClientId(trackers[0]), 'google');
	}

	if (nextTimeout > maximumTimeout) return; // stop if not found already
	nextTimeout *= 2;

	clearTimeout(postClientIdTimeout);

	postClientIdTimeout = window.setTimeout(function() {
		waitForGaToLoad(postClientIdTimeout, nextTimeout);
	}, nextTimeout);
}

export const getGAClientId = (tracker: any): string => {
	const clientId = tracker.get('clientId');
	return getValidGAClientId(clientId) ? clientId : '';
};
