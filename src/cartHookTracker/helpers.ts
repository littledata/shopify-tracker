/* eslint-env browser */
import { getGaCookie } from '../common/getGaCookie';

declare let window: CustomWindow;

function getMonitorBaseUrl(): string {
    const STAGING_URL = 'https://transactions-staging.littledata.io';
    const PROD_URL = 'https://transactions.littledata.io';
    const isSandbox = location.pathname.includes('sandbox');

    return isSandbox ? STAGING_URL : PROD_URL;
}
export const getWebPropertyId = (): Promise<string> => {
    const baseUrl = getMonitorBaseUrl();
    const storeUrl = getStoreUrl();

    const webPropertyId = fetch(`${baseUrl}/webProperty/${storeUrl}`)
        .then(response => response.json())
        .then(json => json.webPropertyId);

    return webPropertyId;
};

function getStoreUrl() {
    // @ts-ignore
    return CHDataObject && CHDataObject.store_urls && CHDataObject.store_urls.store_url;
}

export function loadGtagScript(webPropertyId: string) {
    const gtagLink = `https://www.googletagmanager.com/gtag/js?id=${webPropertyId}`;
    loadScript(gtagLink, function() {});
}

// @ts-ignore
function loadScript(src: string, cb: any) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;

    script.onerror = function() {
        cb(new Error('Failed to load' + src));
    };

    script.onload = function() {
        cb();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
}

export function initGtag(webPropertyId: string): void {
    window.dataLayer = window.dataLayer || [];
    const stubFunction = function() {
        dataLayer.push(arguments);
	}; //eslint-disable-line
    window.gtag = window.gtag || stubFunction;
    // @ts-ignore
    gtag('js', new Date());
    gtag('config', webPropertyId, getConfig());
}

const getConfig = (): Gtag.CustomParams => {
    const config: Gtag.CustomParams = {
        linker: {
            domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
        },
    };

    return config;
};

export const sendCartId = () => {
    console.log('getGaCookie()', getGaCookie());
    // @ts-ignore
    console.log('cartID', CHDataObject.checkout_session);
    const baseUrl = getMonitorBaseUrl();
    $.post(`${baseUrl}/clientID`, {
        clientID: getGaCookie(),
        // @ts-ignore
        cartID: CHDataObject.checkout_session,
    });
};
