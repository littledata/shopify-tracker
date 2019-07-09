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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _productListViews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* eslint-env browser */

/* global LittledataLayer */



(function () {
  window.dataLayer = window.dataLayer || [];

  var stubFunction = function stubFunction() {
    dataLayer.push(arguments);
  }; //eslint-disable-line


  window.gtag = window.gtag || stubFunction;
  gtag('js', new Date()); // handle old calls from the page to analytics.js

  window.ga = window.ga || function (param, param2, param3) {
    if (typeof param === 'function') {
      console.warn('Littledata caught attempt to use Google Analytics analytics.js library. You need to migrate to gtag https://developers.google.com/analytics/devguides/collection/gtagjs/migration'); //eslint-disable-line no-console

      return param.call(); //ensures anything waiting for ga library gets called
    }

    if (param === 'send') {
      console.warn("Littledata caught attempt to send ".concat(param2, " ").concat(JSON.stringify(param3), " to Google Analytics using ga() function. You need to migrate to gtag https://developers.google.com/analytics/devguides/collection/gtagjs/migration")); //eslint-disable-line no-console
    }
  };

  if (!window.LittledataLayer) {
    console.warn('Aborting Littledata tracking as LittledataLayer was not found'); //eslint-disable-line no-console

    return;
  }

  if (!LittledataLayer.hideBranding) {
    console.log('%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/littledata \n', 'color: #088f87;'); //eslint-disable-line
  }

  var config = {
    linker: {
      domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com']
    },
    anonymize_ip: !!LittledataLayer.anonymizeIp,
    allow_ad_personalization_signals: !!LittledataLayer.googleSignals,
    page_title: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removePii"])(document.title),
    page_location: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["removePii"])(document.location.href),
    currency: LittledataLayer.ecommerce.currencyCode,
    link_attribution: true,
    clientId: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getPersistentClientId"])()
  };
  if (LittledataLayer.referralExclusion.test(document.referrer)) config.page_referrer = null;

  function trackEvents() {
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["setClientID"])(_helpers__WEBPACK_IMPORTED_MODULE_0__["getPersistentClientId"]);
    /* run list, product, and clientID scripts everywhere */

    if (LittledataLayer.ecommerce.impressions.length) {
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["productListClicks"])(function (product, self) {
        var productFromImpressions = LittledataLayer.ecommerce.impressions.find(function (prod) {
          return prod.name === product.name && prod.handle === product.handle;
        });
        var pos = productFromImpressions && productFromImpressions.list_position;
        window.localStorage.setItem('position', pos);
        dataLayer.push({
          event: 'select_content',
          ecommerce: {
            click: {
              actionField: {
                list: product.list_name
              },
              products: [product]
            }
          }
        });
        gtag('event', 'select_content', {
          content_type: 'product',
          items: [product],
          send_to: LittledataLayer.webPropertyID,
          event_callback: function event_callback() {
            window.clearTimeout(self.timeout);
            document.location = self.href;
          }
        });
      });
      Object(_productListViews__WEBPACK_IMPORTED_MODULE_1__["default"])(function (products) {
        gtag('event', 'view_item_list', {
          items: products,
          send_to: LittledataLayer.webPropertyID,
          non_interaction: true
        });
        dataLayer.push({
          event: 'view_item_list',
          ecommerce: {
            impressions: products
          }
        });
      });
    }

    var product = LittledataLayer.ecommerce.detail;

    if (product) {
      product.list_position = parseInt(window.localStorage.getItem('position')) || 1;
      gtag('event', 'view_item', {
        items: [product],
        non_interaction: true,
        send_to: LittledataLayer.webPropertyID
      });
      dataLayer.push({
        event: 'view_item',
        ecommerce: {
          detail: {
            actionField: {
              list: product.list_name
            },
            products: [product]
          }
        }
      }); // if PDP, we can also track clicks on images and social shares

      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["trackProductImageClicks"])(function (name) {
        dataLayer.push({
          event: 'product_image_click',
          name: name
        });
        gtag('event', 'Product image click', {
          event_category: 'Product details page (Littledata)',
          event_label: name,
          send_to: LittledataLayer.webPropertyID
        });
      });
      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["trackSocialShares"])(function (network) {
        dataLayer.push({
          event: 'share_product',
          network: network
        });
        gtag('event', 'Social share', {
          event_category: 'Product details page (Littledata)',
          event_label: network,
          send_to: LittledataLayer.webPropertyID
        });
      });
    }
  }

  Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["pageView"])(function () {
    gtag('config', LittledataLayer.webPropertyID, config);
    trackEvents();
  });
})();

/***/ }),
/* 1 */
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
/* harmony import */ var _checkLinker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _getGaCookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* global LittledataLayer */


var pageView = function pageView(fireTag) {
  if (document.hidden === true) {
    // delay page firing until the page is visible
    var triggeredPageView = false;
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && !triggeredPageView) {
        fireTag();
        triggeredPageView = true;
      }
    });
  } else if (document.readyState === 'loading') {
    //delay until DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
      fireTag();
    });
  } else {
    fireTag();
  }
};
var getElementsByHref = function getElementsByHref(regex) {
  var htmlCollection = document.getElementsByTagName('a');
  var r = new RegExp(regex);
  return Array.prototype.slice.call(htmlCollection).filter(function (element) {
    return element.href && r.test(element.href);
  });
};
var findDataLayerProduct = function findDataLayerProduct(link) {
  return LittledataLayer.ecommerce.impressions.find(function (p) {
    var linkSplit = link.split('/products/');
    var productLink = linkSplit && linkSplit[1];
    return productLink === p.handle;
  });
};
var productListClicks = function productListClicks(clickTag) {
  /* product list clicks */
  if (!LittledataLayer.productClicks) return;
  getElementsByHref('/products/').forEach(function (element) {
    element.addEventListener('click', function (ev) {
      // only add event to products
      var self = this;
      var product = findDataLayerProduct(self.href);

      if (product) {
        ev.preventDefault();
        /* only wait 1 second before redirecting */

        self.timeout = window.setTimeout(function () {
          document.location = self.href;
        }, 1000);
        clickTag(product, self);
      } else {
        document.location = self.href;
      }
    });
  });
};

function postClientID(getClientId) {
  setTimeout(function () {
    var clientID = getClientId();
    var updatedAt = new Date().getTime();
    var cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance

    cartUpdateReq.onload = function () {
      var updatedCart = JSON.parse(cartUpdateReq.response);
      var clientIDReq = new XMLHttpRequest();
      clientIDReq.open('POST', 'https://transactions-staging.littledata.io/clientID');
      clientIDReq.setRequestHeader('Content-Type', 'application/json');
      clientIDReq.send(JSON.stringify({
        clientID: clientID,
        updatedAt: updatedAt,
        cartID: updatedCart.token
      }));
    };

    cartUpdateReq.open('POST', '/cart/update.json');
    cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
    cartUpdateReq.send(JSON.stringify({
      attributes: {
        clientID: clientID,
        updatedAt: updatedAt
      }
    }));
  }, 1000);
}

function postCartToLittledata(cart) {
  var httpRequest = new XMLHttpRequest(); // new HttpRequest instance

  httpRequest.open('POST', 'https://transactions-staging.littledata.io/cart/store');
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify(cart));
}

function setClientID(getClientId) {
  var _LittledataLayer = LittledataLayer,
      cart = _LittledataLayer.cart;
  if (!cart || !cart.attributes || !cart.attributes.clientID || !cart.attributes.updatedAt) return postClientID(getClientId);
  var clientIdCreated = new Date(parseInt(cart.attributes.updatedAt));
  var timeout = 60 * 60 * 1000; // 60 minutes

  var timePassed = new Date() - clientIdCreated; // only need to resent client ID if it's expired from our Redis cache

  if (timePassed > timeout) {
    postCartToLittledata(cart);
    setTimeout(function () {
      postClientID(getClientId);
    }, 10000); // allow 10 seconds for our server to register cart until updating it, otherwise there's a race condition between storing and a webhook triggered by this
  }
}
function removePii(string) {
  var piiRegex = {
    email: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
    postcode: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/
  };
  var dlRemoved = string;
  var key;

  for (key in piiRegex) {
    dlRemoved = dlRemoved.replace(piiRegex[key], 'REMOVED');
  }

  return dlRemoved;
}
var guid = function () {
  function s10() {
    return Math.floor(Math.random() * 10E9);
  }

  return "GA1.2.".concat(s10(), ".").concat(s10());
}(); // const createCookie = (name, value, days) => {
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
  if (Object(_checkLinker__WEBPACK_IMPORTED_MODULE_0__["default"])()) return;

  if (window.localStorage && LittledataLayer.persistentUserId) {
    var localClientId = window.localStorage.getItem('_ga'); // prefer local storage version, as it was set by this function

    if (localClientId) return localClientId;
    var cookieClientId = Object(_getGaCookie__WEBPACK_IMPORTED_MODULE_1__["getGaCookie"])();

    if (cookieClientId) {
      // set it to local storage for next time
      window.localStorage.setItem('_ga', cookieClientId);
      return cookieClientId;
    }
  } // returning an empty client id will cause gtag to create a new one


  return '';
}
var trackProductImageClicks = function trackProductImageClicks(clickTag) {
  getElementsByHref('^https://cdn\.shopify\.com/s/files/.*/products/').forEach(function (element) {
    element.addEventListener('click', function () {
      // only add event to product images
      var image = this.getElementsByTagName('img')[0];
      var name = image && image.alt;
      clickTag(name);
    });
  });
};
var trackSocialShares = function trackSocialShares(clickTag) {
  var networks = '(facebook|pinterest|twitter|linkedin|plus\.google|instagram)';
  getElementsByHref("".concat(networks, ".com/(share|pin|intent)")).forEach(function (element) {
    element.addEventListener('click', function () {
      var match = this.href.match(new RegExp(networks));
      clickTag(match && match[0]);
    });
  });
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */
//from https://gist.github.com/sahava/f3718f981bb01768c0eba714ee94e2d2
/* harmony default export */ __webpack_exports__["default"] = (function (str) {
  // First browser fingerprint method.
  // Uses the clientId / gid string, user agent, time, and browser plugin descriptions.
  var joiner = function joiner(cidGid, offset) {
    var a = new Date(),
        b = window.navigator,
        c = b.plugins || [];
    var d = [cidGid, b.userAgent, a.getTimezoneOffset(), a.getYear(), a.getDate(), a.getHours(), a.getMinutes() + offset];

    for (var e = 0; e < c.length; ++e) {
      d.push(c[e].description);
    }

    return jumble(d.join('.'));
  }; // Second browser fingerprint method.
  // Uses the clientId / gid string, time, user agent, browser language.


  var joiner2 = function joiner2(cidGid, offset) {
    var a = new Date(),
        b = window.navigator,
        c = a.getHours() + Math.floor((a.getMinutes() + offset) / 60);
    return jumble([cidGid, b.userAgent, b.language || "", a.getTimezoneOffset(), a.getYear(), a.getDate() + Math.floor(c / 24), (24 + c) % 24, (60 + a.getMinutes() + offset) % 60].join("."));
  }; // One-way hash of the fingerprint, included in the linker parameter.


  var jumble = function jumble(arr) {
    var b = 1,
        c;

    if (arr) {
      for (b = 0, c = arr.length - 1; 0 <= c; c--) {
        var d = arr.charCodeAt(c);
        b = (b << 6 & 268435455) + d + (d << 14);
        d = b & 266338304;
        b = 0 != d ? b ^ d >> 21 : b;
      }
    }

    return b.toString();
  };

  var linkerType, linker; // Check Linker validity and isolate the Linker parameter string.

  if (typeof str === 'string' && str.length) {
    if (!/_ga=/.test(str)) {
      return false;
    }

    linker = str.split('&').filter(function (p) {
      return p.split('=')[0] === '_ga';
    }).shift();
  } else {
    linkerType = /[?&]_ga=/.test(window.location.search) ? 'search' : /[#&]_ga=/.test(window.location.hash) ? 'hash' : undefined;
    linker = linkerType && window.location[linkerType].substring(1).split('&').filter(function (p) {
      return p.split('=')[0] === '_ga';
    }).shift();
  }

  if (typeof linker === 'undefined' || !linker.length) {
    return false;
  } // Get the finger print and Client ID / Google ID strings from the parameter.


  var a = linker.indexOf('.'),
      b,
      c,
      d,
      fingerprint,
      cidGid;

  if (a > -1) {
    b = linker.substring(0, a);
    c = linker.substring(a + 1);
    d = c.indexOf(".");
    fingerprint = c.substring(0, d);
    cidGid = c.substring(d + 1);
  } // Jumble the Client ID / Google ID string and compare it against the fingerprint.
  // Check current minute, one minute back, and two minutes back.


  if (typeof cidGid !== 'undefined') {
    cidGid = cidGid.split('-').join('');
    return fingerprint === joiner(cidGid, 0) || fingerprint === joiner(cidGid, -1) || fingerprint === joiner(cidGid, -2) || fingerprint === joiner2(cidGid, 0) || fingerprint === joiner2(cidGid, -1) || fingerprint === joiner2(cidGid, -2);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGaCookie", function() { return getGaCookie; });
var getGaCookie = function getGaCookie() {
  var name = '_ga';

  if (document.cookie.length > 0) {
    var cookieStart = document.cookie.indexOf("".concat(name, "="));

    if (cookieStart !== -1) {
      cookieStart = cookieStart + name.length + 1;
      var cookieEnd = document.cookie.indexOf(';', cookieStart);

      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }

      var gaCookie = unescape(document.cookie.substring(cookieStart, cookieEnd));

      if (gaCookie) {
        var match = gaCookie.match(/(\d{2,11})\.(\d{2,11})/g);
        return match ? match[0] : '';
      }
    }
  }

  return '';
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

/* harmony default export */ __webpack_exports__["default"] = (function (impressionTag) {
  var waitForScroll;
  var products = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getElementsByHref"])('/products/');

  if (products.length === 0) {
    return;
  }

  function trackImpressions() {
    var viewportTop = document.documentElement.scrollTop;
    var viewportHeight = window.innerHeight;
    var viewportBottom = viewportTop + viewportHeight;
    var impressions = [];
    products.forEach(function (element, index) {
      if (!element) return;
      var elementTop = window.pageYOffset + element.getBoundingClientRect().top;
      var elementHeight = element.offsetHeight;
      var elementBottom = elementTop + elementHeight;

      if (elementBottom >= viewportTop && elementTop < viewportBottom) {
        var pixelsVisible = elementHeight;

        if (elementTop - viewportTop < 0) {
          pixelsVisible += elementTop - viewportTop;
        } else if (viewportBottom - elementBottom < 0) {
          pixelsVisible += viewportBottom - elementBottom;
        }

        var percentVisible = pixelsVisible / elementHeight;

        if (percentVisible > 0.8) {
          //remove product from collection
          products[index] = null; //find this product in the datalayer

          var product = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["findDataLayerProduct"])(element.href);
          if (product) impressions.push(product);
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
  }, 500);
  /* wait for pageview to fire first */

  document.addEventListener('scroll', function () {
    //assumes that people need 300ms after scrolling to register an impression
    clearTimeout(waitForScroll);
    waitForScroll = window.setTimeout(function () {
      trackImpressions();
    }, 300);
  });
});

/***/ })
/******/ ]);