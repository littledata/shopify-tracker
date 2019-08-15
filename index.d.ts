declare global {
    namespace Cart {
        export interface Attributes {
            updatedAt?: string;
            clientID?: string;
            googleClientID?: string;
        }

        export interface Properties {}

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
            properties: Properties;
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
            requires_shipping: boolean;
            currency: string;
            items_subtotal_price: number;
            cart_level_discount_applications: any[];
        }
    }

    interface Detail {
        id: string;
        name: string;
        price: string;
        brand: string;
        category: string;
        variant: string;
        list_name: string;
        list: string; // duplicate property for GTM
        handle: string;
        list_position?: number;
    }

    interface Impression extends Detail {
        list_position: number;
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

    interface OwnLayer {
        persistentUserId?: string;
        customer?: Customer;
        hideBranding: boolean;
        writeKey?: string;
        webPropertyID?: string;
        referralExclusion: RegExp;
        enhancePrivacy: boolean;
        productClicks: boolean;
        googleAdsConversionIds?: string[];
        ecommerce: {
            currencyCode: string;
            impressions?: Impression[];
            detail?: Detail;
        };
        transactionWatcherURL: string;
        cart: Cart.RootObject;
        anonymizeIp: boolean;
        googleSignals: boolean;
        optimizeId: string;
    }

    var LittledataLayer: OwnLayer;
    var dataLayer: any[];

    interface CustomWindow extends Window {
        ga: any;
        LittledataLayer: OwnLayer;
        analytics: SegmentAnalytics.AnalyticsJS;
        gtag: Gtag.Gtag;
        dataLayer: any[];
    }

    interface TimeBombHTMLAnchor extends HTMLAnchorElement {
        timeout: number;
    }

    type ListClickCallback = (foundProduct: Impression, self: TimeBombHTMLAnchor) => void;

    interface Customer {
        accepts_narketing: boolean;
        display_name: string;
        email: string;
        first_name: string;
        id: string;
        last_name: string;
        name: string;
        phone: string;
        address: {
            address1: string;
            address2: string;
            city: string;
            company: string;
            country: string;
            country_code: string;
            first_name: string;
            id: string;
            last_name: string;
            phone: string;
            province: string;
            province_code: string;
            street: string;
            zip: string;
        };
    }

    interface SegmentAddressFormat {
        street?: string;
        city?: string;
        postalCode?: string;
        state?: string;
        country?: string;
    }
}

export {};
