/* eslint-env browser */
import { getQueryStringParam } from '../common/getQueryStringParam';
import { getWebPropertyIdPromise, sendCartId, initGtag, loadGtagScript, getPageType } from './helpers';
import { sendCheckoutEvents } from './sendCheckoutEvents';
import { sendThankYouEvents } from './sendThankYouEvents';
import { sendUpsellEvents } from './sendUpsellEvents';

declare let window: CartHookWindow;

(function() {
	const webPropertyPromise = getWebPropertyIdPromise();

	webPropertyPromise.then(webPropertyID => {
		loadGtagScript(webPropertyID);
		initGtag(webPropertyID);
		sendCartId();
	});
	// @ts-ignore
	const uniqueIdentifierForOrders = getQueryStringParam(document.currentScript.src, 'uniqueIdentifierForOrders');
	const orderId = uniqueIdentifierForOrders === 'orderName' ? 'order_name' : 'order_number';

	window.CH.event(function(EVENT: string, data: LooseObject) {
		if (EVENT == 'INITIATED_PAGE') {
			const pageType = getPageType();
			if (pageType === 'checkout') sendCheckoutEvents(data);
			if (pageType === 'upsell') sendUpsellEvents();
			if (pageType === 'thankyou') sendThankYouEvents(orderId);
		}
	});
})();
