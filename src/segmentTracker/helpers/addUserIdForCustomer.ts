import { MD5 } from '../../common/cryptoMD5';

const hash = (string: string) => MD5(string).toString();

export const addUserIdForCustomer = (LittledataLayer: OwnLayer) => {
	const { customer, segmentUserId } = LittledataLayer;
	if (!customer) return {};

	switch (segmentUserId) {
		case 'email':
			if (!customer.email) return {};
			return { userId: customer.email };
		case 'md5EmailHash':
			if (!customer.email) return {};
			return { userId: hash(customer.email) };
		case 'none':
			return {};
		default:
			//before segmentUserId field was added
			return { userId: String(customer.id) };
	}
};
