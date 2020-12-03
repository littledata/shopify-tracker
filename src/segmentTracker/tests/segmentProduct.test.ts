import { Detail } from '../../..';
import { expect } from 'chai';
import { segmentProduct } from '../helpers/segmentProduct';

const productView: Detail = {
	id: 'VN-01-burgandy-4',
	name: 'VANS |AUTHENTIC | LO PRO | BURGANDY/WHITE',
	price: '29.00',
	brand: 'VANS',
	category: 'SHOES',
	variant: '4 / burgandy',
	list_position: 5,
	list_name: '/',
	list: '/',
	handle: 'vans-authentic-lo-pro-burgandy-white',
	shopify_product_id: '4169037119550',
	shopify_variant_id: '30293801304126',
	compare_at_price: '99.95',
};

describe('segmentProduct function', () => {
	it('should return product with correct types', () => {
		expect(segmentProduct(productView)).to.contain({
			shopify_product_id: productView.shopify_product_id,
			sku: productView.id,
			price: 29,
			position: 5,
		});
	});
});
