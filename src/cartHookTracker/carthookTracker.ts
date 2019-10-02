/* eslint-env browser */
import { getWebPropertyId, sendCartId, initGtag, loadGtagScript } from './helpers';

(function() {
    console.log('location', JSON.stringify(location));
    const webPropertyID = getWebPropertyId();
    console.log('webPropertyID', webPropertyID);
    loadGtagScript(webPropertyID);
    sendCartId();
    initGtag(webPropertyID);
})();
