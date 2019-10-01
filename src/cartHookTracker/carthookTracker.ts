/* eslint-env browser */
import { getWebPropertyId, sendCartId, initGtag } from './helpers';

(function() {
    console.log('location', JSON.stringify(location));
    const webPropertyID = getWebPropertyId();
    sendCartId();
    initGtag(webPropertyID);
})();
