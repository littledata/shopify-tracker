/* global LittledataLayer */
declare let window: CustomWindow;
import {
	productListClicks,
	setClientID,
	removePii,
	trackProductImageClicks,
	trackSocialShares,
} from '../common/helpers';
import productListViews from '../common/productListViews';
import getProductDetail from '../common/getProductDetail';
import { getCookie, getValidGAClientId } from '../common/getCookie';

const event_category = 'Shopify (Littledata)';

export const initGtag = () => {
	window.dataLayer = window.dataLayer || [];
	const stubFunction = function() {
		dataLayer.push(arguments);
	}; //eslint-disable-line
	window.gtag = window.gtag || stubFunction;
	// @ts-ignore
	gtag('js', new Date());
	gtag('config', LittledataLayer.webPropertyID, {
		...getConfig(),
		send_page_view: false,
	});
};

let postClientIdTimeout: any;
let nextTimeout = 500; // half a second
const maximumTimeout = 524288000; // about 6 hours in seconds

function waitForGaToLoad() {
	const trackers = window.ga && window.ga.getAll();
	if (trackers && trackers.length) {
		return setClientID(getGtagClientId, 'google');
	}

	if (nextTimeout > maximumTimeout) return; // stop if not found already
	nextTimeout *= 2;

	clearTimeout(postClientIdTimeout);

	postClientIdTimeout = window.setTimeout(function() {
		waitForGaToLoad();
	}, nextTimeout);
}

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

	window.ga =
		window.ga ||
		function() {
			(window.ga.q = window.ga.q || []).push(arguments);
		};
	window.ga.l = +new Date();
	window.ga(() => {
		// we need to wait for GA library (part of gtag)
		waitForGaToLoad();
	});

	const product = getProductDetail();
	if (product) {
		product.list_position = parseInt(window.localStorage.getItem('position')) || 1;
		gtag('event', 'view_item', {
			event_category,
			items: [filterGAProductFields(product)],
			non_interaction: true,
			send_to: LittledataLayer.webPropertyID,
		});

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
};

function getGtagClientId(): string {
	// @ts-ignore
	const trackers = ga.getAll();
	if (!trackers || !trackers.length) return '';

	const clientId = trackers[0].get('clientId');
	return getValidGAClientId(clientId) ? clientId : '';
}

export const trackEvents = () => {
	/* run list, product, and clientID scripts everywhere */
	if (LittledataLayer.ecommerce.impressions.length) {
		productListClicks((product, self) => {
			const productFromImpressions = LittledataLayer.ecommerce.impressions.find(
				prod => prod.name === product.name && prod.handle === product.handle,
			);

			const pos = productFromImpressions && productFromImpressions.list_position;
			window.localStorage.setItem('position', String(pos));
			dataLayer.push({
				event: 'select_content',
				ecommerce: {
					click: {
						actionField: { list: product.list_name },
						products: [product],
					},
				},
			});

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
		});

		productListViews((products: Impression[]) => {
			const gaProducts = products.map(product => filterGAProductFields(product));
			gtag('event', 'view_item_list', {
				event_category,
				items: gaProducts,
				send_to: LittledataLayer.webPropertyID,
				non_interaction: true,
			});
			dataLayer.push({
				event: 'view_item_list',
				ecommerce: {
					impressions: products,
				},
			});
		});
	}

	const product = getProductDetail();
	if (product) {
		// if PDP, we can also track clicks on images and social shares
		trackProductImageClicks(name => {
			dataLayer.push({
				event: 'product_image_click',
				name,
			});

			gtag('event', 'Product image click', {
				event_category,
				event_label: name,
				send_to: LittledataLayer.webPropertyID,
			});
		});

		trackSocialShares(network => {
			dataLayer.push({
				event: 'share_product',
				network,
			});

			gtag('event', 'Social share', {
				event_category,
				event_label: network,
				send_to: LittledataLayer.webPropertyID,
			});
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

	let excludeReferral = referralExclusion.test(document.referrer);
	const extraExcludedReferrers = ['shop.app'];
	if (extraExcludedReferrers.includes(document.referrer)) {
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
		page_referrer: excludeReferral ? document.referrer : null,
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

	const MPEndpointLength = settings.MPEndpoint && settings.MPEndpoint.length;
	if (MPEndpointLength) {
		// remove '/collect' from end, since it is added by gtag
		config.transport_url = settings.MPEndpoint.slice(0, MPEndpointLength - '/collect'.length);
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
