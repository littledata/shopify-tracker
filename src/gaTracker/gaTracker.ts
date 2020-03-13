/* eslint-env browser */
declare let window: CustomWindow;
import { loadGtag, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD, initTracker } from '../common/helpers';

(function() {
	window.LittledataScriptVersion = '8.3';
	validateLittledataLayer();
	initTracker(loadGtag);
	advertiseLD();
	pageView(function() {
		sendPageview();
		trackEvents();
	});
})();
