import MethodChain from './MethodChain';

/**
 * Class for the `urlChangeTracker` analytics.js plugin.
 * @implements {UrlChangeTrackerPublicInterface}
 */
export default class UrlChangeTracker {
	constructor(trackReplaceState) {
		// Feature detects to prevent errors in unsupporting browsers.
		if (!history.pushState || !window.addEventListener) return;

		//fallback if not given callback
		this.onUrlChange = () => {
			console.warn('UrlChangeTracker not given callback');
		};

		// Sets the initial page field.
		// Don't set this on the tracker yet so campaign data can be retreived
		// from the location field.
		this.path = getPath();

		//
		this.trackReplaceState = trackReplaceState;

		// Binds methods.
		this.pushStateOverride = this.pushStateOverride.bind(this);
		this.replaceStateOverride = this.replaceStateOverride.bind(this);
		this.handlePopState = this.handlePopState.bind(this);

		// Watches for history changes.
		MethodChain.add(history, 'pushState', this.pushStateOverride);
		MethodChain.add(history, 'replaceState', this.replaceStateOverride);
		window.addEventListener('popstate', this.handlePopState);
	}

	// function to call when URL changes
	setCallback(tag) {
		this.onUrlChange = tag;
	}

	/**
	 * Handles invocations of the native `history.pushState` and calls
	 * `handleUrlChange()` indicating that the history updated.
	 * @param {!Function} originalMethod A reference to the overridden method.
	 * @return {!Function}
	 */
	pushStateOverride(originalMethod) {
		return (...args) => {
			originalMethod(...args);
			this.handleUrlChange(true);
		};
	}

	/**
	 * Handles invocations of the native `history.replaceState` and calls
	 * `handleUrlChange()` indicating that history was replaced.
	 * @param {!Function} originalMethod A reference to the overridden method.
	 * @return {!Function}
	 */
	replaceStateOverride(originalMethod) {
		return (...args) => {
			originalMethod(...args);
			this.handleUrlChange(false);
		};
	}

	/**
	 * Handles responding to the popstate event and calls
	 * `handleUrlChange()` indicating that history was updated.
	 */
	handlePopState() {
		this.handleUrlChange(true);
	}

	/**
	 * Updates the page and title fields on the tracker and sends a pageview
	 * if a new history entry was created.
	 * @param {boolean} historyDidUpdate True if the history was changed via
	 *     `pushState()` or the `popstate` event. False if the history was just
	 *     modified via `replaceState()`.
	 */
	handleUrlChange(historyDidUpdate) {
		// Call the update logic asychronously to help ensure that app logic
		// responding to the URL change happens prior to this.
		setTimeout(() => {
			const oldPath = this.path;
			const newPath = getPath();

			if (oldPath != newPath && this.shouldTrackUrlChange(newPath, oldPath)) {
				this.path = newPath;
				if (historyDidUpdate || this.trackReplaceState) {
					this.onUrlChange();
				}
			}
		}, 0);
	}

	/**
	 * Determines whether or not the tracker should send a hit with the new page
	 * data.
	 * @param {string} newPath The path after the URL change.
	 * @param {string} oldPath The path prior to the URL change.
	 * @return {boolean} Whether or not the URL change should be tracked.
	 */
	shouldTrackUrlChange(newPath, oldPath) {
		return !!(newPath && oldPath);
	}

	/**
	 * Removes all event listeners and restores overridden methods.
	 */
	remove() {
		this.queue.destroy();
		MethodChain.remove(history, 'pushState', this.pushStateOverride);
		MethodChain.remove(history, 'replaceState', this.replaceStateOverride);
		window.removeEventListener('popstate', this.handlePopState);
	}
}

/**
 * @return {string} The path value of the current URL.
 */
function getPath() {
	return location.pathname + location.search;
}
