/* eslint-env browser */
/* global LittledataLayer */

import {
	pageView, productListClicks, setClientID, removePii, getPersistentClientId, trackProductImageClicks, trackSocialShares,
} from './helpers'
import productListViews from './productListViews'
import { getGaCookie } from './getGaCookie'

(function () {
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments) } //eslint-disable-line
	gtag('js', new Date());

	// handle old calls from the page to analytics.js
	window.ga = window.ga || function(param) {
		console.warn('Page attempted to send data to Google Analytics using \'ga\' command. You need to migrate to gtag https://developers.google.com/analytics/devguides/collection/gtagjs/migration')
		if (typeof param === 'function') return param.call() //ensures anything waiting for ga gets called
	}

	if (!LittledataLayer) {
		console.warn('Aborting Littledata tracking as LittledataLayer was not found') //eslint-disable-line
		return
	}

	if (!LittledataLayer.hideBranding) {
		console.log('%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/littledata \n', 'color: #088f87;') //eslint-disable-line
	}

	const config = {
		linker: {
			domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
		},
		anonymize_ip: !!LittledataLayer.anonymizeIp,
		allow_ad_personalization_signals: !!LittledataLayer.googleSignals,
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

	function trackEvents() {
		setClientID(() => getGaCookie())
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
			product.list_position = window.localStorage.getItem('position') || 1;
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

	if (document.readyState !== 'loading') {
		trackEvents();
	} else {
		document.addEventListener('DOMContentLoaded', function () {
			trackEvents();
		});
	}
}())
