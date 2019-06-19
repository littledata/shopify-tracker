/* global LittledataLayer */
import checkLinker from './checkLinker'
import { getGaCookie } from './getGaCookie'

export const pageView = function (fireTag) {
	// delay page firing until the page is visible
	if (document.hidden === true) {
		let triggeredPageView = false;
		document.addEventListener('visibilitychange', function () {
			if (!document.hidden && !triggeredPageView) {
				fireTag();
				triggeredPageView = true;
			}
		});
	} else {
		fireTag()
	}
}

export const getElementsByHref = (regex) => {
	const htmlCollection = document.getElementsByTagName('a')
	const r = new RegExp(regex)
	return Array.prototype.slice.call(htmlCollection)
		.filter(element => element.href && r.test(element.href))
}

export const findDataLayerProduct = link => LittledataLayer.ecommerce.impressions.find(p => {
	const linkSplit = link.split('/products/')
	const productLink = linkSplit && linkSplit[1]
	return productLink === p.handle
})

export const productListClicks = function (clickTag) {
	/* product list clicks */
	if (!LittledataLayer.productClicks) return
	getElementsByHref('/products/').forEach(element => {
		element.addEventListener('click', function (ev) { // only add event to products
			const self = this;
			const product = findDataLayerProduct(self.href)

			if (product) {
				ev.preventDefault();
				/* only wait 1 second before redirecting */
				self.timeout = window.setTimeout(function () {
					document.location = self.href;
				}, 1000)

				clickTag(product, self)
			} else {
				document.location = self.href;
			}
		})
	})
}

function postClientID(getClientId) {
	setTimeout(function () {
		const clientID = getClientId()
		const updatedAt = new Date().getTime()
		const cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance
		cartUpdateReq.onload = function () {
			const updatedCart = JSON.parse(cartUpdateReq.response)
			const clientIDReq = new XMLHttpRequest()
			clientIDReq.open('POST', 'https://transactions-staging.littledata.io/clientID')
			clientIDReq.setRequestHeader('Content-Type', 'application/json');
			clientIDReq.send(JSON.stringify({ clientID, updatedAt, cartID: updatedCart.token }))
		}
		cartUpdateReq.open('POST', '/cart/update.json');
		cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
		cartUpdateReq.send(JSON.stringify({ attributes: { clientID, updatedAt } }))
	}, 1000)
}

function postCartToLittledata(cart) {
	const httpRequest = new XMLHttpRequest(); // new HttpRequest instance
	httpRequest.open('POST', 'https://transactions-staging.littledata.io/cart/store')
	httpRequest.setRequestHeader('Content-Type', 'application/json')
	httpRequest.send(JSON.stringify(cart))
}

export function setClientID(getClientId) {
	const { cart } = LittledataLayer
	if (!cart || !cart.attributes || !cart.attributes.clientID || !cart.attributes.updatedAt) return postClientID(getClientId)

	const clientIdCreated = new Date(parseInt(cart.attributes.updatedAt))
	const timeout = 60 * 60 * 1000 // 60 minutes
	const timePassed = new Date() - clientIdCreated
	// only need to resent client ID if it's expired from our Redis cache
	if (timePassed > timeout) {
		postClientID(getClientId)
		postCartToLittledata(cart)
	}
}

export function removePii(string) {
	const piiRegex = {
		email: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
		postcode: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/,
	};
	let dlRemoved = string;
	let key;
	for (key in piiRegex) {
		dlRemoved = dlRemoved.replace(piiRegex[key], 'REMOVED');
	}
	return dlRemoved;
}

export const guid = (function () {
	function s10() {
		return Math.floor((Math.random()) * 10E9)
	}
	return `GA1.2.${s10()}.${s10()}`
}())

// const createCookie = (name, value, days) => {
// 	let expires = ''
// 	if (days) {
// 		const date = new Date();
// 		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
// 		expires = `; expires=${date.toGMTString()}`
// 	}
// 	document.cookie = `${name}=${value}${expires}; path=/;`
// }

export function getPersistentClientId() {
	// needed because Safari wipes 1st party cookies
	// so we need to persist over localStorage, if available

	// ignore this and return undefined if we have linker params
	if (checkLinker()) return

	if (window.localStorage && LittledataLayer.persistentUserId) {
		const localClientId = window.localStorage.getItem('_ga')
		// prefer local storage version, as it was set by this function
		if (localClientId) return localClientId

		const cookieClientId = getGaCookie()
		if (cookieClientId) { // set it to local storage for next time
			window.localStorage.setItem('_ga', cookieClientId)
			return cookieClientId
		}
	}

	// returning an empty client id will cause gtag to create a new one
	return ''
}

export function getPersistentClientIdSegment() {
	// needed because Safari wipes 1st party cookies
	// so we need to persist over localStorage, if available

	if (!window.analytics || !window.analytics.user()) return ''

	if (window.localStorage && LittledataLayer.persistentUserId) {
		const localClientId = window.localStorage.getItem('_ga')
		// prefer local storage version, as it was set by this function
		if (localClientId) return localClientId

		const cookieClientId = window.analytics.user().anonymousId()
		if (cookieClientId) { // set it to local storage for next time
			window.localStorage.setItem('_ga', cookieClientId)
			return cookieClientId
		}
	}

	// returning an empty client id will cause gtag to create a new one
	return ''
}

export const trackProductImageClicks = (clickTag) => {
	getElementsByHref('^https://cdn\.shopify\.com/s/files/.*/products/').forEach(element => {
		element.addEventListener('click', function () { // only add event to product images
			const image = this.getElementsByTagName('img')[0]
			const name = image && image.alt

			clickTag(name)
		})
	})
}

export const trackSocialShares = clickTag => {
	const networks = '(facebook|pinterest|twitter|linkedin|plus\.google|instagram)'
	getElementsByHref(`${networks}\.com/(share|pin|intent)`).forEach(element => {
		element.addEventListener('click', function () {
			const match = this.href.match(new RegExp(networks))
			clickTag(match && match[0])
		})
	})
}
