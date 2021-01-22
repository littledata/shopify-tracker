import { should } from 'chai';
import { addUserIdForCustomer } from '../../src/segmentTracker/helpers/addUserIdForCustomer';
import { customer } from './fakeCustomerObject';

should();

const LittledataLayer: OwnLayer = {
	ecommerce: {},
};

describe('addUserIdForCustomer', () => {
	it('returns empty object if no user', () => {
		const userId = addUserIdForCustomer(LittledataLayer);
		userId.should.deep.equal({});
	});

	it('returns empty object if customer but segmentUserId is none', async () => {
		LittledataLayer.segmentUserId = 'none';
		LittledataLayer.customer = customer;
		const userId = addUserIdForCustomer(LittledataLayer);
		userId.should.deep.equal({});
	});

	it('returns userId as shopifyCustomerId', () => {
		LittledataLayer.segmentUserId = 'shopifyCustomerId';
		LittledataLayer.customer = customer;
		const userId = addUserIdForCustomer(LittledataLayer);
		userId.should.deep.equal({
			userId: String(customer.id),
		});
	});

	it('returns userId as email', () => {
		LittledataLayer.segmentUserId = 'email';
		LittledataLayer.customer = customer;
		const userId = addUserIdForCustomer(LittledataLayer);
		userId.should.deep.equal({
			userId: String(customer.email),
		});
	});

	it('returns userId as md5EmailHash', () => {
		LittledataLayer.segmentUserId = 'md5EmailHash';
		LittledataLayer.customer = customer;
		const userId = addUserIdForCustomer(LittledataLayer);
		userId.should.deep.equal({
			userId: '969daf6e3a99f7c72fd330af0b432435',
		});
	});

	it('returns Shopify customer ID if not specified', () => {
		LittledataLayer.segmentUserId = undefined;
		LittledataLayer.customer = customer;
		const userId = addUserIdForCustomer(LittledataLayer);
		userId.should.deep.equal({
			userId: String(customer.id),
		});
	});
});
