import { clientID, CustomWindow } from '../../index';
import { httpRequest } from './httpRequest';

declare let window: CustomWindow;

let postCartTimeout: any;

const cartOnlyAttributes: LooseObject = {};

export const setClientID = (clientId: string, platform: 'google' | 'segment' | 'email') => {
	window.LittledataLayer.attributes = window.LittledataLayer.attributes || {}; //persist any previous attributes sent from this page

	if (typeof clientId !== 'string' || clientId.length === 0) return;
	const clientIDProperty = `${platform}-clientID` as clientID;
	if (window.LittledataLayer.cart && window.LittledataLayer.cart.attributes[clientIDProperty]) {
		return;
	}

	window.LittledataLayer.attributes[clientIDProperty] = clientId;

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
	if (needsToSend) postCartToShopify({ ...window.LittledataLayer.attributes, ...cartOnlyAttributes });
};

export const getCartWithToken = (): Promise<void | Cart.RootObject> => {
	const { cart } = window.LittledataLayer;
	if (cart) return checkCartHasAttributes(cart);
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
	const attributesToSet = Object.keys(window.LittledataLayer.attributes);
	const attributesInCart = Object.keys(cart.attributes);
	const allAttributesInCart = attributesToSet.every(attribute => attributesInCart.includes(attribute));
	if (allAttributesInCart) {
		return Promise.resolve(cart);
	}
	// after cart/update is successful this will return a stable cart token
	return postCartToShopify({ ...window.LittledataLayer.attributes, littledata_updatedAt: new Date().getTime() });
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
	// 60 minutes is the time cart is cached in Redis
	const oneHourInMilliseconds = 60 * 60 * 1000;
	if (updatedAtLessThanMillisecondsAgo(cart, oneHourInMilliseconds)) return;
	const url = `${window.LittledataLayer.transactionWatcherURL}/cart/store`;
	httpRequest.postJSON(url, cart);
};

const postCartTokenClientIdToLittledata = (cart: Cart.RootObject) => {
	if (!updatedAtLessThanMillisecondsAgo(cart, 4000)) return;
	// cart was only just updated and we should send cart token
	const cartID = cart.token;
	const url = `${window.LittledataLayer.transactionWatcherURL}/v2/clientID/store`;
	httpRequest.postJSON(url, {
		...window.LittledataLayer.attributes,
		cartID,
	});
};

const updatedAtLessThanMillisecondsAgo = (cart: Cart.RootObject, milliseconds: number) => {
	const updatedAt = cart.attributes.littledata_updatedAt;
	if (!updatedAt) return false;
	const dateUpdated = new Date(Number(updatedAt));
	const timePassed = Date.now() - Number(dateUpdated);
	return timePassed < milliseconds;
};
