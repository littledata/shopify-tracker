import { getElementsByHref, productUrlRegex } from './helpers';
import { convertShopifyProductToVariant } from './convertShopifyProductToVariant';
import { getHandleAndVariantFromProductLink } from './getHandleAndVariantFromProductLink';
import { requestJSON } from './request';

type impressionCallback = (impressionTag: Impression[]) => void;

export default (impressionTag: impressionCallback) => {
	let waitForScroll = 0;
	const allVariants = [] as Impression[];
	LittledataLayer.ecommerce.impressionsToSend = LittledataLayer.ecommerce.impressionsToSend || [];
	LittledataLayer.ecommerce.impressions = LittledataLayer.ecommerce.impressions || [];
	let { impressionsToSend } = LittledataLayer.ecommerce;

	function trackImpressions() {
		const viewportTop = document.documentElement.scrollTop;
		const viewportHeight = window.innerHeight;
		const viewportBottom = viewportTop + viewportHeight;
		//prouduct links are always on the same domain
		const products = getElementsByHref(productUrlRegex);
		products.forEach((element, index) => {
			if (!element) return;
			const { handle, shopify_variant_id } = getHandleAndVariantFromProductLink(element.href);
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
					impressionsToSend.push({ handle, shopify_variant_id, list_position: index + 1 });
				}
			}
		});

		if (impressionsToSend.length > 0) {
			const impressionsSent = [] as ImpressionToSend[];
			// if we fetched them previously, just send them now
			const variantsPreviouslyFetched = impressionsToSend
				.map(impression => {
					const previouslyFetched = allVariants.find(
						variant =>
							variant.handle === impression.handle &&
							variant.shopify_variant_id === impression.shopify_variant_id,
					);
					if (!previouslyFetched) {
						impressionsSent.push(impression);
					}
					return {
						...previouslyFetched,
						list_position: impression.list_position,
					};
				})
				.filter((variant: Impression) => variant && variant.id);

			LittledataLayer.ecommerce.impressions = [
				...LittledataLayer.ecommerce.impressions,
				...variantsPreviouslyFetched,
			];
			debugModeLog(variantsPreviouslyFetched);
			//maximum batch size is 20
			chunk(variantsPreviouslyFetched, 20).forEach((batch: Impression[]) => impressionTag(batch));

			impressionsToSend = [];
			getVariantsFromShopify(impressionsSent, impressionTag, allVariants);
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

export const getVariantsFromShopify = (
	impressions: ImpressionToSend[],
	impressionTag: any,
	allVariants: Impression[],
) => {
	const handleGroups = groupBy(impressions, 'handle');
	Object.keys(handleGroups).forEach(handle =>
		requestJSON(`/products/${handle}.json`)
			.then((json: any) => {
				const variantsToSend = handleGroups[handle].map((impression: ImpressionToSend) =>
					convertShopifyProductToVariant(
						json.product,
						impression.shopify_variant_id,
						impression.list_position,
					),
				);
				LittledataLayer.ecommerce.impressions = [...LittledataLayer.ecommerce.impressions, ...variantsToSend];
				debugModeLog(variantsToSend);
				impressionTag(variantsToSend);
				json.product.variants.forEach((variant: LooseObject) => {
					const shopify_variant_id = String(variant.id);
					if (!allVariants.find(impression => impression.shopify_variant_id === shopify_variant_id)) {
						allVariants.push(convertShopifyProductToVariant(json.product, shopify_variant_id));
					}
				});
			})
			.catch(ex => {
				console.debug('Littledata unable to fetch', handle, ex);
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

const debugModeLog = (variants: Impression[]) => {
	if (LittledataLayer.debugMode === true) {
		const handleArray = variants.map(v => `${v.handle} (${v.shopify_variant_id})`);
		console.debug('Product list views tracked:', handleArray);
	}
};
