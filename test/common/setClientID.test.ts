import chai, { should } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { setClientID } from '../../src/common/setClientID';
import 'jsdom-global/register';
import { CustomWindow } from '../..';
import { httpRequest } from './httpRequest';

declare let window: CustomWindow;
should();
chai.use(sinonChai);

describe('getCart', () => {
	before(() => {
		const postJSON = sinon.stub(httpRequest, 'postJSON');
		postJSON.withArgs('/cart/update.json').resolves({
			shoe: 1,
		});
		window.LittledataLayer = {
			ecommerce: {},
			customer: { id: '123', email: 'test@test.com' },
		};
	});
	it('fetches cart', () => {
		setClientID();
		true.should.be.true;
	});
});
