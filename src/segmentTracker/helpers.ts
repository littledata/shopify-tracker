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

export const trackEvents = () => {
    window.analytics.ready(() => {
        //@ts-ignore
        setClientID(window.analytics.user().anonymousId, window.analytics.Integrations['Google Analytics']);
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
