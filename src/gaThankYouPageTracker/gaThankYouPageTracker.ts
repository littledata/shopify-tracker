import { getProperties } from '../segmentThankYouPageTracker/helpers';

(function() {
	// @ts-ignore
	if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
		// @ts-ignore
		const scriptSrc = document.currentScript.src;
		const { webPropertyId } = getProperties(scriptSrc);

		const script = document.createElement('script');
		script.async = true;
		const src = 'https://www.googletagmanager.com/gtag/js?id=' + webPropertyId;
		script.src = src;

		document.getElementsByTagName('head')[0].appendChild(script);

		window.dataLayer = window.dataLayer || [];
		const stubFunction = function() {
			dataLayer.push(arguments);
		}; //eslint-disable-line
		// @ts-ignore
		window.gtag = window.gtag || stubFunction;
		// @ts-ignore
		gtag('js', new Date());
		// @ts-ignore
		gtag('config', webPropertyId);
		// @ts-ignore
		const transaction_total = parseInt(window.Shopify.checkout.total_price);
		// @ts-ignore
		gtag('event', 'Checkout', {
			event_category: 'Shopify (Littledata)',
			event_label: 'Thank you page',
			value: transaction_total,
		});
	}
})();
