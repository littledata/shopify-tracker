/* eslint-env browser */
/* global LittledataLayer */
declare let window: CustomWindow;
import { pageView, validateLittledataLayer, advertiseLD, setClientID } from '../common/helpers';
import { identifyCustomer, trackEvents, initSegment, callSegmentPage } from './helpers';

(function() {
	validateLittledataLayer();
	initSegment();
	advertiseLD();
	identifyCustomer(LittledataLayer.customer);
	pageView(function() {
		window.analytics.ready(() => {
			const defaultClientID = LittledataLayer.customer && LittledataLayer.customer.generatedClientID;
			const getDefaultClientID = () => defaultClientID;
			const getClientID = defaultClientID ? getDefaultClientID : window.analytics.user().anonymousId;
			// @ts-ignore 'Integrations' property does, in fact exist
			if (window.analytics.Integrations['Google Analytics']) {
				window.ga(() => {
					const tracker = window.ga.getAll()[0];
					if (tracker) {
						const clientId = tracker.get('clientId');
						window.analytics.user().anonymousId(clientId);
					}
					setClientID(getClientID, 'segment');
					callSegmentPage({
						//this only calls page() for GA
						All: false,
						'Google Analytics': true,
					});
				});
			}
			trackEvents();
		});
	});
})();
