/* eslint-env browser */
import { getWebPropertyIdPromise, sendCartId, initGtag, loadGtagScript } from './helpers';

(function() {
    const webPropertyPromise = getWebPropertyIdPromise();

    webPropertyPromise.then(async webPropertyID => {
        console.log('webPropertyID', webPropertyID);
        loadGtagScript(webPropertyID);
        initGtag(webPropertyID);
        await sendCartId();
    });
})();
