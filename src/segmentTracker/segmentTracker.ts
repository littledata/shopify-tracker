/* eslint-env browser */
/* global LittledataLayer */
declare let window: CustomWindow;
import { pageView, validateLittledataLayer, advertiseLD, setClientID, initTracker } from '../common/helpers';
import { identifyCustomer, trackEvents, loadSegment, callSegmentPage } from './helpers';

(function() {
	window.LittledataScriptVersion = '8.21';
	validateLittledataLayer();
	initTracker(loadSegment);
	advertiseLD();
	identifyCustomer(LittledataLayer.customer);
	pageView(function() {
		callSegmentPage({});
		window.analytics.ready(() => {
			// @ts-ignore 'Integrations' property does, in fact exist
			if (window.analytics.Integrations['Google Analytics']) {
				window.ga(() => {
					const tracker = window.ga.getAll()[0];
					if (tracker) {
						const clientId = tracker.get('clientId');
						const generatedClientID =
							LittledataLayer.customer && LittledataLayer.customer.generatedClientID;
						const getClientID = () => (generatedClientID ? generatedClientID : clientId);
						setClientID(getClientID, 'google');
					}
				});
			}
			setClientID(window.analytics.user().anonymousId, 'segment');
			trackEvents();
		});
	});
})();
