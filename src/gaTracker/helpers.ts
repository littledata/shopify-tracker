/* global LittledataLayer */
declare let window: CustomWindow;

import { Detail, GA4Product } from '../..';
import { getCookie, getValidGAClientId } from '../common/getCookie';
import {
	productListClicks,
	removePii,
	retrieveAndStoreClientId,
	trackProductImageClicks,
	trackSocialShares,
} from '../common/helpers';

import getProductDetail from '../common/getProductDetail';
import productListViews from '../common/productListViews';

const event_category = 'Shopify (Littledata)';

export const initGtag = () => {
	window.dataLayer = window.dataLayer || [];
	const stubFunction = function() {
		dataLayer.push(arguments);
	}; //eslint-disable-line
	window.gtag = window.gtag || stubFunction;

	window.ga =
		window.ga ||
		function() {
			(window.ga.q = window.ga.q || []).push(arguments);
		};
	window.ga.l = +new Date();

	retrieveAndStoreClientId(true);

	// @ts-ignore
	gtag('js', new Date());
	gtag('config', LittledataLayer.webPropertyID, {
		...getConfig(),
		send_page_view: false,
	});
};

export const sendPageview = () => {
	const page_title = removePii(document.title);
	const locationWithMedium = addUTMMediumIfMissing(document.location.href);
	const page_location = removePii(locationWithMedium);

	gtag('config', LittledataLayer.webPropertyID, {
		...getConfig(),
		page_title,
		page_location,
	});

	dataLayer.push({
		event: 'pageview',
		page_title,
		page_location,
	});

	const googleAds = LittledataLayer.googleAdsConversionIds;
	if (typeof googleAds === 'object' && googleAds.length > 0) {
		googleAds.forEach(adId => gtag('config', adId));
	}

	const product = getProductDetail();
	if (product) {
		product.list_position = parseInt(window.localStorage.getItem('position')) || 1;
		sendViewItemEvent(product);
	}
};

export const trackEvents = () => {
	/* run list, product, and clientID scripts everywhere */
	if (LittledataLayer.ecommerce.impressions.length) {
		productListClicks((product, self) => {
			const productFromImpressions = LittledataLayer.ecommerce.impressions.find(
				prod => prod.name === product.name && prod.handle === product.handle,
			);

			const pos = productFromImpressions && productFromImpressions.list_position;
			window.localStorage.setItem('position', String(pos));

			sendSelectContentEvent(product, self);
		});

		productListViews((products: Impression[]) => {
			sendViewItemListEvent(products);
		});
	}

	const product = getProductDetail();
	if (product) {
		// if PDP, we can also track clicks on images and social shares
		trackProductImageClicks(image => {
			dataLayer.push({
				event: 'product_image_click',
				name: image.name,
				image_url: image.src,
			});

			if (hasGA4()) {
				gtag('event', 'select_content', {
					content_type: 'product',
					item_id: product.id,
					image_url: image.src,
					send_to: LittledataLayer.measurementID,
				});
			}
			if (hasGA3()) {
				gtag('event', 'Product image click', {
					event_category,
					event_label: image.name,
					send_to: LittledataLayer.webPropertyID,
				});
			}
		});

		trackSocialShares(network => {
			dataLayer.push({
				event: 'share_product',
				network,
			});

			if (hasGA4()) {
				gtag('event', 'share', {
					method: network,
					send_to: LittledataLayer.measurementID,
				});
			}
			if (hasGA3()) {
				gtag('event', 'Social share', {
					event_category,
					event_label: network,
					send_to: LittledataLayer.webPropertyID,
				});
			}
		});
	}
};

export const filterGAProductFields = (product: LooseObject) => {
	//pick only the allowed fields from GA EE specification
	//https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
	const gaProductFields = [
		'name',
		'id',
		'price',
		'brand',
		'category',
		'variant',
		'list',
		'list_name',
		'position',
		'list_position',
	];
	const gaProduct: LooseObject = {};
	gaProductFields.forEach(field => {
		if (product[field]) gaProduct[field] = product[field];
	});
	return gaProduct;
};

export const getConfig = (): Gtag.CustomParams => {
	const settings: LooseObject = window.LittledataLayer || {};
	const { anonymizeIp, googleSignals, ecommerce, optimizeId, referralExclusion } = settings;

	const DEFAULT_LINKER_DOMAINS = [
		'^(?!cdn.)(.*)shopify.com',
		'rechargeapps.com',
		'recurringcheckout.com',
		'carthook.com',
		'checkout.com',
		'shop.app',
	];
	const extraLinkerDomains = settings.extraLinkerDomains || [];

	let excludeReferral = referralExclusion && referralExclusion.test(document.referrer);
	const extraExcludedReferrers = ['shop.app'];
	if (extraExcludedReferrers.includes(document.referrer)) {
		excludeReferral = true;
	}
	if (document.referrer.includes(`${location.protocol}//${location.host}`)) {
		//valid referrer may have host within the url, like https://newsite.com/about/shopify.com
		//but less likely to have protocol as well, unless the same domain - self-referral
		excludeReferral = true;
	}
	const config: Gtag.CustomParams = {
		linker: {
			domains: [...DEFAULT_LINKER_DOMAINS, ...extraLinkerDomains],
		},
		anonymize_ip: anonymizeIp === false ? false : true, //default true
		allow_ad_personalization_signals: googleSignals === true ? true : false, //default false
		currency: (ecommerce && ecommerce.currencyCode) || 'USD',
		link_attribution: true,
		optimize_id: optimizeId,
		page_referrer: excludeReferral ? null : document.referrer,
	};

	const userId = settings.customer && settings.customer.id;
	if (userId) {
		config.user_id = userId;
	}

	const cookie = getCookie('_ga');
	if (cookie && !getValidGAClientId(cookie)) {
		//expiring the cookie after this session ensures invalid clientID
		//is not propagated to future sessions
		config.cookie_expires = 0;
	}

	return config;
};

const addUTMMediumIfMissing = (url: string) => {
	const utmMedium = /(\?|&)utm_medium=/;
	const utmSource = /utm_source=[a-z,A-Z,0-9,-,_]+/;
	const sourceMatches = url.match(utmSource);
	if (!sourceMatches || !sourceMatches.length || utmMedium.test(url)) {
		return url;
	}
	// Shopify adds a utm_source tag for it's own tracking, without specifying utm_medium
	// we add 'referral' to ensure it shows up in GA
	const sourceTag = sourceMatches[0];
	const utmTags = sourceTag + '&utm_medium=referral';

	return url.replace(sourceTag, utmTags);
};

function sendViewItemListEvent(products: Impression[]): void {
	if (hasGA4()) {
		const listName = (products && products.length && products[0].list_name) || '';
		const page_title = removePii(document.title);
		gtag('event', 'view_item_list', {
			items: convertProductsToGa4Format(products, true),
			item_list_name: page_title,
			item_list_id: listName,
			send_to: LittledataLayer.measurementID,
		});
	}

	if (hasGA3()) {
		const gaProducts = products.map(product => filterGAProductFields(product));
		gtag('event', 'view_item_list', {
			event_category,
			items: gaProducts,
			send_to: LittledataLayer.webPropertyID,
			non_interaction: true,
		});
	}

	dataLayer.push({
		event: 'view_item_list',
		ecommerce: {
			impressions: products,
		},
	});
}

function sendViewItemEvent(product: Detail): void {
	if (hasGA4()) {
		gtag('event', 'view_item', {
			items: convertProductsToGa4Format(new Array(product), false),
			send_to: LittledataLayer.measurementID,
		});
	}
	if (hasGA3()) {
		gtag('event', 'view_item', {
			event_category,
			items: [filterGAProductFields(product)],
			non_interaction: true,
			send_to: LittledataLayer.webPropertyID,
		});
	}

	dataLayer.push({
		event: 'view_item',
		ecommerce: {
			detail: {
				actionField: { list: product.list_name },
				products: [product],
			},
		},
	});
}

function sendSelectContentEvent(product: Detail, self: TimeBombHTMLAnchor): void {
	dataLayer.push({
		event: 'select_content',
		ecommerce: {
			click: {
				actionField: { list: product.list_name },
				products: [product],
			},
		},
	});

	if (hasGA4()) {
		gtag('event', 'select_item', {
			items: convertProductsToGa4Format(new Array(product), true),
			send_to: LittledataLayer.measurementID,
			event_callback() {
				window.clearTimeout(self.timeout);
				document.location.href = self.href;
			},
		});
	}
	if (hasGA3()) {
		gtag('event', 'select_content', {
			event_category,
			content_type: 'product',
			items: [filterGAProductFields(product)],
			send_to: LittledataLayer.webPropertyID,
			event_callback() {
				window.clearTimeout(self.timeout);
				document.location.href = self.href;
			},
		});
	}
}

function hasGA4(): boolean {
	return LittledataLayer.measurementID !== undefined;
}

function hasGA3(): boolean {
	return LittledataLayer.webPropertyID !== undefined;
}

function convertProductsToGa4Format(products: Detail[], sendIndex: boolean): GA4Product[] {
	return products.map(product => {
		const converted = {
			currency: (LittledataLayer.ecommerce && LittledataLayer.ecommerce.currencyCode) || '',
			item_id: product.shopify_product_id,
			item_name: product.name,
			item_brand: product.brand,
			item_category: product.category,
			item_variant: product.variant,
			item_sku: product.id,
			item_variant_id: product.shopify_variant_id,
			price: product.price,
			index: product.list_position,
		};
		if (!sendIndex) {
			delete converted.index;
		}
		return converted;
	});
}
