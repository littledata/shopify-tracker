import { getHandleAndVariantFromProductLink } from './getHandleAndVariantFromProductLink';

export const addClickListener = (element: TimeBombHTMLAnchor, clickTag: ListClickCallback) => {
	element.addEventListener('click', function(ev) {
		const openInNewTab = ev.ctrlKey;
		const { handle, shopify_variant_id } = getHandleAndVariantFromProductLink(element.href);
		const product = findProductInArray(LittledataLayer.ecommerce.impressions, handle, shopify_variant_id);

		if (!product) return;
		window.localStorage.setItem('position', String(product.list_position));
		debugModeLog(product);
		ev.preventDefault();
		/* wait a maximum of 1 second before redirecting */
		element.timeout = window.setTimeout(function() {
			listClickCallback(element, openInNewTab);
		}, 1000);

		clickTag(product, element, openInNewTab);
	});
};

export const listClickCallback = (element: TimeBombHTMLAnchor, openInNewTab: boolean) => {
	window.clearTimeout(element.timeout);
	if (openInNewTab) return window.open(element.href, '_blank');
	document.location.href = element.href;
};

export const findProductInArray = (array: any[], handle: string, shopify_variant_id: string): Impression =>
	array.find(p => {
		return shopify_variant_id
			? handle === p.handle && p.shopify_variant_id === shopify_variant_id
			: handle === p.handle;
	});

export const findProductIndexInArray = (array: any[], handle: string, shopify_variant_id: string): number =>
	array.findIndex(p => {
		return shopify_variant_id
			? handle === p.handle && p.shopify_variant_id === shopify_variant_id
			: handle === p.handle;
	});

const debugModeLog = (product: Impression) => {
	if (LittledataLayer.debug === true) {
		console.log(`Littledata tracking click on product ${product.handle} (${product.shopify_variant_id})`);
	}
};
