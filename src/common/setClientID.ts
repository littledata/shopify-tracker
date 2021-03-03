import { clientID, CustomWindow } from '../../index';
import { httpRequest } from './httpRequest';

declare let window: CustomWindow;

let postCartTimeout: any;

const attributes: Cart.Attributes = {}; //persist any previous attributes sent from this page
const cartOnlyAttributes: LooseObject = {};

export const setClientID = (clientId: string, platform: 'google' | 'segment' | 'email') => {
	if (typeof clientId !== 'string' || clientId.length === 0) return;
	const clientIDProperty = `${platform}-clientID` as clientID;
	if (
		window.LittledataLayer[clientIDProperty] ||
		(window.LittledataLayer.cart && window.LittledataLayer.cart.attributes[clientIDProperty])
	) {
		return;
	}

	window.LittledataLayer[clientIDProperty] = clientId;
	attributes[clientIDProperty] = clientId;

	clearTimeout(postCartTimeout);
	// timeout is to allow 2 client IDs posted within 1 second
	// to be included in the same cart update
	postCartTimeout = setTimeout(() => {
		getCartWithToken().then((cart: Cart.RootObject) => {
			postCartToLittledata(cart);
			postCartTokenClientIdToLittledata(cart);
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

export const getCartWithToken = (): Promise<void | Cart.RootObject> => {
	return httpRequest
		.getJSON('/cart.json')
		.then((cart: Cart.RootObject) => {
			if (!cart.token) {
				throw new Error('cart had no cart token');
			}
			window.LittledataLayer.cart = cart;
			return checkCartHasAttributes(cart);
		})
		.catch(error => {
			console.error('Littledata tracker unable to fetch cart token from Shopify', error);
			return;
		});
};

const checkCartHasAttributes = (cart: Cart.RootObject): Promise<void | Cart.RootObject> => {
	// until the attributes are added to cart, the cart token is not stable
	// when cart/update is successful, and the cart is created, we can expect a stable cart
	console.log(cart.attributes.littledata_updatedAt);
	if (cart.attributes.littledata_updatedAt) {
		return Promise.resolve(cart);
	}
	// after cart/update is successful, and the cart is created, we can expect a stable cart token
	return postCartToShopify({ ...attributes, littledata_updatedAt: new Date().getTime() }).then(() => {
		return getCartWithToken();
	});
};

const postCartToShopify = (attributes: object) => {
	return httpRequest.postJSON('/cart/update.json', { attributes }).then((updatedCart: Cart.RootObject) => {
		window.LittledataLayer.cart = {
			...window.LittledataLayer.cart,
			...updatedCart,
		};
		return updatedCart;
	});
};

const postCartToLittledata = (cart: Cart.RootObject) => {
	const updatedAt = attributes.littledata_updatedAt;
	// 60 minutes is the time cart is cached in Redis
	const oneHourInMilliseconds = 60 * 60 * 1000;
	if (!updatedAt || isLessThanMillisecondsAgo(updatedAt, oneHourInMilliseconds)) return;
	const url = `${window.LittledataLayer.transactionWatcherURL}/cart/store`;
	httpRequest.postJSON(url, cart);
};

const postCartTokenClientIdToLittledata = (cart: Cart.RootObject) => {
	const updatedAt = cart.attributes.littledata_updatedAt;
	if (!isLessThanMillisecondsAgo(updatedAt, 2000)) return;
	// cart was only just updated and we should send cart token
	const cartID = cart.token;
	const url = `${window.LittledataLayer.transactionWatcherURL}/v2/clientID/store`;
	httpRequest.postJSON(url, {
		...attributes,
		cartID,
	});
};

const isLessThanMillisecondsAgo = (updatedAt: string, milliseconds: number) => {
	const dateUpdated = new Date(Number(updatedAt));
	const timePassed = Date.now() - Number(dateUpdated);
	return timePassed < milliseconds;
};
