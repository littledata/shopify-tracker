/* eslint-env browser */
import { getWebPropertyId, sendCartId, initGtag, loadGtagScript } from './helpers';

(function() {
    const webPropertyPromise = getWebPropertyId();

    webPropertyPromise.then(webPropertyID => {
        console.log('webPropertyID', webPropertyID);
        loadGtagScript(webPropertyID);
        initGtag(webPropertyID);
        sendCartId();
    });
})();
