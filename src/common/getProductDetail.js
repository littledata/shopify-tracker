const gaProductFields = ['name', 'id', 'price', 'brand', 'category', 'variant', 'list', 'list_name', 'position'];

export default isGAProduct => {
	const dlDetail = LittledataLayer.ecommerce.detail;
	if (!dlDetail) return null;

	let detail = {};
	if (isGAProduct) {
		gaProductFields.forEach(field => {
			if (dlDetail[field]) detail[field] = dlDetail[field];
		});
	} else {
		detail = {
			...dlDetail,
		};
	}

	// Is the variant ID specified in the URL?
	// variant is a 8 to 20 digit number like 31524084842532
	const matches = document.location.href.match(/[0-9]{8,20}/);
	const variantId = matches && Number(matches[0]);
	if (variantId) {
		LittledataLayer.ecommerce.detail.variantId = variantId;
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
