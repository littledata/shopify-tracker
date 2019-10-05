type impressionCallback = (impressionTag: Impression[]) => void;
import { getElementsByHref, findDataLayerProduct } from './helpers';

export default (impressionTag: impressionCallback) => {
	let waitForScroll = 0;
	const products = getElementsByHref('/products/');
	if (products.length === 0) {
		return;
	}

	function trackImpressions() {
		const viewportTop = document.documentElement.scrollTop;
		const viewportHeight = window.innerHeight;
		const viewportBottom = viewportTop + viewportHeight;
		const impressions: Impression[] = [];
		products.forEach((element, index) => {
			if (!element) return;
			const elementTop = window.pageYOffset + element.getBoundingClientRect().top;
			const elementHeight = element.offsetHeight;
			const elementBottom = elementTop + elementHeight;
			if (elementBottom >= viewportTop && elementTop < viewportBottom) {
				let pixelsVisible = elementHeight;
				if (elementTop - viewportTop < 0) {
					pixelsVisible += elementTop - viewportTop;
				} else if (viewportBottom - elementBottom < 0) {
					pixelsVisible += viewportBottom - elementBottom;
				}
				const percentVisible = pixelsVisible / elementHeight;
				if (percentVisible > 0.8) {
					//remove product from collection
					products[index] = null;

					//find this product in the datalayer
					const product = findDataLayerProduct(element.href);
					if (product) impressions.push(product);
				}
			}
		});

		if (impressions.length > 0) {
			//now send impressions to GA and dataLayer
			impressionTag(impressions);
		}
	}

	window.setTimeout(function() {
		clearTimeout(waitForScroll);
		trackImpressions();
	}, 500); /* wait for pageview to fire first */

	document.addEventListener('scroll', () => {
		//assumes that people need 300ms after scrolling to register an impression
		clearTimeout(waitForScroll);
		waitForScroll = window.setTimeout(function() {
			trackImpressions();
		}, 300);
	});
};
