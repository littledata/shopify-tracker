import { ShopifyProduct } from '../../shopifyProductInterface';

export const convertShopifyProductToVariant = (
	product: ShopifyProduct,
	shopify_variant_id: null | string,
	list_position?: number,
) => {
	const variant = shopify_variant_id
		? product.variants.find(v => String(v.id) === shopify_variant_id)
		: product.variants[0];

	const output: Impression = {
		id: variant.sku || String(product.id),
		name: product.title,
		price: variant.price,
		brand: product.vendor,
		category: product.type,
		variant: variant.title,
		list_name: document.location.pathname,
		list: document.location.pathname, // duplicate property for GTM
		handle: product.handle,
		shopify_product_id: String(product.id),
		shopify_variant_id: String(variant.id),
		compare_at_price: variant.compare_at_price,
	};

	if (list_position) {
		output.list_position = list_position;
	}

	return output;
};
