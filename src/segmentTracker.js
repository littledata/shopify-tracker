/* eslint-env browser */
/* global LittledataLayer */
/* eslint no-var: 0 */

import {
	pageView, hasLocalStorage, productListClicks, setClientID,
} from './helpers'
import productListViews from './productListViews'

var analytics = window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";//eslint-disable-line
	analytics.load(LittledataLayer.writeKey);
}

(function () {
	window.dataLayer = window.dataLayer || [];
	if (!LittledataLayer) {
		console.warn('Aborting Littledata tracking as LittledataLayer was not found')
		return
	}

	if (LittledataLayer.customer) {
		analytics.identify(LittledataLayer.customer.id, LittledataLayer.customer)
	}

	pageView(function () {
		analytics.page();
	})

	document.addEventListener('ready', function () {
		setClientID(() => analytics.user().anonymousId())
		if (LittledataLayer) {
			/* run list, product, and clientID scripts everywhere */
			if (LittledataLayer.ecommerce.impressions.length) {
				productListClicks(product => {
					var p = product
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
			var product = LittledataLayer.ecommerce.detail //eslint-disable-line
			if (product) {
				if (hasLocalStorage) product.list_id = localStorage.list
				product.category = 'EnhancedEcommerce'
				analytics.track('Product Viewed', product)
			}
		}
	})
}())
