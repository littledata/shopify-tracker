export interface ShopifyProduct {
	body_html?: string;
	created_at: string;
	handle: string;
	id: number;
	featured_image?: string;
	image?: ShopifyImage;
	images?: ShopifyImage[];
	options: LooseObject[];
	product_type?: string;
	published_at: string;
	published_scope?: string;
	tags: string;
	template_suffix?: string;
	title: string;
	description?: string;
	updated_at?: string;
	vendor?: string;
	type?: string;
	variants: ShopifyVariant[];
	price_min?: string;
	price_max?: string;
	available?: boolean;
	compare_at_price?: string;
}

interface ShopifyVariant {
	barcode: string;
	compare_at_price: string;
	created_at?: string;
	fulfillment_service?: string;
	grams: number;
	id: number;
	image_id?: null | string;
	inventory_management: string;
	option1: null | string;
	option2: null | string;
	option3: null | string;
	position?: number;
	price: string;
	product_id?: number;
	requires_shipping: boolean;
	sku: null | string;
	taxable: boolean;
	title: string;
	updated_at?: string;
	weight: number;
	weight_unit: string;
}

interface ShopifyImage {
	id: number;
	product_id: number;
	position?: number;
	created_at: string;
	updated_at: string;
	alt: null | string;
	width: number;
	height: number;
	src: string;
	variant_ids: string[];
}
