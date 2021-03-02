/* eslint-env browser */
import { CustomWindow } from '../..';
declare let window: CustomWindow;

import {
	advertiseLD,
	documentReady,
	pageView,
	retrieveAndStoreClientId,
	validateLittledataLayer,
} from '../common/helpers';
import { setClientID } from '../common/setClientID';
import { callSegmentPage, identifyCustomer, initSegment, trackEvents } from './helpers';
import { sendEventsWithPageview } from './helpers/sendEventsWithPageview';

(function() {
	validateLittledataLayer();
	initSegment();
	advertiseLD('Segment');
	identifyCustomer();
	documentReady(trackEvents);
	pageView(function() {
		callSegmentPage({});
		sendEventsWithPageview(document.location.pathname);
		window.analytics.ready(() => {
			retrieveAndStoreClientId();
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
