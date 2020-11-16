/* eslint-env browser */
/* global LittledataLayer */
declare let window: CustomWindow;

import {
	advertiseLD,
	pageView,
	retrieveAndStoreClientId,
	setClientID,
	validateLittledataLayer,
} from '../common/helpers';
import { callSegmentPage, identifyCustomer, initSegment, trackEvents } from './helpers';

(function() {
	validateLittledataLayer();
	initSegment();
	advertiseLD('Segment');
	identifyCustomer(LittledataLayer.customer);
	trackEvents();
	pageView(function() {
		callSegmentPage({});
		window.analytics.ready(() => {
			// @ts-ignore 'Integrations' property does, in fact exist
			if (window.analytics.Integrations['Google Analytics']) {
				retrieveAndStoreClientId();
			}
			const { user } = window.analytics;
			if (user) {
				setClientID(user().anonymousId(), 'segment');
				const { email } = user().traits();
				if (email) {
					setClientID(email, 'email');
				}
			}
		});
	});
})();
