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

// @ts-ignore
export const initSegment = (writeKey?) => {
	// @ts-ignore
	window.analytics = window.analytics || [];
	// @ts-ignore
	if (!analytics.initialize) {
		// @ts-ignore
		if (analytics.invoked) {
			window.console && console.error && console.error('Segment snippet included twice.');
		} else {
			// @ts-ignore
			analytics.invoked = !0;
			// @ts-ignore
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

			// @ts-ignore
			analytics.factory = function(t) {
				return function() {
					var e = Array.prototype.slice.call(arguments);
					e.unshift(t);
					// @ts-ignore
					analytics.push(e);
					// @ts-ignore
					return analytics;
				};
			};
			// @ts-ignore
			for (var t = 0; t < analytics.methods.length; t++) {
				// @ts-ignore
				var e = analytics.methods[t];
				// @ts-ignore
				analytics[e] = analytics.factory(e);
			}

			// @ts-ignore
			analytics.load = function(t, e) {
				var n = document.createElement('script');
				n.type = 'text/javascript';
				n.async = !0;
				n.src = 'https://cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
				var a = document.getElementsByTagName('script')[0];
				a.parentNode.insertBefore(n, a);
				// @ts-ignore
				analytics._loadOptions = e;
			};
			// @ts-ignore
			analytics.SNIPPET_VERSION = '4.1.0'; //eslint-disable-line
			window.analytics.addSourceMiddleware(addEmailToEvents);
			window.analytics.load(writeKey || LittledataLayer.writeKey);
			writeKey && window.analytics.page();
		}
	}
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
			trackEvent('Product Viewed', properties);
		});
	}
};
