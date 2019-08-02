/* eslint-env browser */

import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers'
import { identifyCustomer, trackEvents, initSegment } from './helpers'


(function () {
	validateLittledataLayer()
	initSegment()
	advertiseLD()
	identifyCustomer()
	pageView(function () {
		window.analytics.page();
		trackEvents()
	})
}())
