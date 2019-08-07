/* eslint-env browser */
/* global LittledataLayer */
declare let window: CustomWindow;
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';
import { identifyCustomer, trackEvents, initSegment } from './helpers';

(function() {
    validateLittledataLayer();
    initSegment();
    advertiseLD();
    identifyCustomer();
    pageView(function() {
        window.analytics.page();
        trackEvents();
    });
})();
