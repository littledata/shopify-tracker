import { SegmentProduct } from '../../../segmentInterface';

export const segmentProduct = (dataLayerProduct: Detail): SegmentProduct => ({
	brand: dataLayerProduct.brand,
	category: dataLayerProduct.category,
	url: dataLayerProduct.handle,
	product_id: dataLayerProduct.id,
	sku: dataLayerProduct.id,
	position: dataLayerProduct.list_position,
	name: dataLayerProduct.name,
	price: parseFloat(dataLayerProduct.price),
	variant: dataLayerProduct.variant,
	shopify_product_id: String(dataLayerProduct.shopify_product_id),
	shopify_variant_id: String(dataLayerProduct.shopify_variant_id),
	compare_at_price: dataLayerProduct.compare_at_price,
});
