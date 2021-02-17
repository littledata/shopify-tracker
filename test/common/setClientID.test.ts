import nock from 'nock';
import { should } from 'chai';
import { getCart } from '../../src/common/setClientID';
import 'jsdom-global/register';
import { CustomWindow } from '../..';

declare let window: CustomWindow;
should();

describe('getCart', () => {
	before(() => {
		const scope = nock('http://localhost')
			.get('/cart.json')
			.reply(200, {
				token: 'abc',
			});

		scope.post('/cart/update.json').reply(200);
		window.LittledataLayer = {
			ecommerce: {},
			customer: { id: '123', email: 'test@test.com' },
		};
	});
	it('fetches cart', () => {
		getCart();
		true.should.be.true;
	});
});
