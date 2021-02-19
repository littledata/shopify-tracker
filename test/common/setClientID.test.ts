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

describe('setClientID', () => {
	let postJSON: any;
	let getJSON: any;
	beforeEach(() => {
		postJSON = sinon.stub(httpRequest, 'postJSON');
		getJSON = sinon.stub(httpRequest, 'getJSON');
		postJSON.withArgs('/cart/update.json', sinon.match.object).resolves({
			attributes: {
				'google-clientID': '111',
			},
		});
		getJSON.withArgs('/cart.json').resolves(cart);
		window.LittledataLayer = {
			ecommerce: {},
			customer: { id: '123', email: 'test@test.com' },
		};
	});
	afterEach(() => {
		postJSON.restore();
		getJSON.restore();
	});
	it('sets client ID if no cart token is found', async () => {
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.called;
		postJSON.should.have.been.calledTwice;
		postJSON.should.have.been.calledWith(sinon.match(/clientID\/store/), {
			'google-clientID': '111',
			cartID: 'abc',
		});
		postJSON.should.have.been.calledWith('/cart/update.json', {
			'google-clientID': '111',
			littledata_updatedAt: sinon.match.number,
		});
		window.LittledataLayer.cart.should.include({
			token: 'abc',
		});
		window.LittledataLayer.cart.attributes.should.include({
			'google-clientID': '111',
		});
		window.LittledataLayer.should.include({
			'google-clientID': '111',
		});
	});

	it('never fetches cart if we already set this clientID', async () => {
		window.LittledataLayer['google-clientID'] = '123';
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.not.have.been.called;
	});

	it('never fetches cart if we have a cart token', async () => {
		window.LittledataLayer.cart = cart;
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.not.have.been.called;
	});

	it('handles de-bounces multiple requests', async () => {
		setClientID('111', 'google');
		await timeoutPromise(50);
		setClientID('aaa', 'segment');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.calledOnce;
		postJSON.should.have.been.calledWith(sinon.match(/clientID\/store/), {
			'google-clientID': '111',
			'segment-clientID': 'aaa',
			cartID: 'abc',
		});
		postJSON.should.have.been.calledWith('/cart/update.json', {
			'google-clientID': '111',
			'segment-clientID': 'aaa',
			littledata_updatedAt: sinon.match.number,
		});
	});

	it('aborts if Shopify does not return cart token', async () => {
		getJSON.withArgs('/cart.json').resolves({});
		setClientID('111', 'google');
		await timeoutPromise(1200); //a bit longer than 1s timeout
		getJSON.should.have.been.called;
		postJSON.should.not.have.been.called;
	});
});

const timeoutPromise = (milliseconds: number) => {
	return new Promise(resolve => {
		window.setTimeout(resolve, milliseconds);
	});
};
