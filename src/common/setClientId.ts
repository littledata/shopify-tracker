import { clientID } from '../../index';
import { requestJSON } from './request';

let postCartTimeout: any;

const attributes: Cart.Attributes = {}; //persist any previous attributes sent from this page
const cartOnlyAttributes: LooseObject = {};

export function setClientID(clientId: string, platform: 'google' | 'segment' | 'email') {
	const clientIDProperty = `${platform}-clientID` as clientID;

	if (LittledataLayer[clientIDProperty]) return;
	LittledataLayer[clientIDProperty] = clientId;
	if (typeof clientId !== 'string' || clientId.length === 0) return;
	(attributes as any)[clientIDProperty] = clientId;

	clearTimeout(postCartTimeout);
	// timeout is to allow 2 client IDs posted within 1 second
	// to be included in the same cart update
	postCartTimeout = setTimeout(async function() {
		// first check if attributes are already stored on the cart
		const cart = (await getCart()) as Cart.RootObject;
		// @ts-ignore
		if (!cart || cart.attributes[clientIDProperty]) return;
		attributes.littledata_updatedAt = new Date().getTime();
		postCartToShopify(attributes);
	}, 1000);
}

export const setCartOnlyAttributes = (setAttributes: LooseObject) => {
	const toSet = Object.keys(setAttributes);
	let needsToSend = false;
	toSet.forEach((name: string) => {
		const fieldName = `littledata_${name}`;
		if (cartOnlyAttributes[fieldName] !== setAttributes[name]) {
			cartOnlyAttributes[fieldName] = setAttributes[name];
			needsToSend = true;
		}
	});
	if (needsToSend) postCartToShopify({ ...attributes, ...cartOnlyAttributes });
};

const getCart = async (): Promise<Cart.RootObject> => {
	let { cart } = LittledataLayer;
	let cartToken = cart && cart.token;
	if (cartToken) return cart;
	try {
		cart = (await requestJSON('/cart.json')) as Cart.RootObject;
	} catch (error) {
		console.error('Littledata tracker unable to fetch cart token from Shopify', error);
		return;
	}
	postCartToLittledata(cart);
	cartToken = cart.token;
	if (!cartToken) {
		throw new Error('cart had no cart token');
	}
	postCartTokenClientIdToLittledata(cartToken);
	return cart;
};

const postCartToShopify = (attributes: object, callback?: any) => {
	const cartUpdateReq = new XMLHttpRequest();
	cartUpdateReq.onload = () => {
		const updatedCart = JSON.parse(cartUpdateReq.response);
		LittledataLayer.cart = updatedCart;
		if (callback) {
			callback(updatedCart);
		}
	};
	cartUpdateReq.open('POST', '/cart/update.json');
	cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
	cartUpdateReq.send(
		JSON.stringify({
			attributes,
		}),
	);
};

function postCartToLittledata(cart: Cart.RootObject) {
	const { attributes } = cart;
	const updatedAt = attributes.littledata_updatedAt;
	if (!updatedAt) return;
	const clientIdCreated = new Date(Number(updatedAt));

	const expiryTime = 60 * 60 * 1000; // 60 minutes is the time cart is cached in Redis
	const timePassed = Date.now() - Number(clientIdCreated);
	// only need to resend cart if it's expired from our Redis cache
	if (timePassed < expiryTime) return;
	const httpRequest = new XMLHttpRequest(); // new HttpRequest instance
	httpRequest.open('POST', `${LittledataLayer.transactionWatcherURL}/cart/store`);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send(JSON.stringify(cart));
}

const postCartTokenClientIdToLittledata = (cartID: string) => {
	const clientIDReq = new XMLHttpRequest();
	clientIDReq.open('POST', `${LittledataLayer.transactionWatcherURL}/v2/clientID/store`);
	clientIDReq.setRequestHeader('Content-Type', 'application/json');
	clientIDReq.send(
		JSON.stringify({
			...attributes,
			cartID,
		}),
	);
};
