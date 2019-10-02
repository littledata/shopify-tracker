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

export function loadGtagScript(webPropertyId: string) {
    const gtagLink = `https://www.googletagmanager.com/gtag/js?id=${webPropertyId}`;
    loadScript(gtagLink, function() {});
};

function loadScript(src: string, cb: any) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;

    script.onerror = function() {
      cb(new Error("Failed to load" + src));
    };

    script.onload = function() {
      cb();
    };

    document.getElementsByTagName("head")[0].appendChild(script);
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
