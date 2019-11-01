/* global LittledataLayer */
declare let window: CustomWindow;
import {
	productListClicks,
	setClientID,
	removePii,
	getPersistentClientId,
	trackProductImageClicks,
	trackSocialShares,
} from '../common/helpers';
import productListViews from '../common/productListViews';

export const initGtag = () => {
	window.dataLayer = window.dataLayer || [];
	const stubFunction = function() {
		dataLayer.push(arguments);
	}; //eslint-disable-line
	window.gtag = window.gtag || stubFunction;
	// @ts-ignore
	gtag('js', new Date());
	gtag('config', LittledataLayer.webPropertyID, getConfig());
};

export const sendPageview = () => {
	const page_title = removePii(document.title);
	const page_location = removePii(document.location.href);

	gtag('config', LittledataLayer.webPropertyID, {
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
};

function getGtagClientId(): string {
	// @ts-ignore
	const trackers = ga.getAll();
	if (!trackers || !trackers.length) return '';

	return trackers[0].get('clientId');
}

export const trackEvents = () => {
	// getPersistentCLientId might return empty string for gtag to create a new one
	setClientID(getGtagClientId, 'google');
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
				content_type: 'product',
				items: [product],
				send_to: LittledataLayer.webPropertyID,
				event_callback() {
					window.clearTimeout(self.timeout);
					document.location.href = self.href;
				},
			});
		});

		productListViews((products: Impression[]) => {
			gtag('event', 'view_item_list', {
				items: products,
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

	const product = LittledataLayer.ecommerce.detail;
	if (product) {
		product.list_position = parseInt(window.localStorage.getItem('position')) || 1;
		gtag('event', 'view_item', {
			items: [product],
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

		// if PDP, we can also track clicks on images and social shares
		trackProductImageClicks(name => {
			dataLayer.push({
				event: 'product_image_click',
				name,
			});

			gtag('event', 'Product image click', {
				event_category: 'Product details page (Littledata)',
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
				event_category: 'Product details page (Littledata)',
				event_label: network,
				send_to: LittledataLayer.webPropertyID,
			});
		});
	}
};

export const getConfig = (): Gtag.CustomParams => {
	const { anonymizeIp, googleSignals, ecommerce, optimizeId, referralExclusion } = LittledataLayer;
	const userId = LittledataLayer.customer && LittledataLayer.customer.id;

	const DEFAULT_LINKER_DOMAINS = [
		'^(?!cdn.)(.*)shopify.com',
		'rechargeapps.com',
		'recurringcheckout.com',
		'carthook.com',
		'checkout.com',
	];

	const extraLinkerDomains = LittledataLayer.extraLinkerDomains || [];
	const excludeReferal = referralExclusion.test(document.referrer);
	const config: Gtag.CustomParams = {
		linker: {
			domains: [...DEFAULT_LINKER_DOMAINS, ...extraLinkerDomains],
		},
		anonymize_ip: !!anonymizeIp,
		allow_ad_personalization_signals: !!googleSignals,
		currency: ecommerce.currencyCode,
		link_attribution: true,
		clientId: getPersistentClientId(),
		optimize_id: optimizeId,
		page_referrer: excludeReferal ? document.referrer : null,
		send_page_view: false,
		user_id: userId,
	};

	return config;
};
