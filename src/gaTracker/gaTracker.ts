/* eslint-env browser */
declare let window: CustomWindow;
import { initGtag, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD, documentReady } from '../common/helpers';

(function() {
	validateLittledataLayer();
	initGtag();
	advertiseLD('Google Analytics');
	documentReady(trackEvents);
	pageView(function() {
		sendPageview();
	});
})();
