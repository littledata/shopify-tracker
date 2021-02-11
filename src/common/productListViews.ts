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
			const impressionsSent = [] as ImpressionToSend[];
			//if we fetched them previously, just send them now
			const variantsPreviouslyFetched = impressionsToSend
				.map(impression => {
					const previouslyFetched = impressions.find(
						variant =>
							variant.handle === impression.handle &&
							variant.shopify_variant_id === impression.shopify_variant_id,
					);
					if (!previouslyFetched) {
						impressionsSent.push(impression);
					}
					return previouslyFetched;
				})
				.filter((variant: Impression) => variant);
			//maximum batch size is 20
			chunk(variantsPreviouslyFetched, 20).forEach((batch: Impression[]) => impressionTag(batch));

			impressionsToSend = [];
			getVariantsFromShopify(impressionsSent, impressionTag);
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

export const getVariantsFromShopify = (impressions: ImpressionToSend[], impressionTag: any) => {
	const handleGroups = groupBy(impressions, 'handle');
	Object.keys(handleGroups).forEach(handle =>
		request(`/products/${handle}.json`)
			.then((response: any) => response.json())
			.then((json: any) => {
				const variantsToSend = handleGroups[handle].map((impression: ImpressionToSend) =>
					convertShopifyProductToVariant(json.product, impression.shopify_variant_id),
				);
				impressionTag(variantsToSend);
				const { impressions } = LittledataLayer.ecommerce;
				json.product.variants.forEach((variant: LooseObject) => {
					const shopify_variant_id = String(variant.id);
					if (!impressions.find(impression => impression.shopify_variant_id === shopify_variant_id)) {
						impressions.push(convertShopifyProductToVariant(json.product, shopify_variant_id));
					}
				});
			}),
	);
};

export const productAlreadyViewed = (handle: string) =>
	LittledataLayer.ecommerce.impressions.find(product => product.handle == handle);

const groupBy = (givenArray: any[], key: string) => {
	return givenArray.reduce(function(rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
