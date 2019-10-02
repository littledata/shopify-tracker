/* eslint-env browser */
import { getWebPropertyId, sendCartId, initGtag, loadGtagScript } from './helpers';

(function() {
    console.log('location', JSON.stringify(location));
    const webPropertyPromise = getWebPropertyId();

    webPropertyPromise.then(webPropertyID => {
        console.log('webPropertyID', webPropertyID);
        loadGtagScript(webPropertyID);
        sendCartId();
        initGtag(webPropertyID);
    });
})();
