import { getElementsByHref } from './helpers';
import { getQueryStringParam } from './getQueryStringParam';
import { convertShopifyProductToVariant } from './convertShopifyProductToVariant';
import { request } from './request';

type impressionCallback = (impressionTag: Impression[]) => void;

export default (impressionTag: impressionCallback) => {
	let waitForScroll = 0;
	LittledataLayer.ecommerce.impressionsToSend = LittledataLayer.ecommerce.impressionsToSend || [];
	LittledataLayer.ecommerce.impressions = LittledataLayer.ecommerce.impressions || [];
	let { impressionsToSend, impressions } = LittledataLayer.ecommerce;

	function trackImpressions() {
		const viewportTop = document.documentElement.scrollTop;
		const viewportHeight = window.innerHeight;
		const viewportBottom = viewportTop + viewportHeight;
		const products = getElementsByHref('/products/');
		products.forEach(element => {
			if (!element) return;
			const { handle, shopify_variant_id } = getHandleAndVariant(element.href);
			if (productAlreadyViewed(handle)) return;
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
					//prevent product from triggering again
					impressionsToSend.push({ handle, shopify_variant_id });
				}
			}
		});

		if (impressionsToSend.length > 0) {
			const impressionsSent = [...impressionsToSend];
			//TO DO - if we fetched them previously, just send them now
			impressionsToSend = [];
			getVariantsFromShopify(impressionsSent).then(newVariants => {
				impressions = [...newVariants, ...impressions];
				//now send impressions to GA and dataLayer
				//maximum batch size is 20
				chunk(impressions, 20).forEach((batch: Impression[]) => impressionTag(batch));
			});
		}
	}

	window.setTimeout(function() {
		clearTimeout(waitForScroll);
		trackImpressions();
	}, 500); /* wait for user to see the products above the fold */

	document.addEventListener('scroll', () => {
		//assumes that people need 300ms after scrolling to register an impression
		clearTimeout(waitForScroll);
		waitForScroll = window.setTimeout(function() {
			trackImpressions();
		}, 300);
	});
};

const chunk = (arr: Impression[], size: number) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

export const getHandleAndVariant = (link: string) => {
	let handle, shopify_variant_id;
	const linkSplit = link.split('/products/');
	const productLinkWithParams = linkSplit && linkSplit[1];
	const productLinkWithParamsArray = productLinkWithParams.split('?');
	if (!productLinkWithParamsArray) return { handle, shopify_variant_id };
	shopify_variant_id = getQueryStringParam(productLinkWithParamsArray[1], 'variant');
	handle = productLinkWithParamsArray[0];
	return { handle, shopify_variant_id };
};

export const getVariantsFromShopify = async (impressions: ImpressionToSend[]) => {
	//TO DO - only fetch one product for multiple variants
	const promises = impressions.map(impression =>
		request(`/products/${impression.handle}.json`).then(async (response: any) => await response.json()),
	);
	const responses = await Promise.all(promises);
	return impressions.map((impression, index) =>
		convertShopifyProductToVariant(responses[index].product, impression.shopify_variant_id),
	);
};

export const productAlreadyViewed = (handle: string) =>
	LittledataLayer.ecommerce.impressions.find(product => product.handle == handle);
