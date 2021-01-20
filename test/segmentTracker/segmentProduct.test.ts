import { Detail } from '../../';
import { should } from 'chai';
import { segmentProduct } from '../../src/segmentTracker/helpers/segmentProduct';
declare let window: CustomWindow;

should();

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
	image_url: 'https://images.shopify.com/image',
};

describe('segmentProduct function', () => {
	beforeEach(() => {
		global.window = {
			document: {
				//@ts-ignore
				location: {
					origin: 'https//mystore.com',
				},
			},
		};
	});
	it('should return product with correct types', () => {
		segmentProduct(productView).should.deep.equal({
			shopify_product_id: productView.shopify_product_id,
			shopify_variant_id: productView.shopify_variant_id,
			sku: productView.id,
			product_id: productView.id, //we know this to be incorrect but its a big change
			price: 29,
			position: 5,
			compare_at_price: productView.compare_at_price,
			variant: productView.variant,
			brand: productView.brand,
			category: productView.category,
			name: productView.name,
			url: 'https//mystore.com/products/vans-authentic-lo-pro-burgandy-white',
			image_url: 'https://images.shopify.com/image',
		});
	});

	it('should omit undefined fields', () => {
		const limitedProduct: Detail = {
			...productView,
			list_position: undefined,
			image_url: '',
			compare_at_price: undefined,
		};
		segmentProduct(limitedProduct).should.not.have.own.property('position');
		segmentProduct(limitedProduct).should.not.have.own.property('image_url');
		segmentProduct(limitedProduct).should.not.have.own.property('compare_at_price');
	});
});
