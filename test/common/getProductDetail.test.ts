import chai, { expect, should } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import getProductDetail from '../../src/common/getProductDetail';
import 'jsdom-global/register';
import 'mock-local-storage';
import { CustomWindow } from '../..';
import { httpRequest } from '../../src/common/httpRequest';
import sampleShopifyProduct from './sampleShopifyProduct';
import { convertShopifyProductToVariant } from '../../src/common/convertShopifyProductToVariant';

declare let window: CustomWindow;

should();
chai.use(sinonChai);

const detail = {
	brand: 'VANS',
	category: 'SHOES',
	compare_at_price: '99.95',
	handle: 'vans-authentic-lo-pro-burgandy-white',
	id: 'VN-01-burgandy-4',
	list: '/',
	list_name: '/',
	name: 'VANS |AUTHENTIC | LO PRO | BURGANDY/WHITE',
	price: '29.00',
	shopify_product_id: '4169037119550',
	shopify_variant_id: '30293801304126',
	variant: '4 / burgandy',
};

const pathname = '/collection/products/my-product';

describe('getProductDetail', () => {
	let getJSON: any;
	beforeEach(() => {
		delete window.location;
		//@ts-ignore
		window.location = {
			pathname,
			href: pathname,
		};

		window.LittledataLayer = { ecommerce: {} };
		//conflicts with long running tests from setClientID
		getJSON = sinon.stub(httpRequest, 'getJSON');
	});
	afterEach(() => {
		getJSON.restore();
	});
	it('returns product already in LittledataLayer', async () => {
		window.LittledataLayer = {
			ecommerce: {
				detail,
			},
		};
		const product = await getProductDetail();
		product.should.deep.equal({ ...detail, list_position: 1 });
	});

	it('returns null if no product or page type is found', async () => {
		const product = await getProductDetail();
		expect(product).to.be.null;
	});

	it('returns null if page type is not product', async () => {
		window.LittledataLayer.pageType = 'collection';
		const product = await getProductDetail();
		expect(product).to.be.null;
	});

	it('fetches product from Shopify and sets data layer with correct variant', async () => {
		window.LittledataLayer.pageType = 'product';
		window.location.href = `${pathname}?variant=794864237`;
		getJSON.resolves(sampleShopifyProduct);
		const expectedProduct = convertShopifyProductToVariant(sampleShopifyProduct, '794864237', 1);
		const product = await getProductDetail();
		getJSON.should.have.been.calledWith('/products/my-product.js');
		product.should.deep.equal(expectedProduct);
		window.LittledataLayer.ecommerce.detail.should.deep.equal(expectedProduct);
	});
});
