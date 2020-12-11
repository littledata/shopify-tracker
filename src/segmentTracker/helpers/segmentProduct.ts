import { Detail } from '../../..';
import { SegmentProduct } from '../../../segmentInterface';

export const segmentProduct = (dataLayerProduct: Detail) => {
	const output: SegmentProduct = {
		brand: dataLayerProduct.brand,
		category: dataLayerProduct.category,
		url: `${window.document.location.origin}/products/${dataLayerProduct.handle}`,
		product_id: dataLayerProduct.id,
		sku: dataLayerProduct.id,
		name: dataLayerProduct.name,
		price: parseFloat(dataLayerProduct.price),
		variant: dataLayerProduct.variant,
		shopify_product_id: String(dataLayerProduct.shopify_product_id),
		shopify_variant_id: String(dataLayerProduct.shopify_variant_id),
	};
	if (dataLayerProduct.image_url) {
		output.image_url = dataLayerProduct.image_url;
	}
	if (dataLayerProduct.list_position) {
		output.position = dataLayerProduct.list_position;
	}
	if (dataLayerProduct.compare_at_price) {
		output.compare_at_price = dataLayerProduct.compare_at_price;
	}

	return output;
};
