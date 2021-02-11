export interface ShopifyProduct {
	body_html: string;
	created_at: string;
	handle: string;
	id: string;
	image: LooseObject;
	images: LooseObject[];
	options: LooseObject[];
	product_type: string;
	published_at: string;
	published_scope: string;
	tags: string;
	template_suffix: string;
	title: string;
	updated_at: string;
	vendor?: string;
	type?: string;
	variants: ShopifyVariant[];
}

interface ShopifyVariant {
	barcode: null | string;
	compare_at_price: string;
	created_at: string;
	fulfillment_service: string;
	grams: number;
	id: number;
	image_id: null | string;
	inventory_management: string;
	option1: string;
	option2: string;
	option3: null | string;
	position: number;
	price: string;
	product_id: number;
	requires_shipping: boolean;
	sku: string;
	taxable: boolean;
	title: string;
	updated_at: string;
	weight: number;
	weight_unit: string;
}
