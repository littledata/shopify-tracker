/* eslint-env browser */
import { initGtag, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';

(function() {
    validateLittledataLayer();
    initGtag();
    advertiseLD();
    pageView(function() {
        sendPageview();
        trackEvents();
    });
})();
