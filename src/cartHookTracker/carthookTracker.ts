/* eslint-env browser */
import { getWebPropertyIdPromise, sendCartId, initGtag, loadGtagScript, getPageType } from './helpers';
import { sendCheckoutEvents } from './sendCheckoutEvents';
import { sendUpsellEvents } from './sendUpsellEvents';

declare let window: CartHookWindow;

(function() {
	const webPropertyPromise = getWebPropertyIdPromise();

	webPropertyPromise.then(webPropertyID => {
		loadGtagScript(webPropertyID);
		initGtag(webPropertyID);
		sendCartId();
	});

	window.CH.event(function(EVENT: string, data: LooseObject) {
		if (EVENT == 'INITIATED_PAGE') {
			const pageType = getPageType();
			if (pageType === 'checkout') sendCheckoutEvents(data);
			if (pageType === 'upsell') sendUpsellEvents();
		}
	});
})();
