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

export const hasLocalStorage = function () {
	try {
		localStorage.setItem('littledata_test_storage', 'test');
		localStorage.removeItem('littledata_test_storage');
		return true;
	} catch (ex) {
		return false;
	}
}

export const listViewScript = function (impressionTag, clickTag) {
	/* product list clicks */
	var htmlCollection = document.getElementsByTagName('a')
	Array.prototype.slice.call(htmlCollection)
		.filter(function () { return this.href.indexOf('/products') !== -1 }) /* only add event to products */
		.addEventListener('click', function (ev) {
			var self = this;
			var product = LittledataLayer.ecommerce.impressions.filter(function (p) {
				var linkSplit = self.href.split('/products/')
				var productLink = linkSplit && linkSplit[1]
				return productLink === p.handle
			})[0];

			if (product) {
				ev.preventDefault();
				/* only wait 1 second before redirecting */
				self.timeout = window.setTimeout(function () {
					document.location = self.href;
				}, 1000)
				if (hasLocalStorage) {
					localStorage.list = location.pathname;
				}
				clickTag(product, self)
			} else {
				document.location = self.href;
			}
		})

	window.setTimeout(function () {
		impressionTag()
	}, 500) /* wait for pageview to fire first */
}

export const setClientID = function () {
	setTimeout(function () {
		ga(function () {
			var clientID = ga.getByName(`gtag_${LittledataLayer.webPropertyId.replace(/-/g, '_')}`).get('clientId');
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/cart/update');
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send({ attributes: { clientID } })
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
