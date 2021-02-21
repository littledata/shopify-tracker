/* global LittledataLayer */
import { CustomWindow } from '../..';
declare let window: CustomWindow;
import { productListClicks, trackProductImageClicks, trackSocialShares } from '../common/helpers';
import { addEmailToTrackEvents } from './helpers/addEmailToEvents';
import { segmentProduct } from './helpers/segmentProduct';

import { getCookie } from '../common/getCookie';
import productListViews from '../common/productListViews';
import getProductDetail from '../common/getProductDetail';
import { setCartOnlyAttributes } from '../common/setClientID';
import { addUserIdForCustomer } from './helpers/addUserIdForCustomer';

export const getContext = () => {
	return {
		integration: {
			name: 'shopify_littledata',
			version: window.LittledataScriptVersion,
		},
		traits: window.analytics.user && window.analytics.user().traits(),
	};
};

export const trackEvent = (eventName: string, params: object) => {
	window.analytics.track(
		eventName,
		{ ...params, ...addUserIdForCustomer(window.LittledataLayer), sent_from: 'Littledata script' },
		{ context: getContext() },
	);
};

export const identifyCustomer = () => {
	const cookieTraits: any = {};
	const cookies = LittledataLayer.cookiesToTrack || [];
	cookies.forEach(cookie => {
		cookieTraits[cookie] = getCookie(cookie);
	});
	setCartOnlyAttributes(cookieTraits); //this will add to Shopify cart

	const { userId } = addUserIdForCustomer(LittledataLayer);
	if (userId) {
		const { customer } = LittledataLayer;
		window.analytics.identify(userId, {
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
			trackProductImageClicks(image => {
				product.image_url = image.src;
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

export const initSegment = () => {
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

	// use custom CDN path, or fallback to Segment's CDN
	const CDNdomain = LittledataLayer.CDNForAnalyticsJS || 'https://cdn.segment.com';

	// Define a method to load Analytics.js from CDN,
	// and that will be sure to only ever load it once.
	analytics.load = function(key: string, options: LooseObject) {
		// Create an async script element based on your key.
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = `${CDNdomain}/analytics.js/v1/${key}/analytics.min.js`;

		// Insert our script next to the first script element.
		var first = document.getElementsByTagName('script')[0];
		first.parentNode.insertBefore(script, first);
		analytics._loadOptions = options;
	};

	// Add a version to keep track of what's in the wild.
	analytics.SNIPPET_VERSION = '4.1.0';

	analytics.addSourceMiddleware(addEmailToTrackEvents);
	analytics.load(LittledataLayer.writeKey);
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
