import 'regenerator-runtime/runtime';
import { clientID, CustomWindow } from '../../index';
import { httpRequest } from './httpRequest';

declare let window: CustomWindow;

let postCartTimeout: any;

const attributes: Cart.Attributes = {}; //persist any previous attributes sent from this page
const cartOnlyAttributes: LooseObject = {};

export const setClientID = (clientId: string, platform: 'google' | 'segment' | 'email') => {
	if (typeof clientId !== 'string' || clientId.length === 0) return;
	const clientIDProperty = `${platform}-clientID` as clientID;
	if (window.LittledataLayer[clientIDProperty]) {
		return;
	}
	const lastPostedString = window.localStorage.getItem(`littledata-${clientIDProperty}`);
	if (lastPostedString && isLessThanOneHourAgo(Number(lastPostedString))) {
		return;
	}
	window.LittledataLayer[clientIDProperty] = clientId;
	(attributes as any)[clientIDProperty] = clientId;

	clearTimeout(postCartTimeout);
	// timeout is to allow 2 client IDs posted within 1 second
	// to be included in the same cart update
	postCartTimeout = setTimeout(() => {
		// first check if attributes are already stored on the cart
		getCartWithToken().then((cart: Cart.RootObject) => {
			postCartToLittledata(cart);
			postCartTokenClientIdToLittledata(cart.token);
			postCartToShopify({ ...attributes, littledata_updatedAt: new Date().getTime() });
		});
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

export const getCartWithToken = async (): Promise<void | Cart.RootObject> => {
	let { cart } = window.LittledataLayer;
	let cartToken = cart && cart.token;
	if (cartToken) return cart;
	return httpRequest
		.getJSON('/cart.json')
		.then((cart: Cart.RootObject) => {
			if (!cart.token) {
				throw new Error('cart had no cart token');
			}
			window.LittledataLayer.cart = cart;
			return cart;
		})
		.catch(error => {
			console.error('Littledata tracker unable to fetch cart token from Shopify', error);
			return;
		});
};

const postCartToShopify = async (attributes: object) => {
	httpRequest.postJSON('/cart/update.json', attributes).then((updatedCart: Cart.RootObject) => {
		window.LittledataLayer.cart = {
			...window.LittledataLayer.cart,
			...updatedCart,
		};
		addAttributesToLocalStorage(attributes);
		return updatedCart;
	});
};

const postCartToLittledata = async (cart: Cart.RootObject) => {
	const updatedAt = attributes.littledata_updatedAt;
	// 60 minutes is the time cart is cached in Redis
	if (!updatedAt || isLessThanOneHourAgo(updatedAt)) return;
	const url = `${window.LittledataLayer.transactionWatcherURL}/cart/store`;
	httpRequest.postJSON(url, cart);
};

const postCartTokenClientIdToLittledata = async (cartID: string) => {
	const url = `${window.LittledataLayer.transactionWatcherURL}/v2/clientID/store`;
	httpRequest.postJSON(url, {
		...attributes,
		cartID,
	});
};

const addAttributesToLocalStorage = (attributes: Cart.Attributes) => {
	Object.keys(attributes).forEach(attribute => {
		window.localStorage.setItem(`littledata-${attribute}`, String(Date.now()));
	});
};

const isLessThanOneHourAgo = (updatedAt: number) => {
	const dateUpdated = new Date(Number(updatedAt));
	const oneHour = 60 * 60 * 1000;
	const timePassed = Date.now() - Number(dateUpdated);
	return timePassed < oneHour;
};
