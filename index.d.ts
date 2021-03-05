import { AnalyticsJS } from './segmentInterface';

export interface Detail {
	id: string;
	name: string;
	price: string;
	brand: string;
	category: string;
	variant: string;
	list_name: string;
	list?: string; // duplicate property for GTM
	handle: string;
	list_position?: number;
	shopify_product_id?: string;
	shopify_variant_id?: string;
	compare_at_price?: string;
	image_url?: string;
}

export interface GA4Product {
	currency: string;
	item_product_id: string;
	item_name: string;
	item_brand: string;
	item_category: string;
	item_variant: string;
	item_sku: string;
	item_variant_id: string;
	price: string;
	index?: number;
}

export interface CustomWindow extends Window {
	console: { (...data: any[]): void; (message?: any, ...optionalParams: any[]): void };
	ga: any;
	LittledataLayer: OwnLayer;
	analytics: AnalyticsJS;
	gtag: Gtag.Gtag;
	dataLayer: any[];
	LittledataScriptVersion: string;
	Shopify?: LooseObject;
	_ga_originalSendHitTask: any;
}

export interface OwnLayer extends Cart.Attributes {
	version?: string;
	customer?: Customer;
	hideBranding?: boolean;
	writeKey?: string;
	webPropertyID?: string;
	measurementID?: string;
	referralExclusion?: RegExp | string; //before layer v8.8 it was a RegExp
	enhancePrivacy?: boolean;
	productClicks?: boolean;
	googleAdsConversionIds?: string[];
	ecommerce: {
		currencyCode?: string;
		variants?: LooseObject[]; //from before data layer v9
		impressions?: Impression[];
		impressionsToSend?: ImpressionToSend[];
		detail?: Detail;
	};
	transactionWatcherURL?: string;
	cart?: Cart.RootObject;
	anonymizeIp?: boolean;
	googleSignals?: boolean;
	optimizeId?: string;
	productPageClicks?: boolean;
	extraLinkerDomains?: string[];
	cookiesToTrack?: string[];
	doNotTrackReplaceState?: boolean;
	MPEndpoint?: string;
	CDNForAnalyticsJS?: string;
	attributes?: Cart.Attributes;
	segmentUserId?: string;
	cookieUpdate?: boolean;
	debug?: boolean;
	pageType?: string;
}

declare global {
	interface LooseObject {
		[index: string]: any;
	}

	namespace Cart {
		export interface Attributes {
			token?: string;
			updatedAt?: string; //old format pre v8.3
			littledata_updatedAt?: string;
			'google-clientID'?: string;
			'segment-clientID'?: string;
			'email-clientID'?: string;
		}

		export interface FeaturedImage {
			url?: any;
			aspect_ratio?: any;
			alt?: any;
		}

		export interface OptionsWithValue {
			name: string;
			value: string;
		}

		export interface Item {
			id: any;
			properties: LooseObject;
			quantity: number;
			variant_id: any;
			key: string;
			title: string;
			price: number;
			original_price: number;
			discounted_price: number;
			line_price: number;
			original_line_price: number;
			total_discount: number;
			discounts: any[];
			sku: string;
			grams: number;
			vendor: string;
			taxable: boolean;
			product_id: any;
			product_has_only_default_variant: boolean;
			gift_card: boolean;
			final_price: number;
			final_line_price: number;
			url: string;
			featured_image: FeaturedImage;
			image?: any;
			handle: string;
			requires_shipping: boolean;
			product_type: string;
			product_title: string;
			product_description: string;
			variant_title: string;
			variant_options: string[];
			options_with_values: OptionsWithValue[];
			line_level_discount_allocations: any[];
		}

		export interface RootObject {
			token: string;
			note?: any;
			attributes: Attributes;
			original_total_price: number;
			total_price: number;
			total_discount: number;
			total_weight: number;
			item_count: number;
			items: Item[];
			requires_shipping?: boolean;
			currency: string;
			items_subtotal_price?: number;
			cart_level_discount_applications?: any[];
		}
	}

	interface Impression extends Detail {
		list_position?: number;
	}

	interface DiscountApplication {
		target_selection: 'all' | 'entitled' | 'explicit';
		target_type: 'line_item' | 'shipping_line';
		title: string;
		total_allocated_amount: number;
		type: 'automatic' | 'discount_code' | 'manual' | 'script';
		value: number;
		value_type: string;
	}

	interface ImpressionToSend {
		handle: string;
		shopify_variant_id: string;
		list_position: number;
	}

	var LittledataLayer: OwnLayer;
	var dataLayer: any[];

	interface CartHookWindow extends Window {
		gtag: Gtag.Gtag;
		dataLayer: any[];
		CH?: LooseObject;
		chData: LooseObject;
		_ga_originalSendHitTask: any;
		console: LooseObject;
		CHDataObject: LooseObject;
	}

	interface TimeBombHTMLAnchor extends HTMLAnchorElement {
		timeout: number;
	}

	type ListClickCallback = (foundProduct: Impression, element: TimeBombHTMLAnchor, openInNewTab: boolean) => void;

	interface Customer {
		id: string;
		accepts_marketing?: boolean;
		display_name?: string;
		email: string;
		first_name?: string;
		last_name?: string;
		name?: string;
		phone?: string;
		address?: {
			address1: string;
			address2: string;
			city: string;
			company?: string;
			country: string;
			country_code: string;
			phone: string;
			province: string;
			province_code: string;
			street?: string;
			zip: string;
		};
		generatedClientID?: string;
		customerLifetimeValue: number;
		purchaseCount: number;
		tags: string;
	}

	interface SegmentAddressFormat {
		street?: string;
		city?: string;
		postalCode?: string;
		state?: string;
		country?: string;
	}
}

export type clientID = 'google-clientID' | 'segment-clientID' | 'email-clientID';
