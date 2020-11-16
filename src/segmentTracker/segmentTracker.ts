/* eslint-env browser */
/* global LittledataLayer */
declare let window: CustomWindow;
import { pageView, validateLittledataLayer, advertiseLD, setClientID, documentReady } from '../common/helpers';
import { identifyCustomer, trackEvents, initSegment, callSegmentPage } from './helpers';

(function() {
	validateLittledataLayer();
	initSegment();
	advertiseLD('Segment');
	identifyCustomer(LittledataLayer.customer);
	documentReady(trackEvents);
	pageView(function() {
		callSegmentPage({});
		window.analytics.ready(() => {
			// @ts-ignore 'Integrations' property does, in fact exist
			if (window.analytics.Integrations['Google Analytics']) {
				window.ga(() => {
					const tracker = window.ga.getAll()[0];
					if (tracker) {
						const getClientID = () => tracker.get('clientId');
						setClientID(getClientID, 'google');
					}
				});
			}
			const { user } = window.analytics;
			if (user) {
				setClientID(user().anonymousId, 'segment');
				const { email } = user().traits();
				if (email) {
					const returnEmail = () => email;
					setClientID(returnEmail, 'email');
				}
			}
		});
	});
})();
