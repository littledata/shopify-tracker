/* eslint-env browser */
/* global ga, LittledataLayer */

import {
	pageView, productListClicks, setClientID, removePii, getPersistentClientId, trackProductImageClicks, trackSocialShares,
} from './helpers'
import productListViews from './productListViews'

(function () {
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments) } //eslint-disable-line
	gtag('js', new Date());

	if (!LittledataLayer) {
		console.warn('Aborting Littledata tracking as LittledataLayer was not found') //eslint-disable-line
		return
	}

	const config = {
		linker: {
			domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
		},
		anonymize_ip: !!LittledataLayer.enhancePrivacy,
		allow_ad_personalization_signals: !LittledataLayer.enhancePrivacy,
		page_title: removePii(document.title),
		page_location: removePii(document.location.href),
		currency: LittledataLayer.ecommerce.currencyCode,
		link_attribution: true,
		clientId: getPersistentClientId(),
	}

	if (LittledataLayer.referralExclusion.test(document.referrer)) config.page_referrer = null

	pageView(function () {
		gtag('config', LittledataLayer.webPropertyID, config);
	})

	window.addEventListener('DOMContentLoaded', function () {
		setClientID(() => ga.getAll()[0].get('clientId'))
		/* run list, product, and clientID scripts everywhere */
		if (LittledataLayer.ecommerce.impressions.length) {
			productListClicks((product, self) => {
				const productFromImpressions = LittledataLayer.ecommerce.impressions.find(prod => {
					prod.name === product.name && prod.handle === product.handle
				});
				product.list_position = (productFromImpressions && productFromImpressions.list_position) || 1;
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
	})
}())
