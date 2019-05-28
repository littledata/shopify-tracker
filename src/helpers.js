/* global ga, LittledataLayer */
/* eslint no-var: 0 */

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

export const hasLocalStorage = (function () {
	try {
		localStorage.setItem('littledata_test_storage', 'test');
		localStorage.removeItem('littledata_test_storage');
		return true;
	} catch (ex) {
		return false;
	}
}())

export const getElementsByHref = (hrefContaining) => {
	const htmlCollection = document.getElementsByTagName('a')
	return Array.prototype.slice.call(htmlCollection)
		.filter(element => element.href && element.href.includes(hrefContaining))
}

export const findDataLayerProduct = link => LittledataLayer.ecommerce.impressions.find(p => {
	const linkSplit = link.split('/products/')
	const productLink = linkSplit && linkSplit[1]
	return productLink === p.handle
})

export const productListClicks = function (clickTag) {
	/* product list clicks */
	if (!LittledataLayer.productClicks) return
	getElementsByHref('/products') // only add event to products
		.addEventListener('click', function (ev) {
			var self = this;
			var product = findDataLayerProduct(self.href)

			if (product) {
				ev.preventDefault();
				/* only wait 1 second before redirecting */
				self.timeout = window.setTimeout(function () {
					document.location = self.href;
				}, 1000)
				if (hasLocalStorage) {
					localStorage.list = document.location.pathname;
				}
				clickTag(product, self)
			} else {
				document.location = self.href;
			}
		})
}

export const setClientID = function (getClientId) {
	setTimeout(function () {
		ga(function () {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', '/cart/update');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send({ attributes: { clientID: getClientId() } })
		});
	}, 1000)
}

export function removePii(string) {
	var piiRegex = {
		email: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
		postcode: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/,
	};
	var dlRemoved = string;
	var key;
	for (key in piiRegex) {
		dlRemoved = dlRemoved.replace(piiRegex[key], 'REMOVED');
	}
	return dlRemoved;
}

export const guid = (function () {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}())

export const getCookie = ({ name }) => {
	if (document.cookie.length > 0) {
		let cookieStart = document.cookie.indexOf(`${name}=`);
		if (cookieStart !== -1) {
			cookieStart = cookieStart + name.length + 1;
			let cookieEnd = document.cookie.indexOf(';', cookieStart);
			if (cookieEnd === -1) {
				cookieEnd = document.cookie.length;
			}
			return unescape(document.cookie.substring(cookieStart, cookieEnd));
		}
	}
	return '';
};

export function getPersistentClientId() {
	// needed because Safari wipes 1st party cookies
	// so we need to persist over localStorage, if available
	const cookieClientId = getCookie('_ga')

	if (hasLocalStorage && !LittledataLayer.enhancePrivacy) {
		const localClientId = localStorage.getItem('_ga')
		// prefer local storage version, as it was set by this function
		if (localClientId) return localClientId
		if (cookieClientId) { // set it to local storage for next time
			localStorage.setItem('_ga', cookieClientId)
		}
	}

	if (cookieClientId) return cookieClientId
	// no id from either, so create new
	const thisGuid = ga.getAll()[0].get('clientId')
	// and set localstorage - gtag will do this for cookie
	try {
		localStorage.setItem('_ga', thisGuid)
	} catch (e) {
		return thisGuid
	}

	return thisGuid
}
