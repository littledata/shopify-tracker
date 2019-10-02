/* eslint-env browser */
import { getWebPropertyId, sendCartId, initGtag, loadGtagScript } from './helpers';

(async function() {
    console.log('location', JSON.stringify(location));
    const webPropertyID = await getWebPropertyId();
    console.log('webPropertyID', webPropertyID);
    loadGtagScript(webPropertyID);
    sendCartId();
    initGtag(webPropertyID);
})();
