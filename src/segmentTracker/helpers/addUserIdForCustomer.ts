import { MD5 } from '../../common/cryptoMD5';

const hash = (string: string) => MD5(string).toString();

export const addUserIdForCustomer = (LittledataLayer: OwnLayer) => {
	const { customer, segmentUserId } = LittledataLayer;
	if (!customer || !segmentUserId) return {};

	switch (segmentUserId) {
		case 'shopifyCustomerId':
			return { userId: String(customer.id) };
		case 'email':
			if (!customer.email) return {};
			return { userId: customer.email };
		case 'md5EmailHash':
			if (!customer.email) return {};
			return { userId: hash(customer.email) };
		case 'none':
			return {};
		default:
			return {};
	}
};
