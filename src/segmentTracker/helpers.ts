/* global LittledataLayer */
declare let window: CustomWindow;
import { productListClicks, setClientID, trackProductImageClicks, trackSocialShares } from '../common/helpers';
import productListViews from '../common/productListViews';

interface SegmentProduct {
    brand: string;
    category: string;
    url: string;
    product_id: string;
    sku: string;
    position: number;
    name: string;
    price: number;
    variant: string;
    list_id?: string;
    image_url?: string;
}

const segmentProduct = (dataLayerProduct: Detail): SegmentProduct => ({
    brand: dataLayerProduct.brand,
    category: dataLayerProduct.category,
    url: dataLayerProduct.handle,
    product_id: dataLayerProduct.id,
    sku: dataLayerProduct.id,
    position: dataLayerProduct.list_position,
    name: dataLayerProduct.name,
    price: parseFloat(dataLayerProduct.price),
    variant: dataLayerProduct.variant,
});

export const identifyCustomer = () => {
    if (LittledataLayer.customer) {
        window.analytics.identify(LittledataLayer.customer.id, LittledataLayer.customer);
    }
};

export const getPersistentClientIdSegment = (): string => {
    // needed because Safari wipes 1st party cookies
    // so we need to persist over localStorage, if available

    if (!window.analytics || !window.analytics.user()) return '';

    if (window.localStorage && LittledataLayer.persistentUserId) {
        const localClientId = window.localStorage.getItem('_ga');
        // prefer local storage version, as it was set by this function
        if (localClientId) return localClientId;

        const cookieClientId = window.analytics.user().anonymousId();
        if (cookieClientId) {
            // set it to local storage for next time
            window.localStorage.setItem('_ga', cookieClientId);
            return cookieClientId;
        }
    }

    // returning an empty client id will cause gtag to create a new one
    return '';
};

export const trackEvents = () => {
    window.analytics.ready(() => {
        setClientID(getPersistentClientIdSegment);
    });
    if (LittledataLayer) {
        /* run list, product, and clientID scripts everywhere */
        if (LittledataLayer.ecommerce.impressions.length) {
            productListClicks(product => {
                const productFromImpressions = LittledataLayer.ecommerce.impressions.find(
                    prod => prod.name === product.name && prod.handle === product.handle,
                );
                const pos = productFromImpressions && productFromImpressions.list_position;
                window.localStorage.setItem('position', String(pos));

                const p = segmentProduct(product);
                window.analytics.track('Product Clicked', {
                    ...p,
                    list_id: document.location.pathname,
                    category: 'EnhancedEcommerce',
                });
            });

            productListViews(products => {
                const listId = products && products[0].list;
                const segmentProducts = products.map(segmentProduct);

                window.analytics.track('Product List Viewed', {
                    list_id: listId,
                    category: 'EnhancedEcommerce',
                    products: segmentProducts,
                });
            });
        }
        const rawProduct = LittledataLayer.ecommerce.detail;
        if (rawProduct) {
            const product = segmentProduct(rawProduct);
            product.list_id = document.location.href;
            product.category = 'EnhancedEcommerce';
            product.position = parseInt(window.localStorage.getItem('position')) || 1;
            window.analytics.track('Product Viewed', product);

            // if PDP, we can also track clicks on images and social shares
            trackProductImageClicks(name => {
                product.image_url = name;
                window.analytics.track('Product Image Clicked', product);
            });

            trackSocialShares(network => {
                window.analytics.track('Product Shared', {
                    ...product,
                    share_via: network,
                });
            });
        }
    }
};

export const initSegment = () => {
    // @ts-ignore
	window.analytics = window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";//eslint-disable-line
            window.analytics.load(LittledataLayer.writeKey);
        }
    window.dataLayer = window.dataLayer || [];
};
