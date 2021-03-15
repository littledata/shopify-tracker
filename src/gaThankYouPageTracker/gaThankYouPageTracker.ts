import { CustomWindow } from '../..';
import getConfig from '../common/getConfig';
import { getQueryStringParam } from '../common/getQueryStringParam';
import { httpRequest } from '../common/httpRequest';
import { getGAClientId } from '../common/helpers';
import {
	STAGING,
	PRODUCTION_TRANSACTION_WATCHER,
	STAGING_TRANSACTION_WATCHER,
	CLIENT_ID_CUSTOMER_ID_ROUTE,
} from '../common/constants';

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

		const env = getQueryStringParam(scriptSrc, 'env');

		const transactionWatcherURLRoot =
			env === STAGING ? STAGING_TRANSACTION_WATCHER : PRODUCTION_TRANSACTION_WATCHER;
		const clientIDEndpoint = `${transactionWatcherURLRoot}${CLIENT_ID_CUSTOMER_ID_ROUTE}`;
		const trackers = window.ga && window.ga.getAll && window.ga.getAll();
		if (!trackers || !trackers.length) {
			return;
		}
		httpRequest.postJSON(clientIDEndpoint, {
			clientID: getGAClientId(trackers[0]),
			userID: window.Shopify.checkout.customer_id,
			segment: false,
		});
	}
})();
