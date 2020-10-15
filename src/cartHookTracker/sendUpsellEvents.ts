import { event_category } from './constants';
import { convertToGtagProducts, sumProductTax, sumProductSubtotal } from './helpers';

declare let window: CartHookWindow;

export const sendUpsellEvents = () => {
	var acceptButton = document.querySelector('.ch-accept-button'); // HTML selector for Accept button
	var rejectButton = document.querySelector('.ch-decline-button'); // HTML selector for Decline button
	const { order } = window.chData;

	var orderId = order.carthook_order_id;
	var upsellProduct = window.chData.cart_data.line_items[0];
	var lastChargedPage = window.chData.last_charged_page_type;
	const value = order.total_price;

	// Tracking transaction from the Checkout page, before upsell/downsell
	const lineItems = order.last_charged_line_items;
	const items = convertToGtagProducts(lineItems);
	const tax = sumProductTax(lineItems);
	const subtotal = sumProductSubtotal(lineItems);

	var shippingRates = window.chData.order.last_charged_shipping_rates;
	var shipping = 0;
	for (var i = 0; i < shippingRates.length; i++) {
		shipping += parseFloat(shippingRates[i].price);
	}
	if (items.length > 0) {
		window.dataLayer.push({
			event: 'transactionBeforeUpsell',
			orderId,
			value,
			items,
			tax,
			subtotal,
			shipping,
			lastChargedPage,
		});
	}

	const event_label = upsellProduct.title;
	const params = { event_category, event_label };
	// GA event for Upsell step, triggered at the page load
	gtag('event', 'View upsell offer', params);
	// GA event for Upsell Accepted step, triggered at the click of Accept button
	acceptButton.addEventListener('click', function() {
		gtag('event', 'Accept offer', params);
	});
	// GA event for Upsell Rejected step, triggered at the click of Decline button
	rejectButton.addEventListener('click', function() {
		gtag('event', 'Reject offer', params);
	});
};
