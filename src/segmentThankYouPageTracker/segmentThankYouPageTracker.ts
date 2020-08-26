(function () {
	const scriptSrc = document.currentScript.src;
	const startIndexGa = scriptSrc.indexOf('webPropertId=');
	const endIndexGa = scriptSrc.indexOf('&', startIndexGa);
	const webPropertId = scriptSrc.substring(startIndexGa + 14, endIndexGa);
	const startIndexSegment = scriptSrc.indexOf('segmentProperty=', endIndexGa);
	const segmentProperty = scriptSrc.substring(startIndexSegment);

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

	const analytics = (window.analytics = window.analytics || []);
	if (!analytics.initialize)
		if (analytics.invoked) window.console && console.error && console.error('Segment snippet included twice.');
		else {
			analytics.invoked = !0;
			analytics.methods = [
				'trackSubmit',
				'trackClick',
				'trackLink',
				'trackForm',
				'pageview',
				'identify',
				'reset',
				'group',
				'track',
				'ready',
				'alias',
				'debug',
				'page',
				'once',
				'off',
				'on',
				'addSourceMiddleware',
				'addIntegrationMiddleware',
				'setAnonymousId',
				'addDestinationMiddleware',
			];
			analytics.factory = function (e) {
				return function () {
					var t = Array.prototype.slice.call(arguments);
					t.unshift(e);
					analytics.push(t);
					return analytics;
				};
			};
			for (var e = 0; e < analytics.methods.length; e++) {
				var key = analytics.methods[e];
				analytics[key] = analytics.factory(key);
			}
			analytics.load = function (key, e) {
				var t = document.createElement('script');
				t.type = 'text/javascript';
				t.async = !0;
				t.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
				var n = document.getElementsByTagName('script')[0];
				n.parentNode.insertBefore(t, n);
				analytics._loadOptions = e;
			};
			analytics.SNIPPET_VERSION = '4.13.1';
			analytics.load(segmentProperty);
			analytics.page();
		}

	const checkout = window.Shopify.checkout;
	const products = [];

	let gaClientId;
	if (document.cookie.length > 0) {
		var cookieStart = document.cookie.indexOf('_ga=');
		if (cookieStart !== -1) {
			cookieStart = cookieStart + 4;
			let cookieEnd = document.cookie.indexOf(';', cookieStart);
			if (cookieEnd === -1) {
				cookieEnd = document.cookie.length;
			}
			const gaCookie = unescape(document.cookie.substring(cookieStart, cookieEnd));

			if (gaCookie) {
				const match = gaCookie.match(/(\d{2,11})\.(\d{2,11})/g);
				gaClientId = match ? match[0] : '';
			}
		}
	}

	analytics.track('Thank you', {
		properties: {
			category: 'Shopify (Littledata)',
			coupon: checkout.coupon,
			currency: checkout.currency,
			discount: checkout.discount,
			email: checkout.email,
			order_id: checkout.order_id,
			presentment_currency: checkout.presentment_currency,
			presentment_total: checkout.total_price_set.presentment_money.amount,
			products: products,
			sent_from: 'Littledata app',
			shipping: checkout.shipping_rate && checkout.shipping_rate.price,
			tax: checkout.total_tax,
			total: checkout.total_price,
		},
		integrations: {
			'Google Analytics': {
				clientId: gaClientId,
			},
		},
	});
})();
