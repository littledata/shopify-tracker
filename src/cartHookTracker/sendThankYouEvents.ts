import { convertToGtagProducts, sumProductTax, sumShipping, sumProductSubtotal } from './helpers';

declare let window: CartHookWindow;

export const sendThankYouEvents = () => {
	const { order } = window.chData;
	const stepCharged = window.chData.last_charged_page_type;
	const lastChargedLineItems = order.last_charged_line_items;
	const lineItems = order.line_items;

	if (lastChargedLineItems.length > 0) {
		const transactionStepProducts = convertToGtagProducts(lastChargedLineItems);
		const transactionStepTax = sumProductTax(lastChargedLineItems);
		const transactionStepSubTotal = sumProductSubtotal(lastChargedLineItems);
		const transactionStepShipping = sumShipping(order.last_charged_shipping_rates);
		const transactionStepTotal = transactionStepTax + transactionStepSubTotal + transactionStepShipping;

		window.dataLayer.push({
			event: 'transactionStepComplete',
			chTransactionId: order.carthook_order_id,
			transactionStepSubTotal,
			transactionStepTotal,
			transactionStepTax,
			transactionStepShipping,
			transactionStepProducts,
			stepCharged,
		});
	}

	if (lineItems.length > 0) {
		window.dataLayer.push({
			event: 'transactionComplete',
			transactionId: order.order_number,
			transactionSubTotal: sumProductSubtotal(lineItems),
			transactionTotal: order.total_price,
			transactionTax: sumProductTax(lineItems),
			transactionShipping: sumShipping(order.selected_shipping_rates),
			transactionProducts: convertToGtagProducts(lineItems),
		});
	}
};
