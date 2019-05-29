/* eslint-env browser */
/* global ga, LittledataLayer */

import {
	pageView, productListClicks, setClientID, removePii, getPersistentClientId,
} from './helpers'
import productListViews from './productListViews'

(function () {
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments) } //eslint-disable-line
	gtag('js', new Date());

	if (!LittledataLayer) {
		console.warn('Aborting Littledata tracking as LittledataLayer was not found')
		return
	}

	const config = {
		linker: {
			domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
		},
		anonymize_ip: LittledataLayer.enhancePrivacy || true,
		allow_ad_personalization_signals: !LittledataLayer.enhancePrivacy || true,
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

	document.addEventListener('DOMContentLoaded', function () {
		setClientID(() => ga.getAll()[0].get('clientId'))
		/* run list, product, and clientID scripts everywhere */
		if (LittledataLayer.ecommerce.impressions.length) {
			productListClicks((product, self) => {
				product.list_name = location.pathname //eslint-disable-line
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

			var product = LittledataLayer.ecommerce.detail //eslint-disable-line
			if (product) {
				product.list_name = document.location.href
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
			}
		}
	})
}())
