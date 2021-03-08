import sampleShopifyProduct from './sampleShopifyProduct';
import { should } from 'chai';
import 'jsdom-global/register';
import { convertShopifyProductToVariant } from '../../src/common/convertShopifyProductToVariant';
import { CustomWindow } from '../..';

declare let window: CustomWindow;
should();

describe('convertShopifyProductToVariant', () => {
	beforeEach(() => {
		window.LittledataLayer = { ecommerce: {} };
	});

	it('adds standard GA fields', () => {
		convertShopifyProductToVariant(sampleShopifyProduct, '794864229').should.deep.equal({
			id: '329678821',
			name: 'Red Rain Coat',
			price: '129.00',
			brand: 'Shopify',
			category: 'Coat',
			variant: 'Small',
			list_name: document.location.pathname,
			handle: 'red-rain-coat',
			shopify_product_id: '329678821',
			shopify_variant_id: '794864229',
			compare_at_price: null,
			image_url: 'https://cdn.shopify.com/s/files/1/0040/7092/products/red-rain-coat.jpeg?v=1402604893',
		});
	});

	it('uses pageType as list name if usePageTypeForListName is set', () => {
		window.LittledataLayer = { ecommerce: {}, pageType: 'collection', usePageTypeForListName: true };

		convertShopifyProductToVariant(sampleShopifyProduct, '794864229').should.include({
			list_name: 'collection',
		});
	});

	it('adds list_position', () => {
		convertShopifyProductToVariant(sampleShopifyProduct, '794864229').should.not.include({
			list_position: 5,
		});
		convertShopifyProductToVariant(sampleShopifyProduct, '794864229', 5).should.include({
			list_position: 5,
		});
	});

	it('handles product with no images', () => {
		convertShopifyProductToVariant({ ...sampleShopifyProduct, images: [] }, '794864229').should.include({
			image_url: '',
		});
	});
});
