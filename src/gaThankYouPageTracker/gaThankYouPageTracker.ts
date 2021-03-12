import { CustomWindow } from '../..';
import getConfig from '../common/getConfig';
import { getQueryStringParam } from '../common/getQueryStringParam';
import { httpRequest } from '../common/httpRequest'
import { getGAClientId } from '../common/helpers'

declare let window: CustomWindow;
(function() {
	// @ts-ignore
	if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
		// @ts-ignore
		const scriptSrc = document.currentScript.src;
		const webPropertyId = getQueryStringParam(scriptSrc, 'webPropertyId');
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
			send_to: webPropertyId,
		});

		const shopId = getQueryStringParam(scriptSrc, 'shopId');
		const env = getQueryStringParam(scriptSrc, 'env')
		if (!shopId) return;

		const transactionWatcherURLRoot = env === 'production' ? 'https://transactions.littledata.io' : 'https://transactions-staging.littledata.io'
		const clientIDEndpoint = `${transactionWatcherURLRoot}/v3/clientID/store/${shopId}`
		const trackers = window.ga && window.ga.getAll && window.ga.getAll();
		if (!trackers || !trackers.length) {
			return
		}
		httpRequest.postJSON(clientIDEndpoint, {
			clientID: getGAClientId(trackers[0]),
			userID: window.Shopify.checkout.customer_id,
			segment: false,
		})
	}
})();
