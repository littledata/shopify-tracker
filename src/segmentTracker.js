/* eslint-env browser */
/* global LittledataLayer */

import {
	pageView, productListClicks, setClientID, trackProductImageClicks, trackSocialShares,
} from './helpers'

import productListViews from './productListViews'

var analytics = window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";//eslint-disable-line
	analytics.load(LittledataLayer.writeKey);
}

const segmentProduct = (dataLayerProduct) => ({
	...dataLayerProduct,
	product_id: dataLayerProduct.id,
	sku: dataLayerProduct.id,
});

(function () {
	window.dataLayer = window.dataLayer || [];
	if (!LittledataLayer) {
		console.warn('Aborting Littledata tracking as LittledataLayer was not found') //eslint-disable-line
		return
	}

	if (!LittledataLayer.hideBranding) {
		console.log('%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/segment-com-by-littledata \n', 'color: #088f87;') //eslint-disable-line
	}

	if (LittledataLayer.customer) {
		analytics.identify(LittledataLayer.customer.id, LittledataLayer.customer)
	}

	pageView(function () {
		analytics.page();
	})

	function trackEvents() {
		setClientID(() => analytics.user().anonymousId())
		if (LittledataLayer) {
			/* run list, product, and clientID scripts everywhere */
			if (LittledataLayer.ecommerce.impressions.length) {
				productListClicks(product => {
					const p = segmentProduct(product)
					p.list_id = document.location.pathname
					p.category = 'EnhancedEcommerce'
					analytics.track('Product Clicked', p)
				})

				productListViews(products => {
					analytics.track('Product List Viewed', {
						list_id: products[0].list,
						category: 'EnhancedEcommerce',
						products,
					})
				})
			}
			const rawProduct = LittledataLayer.ecommerce.detail
			if (rawProduct) {
				const product = segmentProduct(rawProduct)
				product.list_id = document.location.href
				product.category = 'EnhancedEcommerce'
				analytics.track('Product Viewed', product)

				// if PDP, we can also track clicks on images and social shares
				trackProductImageClicks((name) => {
					product.image_url = name
					analytics.track('Product Image Clicked', product)
				})

				trackSocialShares(network => {
					analytics.track('Product Shared', {
						...product,
						share_via: network,
					})
				})
			}
		}
	}

	if (document.readyState !== 'loading') {
		// wait for analytics.user() to be defined
		analytics.ready(function () {
			trackEvents();
		});
	} else {
		document.addEventListener('DOMContentLoaded', function () {
			// wait for analytics.user() to be defined
			analytics.ready(function () {
				trackEvents();
			});
		});
	}
}())
