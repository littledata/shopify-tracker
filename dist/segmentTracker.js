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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPersistentClientId", function() { return getPersistentClientId; });
/* harmony import */ var _checkLinker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* global ga, LittledataLayer */

var pageView = function pageView(fireTag) {
  // delay page firing until the page is visible
  if (document.hidden === true) {
    var triggeredPageView = false;
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && !triggeredPageView) {
        fireTag();
        triggeredPageView = true;
      }
    });
  } else {
    fireTag();
  }
};
var getElementsByHref = function getElementsByHref(hrefContaining) {
  var htmlCollection = document.getElementsByTagName('a');
  return Array.prototype.slice.call(htmlCollection).filter(function (element) {
    return element.href && element.href.includes(hrefContaining);
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
    ga(function () {
      var clientID = getClientId();
      var createdAt = new Date().getTime();
      var cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance

      cartUpdateReq.onload = function () {
        var updatedCart = JSON.parse(cartUpdateReq.response);
        var clientIDReq = new XMLHttpRequest();
        clientIDReq.open('POST', 'https://transactions-staging.littledata.io/clientID');
        clientIDReq.setRequestHeader('Content-Type', 'application/json');
        clientIDReq.send(JSON.stringify({
          clientID: clientID,
          createdAt: createdAt,
          cartID: updatedCart.token
        }));
      };

      cartUpdateReq.open('POST', '/cart/update.json');
      cartUpdateReq.setRequestHeader('Content-Type', 'application/json');
      cartUpdateReq.send(JSON.stringify({
        attributes: {
          clientID: clientID,
          createdAt: createdAt
        }
      }));
    });
  }, 1000);
}

function postCartToLittledata(cart) {
  console.log('posted cart', cart);
}

function setClientID(getClientId) {
  var _LittledataLayer = LittledataLayer,
      cart = _LittledataLayer.cart;
  if (!cart || !cart.attributes || !cart.attributes.clientID || !cart.attributes.createdAt) return postClientID(getClientId);
  var clientIdCreated = new Date(cart.attributes.createdAt);
  var timeout = 60 * 60 * 1000; // 60 minutes

  var timePassed = new Date() - clientIdCreated; // only need to resent client ID if it's expired from our Redis cache

  if (timePassed > timeout) {
    postClientID(getClientId);
  } // if the cart was last updated more than 60 minutes ago, we also need to send the full contents


  if (cart && cart.updated_at) {
    var cartCreated = new Date(cart.updated_at);
    var cartAge = new Date() - cartCreated;

    if (cartAge > timeout) {
      postCartToLittledata(cart);
    }
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
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return "".concat(s4()).concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
}();
var getCookie = function getCookie(_ref) {
  var name = _ref.name;

  if (document.cookie.length > 0) {
    var cookieStart = document.cookie.indexOf("".concat(name, "="));

    if (cookieStart !== -1) {
      cookieStart = cookieStart + name.length + 1;
      var cookieEnd = document.cookie.indexOf(';', cookieStart);

      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }

      return unescape(document.cookie.substring(cookieStart, cookieEnd));
    }
  }

  return '';
};
function getPersistentClientId() {
  // needed because Safari wipes 1st party cookies
  // so we need to persist over localStorage, if available
  // ignore this and return undefined if we have linker params
  if (Object(_checkLinker__WEBPACK_IMPORTED_MODULE_0__["default"])()) return;
  var cookieClientId = getCookie('_ga');

  if (window.localStorage && !LittledataLayer.enhancePrivacy) {
    var localClientId = window.localStorage.getItem('_ga'); // prefer local storage version, as it was set by this function

    if (localClientId) return localClientId;

    if (cookieClientId) {
      // set it to local storage for next time
      window.localStorage.setItem('_ga', cookieClientId);
    }
  }

  if (cookieClientId) return cookieClientId; // no id from either, so create new

  var thisGuid = ga.getAll()[0].get('clientId'); // and set localstorage - gtag will set the cookie

  if (window.localStorage) {
    window.localStorage.setItem('_ga', thisGuid);
  }

  return thisGuid;
}

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
      return 'Invalid linker format in string argument!';
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
    return 'Invalid linker format in URL!';
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
      var elementTop = element.offsetTop;
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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _productListViews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* eslint-env browser */

/* global LittledataLayer */


var analytics = window.analytics = window.analytics || [];
if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");else {
  analytics.invoked = !0;
  analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];

  analytics.factory = function (t) {
    return function () {
      var e = Array.prototype.slice.call(arguments);
      e.unshift(t);
      analytics.push(e);
      return analytics;
    };
  };

  for (var t = 0; t < analytics.methods.length; t++) {
    var e = analytics.methods[t];
    analytics[e] = analytics.factory(e);
  }

  analytics.load = function (t, e) {
    var n = document.createElement("script");
    n.type = "text/javascript";
    n.async = !0;
    n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
    var a = document.getElementsByTagName("script")[0];
    a.parentNode.insertBefore(n, a);
    analytics._loadOptions = e;
  };

  analytics.SNIPPET_VERSION = "4.1.0"; //eslint-disable-line

  analytics.load(LittledataLayer.writeKey);
}

(function () {
  window.dataLayer = window.dataLayer || [];

  if (!LittledataLayer) {
    console.warn('Aborting Littledata tracking as LittledataLayer was not found'); //eslint-disable-line

    return;
  }

  if (LittledataLayer.customer) {
    analytics.identify(LittledataLayer.customer.id, LittledataLayer.customer);
  }

  Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["pageView"])(function () {
    analytics.page();
  });
  document.addEventListener('ready', function () {
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["setClientID"])(function () {
      return analytics.user().anonymousId();
    });

    if (LittledataLayer) {
      /* run list, product, and clientID scripts everywhere */
      if (LittledataLayer.ecommerce.impressions.length) {
        Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["productListClicks"])(function (product) {
          var p = product;
          p.list_id = document.location.pathname;
          p.category = 'EnhancedEcommerce';
          analytics.track('Product Clicked', p);
        });
        Object(_productListViews__WEBPACK_IMPORTED_MODULE_1__["default"])(function (products) {
          analytics.track('Product List Viewed', {
            list_id: products[0].list,
            category: 'EnhancedEcommerce',
            products: products
          });
        });
      }

      var product = LittledataLayer.ecommerce.detail;

      if (product) {
        product.list_id = document.location.href;
        product.category = 'EnhancedEcommerce';
        analytics.track('Product Viewed', product);
      }
    }
  });
})();

/***/ })
/******/ ]);