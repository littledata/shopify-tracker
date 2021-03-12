import { getQueryStringParam } from './getQueryStringParam';

export const getHandleAndVariantFromProductLink = (link: string) => {
	let handle, shopify_variant_id;
	const linkSplit = link.split('/products/');
	const productLinkWithParams = linkSplit && linkSplit[1];
	const productLinkWithParamsArray = productLinkWithParams.split('?');
	if (!productLinkWithParamsArray) return { handle, shopify_variant_id };
	shopify_variant_id = getQueryStringParam(productLinkWithParamsArray[1], 'variant');
	handle = productLinkWithParamsArray[0];
	return { handle, shopify_variant_id };
};
