import { ShopifyProduct } from '../../shopifyProductInterface';
import { httpRequest } from './httpRequest';
import { Detail, CustomWindow } from '../..';
import { convertShopifyProductToVariant } from './convertShopifyProductToVariant';

declare let window: CustomWindow;
export default (): Promise<null | Detail> => {
	const variantId = findVariantInURL();
	const list_position = parseInt(window.localStorage.getItem('position')) || 1;
	//before snippet v9 the detail was added from Liquid
	let detail = window.LittledataLayer.ecommerce.detail;
	if (detail) {
		if (variantId) {
			detail.shopify_variant_id = variantId;
			//find variant in the list of variants
			const variantList = window.LittledataLayer.ecommerce.variants;
			if (variantList) {
				const variant = variantList.find((obj: LooseObject) => obj.id === variantId);
				if (variant) {
					detail.id = variant.sku;
					detail.variant = variant.title;
				}
			}
		}
		return Promise.resolve({ ...detail, list_position });
	}
	if (window.LittledataLayer.pageType === 'product') {
		const pathnameMatch = window.location.pathname.match(/\/products\/(.*)/);
		const productPath = pathnameMatch && pathnameMatch[0];
		if (!productPath) return Promise.resolve(null);
		return httpRequest.getJSON(`${productPath}.js`).then((product: ShopifyProduct) => {
			detail = convertShopifyProductToVariant(product, variantId, list_position);
			window.LittledataLayer.ecommerce.detail = detail;
			return detail;
		});
	}
	return Promise.resolve(null);
};

const findVariantInURL = () => {
	// Is the variant ID specified in the URL?
	// variant is a 8 to 20 digit number like 31524084842532
	const matches = window.location.href.match(/[0-9]{8,20}/);
	const variantId = matches && matches[0];
	return variantId;
};
