/* eslint-env browser */
declare let window: CustomWindow;
import { initGtag, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';

(function() {
	validateLittledataLayer();
	initGtag();
	advertiseLD();
	trackEvents();
	pageView(function() {
		sendPageview();
	});
})();
