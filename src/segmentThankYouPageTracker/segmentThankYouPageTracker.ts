import { getQueryStringParam } from '../common/getQueryStringParam';
import { initSegment } from '../segmentTracker/helpers';

(function() {
	// @ts-ignore
	if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
		// @ts-ignore
		const scriptSrc = document.currentScript.src;
		const segmentProperty = getQueryStringParam(scriptSrc, 'segmentProperty');

		if (!segmentProperty) {
			throw new Error('Could not add segment thank you page script beacuse of missing segmentProperty');
		}

		initSegment();
		// @ts-ignore
		const checkout = window.Shopify.checkout;
		// @ts-ignore
		const products = checkout.line_items.map(product => {
			return {
				brand: product.vendor,
				category: product.category,
				url: product.handle,
				product_id: String(product.sku),
				position: product.list_position,
				name: product.title,
				price: parseFloat(product.price),
				variant: product.variant_title,
				quantity: product.quantity,
			};
		});

		// @ts-ignore
		const orderNumberHTML = document.getElementsByClassName('os-order-number')[0].innerHTML;
		if (!orderNumberHTML) {
			throw new Error('Could not add segment thank you page script beacuse of missing order number in HTML');
		}
		const indexOfNumber = orderNumberHTML.indexOf('#');
		const orderNumber = orderNumberHTML.substring(indexOfNumber).trim();

		// @ts-ignore
		analytics.track('Thankyou Page Viewed', {
			coupon: checkout.coupon,
			currency: checkout.currency,
			discount: checkout.discount,
			email: checkout.email,
			order_id: orderNumber,
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
		});
	}
})();
