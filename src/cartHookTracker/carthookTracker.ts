/* eslint-env browser */
import { getWebPropertyId, sendCartId, initGtag } from './helpers';

(function() {
    const webPropertyID = getWebPropertyId();
    sendCartId();
    initGtag(webPropertyID);
})();
