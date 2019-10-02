/* eslint-env browser */
import { getGaCookie } from '../common/getGaCookie';

declare let window: CustomWindow;
export const getWebPropertyId = (): string => {
    let script;
    for (const elem of document.getElementsByTagName('script')) {
        if (elem.src.includes('carthookTracker.js')) {
            script = elem;
            break;
        }
    }

    if (!script) return '';

    const regex = /(?!\?.*)webPropertyId=UA-\d+-\d+/;

    const matches = script.src.match(regex);

    if (!matches) return '';

    return matches[0].split('=')[1];
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
