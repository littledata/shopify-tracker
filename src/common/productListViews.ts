import { getElementsByHref, productUrlRegex } from './helpers';
import { convertShopifyProductToVariant } from './convertShopifyProductToVariant';
import { getHandleAndVariantFromProductLink } from './getHandleAndVariantFromProductLink';
import { addClickListener, findProductInArray, findProductIndexInArray } from './addClickListener';
import { httpRequest } from './httpRequest';

type impressionCallback = (impressionTag: Impression[]) => void;

export default (impressionTag: impressionCallback, clickTag: ListClickCallback) => {
	let waitForScroll = 0;
	const allVariants = [] as Impression[];
	LittledataLayer.ecommerce.impressionsToSend = [];
	// previous data layer versions pre-populated impressions, so wipe those
	LittledataLayer.ecommerce.impressions = [];
	let { impressionsToSend } = LittledataLayer.ecommerce;

	function trackImpressions() {
		const products = getElementsByHref(productUrlRegex);
		products.forEach((element, index) => {
			const { handle, shopify_variant_id } = getHandleAndVariantFromProductLink(element.href);
			if (productAlreadyViewed(handle, shopify_variant_id)) return;
			if (productIsVisible(element)) {
				//prevent product view from triggering again, even before view is tracked
				impressionsToSend.push({
					handle,
					shopify_variant_id,
					list_position: index + 1,
				});
				addClickListener(element, clickTag);
			}
		});

		if (impressionsToSend.length > 0) {
			// if we fetched them previously, just send them now
			const variantsPreviouslyFetched = impressionsToSend
				.map(impression => {
					const previouslyFetched = findProductInArray(
						allVariants,
						impression.handle,
						impression.shopify_variant_id,
					);
					return {
						...previouslyFetched,
						list_position: impression.list_position,
					};
				})
				.filter((impression: Impression) => impression && impression.id);
			fireImpressionTag(variantsPreviouslyFetched, impressionTag, 'from previous fetch');
			getVariantsFromShopify(impressionsToSend, impressionTag, allVariants);
		}
	}

	window.setTimeout(function() {
		clearTimeout(waitForScroll);
		trackImpressions();
	}, 500); /* wait for user to see the products above the fold */

	document.addEventListener('scroll', () => {
		//assumes that people need 200ms after scrolling stops to register an impression
		clearTimeout(waitForScroll);
		waitForScroll = window.setTimeout(function() {
			trackImpressions();
		}, 200);
	});
};

const productIsVisible = (element: TimeBombHTMLAnchor) => {
	const viewportTop = document.documentElement.scrollTop;
	const viewportHeight = window.innerHeight;
	const viewportBottom = viewportTop + viewportHeight;
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
			return true;
		}
	}
	return false;
};

const fireImpressionTag = (newImpressions: Impression[], impressionTag: impressionCallback, logMessage: string) => {
	if (!newImpressions.length) return;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let { impressionsToSend } = LittledataLayer.ecommerce;
	LittledataLayer.ecommerce.impressions = [...LittledataLayer.ecommerce.impressions, ...newImpressions];
	debugModeLog(logMessage, newImpressions);
	newImpressions.forEach(v => {
		const index = findProductIndexInArray(impressionsToSend, v.handle, v.shopify_variant_id);
		impressionsToSend.splice(index, 1);
	});
	impressionTag(newImpressions);
};
export const getVariantsFromShopify = (
	impressions: ImpressionToSend[],
	impressionTag: any,
	allVariants: Impression[],
) => {
	const handleGroups = groupBy(impressions, 'handle');
	Object.keys(handleGroups).forEach(handle =>
		httpRequest
			.getJSON(`/products/${handle}.json`)
			.then((json: any) => {
				const variantsToSend = handleGroups[handle].map((impression: ImpressionToSend) =>
					convertShopifyProductToVariant(
						json.product,
						impression.shopify_variant_id,
						impression.list_position,
					),
				);
				fireImpressionTag(variantsToSend, impressionTag, 'from products API');
				json.product.variants.forEach((variant: LooseObject) => {
					const shopify_variant_id = String(variant.id);
					if (findProductInArray(allVariants, json.product.handle, shopify_variant_id)) return;
					allVariants.push(convertShopifyProductToVariant(json.product, shopify_variant_id));
				});
			})
			.catch(ex => {
				console.debug('Littledata unable to fetch', handle, ex);
			}),
	);
};

export const productAlreadyViewed = (handle: string, shopify_variant_id: string) =>
	findProductInArray(LittledataLayer.ecommerce.impressions, handle, shopify_variant_id) ||
	findProductInArray(LittledataLayer.ecommerce.impressionsToSend, handle, shopify_variant_id);

const groupBy = (givenArray: any[], key: string) => {
	return givenArray.reduce(function(rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

const debugModeLog = (message: string, variants: Impression[]) => {
	if (LittledataLayer.debug === true && variants.length) {
		const handleArray = variants.map(v => `${v.handle} (${v.shopify_variant_id})`);
		console.log(`Littledata product list views ${message}:`, handleArray);
	}
};
