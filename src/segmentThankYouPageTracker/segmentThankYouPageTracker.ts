import { OwnLayer } from '../..';
import { getQueryStringParam } from '../common/getQueryStringParam';
import { initSegment } from '../segmentTracker/helpers';

interface ShopifyWindow {
	LittledataLayer: OwnLayer;
	Shopify: LooseObject;
}
declare let window: ShopifyWindow;

(function() {
	window.LittledataLayer = {
		ecommerce: {},
	};
	if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
		// @ts-ignore
		const scriptSrc = document.currentScript.src;
		const writeKey = getQueryStringParam(scriptSrc, 'segmentProperty');
		window.LittledataLayer.writeKey = writeKey;

		initSegment();
		const checkout = window.Shopify.checkout;
		const products = checkout.line_items.map((product: LooseObject) => {
			return {
				brand: product.vendor,
				category: product.category,
				url: product.handle,
				product_id: String(product.sku),
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
			sent_from: 'Littledata script',
			shipping: checkout.shipping_rate && checkout.shipping_rate.price,
			tax: checkout.total_tax,
			total: checkout.total_price,
		});
	}
})();
