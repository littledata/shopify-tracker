/* eslint-env browser */
declare let window: CustomWindow;
import { initGtag, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';

(function() {
	validateLittledataLayer();
	initGtag();
	advertiseLD('Google Analytics');
	trackEvents();
	pageView(function() {
		sendPageview();
	});
})();
