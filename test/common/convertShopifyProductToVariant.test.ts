import sampleShopifyProduct from './sampleShopifyProduct';
import { should } from 'chai';
import 'jsdom-global/register';
import { convertShopifyProductToVariant } from '../../src/common/convertShopifyProductToVariant';
import { CustomWindow } from '../..';

declare let window: CustomWindow;
should();

const firstVariant = '2114336302703';

describe('convertShopifyProductToVariant', () => {
	beforeEach(() => {
		window.LittledataLayer = { ecommerce: {} };
	});

	it('adds standard GA fields', () => {
		convertShopifyProductToVariant(sampleShopifyProduct, firstVariant).should.deep.equal({
			id: 'ABC',
			name: 'Inox tap - CH',
			price: '10.00',
			brand: 'rares-ultimate-store',
			category: 'Coat',
			variant: 'Default Title',
			list_name: document.location.pathname,
			handle: 'robinet-inox',
			shopify_product_id: '2035740541017',
			shopify_variant_id: firstVariant,
			compare_at_price: '',
			image_url:
				'https://cdn.shopify.com/s/files/1/0032/3397/2313/products/robinet-de-salle-de-bain-robinet-de-cuisine-inox-r.jpg?v=1571760693',
		});
	});

	it('uses pageType as list name if usePageTypeForListName is set', () => {
		window.LittledataLayer = { ecommerce: {}, pageType: 'collection', usePageTypeForListName: true };

		convertShopifyProductToVariant(sampleShopifyProduct, firstVariant).should.include({
			list_name: 'collection',
		});
	});

	it('adds list_position', () => {
		convertShopifyProductToVariant(sampleShopifyProduct, firstVariant).should.not.include({
			list_position: 5,
		});
		convertShopifyProductToVariant(sampleShopifyProduct, firstVariant, 5).should.include({
			list_position: 5,
		});
	});

	it('handles product with no images', () => {
		convertShopifyProductToVariant(
			{ ...sampleShopifyProduct, image: null, images: [] },
			firstVariant,
		).should.include({
			image_url: '',
		});
	});
});
