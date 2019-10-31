/* eslint-env browser */
/* global LittledataLayer */
declare let window: CustomWindow;
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';
import { identifyCustomer, trackEvents, initSegment, callSegmentPage } from './helpers';

(function() {
	validateLittledataLayer();
	initSegment();
	advertiseLD();
	identifyCustomer(LittledataLayer.customer);
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
					callSegmentPage();
				});
			} else {
				callSegmentPage();
			}
			trackEvents();
		});
	});
})();
