/* global LittledataLayer */
declare let window: CustomWindow;
import {
	productListClicks,
	trackProductImageClicks,
	trackSocialShares,
	setCartOnlyAttributes,
} from '../common/helpers';
import { addEmailToEvents } from './addEmailToEvents';

import { getCookie } from '../common/getCookie';
import productListViews from '../common/productListViews';
import getProductDetail from '../common/getProductDetail';
import { SegmentProduct } from '../../segmentInterface';

const getContext = () => {
	return {
		integration: {
			name: 'shopify_littledata',
			version: window.LittledataScriptVersion,
		},
	};
};

const trackEvent = (eventName: string, params: object) => {
	// @ts-ignore
	window.analytics.track(eventName, params, { context: getContext() });
};

const segmentProduct = (dataLayerProduct: Detail): SegmentProduct => ({
	brand: dataLayerProduct.brand,
	category: dataLayerProduct.category,
	url: dataLayerProduct.handle,
	product_id: dataLayerProduct.id,
	sku: dataLayerProduct.id,
	position: dataLayerProduct.list_position,
	name: dataLayerProduct.name,
	price: parseFloat(dataLayerProduct.price),
	variant: dataLayerProduct.variant,
	shopify_product_id: dataLayerProduct.shopify_product_id,
	shopify_variant_id: dataLayerProduct.shopify_variant_id,
	compare_at_price: dataLayerProduct.compare_at_price,
});

export const identifyCustomer = (customer: Customer) => {
	const cookieTraits: any = {};
	const cookies = LittledataLayer.cookiesToTrack;
	if (cookies) {
		cookies.forEach(cookie => {
			cookieTraits[cookie] = getCookie(cookie);
		});
	}
	setCartOnlyAttributes(cookieTraits); //this will add to Shopify cart
	if (customer) {
		window.analytics.identify(customer.id, {
			email: customer.email,
			name: customer.name,
			phone: customer.phone || (customer.address && customer.address.phone),
			address: parseAddress(customer.address),
			...cookieTraits,
		});
	}
};

export const trackEvents = () => {
	if (LittledataLayer) {
		/* run list, product, and clientID scripts everywhere */
		if (LittledataLayer.ecommerce.impressions.length) {
			productListClicks(product => {
				const productFromImpressions = LittledataLayer.ecommerce.impressions.find(
					prod => prod.name === product.name && prod.handle === product.handle,
				);
				const pos = productFromImpressions && productFromImpressions.list_position;
				window.localStorage.setItem('position', String(pos));

				trackEvent('Product Clicked', {
					...segmentProduct(product),
					currency: LittledataLayer.ecommerce.currencyCode,
					list_id: product.list,
				});
			});

			productListViews(products => {
				const listId = products && products[0].list;
				const segmentProducts = products.map(segmentProduct);

				trackEvent('Product List Viewed', {
					list_id: listId,
					products: segmentProducts,
				});
			});
		}

		const productDetail = getProductDetail();
		if (productDetail) {
			const product = segmentProduct(productDetail);

			// if PDP, we can also track clicks on images and social shares
			trackProductImageClicks(name => {
				product.image_url = name;
				trackEvent('Product Image Clicked', product);
			});

			trackSocialShares(network => {
				trackEvent('Product Shared', {
					...product,
					share_via: network,
				});
			});
		}
	}
};

export const initSegment = (writeKey?: string) => {
	// Create a queue, but don't obliterate an existing one!
	// @ts-ignore
	const analytics: any = (window.analytics = window.analytics || []);

	// If the real analytics.js is already on the page return.
	if (analytics.initialize) return;

	if (analytics.invoked) {
		window.console && console.error && console.error('Segment snippet included twice.');
		return;
	}

	analytics.invoked = true;
	analytics.methods = [
		'trackSubmit',
		'trackClick',
		'trackLink',
		'trackForm',
		'pageview',
		'identify',
		'reset',
		'group',
		'track',
		'ready',
		'alias',
		'debug',
		'page',
		'once',
		'off',
		'on',
		'addSourceMiddleware',
		'addIntegrationMiddleware',
		'setAnonymousId',
		'addDestinationMiddleware',
	];

	analytics.factory = function(t: any) {
		return function() {
			var e = Array.prototype.slice.call(arguments);
			e.unshift(t);
			analytics.push(e);
			return analytics;
		};
	};

	for (var t = 0; t < analytics.methods.length; t++) {
		var e = analytics.methods[t];
		analytics[e] = analytics.factory(e);
	}

	// Define a method to load Analytics.js from our CDN,
	// and that will be sure to only ever load it once.
	analytics.load = function(key: string, options: LooseObject) {
		// Create an async script element based on your key.
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';

		// Insert our script next to the first script element.
		var first = document.getElementsByTagName('script')[0];
		first.parentNode.insertBefore(script, first);
		analytics._loadOptions = options;
	};

	// Add a version to keep track of what's in the wild.
	analytics.SNIPPET_VERSION = '4.1.0';

	analytics.addSourceMiddleware(addEmailToEvents);
	analytics.load(writeKey || LittledataLayer.writeKey);
	analytics.page();
	window.dataLayer = window.dataLayer || [];
};

const parseAddress = (a: Customer['address']): SegmentAddressFormat => {
	const output: SegmentAddressFormat = {};
	if (!a) return output;
	if (a.address1) {
		output.street = a.address1;
		if (a.address2) output.street += `, ${a.address2}`;
	}
	if (a.city) output.city = a.city;
	if (a.zip) output.postalCode = a.zip;
	if (a.province) output.state = a.province;
	if (a.country) output.country = a.country;

	return output;
};

export const callSegmentPage = (integrations: Record<string, any>) => {
	// https://segment.com/docs/sources/website/analytics.js/#page
	const pageName = document.title;
	window.analytics.page(
		pageName,
		{},
		{
			context: getContext(),
			integrations,
		},
	);

	const productDetail = getProductDetail();
	if (productDetail) {
		const properties = segmentProduct(productDetail);
		properties.currency = LittledataLayer.ecommerce.currencyCode;
		properties.position = parseInt(window.localStorage.getItem('position')) || 1;
		window.analytics.ready(() => {
			//need to wait for anonymousId to be available
			trackEvent('Product Viewed', properties);
		});
	}
};
