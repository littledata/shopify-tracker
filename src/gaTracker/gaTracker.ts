/* eslint-env browser */
declare let window: CustomWindow;
import { initGtag, trackEvents, sendPageview } from './helpers';
import { pageView, validateLittledataLayer, advertiseLD } from '../common/helpers';

(function() {
	window.LittledataScriptVersion = '8.3';
	validateLittledataLayer();
	initGtag();
	advertiseLD();
	pageView(function() {
		sendPageview();
		trackEvents();
	});
})();
