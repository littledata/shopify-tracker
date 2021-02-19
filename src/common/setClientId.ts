import { clientID, CustomWindow } from '../../index';
import { httpRequest } from './httpRequest';

declare let window: CustomWindow;

let postCartTimeout: any;

const attributes: Cart.Attributes = {}; //persist any previous attributes sent from this page
const cartOnlyAttributes: LooseObject = {};

export const setClientID = (clientId: string, platform: 'google' | 'segment' | 'email') => {
	const clientIDProperty = `${platform}-clientID` as clientID;

	if (window.LittledataLayer[clientIDProperty]) {
		return;
	}
	window.LittledataLayer[clientIDProperty] = clientId;
	if (typeof clientId !== 'string' || clientId.length === 0) return;
	(attributes as any)[clientIDProperty] = clientId;

	clearTimeout(postCartTimeout);
	// timeout is to allow 2 client IDs posted within 1 second
	// to be included in the same cart update
	postCartTimeout = setTimeout(async function() {
		// first check if attributes are already stored on the cart
		const cart = (await getCartWithToken()) as Cart.RootObject;
		postCartTokenClientIdToLittledata(cart.token);
		postCartToShopify({ ...attributes, littledata_updatedAt: new Date().getTime() });
	}, 1000);
};

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

export const getCartWithToken = async (): Promise<Cart.RootObject> => {
	let { cart } = window.LittledataLayer;
	let cartToken = cart && cart.token;
	if (cartToken) return cart;
	try {
		cart = (await httpRequest.getJSON('/cart.json')) as Cart.RootObject;
	} catch (error) {
		console.error('Littledata tracker unable to fetch cart token from Shopify', error);
		return;
	}
	postCartToLittledata(cart);
	if (!cart.token) {
		throw new Error('cart had no cart token');
	}
	window.LittledataLayer.cart = cart;
	return cart;
};

const postCartToShopify = async (attributes: object) => {
	const updatedCart = (await httpRequest.postJSON('/cart/update.json', attributes)) as Cart.RootObject;
	window.LittledataLayer.cart = {
		...window.LittledataLayer.cart,
		...updatedCart,
	};
	return updatedCart;
};

const postCartToLittledata = async (cart: Cart.RootObject) => {
	const updatedAt = attributes.littledata_updatedAt;
	if (!updatedAt) return;
	const clientIdCreated = new Date(Number(updatedAt));

	const expiryTime = 60 * 60 * 1000; // 60 minutes is the time cart is cached in Redis
	const timePassed = Date.now() - Number(clientIdCreated);
	// only need to resend cart if it's expired from our Redis cache
	if (timePassed < expiryTime) return;
	const url = `${window.LittledataLayer.transactionWatcherURL}/cart/store`;
	await httpRequest.postJSON(url, cart);
};

const postCartTokenClientIdToLittledata = async (cartID: string) => {
	const url = `${window.LittledataLayer.transactionWatcherURL}/v2/clientID/store`;
	await httpRequest.postJSON(url, {
		...attributes,
		cartID,
	});
};
