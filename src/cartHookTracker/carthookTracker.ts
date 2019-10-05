/* eslint-env browser */
import { getWebPropertyIdPromise, sendCartId, initGtag, loadGtagScript } from './helpers';

(function() {
	const webPropertyPromise = getWebPropertyIdPromise();

	webPropertyPromise.then(webPropertyID => {
		loadGtagScript(webPropertyID);
		initGtag(webPropertyID);
		sendCartId();
	});
})();
