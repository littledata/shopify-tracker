/* global LittledataLayer */
import {
	productListClicks, setClientID, removePii, getPersistentClientId, trackProductImageClicks, trackSocialShares,
} from '../common/helpers'
import productListViews from '../common/productListViews'

export const trackEvents = () => {
	setClientID(getPersistentClientId)
	/* run list, product, and clientID scripts everywhere */
	if (LittledataLayer.ecommerce.impressions.length) {
		productListClicks((product, self) => {
			const productFromImpressions = LittledataLayer.ecommerce.impressions.find(prod => prod.name === product.name
				&& prod.handle === product.handle);

			const pos = productFromImpressions && productFromImpressions.list_position;
			window.localStorage.setItem('position', pos);
			dataLayer.push({
				event: 'select_content',
				ecommerce: {
					click: {
						actionField: { list: product.list_name },
						products: [product],
					},
				},
			})

			gtag('event', 'select_content', {
				content_type: 'product',
				items: [product],
				send_to: LittledataLayer.webPropertyID,
				event_callback() {
					window.clearTimeout(self.timeout)
					document.location = self.href
				},
			})
		})

		productListViews((products) => {
			gtag('event', 'view_item_list', {
				items: products,
				send_to: LittledataLayer.webPropertyID,
				non_interaction: true,
			})
			dataLayer.push({
				event: 'view_item_list',
				ecommerce: {
					impressions: products,
				},
			})
		})
	}

	const product = LittledataLayer.ecommerce.detail
	if (product) {
		product.list_position = parseInt(window.localStorage.getItem('position')) || 1;
		gtag('event', 'view_item', {
			items: [product],
			non_interaction: true,
			send_to: LittledataLayer.webPropertyID,
		})

		dataLayer.push({
			event: 'view_item',
			ecommerce: {
				detail: {
					actionField: { list: product.list_name },
					products: [product],
				},
			},
		})

		// if PDP, we can also track clicks on images and social shares
		trackProductImageClicks(name => {
			dataLayer.push({
				event: 'product_image_click',
				name,
			})

			gtag('event', 'Product image click', {
				event_category: 'Product details page (Littledata)',
				event_label: name,
				send_to: LittledataLayer.webPropertyID,
			})
		})

		trackSocialShares(network => {
			dataLayer.push({
				event: 'share_product',
				network,
			})

			gtag('event', 'Social share', {
				event_category: 'Product details page (Littledata)',
				event_label: network,
				send_to: LittledataLayer.webPropertyID,
			})
		})
	}
}

export const getConfig = () => {
	const config = {
		linker: {
			domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
		},
		anonymize_ip: !!LittledataLayer.anonymizeIp,
		allow_ad_personalization_signals: !!LittledataLayer.googleSignals,
		currency: LittledataLayer.ecommerce.currencyCode,
		link_attribution: true,
		clientId: getPersistentClientId(),
		send_page_view: false,
	}

	const optimize = LittledataLayer.optimizeId
	if (optimize) {
		config.optimize_id = optimize
	}
	if (LittledataLayer.referralExclusion.test(document.referrer)) config.page_referrer = null
}

export const initGtag = () => {
	window.dataLayer = window.dataLayer || [];
	const stubFunction = function () { dataLayer.push(arguments) } //eslint-disable-line
	window.gtag = window.gtag || stubFunction
	gtag('js', new Date());

	gtag('config', LittledataLayer.webPropertyID, getConfig());
}

export const sendPageview = () => {
	gtag('send', 'page_view', {
		page_title: removePii(document.title),
		page_location: removePii(document.location.href),
	})

	const googleAds = LittledataLayer.googleAdsConversionIds
	if (typeof googleAds === 'object' && googleAds.length > 0) {
		googleAds.forEach(adId => gtag('config', adId))
	}
}
