import { event_category } from './constants';
import { convertToGtagProducts, sumProductTax, sumProductSubtotal } from './helpers';

declare let window: CartHookWindow;

export const sendUpsellDownsellEvents = () => {
	let eventType = 'upsell';
	let transactionEventName = 'transactionBeforeUpsell';

	const pageType = window.CHDataObject.partial_type;
	if (pageType === 'downsell_page') {
		transactionEventName = 'transactionBeforeDownsell';
		eventType = 'downsell';
	}
	const viewEventName = `View ${eventType} offer`;
	const acceptButton = document.querySelector('.ch-accept-button'); // HTML selector for Accept button
	const rejectButton = document.querySelector('.ch-decline-button'); // HTML selector for Decline button
	const { order } = window.chData;

	const orderId = order.carthook_order_id;
	const upsellItems = convertToGtagProducts(window.chData.cart_data.line_items);
	const upsellProduct = upsellItems[0];

	const lastChargedPage = window.chData.last_charged_page_type;
	const value = order.total_price;

	// Tracking transaction from the Checkout page, before upsell/downsell
	const lineItems = order.last_charged_line_items;
	const items = convertToGtagProducts(lineItems);
	const tax = sumProductTax(lineItems);
	const subtotal = sumProductSubtotal(lineItems);

	const shippingRates = window.chData.order.last_charged_shipping_rates;
	let shipping = 0;
	for (let i = 0; i < shippingRates.length; i++) {
		shipping += parseFloat(shippingRates[i].price);
	}
	if (items.length > 0) {
		window.dataLayer.push({
			event: transactionEventName,
			orderId,
			value,
			items,
			tax,
			subtotal,
			shipping,
			lastChargedPage,
		});
	}

	const event_label = upsellProduct.id;
	const params = { event_category, event_label };
	// GA event for Upsell step, triggered at the page load
	gtag('event', viewEventName, params);
	// GA event for Upsell Accepted step, triggered at the click of Accept button
	acceptButton.addEventListener('click', function() {
		gtag('event', `Accepted ${eventType} offer`, params);
	});
	// GA event for Upsell Rejected step, triggered at the click of Decline button
	rejectButton.addEventListener('click', function() {
		gtag('event', `Rejected  ${eventType} offer`, params);
	});
};
