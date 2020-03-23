export default () => {
	const detail = LittledataLayer.ecommerce.detail;
	if (!detail) return null;

	// Is the variant ID specified in the URL?
	// variant is a 8 to 20 digit number like 31524084842532
	const matches = document.location.href.match(/[0-9]{8,20}/);
	const variantId = matches && Number(matches[0]);
	if (variantId) {
		//find variant in the list of variants
		const variantList = LittledataLayer.ecommerce.variants;
		if (variantList) {
			const variant = variantList.find(obj => obj.id === variantId);
			if (variant) {
				detail.id = variant.sku;
				detail.variant = variant.title;
			}
		}
	}

	return detail;
};
