/* eslint-env browser */
/* global LittledataLayer */
import { initGtag, getConfig, trackEvents } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';
(function () {
    initGtag();
    validateLittledataLayer();
    advertiseLD();
    pageView(function () {
        gtag('config', LittledataLayer.webPropertyID, getConfig());
        const googleAds = LittledataLayer.googleAdsConversionIds;
        if (typeof googleAds === 'object' && googleAds.length > 0) {
            googleAds.forEach(adId => gtag('config', adId));
        }
        trackEvents();
    });
}());
