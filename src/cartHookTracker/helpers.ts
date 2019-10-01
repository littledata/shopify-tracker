/* eslint-env browser */
import { getGaCookie } from '../common/getGaCookie';

declare let window: CustomWindow;
export const getWebPropertyId = (): string => {
    const scriptSrc = document
        .querySelector('script[src*="https://www.googletagmanager.com/test/gtag/js"]')
        .getAttribute('src');

    return scriptSrc.split('id=')[1];
};

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
    $.post('https://transactions.littledata.io/clientID', {
        clientID: getGaCookie(),
        // @ts-ignore
        cartID: CHDataObject.checkout_session,
    });
};
