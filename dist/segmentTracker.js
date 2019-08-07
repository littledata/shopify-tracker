/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageView", function() { return pageView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementsByHref", function() { return getElementsByHref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDataLayerProduct", function() { return findDataLayerProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productListClicks", function() { return productListClicks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setClientID", function() { return setClientID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePii", function() { return removePii; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guid", function() { return guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPersistentClientId", function() { return getPersistentClientId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackProductImageClicks", function() { return trackProductImageClicks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackSocialShares", function() { return trackSocialShares; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLittledataLayer", function() { return validateLittledataLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "advertiseLD", function() { return advertiseLD; });
/* harmony import */ var _checkLinker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _getGaCookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


/**
 *
 * @param fireTag - callback to call when willing to fire pageviews
 */
const pageView = (fireTag) => {
    if (document.hidden === true) {
        // delay page firing until the page is visible
        let triggeredPageView = false;
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden && !triggeredPageView) {
                fireTag();
                triggeredPageView = true;
            }
        });
    }
    else if (document.readyState === 'loading') {
        //delay until DOM is ready
        document.addEventListener('DOMContentLoaded', function () {
            fireTag();
        });
    }
    else {
        fireTag();
    }
};
const getElementsByHref = (regex) => {
    const htmlCollection = document.getElementsByTagName('a');
    const r = new RegExp(regex);
    return Array.prototype.slice
        .call(htmlCollection)
        .filter((element) => element.href && r.test(element.href));
};
const findDataLayerProduct = (link) => LittledataLayer.ecommerce.impressions.find(p => {
    const linkSplit = link.split('/products/');
    const productLink = linkSplit && linkSplit[1];
    return productLink === p.handle;
});
const productListClicks = (clickTag) => {
    /* product list clicks */
    if (!LittledataLayer.productClicks)
        return;
    getElementsByHref('/products/').forEach((element) => {
        element.addEventListener('click', function (ev) {
            // only add event to products
            const product = findDataLayerProduct(this.href);
            if (product) {
                ev.preventDefault();
                /* only wait 1 second before redirecting */
                element.timeout = window.setTimeout(function () {
                    document.location.href = element.href;
                }, 1000);
                clickTag(product, element);
            }
            else {
                document.location.href = element.href;
            }
        });
    });
};
function postClientID(getClientId, googleClientID) {
    setTimeout(function () {
        const clientID = getClientId();
        const updatedAt = new Date().getTime();
        const cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance
        const attributes = {
            clientID,
            updatedAt,
            googleClientID,
        };
        cartUpdateReq.onload = function () {
            const updatedCart = JSON.parse(cartUpdateReq.response);
            const clientIDReq = new XMLHttpRequest();
            clientIDReq.open('POST', `${LittledataLayer.transactionWatcherURL}/clientID`);
            clientIDReq.setRequestHeader('Content-Type', 'application/json');
            clientIDReq.send(JSON.stringify({
                ...attributes,
                cartID: updatedCart.token,
            }));
        };
        cartUpdateReq.open('POST', '/cart/update.json');
        cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
        cartUpdateReq.send(JSON.stringify({
            attributes,
        }));
    }, 1000);
}
function postCartToLittledata(cart) {
    const httpRequest = new XMLHttpRequest(); // new HttpRequest instance
    httpRequest.open('POST', `${LittledataLayer.transactionWatcherURL}/cart/store`);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(JSON.stringify(cart));
}
function getGAClientId() {
    return window.ga.getAll()[0].get('clientId');
}
function setClientID(getClientId, fetchGAClientId) {
    const { cart } = LittledataLayer;
    if (!cart || !cart.attributes || !cart.attributes.clientID || !cart.attributes.updatedAt) {
        return postClientID(getClientId, fetchGAClientId && getGAClientId());
    }
    const clientIdCreated = new Date(cart.attributes.updatedAt);
    const timeout = 60 * 60 * 1000; // 60 minutes
    const timePassed = Date.now() - Number(clientIdCreated);
    // only need to resent client ID if it's expired from our Redis cache
    if (timePassed > timeout) {
        postCartToLittledata(cart);
        setTimeout(() => {
            if (!fetchGAClientId)
                return postClientID(getClientId);
            window.ga(() => {
                postClientID(getClientId, getGAClientId());
            });
        }, 10000); // allow 10 seconds for our server to register cart until updating it, otherwise there's a race condition between storing and a webhook triggered by this
    }
}
function removePii(str) {
    const piiRegexs = [
        {
            key: 'email',
            regex: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
        },
        {
            key: 'postcode',
            regex: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/,
        },
    ];
    return piiRegexs.reduce((memo, curr) => memo.replace(curr.regex, 'REMOVED'), str);
}
/**
 * guid
 */
const guid = (function () {
    function s10() {
        return Math.floor(Math.random() * 10e9);
    }
    return `GA1.2.${s10()}.${s10()}`;
})();
// const createCookie = (name, value, days) => {
// 	let expires = ''
// 	if (days) {
// 		const date = new Date();
// 		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
// 		expires = `; expires=${date.toGMTString()}`
// 	}
// 	document.cookie = `${name}=${value}${expires}; path=/;`
// }
function getPersistentClientId() {
    // needed because Safari wipes 1st party cookies
    // so we need to persist over localStorage, if available
    // ignore this and return undefined if we have linker params
    if (Object(_checkLinker__WEBPACK_IMPORTED_MODULE_0__["default"])())
        return;
    if (window.localStorage && LittledataLayer.persistentUserId) {
        const localClientId = window.localStorage.getItem('_ga');
        // prefer local storage version, as it was set by this function
        if (localClientId)
            return localClientId;
        const cookieClientId = Object(_getGaCookie__WEBPACK_IMPORTED_MODULE_1__["getGaCookie"])();
        if (cookieClientId) {
            // set it to local storage for next time
            window.localStorage.setItem('_ga', cookieClientId);
            return cookieClientId;
        }
    }
    // returning an empty client id will cause gtag to create a new one
    return '';
}
const trackProductImageClicks = (clickTag) => {
    getElementsByHref('^https://cdn.shopify.com/s/files/.*/products/').forEach(element => {
        element.addEventListener('click', function () {
            // only add event to product images
            const image = this.getElementsByTagName('img')[0];
            const name = image && image.alt;
            clickTag(name);
        });
    });
};
const trackSocialShares = (clickTag) => {
    const networks = '(facebook|pinterest|twitter|linkedin|plus.google|instagram)';
    getElementsByHref(`${networks}\.com/(share|pin|intent)`).forEach(element => {
        element.addEventListener('click', function () {
            const match = this.href.match(new RegExp(networks));
            clickTag(match && match[0]);
        });
    });
};
const validateLittledataLayer = () => {
    if (!window.LittledataLayer) {
        throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
    }
};
const advertiseLD = () => {
    if (!LittledataLayer.hideBranding) {
        console.log('%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/littledata \n', 'color: #088f87;'); //eslint-disable-line
    }
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */

//from https://gist.github.com/sahava/f3718f981bb01768c0eba714ee94e2d2
/* harmony default export */ __webpack_exports__["default"] = (function(str) {

  // First browser fingerprint method.
  // Uses the clientId / gid string, user agent, time, and browser plugin descriptions.
  var joiner = function (cidGid, offset) {
    var a = new Date,
        b = window.navigator,
        c = b.plugins || [];
    var d = [cidGid, b.userAgent, a.getTimezoneOffset(), a.getYear(), a.getDate(), a.getHours(), a.getMinutes() + offset];
    for (var e = 0; e < c.length; ++e) {
      d.push(c[e].description);
    }
    return jumble(d.join('.'));
  };

  // Second browser fingerprint method.
  // Uses the clientId / gid string, time, user agent, browser language.
  var joiner2 = function (cidGid, offset) {
    var a = new Date,
        b = window.navigator,
        c = a.getHours() + Math.floor((a.getMinutes() + offset) / 60);
    return jumble([cidGid, b.userAgent, b.language || "", a.getTimezoneOffset(), a.getYear(), a.getDate() + Math.floor(c / 24), (24 + c) % 24, (60 + a.getMinutes() + offset) % 60].join("."));
  };

  // One-way hash of the fingerprint, included in the linker parameter.
  var jumble = function (arr) {
    var b = 1, c;
    if (arr) {
      for (b = 0, c = arr.length - 1; 0 <= c; c--) {
        var d = arr.charCodeAt(c);
        b = (b << 6 & 268435455) + d + (d << 14);
        d = b & 266338304;
        b = 0 != d ? b ^ d >> 21 : b
      }
    }
    return b.toString();
  };

  var linkerType, linker;

  // Check Linker validity and isolate the Linker parameter string.
  if (typeof str === 'string' && str.length) {
    if (!/_ga=/.test(str)) {
      return false
    }
    linker = str.split('&').filter(function(p) { return p.split('=')[0] === '_ga'; }).shift();
  } else {
    linkerType = /[?&]_ga=/.test(window.location.search) ? 'search' : /[#&]_ga=/.test(window.location.hash) ? 'hash' : undefined;
    linker = linkerType && window.location[linkerType].substring(1).split('&').filter(function(p) { return p.split('=')[0] === '_ga'; }).shift();
  }

  if (typeof linker === 'undefined' || !linker.length) {
    return false
  }

  // Get the finger print and Client ID / Google ID strings from the parameter.
  var a = linker.indexOf('.'),
      b, c, d, fingerprint, cidGid;
  if (a > -1) {
    b = linker.substring(0, a);
    c = linker.substring(a + 1);
    d = c.indexOf(".");
    fingerprint = c.substring(0, d);
    cidGid = c.substring(d + 1);
  }

  // Jumble the Client ID / Google ID string and compare it against the fingerprint.
  // Check current minute, one minute back, and two minutes back.
  if (typeof cidGid !== 'undefined') {
    cidGid = cidGid.split('-').join('');
    return fingerprint === joiner(cidGid, 0) ||
      fingerprint === joiner(cidGid, -1) ||
      fingerprint === joiner(cidGid, -2) ||
      fingerprint === joiner2(cidGid, 0) ||
      fingerprint === joiner2(cidGid, -1) ||
      fingerprint === joiner2(cidGid, -2);
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGaCookie", function() { return getGaCookie; });
const getGaCookie = () => {
    const name = '_ga';
    if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(`${name}=`);
        if (cookieStart !== -1) {
            cookieStart = cookieStart + name.length + 1;
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            const gaCookie = unescape(document.cookie.substring(cookieStart, cookieEnd));
            if (gaCookie) {
                const match = gaCookie.match(/(\d{2,11})\.(\d{2,11})/g);
                return match ? match[0] : '';
            }
        }
    }
    return '';
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["default"] = ((impressionTag) => {
    let waitForScroll = 0;
    const products = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getElementsByHref"])('/products/');
    if (products.length === 0) {
        return;
    }
    function trackImpressions() {
        const viewportTop = document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const viewportBottom = viewportTop + viewportHeight;
        const impressions = [];
        products.forEach((element, index) => {
            if (!element)
                return;
            const elementTop = window.pageYOffset + element.getBoundingClientRect().top;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            if (elementBottom >= viewportTop && elementTop < viewportBottom) {
                let pixelsVisible = elementHeight;
                if (elementTop - viewportTop < 0) {
                    pixelsVisible += elementTop - viewportTop;
                }
                else if (viewportBottom - elementBottom < 0) {
                    pixelsVisible += viewportBottom - elementBottom;
                }
                const percentVisible = pixelsVisible / elementHeight;
                if (percentVisible > 0.8) {
                    //remove product from collection
                    products[index] = null;
                    //find this product in the datalayer
                    const product = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["findDataLayerProduct"])(element.href);
                    if (product)
                        impressions.push(product);
                }
            }
        });
        if (impressions.length > 0) {
            //now send impressions to GA and dataLayer
            impressionTag(impressions);
        }
    }
    window.setTimeout(function () {
        clearTimeout(waitForScroll);
        trackImpressions();
    }, 500); /* wait for pageview to fire first */
    document.addEventListener('scroll', () => {
        //assumes that people need 300ms after scrolling to register an impression
        clearTimeout(waitForScroll);
        waitForScroll = window.setTimeout(function () {
            trackImpressions();
        }, 300);
    });
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);


(function () {
    Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["validateLittledataLayer"])();
    Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["initSegment"])();
    Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["advertiseLD"])();
    Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["identifyCustomer"])();
    Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["pageView"])(function () {
        window.analytics.page();
        Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["trackEvents"])();
    });
})();


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identifyCustomer", function() { return identifyCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackEvents", function() { return trackEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSegment", function() { return initSegment; });
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _common_productListViews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


const segmentProduct = (dataLayerProduct) => ({
    brand: dataLayerProduct.brand,
    category: dataLayerProduct.category,
    url: dataLayerProduct.handle,
    product_id: dataLayerProduct.id,
    sku: dataLayerProduct.id,
    position: dataLayerProduct.list_position,
    name: dataLayerProduct.name,
    price: parseFloat(dataLayerProduct.price),
    variant: dataLayerProduct.variant,
});
const identifyCustomer = () => {
    if (LittledataLayer.customer) {
        window.analytics.identify(LittledataLayer.customer.id, LittledataLayer.customer);
    }
};
const trackEvents = () => {
    window.analytics.ready(() => {
        //@ts-ignore
        Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["setClientID"])(window.analytics.user().anonymousId, window.analytics.Integrations['Google Analytics']);
    });
    if (LittledataLayer) {
        /* run list, product, and clientID scripts everywhere */
        if (LittledataLayer.ecommerce.impressions.length) {
            Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["productListClicks"])(product => {
                const productFromImpressions = LittledataLayer.ecommerce.impressions.find(prod => prod.name === product.name && prod.handle === product.handle);
                const pos = productFromImpressions && productFromImpressions.list_position;
                window.localStorage.setItem('position', String(pos));
                const p = segmentProduct(product);
                window.analytics.track('Product Clicked', {
                    ...p,
                    list_id: document.location.pathname,
                    category: 'EnhancedEcommerce',
                });
            });
            Object(_common_productListViews__WEBPACK_IMPORTED_MODULE_1__["default"])(products => {
                const listId = products && products[0].list;
                const segmentProducts = products.map(segmentProduct);
                window.analytics.track('Product List Viewed', {
                    list_id: listId,
                    category: 'EnhancedEcommerce',
                    products: segmentProducts,
                });
            });
        }
        const rawProduct = LittledataLayer.ecommerce.detail;
        if (rawProduct) {
            const product = segmentProduct(rawProduct);
            product.list_id = document.location.href;
            product.category = 'EnhancedEcommerce';
            product.position = parseInt(window.localStorage.getItem('position')) || 1;
            window.analytics.track('Product Viewed', product);
            // if PDP, we can also track clicks on images and social shares
            Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["trackProductImageClicks"])(name => {
                product.image_url = name;
                window.analytics.track('Product Image Clicked', product);
            });
            Object(_common_helpers__WEBPACK_IMPORTED_MODULE_0__["trackSocialShares"])(network => {
                window.analytics.track('Product Shared', {
                    ...product,
                    share_via: network,
                });
            });
        }
    }
};
const initSegment = () => {
    // @ts-ignore
    window.analytics = window.analytics || [];
    if (!analytics.initialize)
        if (analytics.invoked)
            window.console && console.error && console.error("Segment snippet included twice.");
        else {
            analytics.invoked = !0;
            analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
            analytics.factory = function (t) { return function () { var e = Array.prototype.slice.call(arguments); e.unshift(t); analytics.push(e); return analytics; }; };
            for (var t = 0; t < analytics.methods.length; t++) {
                var e = analytics.methods[t];
                analytics[e] = analytics.factory(e);
            }
            analytics.load = function (t, e) { var n = document.createElement("script"); n.type = "text/javascript"; n.async = !0; n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js"; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(n, a); analytics._loadOptions = e; };
            analytics.SNIPPET_VERSION = "4.1.0"; //eslint-disable-line
            window.analytics.load(LittledataLayer.writeKey);
        }
    window.dataLayer = window.dataLayer || [];
};


/***/ })
/******/ ]);