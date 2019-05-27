/* eslint-env browser */
/* eslint no-var: 0 */
/* global gtag, LittledataLayer */

import {
	pageView, hasLocalStorage, listViewScript, setClientID, removePii,
} from './trackingHelpers'

(function () {
	window.dataLayer = window.dataLayer || [];

	if (!gtag) {
		console.warn('gtag script was not loaded')
		return
	}

	gtag('js', new Date());

	var config = { //eslint-disable-line
		linker: {
			domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
		},
		anonymize_ip: true,
		allow_ad_personalization_signals: true,
		page_title: removePii(document.title),
		page_location: removePii(document.location.href),
		currency: LittledataLayer.ecommerce.currencyCode,
	}

	if (LittledataLayer.referralExclusion.test(document.referrer)) config.page_referrer = null

	pageView(function () {
		gtag('config', LittledataLayer.webPropertyID, config);
	})

	document.addEventListener('DOMContentLoaded', function () {
		setClientID()
		if (LittledataLayer) {
			/* run list, product, and clientID scripts everywhere */
			if (LittledataLayer.ecommerce.impressions.length) {
				listViewScript(function () {
					gtag('event', 'view_item_list', {
						items: LittledataLayer.ecommerce.impressions.slice(0, 30),
						send_to: LittledataLayer.webPropertyID,
						non_interaction: true,
					})
					dataLayer.push({
						event: 'view_item_list',
						ecommerce: {
							currencyCode: '{{shop.currency}}',
							impressions: LittledataLayer.ecommerce.impressions.slice(0, 30),
						},
					})
				}, function (product, self) {
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
				});
			}
			var product = LittledataLayer.ecommerce.detail //eslint-disable-line
			if (product) {
				if (hasLocalStorage()) product.list_name = localStorage.list
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
