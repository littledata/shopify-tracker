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
