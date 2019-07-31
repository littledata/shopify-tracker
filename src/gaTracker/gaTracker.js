/* eslint-env browser */
/* global LittledataLayer */

import { initGtag, getConfig, trackEvents } from './helpers'
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers'

(function () {
	initGtag()
	validateLittledataLayer()
	advertiseLD()
	pageView(function () {
		const config = getConfig()
		gtag('config', LittledataLayer.webPropertyID, config);
		const googleAds = LittledataLayer.googleAdsConversionIds
		if (typeof googleAds === 'object' && googleAds.length > 0) {
			googleAds.forEach(adId => gtag('config', adId))
		}
		trackEvents()
	})
}())
