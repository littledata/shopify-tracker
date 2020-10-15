import { event_category } from './constants';
import { convertToGtagProducts } from './helpers';

const action = 'Checkout';

export const sendCheckoutEvents = (data: LooseObject) => {
	const cartData = data.cart_data;
	const { currency, coupon } = cartData;
	const items = convertToGtagProducts(cartData.line_items);

	const params = {
		event_category,
		currency,
		items,
		coupon,
	};

	// GA event for Contact info step, triggered at the page load
	gtag('event', action, {
		...params,
		event_label: 'Contact information',
		checkout_step: 1,
	});
	var contactInfoField = document.getElementById('customer_email');
	var shippingInfoField = document.getElementById('shipping_zip');

	// GA event for Shipping info step, triggered on leaving email field
	// we are intentionally removing the event listener to avoid event repetitions
	contactInfoField.addEventListener('blur', listenForContactChange);
	function listenForContactChange() {
		gtag('event', action, {
			...params,
			event_label: 'Shipping information',
			checkout_step: 2,
		});
		contactInfoField.removeEventListener('blur', listenForContactChange);
	}

	// GA event for Payment info step, triggered on leaving ZIP/postal field
	shippingInfoField.addEventListener('blur', listenForShippingChange);
	function listenForShippingChange() {
		gtag('event', action, {
			...params,
			event_label: 'Payment method',
			checkout_step: 3,
		});
		shippingInfoField.removeEventListener('blur', listenForShippingChange);
	}
};
