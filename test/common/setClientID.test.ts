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

describe('getCart', () => {
	let postJSON: any;
	let getJSON: any;
	before(() => {
		postJSON = sinon.stub(httpRequest, 'postJSON');
		getJSON = sinon.stub(httpRequest, 'getJSON');
		postJSON.withArgs('/cart/update.json', sinon.match.object).resolves({
			shoe: 1,
		});
		window.LittledataLayer = {
			ecommerce: {},
			customer: { id: '123', email: 'test@test.com' },
		};
	});
	it('fetches cart', () => {
		setClientID('111', 'google');
		getJSON.should.have.been.called();
		postJSON.should.have.been.called();
	});
});
