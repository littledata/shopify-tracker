/* eslint-env browser */
import { getCookie, getValidGAClientId } from '../common/getCookie';
import { getConfig } from '../gaTracker/helpers';

declare let window: CustomWindow;

export const getWebPropertyIdPromise = (): Promise<string> => {
	const baseUrl = getMonitorBaseUrl();
	const storeUrl = getStoreUrl();

	const isCheckout = location.pathname.includes('/checkout/');

	const webPropertyId: string = window.localStorage && window.localStorage.getItem('webPropertyId');
	if (!isCheckout && webPropertyId) {
		return new Promise(resolve => {
			resolve(webPropertyId);
		});
	}

	return requestWebPropertyIdFromAPI(baseUrl, storeUrl);
};

function getMonitorBaseUrl(): string {
	const STAGING_URL = 'https://transactions-staging.littledata.io';
	const PROD_URL = 'https://transactions.littledata.io';
	const isSandbox = location.pathname.includes('sandbox');

	return isSandbox ? STAGING_URL : PROD_URL;
}

function getStoreUrl() {
	// @ts-ignore
	return CHDataObject && CHDataObject.store_urls && CHDataObject.store_urls.store_url;
}

function requestWebPropertyIdFromAPI(baseUrl: string, storeUrl: string): Promise<string> {
	const webPropertyId = fetch(`${baseUrl}/webProperty/${storeUrl}`)
		.then(response => response.json())
		.then(json => json.webPropertyId)
		.then(webPropertyId => saveToLocalStorage(webPropertyId));

	return webPropertyId;
}

function saveToLocalStorage(webPropertyId: string): string {
	window.localStorage && window.localStorage.setItem('webPropertyId', webPropertyId);
	return webPropertyId;
}

export function loadGtagScript(webPropertyId: string) {
	const gtagLink = `https://www.googletagmanager.com/gtag/js?id=${webPropertyId}`;
	loadScript(gtagLink, function() {});
}

// @ts-ignore
function loadScript(src: string, cb: any) {
	var script = document.createElement('script');
	script.async = true;
	script.src = src;

	script.onerror = function() {
		cb(new Error('Failed to load' + src));
	};

	script.onload = function() {
		cb();
	};

	document.getElementsByTagName('head')[0].appendChild(script);
}

export function initGtag(webPropertyId: string): void {
	window.dataLayer = window.dataLayer || [];
	const stubFunction = function() {
		dataLayer.push(arguments);
	}; //eslint-disable-line
	window.gtag = window.gtag || stubFunction;
	// @ts-ignore
	gtag('js', new Date());
	gtag('config', webPropertyId, getConfig());
}

export const sendCartId = () => {
	const baseUrl = getMonitorBaseUrl();
	const apiUrl = `${baseUrl}/clientID`;
	const gaCookie = getCookie('_ga');
	const clientID = getValidGAClientId(gaCookie);
	if (!clientID) return;

	const data = {
		clientID,
		// @ts-ignore
		cartID: `carthook-${CHDataObject.checkout_session}`,
	};

	const params = buildPostRequestParams(data);

	fetch(apiUrl, params);
};

function buildPostRequestParams(data: object): object {
	const params = {
		headers: {
			'content-type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify(data),
		method: 'POST',
	};
	return params;
}

export const getPageType = () => {
	const { href } = document.location;
	if (href.includes('/checkout')) return 'checkout';
	if (href.includes('/oto')) return 'upsell';
	if (href.includes('/thank-you')) return 'thankyou';
};

export const convertToGtagProducts = (lineItems: LooseObject) => {
	return lineItems.map((item: LooseObject) => ({
		id: item.sku || String(item.foreign_product_id), //sku or Shopify product ID
		quantity: Number(item.quantity),
		price: Number(item.line_price || item.price || 0).toFixed(2),
		name: item.title,
		variant: item.variant_title,
		brand: item.vendor,
	}));
};

export const sumProductTax = (lineItems: LooseObject) => {
	return lineItems.reduce((sum: number, item: LooseObject) => sum + item.tax_amount || 0, 0);
};

export const sumProductSubtotal = (lineItems: LooseObject) => {
	return lineItems.reduce((sum: number, item: LooseObject) => {
		return sum + (item.price || 0) * (item.quantity || 0);
	}, 0);
};

export const sumShipping = (shippingLines: LooseObject) => {
	return shippingLines.reduce((sum: number, item: LooseObject) => {
		return sum + (item.price || 0);
	}, 0);
};
