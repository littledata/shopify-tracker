import { getCookie, getValidGAClientId } from './getCookie';

declare let window: CustomWindow;

export default (): Gtag.CustomParams => {
	const settings: LooseObject = window.LittledataLayer || {};
	const { anonymizeIp, googleSignals, ecommerce, optimizeId, referralExclusion } = settings;

	const DEFAULT_LINKER_DOMAINS = [
		'^(?!cdn.)(.*)shopify.com',
		'rechargeapps.com',
		'recurringcheckout.com',
		'carthook.com',
		'checkout.com',
		'shop.app',
	];
	const extraLinkerDomains = settings.extraLinkerDomains || [];

	let excludeReferral = referralExclusion && referralExclusion.test(document.referrer);
	const extraExcludedReferrers = ['shop.app'];
	if (extraExcludedReferrers.includes(document.referrer)) {
		excludeReferral = true;
	}
	if (document.referrer.includes(`${location.protocol}//${location.host}`)) {
		//valid referrer may have host within the url, like https://newsite.com/about/shopify.com
		//but less likely to have protocol as well, unless the same domain - self-referral
		excludeReferral = true;
	}
	const config: Gtag.CustomParams = {
		linker: {
			domains: [...DEFAULT_LINKER_DOMAINS, ...extraLinkerDomains],
		},
		anonymize_ip: anonymizeIp === false ? false : true, //default true
		allow_ad_personalization_signals: googleSignals === true ? true : false, //default false
		currency: (ecommerce && ecommerce.currencyCode) || 'USD',
		link_attribution: true,
		optimize_id: optimizeId,
		page_referrer: excludeReferral ? null : document.referrer,
	};

	const userId = settings.customer && settings.customer.id;
	if (userId) {
		config.user_id = userId;
	}

	const cookie = getCookie('_ga');
	if (cookie && !getValidGAClientId(cookie)) {
		//expiring the cookie after this session ensures invalid clientID
		//is not propagated to future sessions
		config.cookie_expires = 0;
	}

	return config;
};
