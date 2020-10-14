import { getProperties } from '../segmentThankYouPageTracker/helpers';
import { getConfig } from '../gaTracker/helpers';

declare let window: CustomWindow;
(function() {
	// @ts-ignore
	if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
		// @ts-ignore
		const scriptSrc = document.currentScript.src;
		const { webPropertyId } = getProperties(scriptSrc);

		if (!webPropertyId) {
			throw new Error('Could not add ga thank you page script beacuse of missing webPropertyId');
		}

		const script = document.createElement('script');
		script.async = true;
		const src = 'https://www.googletagmanager.com/gtag/js?id=' + webPropertyId;
		script.src = src;

		document.getElementsByTagName('head')[0].appendChild(script);

		window.dataLayer = window.dataLayer || [];
		const stubFunction = function() {
			dataLayer.push(arguments);
		}; //eslint-disable-line
		window.gtag = window.gtag || stubFunction;
		// @ts-ignore
		gtag('js', new Date());
		gtag('config', webPropertyId, getConfig());
		const total = window.Shopify.checkout && window.Shopify.checkout.total_price;
		const value = parseInt(total);

		gtag('event', 'Checkout', {
			event_category: 'Shopify (Littledata)',
			event_label: 'Thank you page',
			value,
		});
	}
})();
