import { ShopifyProduct } from '../../shopifyProductInterface';
import { CustomWindow } from '../..';

declare let window: CustomWindow;

export const convertShopifyProductToVariant = (
	product: ShopifyProduct,
	shopify_variant_id: null | string,
	list_position?: number,
) => {
	const variant = shopify_variant_id
		? product.variants.find(v => String(v.id) === shopify_variant_id)
		: product.variants[0];

	const { pageType, usePageTypeForListName } = window.LittledataLayer;
	const list_name = usePageTypeForListName && pageType ? pageType : document.location.pathname;

	const output: Impression = {
		id: variant.sku || String(product.id),
		name: product.title,
		price: variant.price,
		brand: product.vendor,
		category: product.type || 'all',
		variant: variant.title,
		list_name,
		handle: product.handle,
		shopify_product_id: String(product.id),
		shopify_variant_id: String(variant.id),
		compare_at_price: variant.compare_at_price,
		image_url: getFirstImageURL(product.images),
	};

	if (list_position) {
		output.list_position = list_position;
	}

	return output;
};

const getFirstImageURL = (images: ShopifyProduct['images']) => {
	const firstImage = images.length && images[0];
	if (typeof firstImage !== 'string') return '';
	return firstImage.replace(/^\/\//, 'https://');
};
