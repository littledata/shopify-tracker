/* eslint-env browser */
import { initGtag, sendUserId, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';

(function() {
    validateLittledataLayer();
    initGtag();
    advertiseLD();
    sendUserId()
    pageView(function() {
        sendPageview();
        trackEvents();
    });
})();
