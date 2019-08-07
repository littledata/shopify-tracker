/* eslint-env browser */
/* global LittledataLayer */
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
