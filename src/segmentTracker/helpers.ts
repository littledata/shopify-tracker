/* global LittledataLayer */
declare let window: CustomWindow;
import { productListClicks, trackProductImageClicks, trackSocialShares } from '../common/helpers';
import productListViews from '../common/productListViews';

const trackEvent = (eventName: string, params: object) => {
    const name = 'shopify_littledata';
    const version = '8.0.3';
    const context = {
        integration: {
            name,
            version,
        },
    };
    // @ts-ignore
    window.analytics.track(eventName, params, context);
};

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
    currency?: string;
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

export const identifyCustomer = (customer: Customer) => {
    if (customer) {
        window.analytics.identify(customer.id, {
            email: customer.email,
            name: customer.name,
            phone: customer.phone || (customer.address && customer.address.phone),
            address: parseAddress(customer.address),
        });
    }
};

export const trackEvents = () => {
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
                trackEvent('Product Clicked', {
                    ...p,
                    currency: LittledataLayer.ecommerce.currencyCode,
                    list_id: document.location.pathname,
                    category: 'EnhancedEcommerce',
                });
            });

            productListViews(products => {
                const listId = products && products[0].list;
                const segmentProducts = products.map(segmentProduct);

                trackEvent('Product List Viewed', {
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
            product.currency = LittledataLayer.ecommerce.currencyCode;
            product.category = 'EnhancedEcommerce';
            product.position = parseInt(window.localStorage.getItem('position')) || 1;
            trackEvent('Product Viewed', product);

            // if PDP, we can also track clicks on images and social shares
            trackProductImageClicks(name => {
                product.image_url = name;
                trackEvent('Product Image Clicked', product);
            });

            trackSocialShares(network => {
                trackEvent('Product Shared', {
                    ...product,
                    share_via: network,
                });
            });
        }
    }
};

export const initSegment = () => {
    // @ts-ignore
    window.analytics = window.analytics || [];
    // @ts-ignore
    if (!analytics.initialize) {
        // @ts-ignore
        if (analytics.invoked) {
            window.console && console.error && console.error('Segment snippet included twice.');
        } else {
            // @ts-ignore
            analytics.invoked = !0;
            // @ts-ignore
            analytics.methods = [
                'trackSubmit',
                'trackClick',
                'trackLink',
                'trackForm',
                'pageview',
                'identify',
                'reset',
                'group',
                'track',
                'ready',
                'alias',
                'debug',
                'page',
                'once',
                'off',
                'on',
            ];
            // @ts-ignore
            analytics.factory = function(t) {
                return function() {
                    var e = Array.prototype.slice.call(arguments);
                    e.unshift(t);
                    // @ts-ignore
                    analytics.push(e);
                    return analytics;
                };
            };
            // @ts-ignore
            for (var t = 0; t < analytics.methods.length; t++) {
                // @ts-ignore
                var e = analytics.methods[t];
                // @ts-ignore
                analytics[e] = analytics.factory(e);
            }
            // @ts-ignore
            analytics.load = function(t, e) {
                var n = document.createElement('script');
                n.type = 'text/javascript';
                n.async = !0;
                n.src = 'https://cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
                var a = document.getElementsByTagName('script')[0];
                a.parentNode.insertBefore(n, a);
                // @ts-ignore
                analytics._loadOptions = e;
            };
            // @ts-ignore
            analytics.SNIPPET_VERSION = '4.1.0'; //eslint-disable-line
            window.analytics.load(LittledataLayer.writeKey);
        }
    }
    window.dataLayer = window.dataLayer || [];
};

const parseAddress = (a: Customer['address']): SegmentAddressFormat => {
    const output: SegmentAddressFormat = {};
    if (!a) return output;
    if (a.address1) {
        output.street = a.address1;
        if (a.address2) output.street += `, ${a.address2}`;
    }
    if (a.city) output.city = a.city;
    if (a.zip) output.postalCode = a.zip;
    if (a.province) output.state = a.province;
    if (a.country) output.country = a.country;

    return output;
};
