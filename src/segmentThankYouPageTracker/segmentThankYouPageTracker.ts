import { getProperties } from './helpers';
import { initSegment } from '../segmentTracker/helpers';

(function () {
	if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
		const scriptSrc = document.currentScript.src;
		const { webPropertyId, segmentProperty } = getProperties(scriptSrc);

		const script = document.createElement('script');
		script.async = true;
		const src = 'https://www.googletagmanager.com/gtag/js?id=' + webPropertyId;
		script.src = src;

		document.getElementsByTagName('head')[0].appendChild(script);

		initSegment();
		// @ts-ignore
		const checkout = window.Shopify.checkout;
		const products = checkout.line_items.map((product) => {
			return {
				brand: product.brand,
				category: product.category,
				url: product.handle,
				product_id: product.id,
				sku: product.id,
				position: product.list_position,
				name: product.name,
				price: parseFloat(product.price),
				variant: product.variant,
			};
		});

		// @ts-ignore
		analytics.track('Thank you', {
			properties: {
				coupon: checkout.coupon,
				currency: checkout.currency,
				discount: checkout.discount,
				email: checkout.email,
				order_id: checkout.order_id,
				presentment_currency: checkout.presentment_currency,
				presentment_total:
					checkout.total_price_set &&
					checkout.total_price_set.presentment_money &&
					checkout.total_price_set.presentment_money.amount,
				products: products,
				sent_from: 'Littledata app',
				shipping: checkout.shipping_rate && checkout.shipping_rate.price,
				tax: checkout.total_tax,
				total: checkout.total_price,
			},
		});
	}
})();
