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
        window.analytics.ready(() => {
            // @ts-ignore 'Integrations' property does, in fact exist
            if (window.analytics.Integrations['Google Analytics']) {
                window.ga(() => {
                    const tracker = window.ga.getAll()[0];
                    if (tracker) {
                        const clientId = tracker.get('clientId');
                        window.analytics.user().anonymousId(clientId);
                    }
                    window.analytics.page();
                });
            } else {
                window.analytics.page();
            }
            trackEvents();
        });
    });
})();
