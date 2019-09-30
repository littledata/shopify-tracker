import { getGaCookie } from '../common/getGaCookie';

export const getWebPropertyId = (): String => {
    var urlParams = new URLSearchParams(location.search);
    return urlParams.get('id');
} 

export function insertGtag(webPropertyId: String): void {
    var script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${webPropertyId}`;
    script.type = 'text/javascript';
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
}


export function initGtag(webPropertyId: String): void {
    window.dataLayer = window.dataLayer || [];
    const stubFunction = function() {
        dataLayer.push(arguments);
	}; //eslint-disable-line
    window.gtag = window.gtag || stubFunction;
    // @ts-ignore
    gtag('js', new Date());
    gtag('config', webPropertyId, getConfig());
};

const getConfig = (): Gtag.CustomParams => {
    const config: Gtag.CustomParams = {
        linker: {
            domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com'],
        },
    };

    return config;
};

export const sendCartId = () => {
    $.post('https://transactions.littledata.io/clientID', {
        clientID: getGaCookie(),
        // @ts-ignore
        cartID: CHDataObject.checkout_session,
    });
}