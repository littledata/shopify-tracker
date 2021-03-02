import { should } from 'chai';
import getConfig, { extraExcludedReferrers, DEFAULT_LINKER_DOMAINS } from '../../src/common/getConfig';
import 'jsdom-global/register';
import { CustomWindow } from '../..';
import { customer } from './fakeCustomerObject';
declare let window: CustomWindow;

should();
const normalUrl = 'https://normal.com';

describe('getConfig', () => {
	beforeEach(() => {
		Object.defineProperty(window.document, 'referrer', { value: normalUrl, configurable: true });
	});
	it('outputs a standard object with no settings', () => {
		getConfig().should.deep.equal({
			anonymize_ip: true,
			allow_ad_personalization_signals: false,
			linker: { domains: DEFAULT_LINKER_DOMAINS, accept_incoming: true },
			currency: 'USD',
			link_attribution: true,
			optimize_id: undefined,
			page_referrer: document.referrer,
		});
	});

	it('takes a userId', () => {
		window.LittledataLayer = {
			ecommerce: {},
			customer,
		};
		getConfig().should.contain({
			user_id: window.LittledataLayer.customer.id,
		});
	});

	it('sets cookie_update', () => {
		getConfig().should.not.contain({
			cookie_update: false,
		});
		window.LittledataLayer = {
			ecommerce: {},
			cookieUpdate: false,
		};
		getConfig().should.contain({
			cookie_update: false,
		});
	});

	it('includes normal referrer', () => {
		getConfig().should.contain({
			page_referrer: normalUrl,
		});
	});

	it('excludes shop.app referrer', () => {
		Object.defineProperty(window.document, 'referrer', { value: extraExcludedReferrers[0] });
		getConfig().should.contain({
			page_referrer: null,
		});
	});

	it('excludes user-set referrer', () => {
		window.LittledataLayer.referralExclusion = /(test|normal)/;
		getConfig().should.contain({
			page_referrer: null,
		});
	});

	it('works when referralExclusion is a string', () => {
		window.LittledataLayer.referralExclusion = '/(test|normal)/';
		getConfig().should.contain({
			page_referrer: null,
		});
	});

	it('excludes self-referrals', () => {
		Object.defineProperty(window.document, 'referrer', { value: 'about://' });
		getConfig().should.contain({
			page_referrer: null,
		});
	});
});
