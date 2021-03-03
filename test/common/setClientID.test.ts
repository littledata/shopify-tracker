import chai, { should } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { setClientID } from '../../src/common/setClientID';
import 'jsdom-global/register';
import { CustomWindow } from '../..';
import { httpRequest } from '../../src/common/httpRequest';

declare let window: CustomWindow;
should();
chai.use(sinonChai);

const cart = {
	token: 'abc',
	attributes: {},
	original_total_price: 0,
	total_price: 100,
	total_discount: 0,
	total_weight: 10,
	item_count: 0,
	items: [] as any,
	requires_shipping: true,
	currency: 'USD',
};

const staleDatestamp = String(new Date().getTime());

describe('setClientID', () => {
	let postJSON: any;
	let getJSON: any;
	beforeEach(() => {
		postJSON = sinon.stub(httpRequest, 'postJSON');
		getJSON = sinon.stub(httpRequest, 'getJSON');
		postJSON.withArgs('/cart/update.json', sinon.match.object).resolves({
			token: 'abc',
			attributes: {
				'google-clientID': '111',
				littledata_updatedAt: String(new Date().getTime()),
			},
		});
		getJSON
			.withArgs('/cart.json')
			.onFirstCall()
			.resolves(cart)
			.onSecondCall()
			.resolves({
				...cart,
				attributes: {
					'google-clientID': '111',
					littledata_updatedAt: String(new Date().getTime()),
				},
			})
			.onThirdCall()
			.resolves({
				...cart,
				attributes: {
					'google-clientID': '111',
					littledata_updatedAt: String(new Date().getTime()),
				},
			});
		window.LittledataLayer = {
			ecommerce: {},
		};
	});
	afterEach(() => {
		postJSON.restore();
		getJSON.restore();
	});

	it('sets client ID if no attributes are found on the cart', async () => {
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.calledOnce;
		postJSON.should.have.been.calledTwice;
		postJSON.should.have.been.calledWith(sinon.match(/clientID\/store/), {
			'google-clientID': '111',
			cartID: 'abc',
		});
		postJSON.should.have.been.calledWith('/cart/update.json', {
			attributes: {
				'google-clientID': '111',
				littledata_updatedAt: sinon.match.number,
			},
		});
		window.LittledataLayer.cart.should.include({
			token: 'abc',
		});
		window.LittledataLayer.cart.attributes.should.include({
			'google-clientID': '111',
		});
	});

	it('de-bounces multiple requests', async () => {
		setClientID('222', 'google');
		await timeoutPromise(50);
		setClientID('aaa', 'segment');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.calledOnce;
		postJSON.should.have.been.calledWith(sinon.match(/clientID\/store/), {
			'google-clientID': '222',
			'segment-clientID': 'aaa',
			cartID: 'abc',
		});
		postJSON.should.have.been.calledWith('/cart/update.json', {
			attributes: {
				'google-clientID': '222',
				'segment-clientID': 'aaa',
				littledata_updatedAt: sinon.match.number,
			},
		});
	});

	it('calls twice if requests are far apart', async () => {
		setClientID('111', 'google');
		await timeoutPromise(1050);
		setClientID('bbb', 'segment');
		await timeoutPromise(1100); //a bit longer than 1s timeout
		postJSON.should.have.been.calledThrice;
		postJSON.should.have.been.calledWith(sinon.match(/clientID\/store/), {
			'google-clientID': '111',
			'segment-clientID': 'aaa', //carried over from previous test
			cartID: 'abc',
		});
		postJSON.should.have.been.calledWith('/cart/update.json', {
			attributes: {
				'google-clientID': '111',
				'segment-clientID': 'aaa', //carried over from previous test
				littledata_updatedAt: sinon.match.number,
			},
		});
		postJSON.should.have.been.calledWith('/cart/update.json', {
			attributes: {
				'google-clientID': '111',
				'segment-clientID': 'bbb',
				littledata_updatedAt: sinon.match.number,
			},
		});
	});

	it('does not post cart if cart already contains attribute', async () => {
		getJSON
			.withArgs('/cart.json')
			.onFirstCall()
			.resolves({
				attributes: {
					'google-clientID': '111',
					littledata_updatedAt: String(new Date().getTime()),
				},
			});
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.calledOnce;
		postJSON.should.not.have.been.called;
	});

	it('does not send cart token on to Littledata if updated at is not recent', async () => {
		getJSON
			.withArgs('/cart.json')
			.onFirstCall()
			.resolves({
				attributes: {
					'google-clientID': '111',
					littledata_updatedAt: staleDatestamp,
				},
			});
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.calledOnce;
		postJSON.should.not.have.been.called;
	});

	it('aborts if Shopify does not return cart token', async () => {
		getJSON
			.withArgs('/cart.json')
			.onFirstCall()
			.resolves({});
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.called;
		postJSON.should.not.have.been.called;
	});

	it('aborts with invalid clientID', async () => {
		setClientID('', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.not.have.been.called;
	});

	it('aborts if cart attributes are present', async () => {
		window.LittledataLayer.cart = {
			...cart,
			attributes: {
				'segment-clientID': 'abc',
			},
		};
		setClientID('abc', 'segment');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.not.have.been.called;
	});
});

const timeoutPromise = (milliseconds: number) => {
	return new Promise(resolve => {
		window.setTimeout(resolve, milliseconds);
	});
};
