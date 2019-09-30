/* eslint-env browser */
import { getWebPropertyId, insertGtag, sendCartId, initGtag } from './helpers';

(function() {
    const webPropertyID = getWebPropertyId();
    insertGtag(webPropertyID);
    sendCartId();
    initGtag(webPropertyID);
})();
