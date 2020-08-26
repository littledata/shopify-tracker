(function () {
	const scriptSrc = document.currentScript.src;
	const startIndex = scriptSrc.indexOf('webPropertId=');
	const webPropertId = scriptSrc.subscting(startIndex + 14);

	const script = document.createElement('script');
	script.async = true;
	const src = 'https://www.googletagmanager.com/gtag/js?id=' + webPropertId;
	script.src = src;

	document.getElementsByTagName('head')[0].appendChild(script);

	window.dataLayer = window.dataLayer || [];
	const stubFunction = function () {
		dataLayer.push(arguments);
	}; //eslint-disable-line
	// @ts-ignore
	window.gtag = window.gtag || stubFunction;
	// @ts-ignore
	gtag('js', new Date());
	// @ts-ignore
	gtag('config', webPropertId);
	// @ts-ignore
	const transaction_total = window.Shopify.checkout.total_price;
	// @ts-ignore
	gtag('event', 'Checkout', {
		event_category: 'Shopify (Littledata)',
		event_label: 'Thank you',
		value: transaction_total,
	});
})();
