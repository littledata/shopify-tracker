/* global LittledataLayer */
import {
	productListClicks, setClientID, trackProductImageClicks, trackSocialShares,
} from '../common/helpers'
import productListViews from '../common/productListViews'

const segmentProduct = (dataLayerProduct) => ({
	brand: dataLayerProduct.brand,
	category: dataLayerProduct.category,
	url: dataLayerProduct.handle,
	product_id: dataLayerProduct.id,
	sku: dataLayerProduct.id,
	position: dataLayerProduct.list_position,
	name: dataLayerProduct.name,
	price: parseFloat(dataLayerProduct.price),
	variant: dataLayerProduct.variant,
});

export const identifyCustomer = () => {
	if (LittledataLayer.customer) {
		window.analytics.identify(LittledataLayer.customer.id, LittledataLayer.customer)
	}
}

export const trackEvents = () => {
	window.analytics.ready(() => {
		setClientID(window.analytics.user().anonymousId, window.analytics.Integrations['Google Analytics'])
	})
	if (LittledataLayer) {
		/* run list, product, and clientID scripts everywhere */
		if (LittledataLayer.ecommerce.impressions.length) {
			productListClicks(product => {
				const productFromImpressions = LittledataLayer.ecommerce.impressions.find(prod => prod.name === product.name
					&& prod.handle === product.handle);
				const pos = productFromImpressions && productFromImpressions.list_position;
				window.localStorage.setItem('position', pos);

				const p = segmentProduct(product)
				p.list_id = document.location.pathname
				p.category = 'EnhancedEcommerce'
				window.analytics.track('Product Clicked', p)
			})

			productListViews(products => {
				const listId = products && products[0].list;
				products.forEach((product, index) => {
					const p = segmentProduct(product)
					products[index] = p //eslint-disable-line no-param-reassign
				})

				window.analytics.track('Product List Viewed', {
					list_id: listId,
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
			product.position = parseInt(window.localStorage.getItem('position')) || 1;
			window.analytics.track('Product Viewed', product)

			// if PDP, we can also track clicks on images and social shares
			trackProductImageClicks((name) => {
				product.image_url = name
				window.analytics.track('Product Image Clicked', product)
			})

			trackSocialShares(network => {
				window.analytics.track('Product Shared', {
					...product,
					share_via: network,
				})
			})
		}
	}
}

export const initSegment = () => {
	window.analytics = window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";//eslint-disable-line
		window.analytics.load(LittledataLayer.writeKey);
	}
	window.dataLayer = window.dataLayer || [];
}
