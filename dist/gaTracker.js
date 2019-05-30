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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/gaTracker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/checkLinker.js":
/*!****************************!*\
  !*** ./src/checkLinker.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* eslint-disable */\n//from https://gist.github.com/sahava/f3718f981bb01768c0eba714ee94e2d2\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (str) {\n  // First browser fingerprint method.\n  // Uses the clientId / gid string, user agent, time, and browser plugin descriptions.\n  var joiner = function joiner(cidGid, offset) {\n    var a = new Date(),\n        b = window.navigator,\n        c = b.plugins || [];\n    var d = [cidGid, b.userAgent, a.getTimezoneOffset(), a.getYear(), a.getDate(), a.getHours(), a.getMinutes() + offset];\n\n    for (var e = 0; e < c.length; ++e) {\n      d.push(c[e].description);\n    }\n\n    return jumble(d.join('.'));\n  }; // Second browser fingerprint method.\n  // Uses the clientId / gid string, time, user agent, browser language.\n\n\n  var joiner2 = function joiner2(cidGid, offset) {\n    var a = new Date(),\n        b = window.navigator,\n        c = a.getHours() + Math.floor((a.getMinutes() + offset) / 60);\n    return jumble([cidGid, b.userAgent, b.language || \"\", a.getTimezoneOffset(), a.getYear(), a.getDate() + Math.floor(c / 24), (24 + c) % 24, (60 + a.getMinutes() + offset) % 60].join(\".\"));\n  }; // One-way hash of the fingerprint, included in the linker parameter.\n\n\n  var jumble = function jumble(arr) {\n    var b = 1,\n        c;\n\n    if (arr) {\n      for (b = 0, c = arr.length - 1; 0 <= c; c--) {\n        var d = arr.charCodeAt(c);\n        b = (b << 6 & 268435455) + d + (d << 14);\n        d = b & 266338304;\n        b = 0 != d ? b ^ d >> 21 : b;\n      }\n    }\n\n    return b.toString();\n  };\n\n  var linkerType, linker; // Check Linker validity and isolate the Linker parameter string.\n\n  if (typeof str === 'string' && str.length) {\n    if (!/_ga=/.test(str)) {\n      return 'Invalid linker format in string argument!';\n    }\n\n    linker = str.split('&').filter(function (p) {\n      return p.split('=')[0] === '_ga';\n    }).shift();\n  } else {\n    linkerType = /[?&]_ga=/.test(window.location.search) ? 'search' : /[#&]_ga=/.test(window.location.hash) ? 'hash' : undefined;\n    linker = linkerType && window.location[linkerType].substring(1).split('&').filter(function (p) {\n      return p.split('=')[0] === '_ga';\n    }).shift();\n  }\n\n  if (typeof linker === 'undefined' || !linker.length) {\n    return 'Invalid linker format in URL!';\n  } // Get the finger print and Client ID / Google ID strings from the parameter.\n\n\n  var a = linker.indexOf('.'),\n      b,\n      c,\n      d,\n      fingerprint,\n      cidGid;\n\n  if (a > -1) {\n    b = linker.substring(0, a);\n    c = linker.substring(a + 1);\n    d = c.indexOf(\".\");\n    fingerprint = c.substring(0, d);\n    cidGid = c.substring(d + 1);\n  } // Jumble the Client ID / Google ID string and compare it against the fingerprint.\n  // Check current minute, one minute back, and two minutes back.\n\n\n  if (typeof cidGid !== 'undefined') {\n    cidGid = cidGid.split('-').join('');\n    return fingerprint === joiner(cidGid, 0) || fingerprint === joiner(cidGid, -1) || fingerprint === joiner(cidGid, -2) || fingerprint === joiner2(cidGid, 0) || fingerprint === joiner2(cidGid, -1) || fingerprint === joiner2(cidGid, -2);\n  }\n});\n\n//# sourceURL=webpack:///./src/checkLinker.js?");

/***/ }),

/***/ "./src/gaTracker.js":
/*!**************************!*\
  !*** ./src/gaTracker.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n/* harmony import */ var _productListViews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./productListViews */ \"./src/productListViews.js\");\n/* eslint-env browser */\n\n/* global ga, LittledataLayer */\n\n\n\n(function () {\n  window.dataLayer = window.dataLayer || [];\n\n  function gtag() {\n    dataLayer.push(arguments);\n  } //eslint-disable-line\n\n\n  gtag('js', new Date());\n\n  if (!LittledataLayer) {\n    console.warn('Aborting Littledata tracking as LittledataLayer was not found');\n    return;\n  }\n\n  var config = {\n    linker: {\n      domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com']\n    },\n    anonymize_ip: LittledataLayer.enhancePrivacy || true,\n    allow_ad_personalization_signals: !LittledataLayer.enhancePrivacy || true,\n    page_title: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"removePii\"])(document.title),\n    page_location: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"removePii\"])(document.location.href),\n    currency: LittledataLayer.ecommerce.currencyCode,\n    link_attribution: true,\n    clientId: Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"getPersistentClientId\"])()\n  };\n  if (LittledataLayer.referralExclusion.test(document.referrer)) config.page_referrer = null;\n  Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"pageView\"])(function () {\n    gtag('config', LittledataLayer.webPropertyID, config);\n  });\n  document.addEventListener('DOMContentLoaded', function () {\n    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"setClientID\"])(function () {\n      return ga.getAll()[0].get('clientId');\n    });\n    /* run list, product, and clientID scripts everywhere */\n\n    if (LittledataLayer.ecommerce.impressions.length) {\n      Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"productListClicks\"])(function (product, self) {\n        product.list_name = location.pathname; //eslint-disable-line\n\n        dataLayer.push({\n          event: 'select_content',\n          ecommerce: {\n            click: {\n              actionField: {\n                list: product.list_name\n              },\n              products: [product]\n            }\n          }\n        });\n        gtag('event', 'select_content', {\n          content_type: 'product',\n          items: [product],\n          send_to: LittledataLayer.webPropertyID,\n          event_callback: function event_callback() {\n            window.clearTimeout(self.timeout);\n            document.location = self.href;\n          }\n        });\n      });\n      Object(_productListViews__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(function (products) {\n        gtag('event', 'view_item_list', {\n          items: products,\n          send_to: LittledataLayer.webPropertyID,\n          non_interaction: true\n        });\n        dataLayer.push({\n          event: 'view_item_list',\n          ecommerce: {\n            impressions: products\n          }\n        });\n      });\n      var product = LittledataLayer.ecommerce.detail; //eslint-disable-line\n\n      if (product) {\n        product.list_name = document.location.href;\n        gtag('event', 'view_item', {\n          items: [product],\n          non_interaction: true,\n          send_to: LittledataLayer.webPropertyID\n        });\n        dataLayer.push({\n          event: 'view_item',\n          ecommerce: {\n            detail: {\n              actionField: {\n                list: product.list_name\n              },\n              products: [product]\n            }\n          }\n        });\n      }\n    }\n  });\n})();\n\n//# sourceURL=webpack:///./src/gaTracker.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: pageView, getElementsByHref, findDataLayerProduct, productListClicks, setClientID, removePii, guid, getCookie, getPersistentClientId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pageView\", function() { return pageView; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getElementsByHref\", function() { return getElementsByHref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"findDataLayerProduct\", function() { return findDataLayerProduct; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"productListClicks\", function() { return productListClicks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setClientID\", function() { return setClientID; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removePii\", function() { return removePii; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"guid\", function() { return guid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCookie\", function() { return getCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPersistentClientId\", function() { return getPersistentClientId; });\n/* harmony import */ var _checkLinker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkLinker */ \"./src/checkLinker.js\");\n/* global ga, LittledataLayer */\n\nvar pageView = function pageView(fireTag) {\n  // delay page firing until the page is visible\n  if (document.hidden === true) {\n    var triggeredPageView = false;\n    document.addEventListener('visibilitychange', function () {\n      if (!document.hidden && !triggeredPageView) {\n        fireTag();\n        triggeredPageView = true;\n      }\n    });\n  } else {\n    fireTag();\n  }\n};\nvar getElementsByHref = function getElementsByHref(hrefContaining) {\n  var htmlCollection = document.getElementsByTagName('a');\n  return Array.prototype.slice.call(htmlCollection).filter(function (element) {\n    return element.href && element.href.includes(hrefContaining);\n  });\n};\nvar findDataLayerProduct = function findDataLayerProduct(link) {\n  return LittledataLayer.ecommerce.impressions.find(function (p) {\n    var linkSplit = link.split('/products/');\n    var productLink = linkSplit && linkSplit[1];\n    return productLink === p.handle;\n  });\n};\nvar productListClicks = function productListClicks(clickTag) {\n  /* product list clicks */\n  if (!LittledataLayer.productClicks) return;\n  getElementsByHref('/products/').forEach(function (element) {\n    element.addEventListener('click', function (ev) {\n      // only add event to products\n      var self = this;\n      var product = findDataLayerProduct(self.href);\n\n      if (product) {\n        ev.preventDefault();\n        /* only wait 1 second before redirecting */\n\n        self.timeout = window.setTimeout(function () {\n          document.location = self.href;\n        }, 1000);\n        clickTag(product, self);\n      } else {\n        document.location = self.href;\n      }\n    });\n  });\n};\n\nfunction postClientID(getClientId) {\n  setTimeout(function () {\n    ga(function () {\n      var clientID = getClientId();\n      var createdAt = new Date().getTime();\n      var cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance\n\n      cartUpdateReq.onload = function () {\n        var updatedCart = JSON.parse(cartUpdateReq.response);\n        var clientIDReq = new XMLHttpRequest();\n        clientIDReq.open('POST', 'https://transactions-staging.littledata.io/clientID');\n        clientIDReq.setRequestHeader('Content-Type', 'application/json');\n        clientIDReq.send(JSON.stringify({\n          clientID: clientID,\n          createdAt: createdAt,\n          cartID: updatedCart.token\n        }));\n      };\n\n      cartUpdateReq.open('POST', '/cart/update.json');\n      cartUpdateReq.setRequestHeader('Content-Type', 'application/json');\n      cartUpdateReq.send(JSON.stringify({\n        attributes: {\n          clientID: clientID,\n          createdAt: createdAt\n        }\n      }));\n    });\n  }, 1000);\n}\n\nfunction postCartToLittledata(cart) {\n  console.log('posted cart', cart);\n}\n\nfunction setClientID(getClientId) {\n  var _LittledataLayer = LittledataLayer,\n      cart = _LittledataLayer.cart;\n  if (!cart || !cart.attributes || !cart.attributes.clientID || !cart.attributes.createdAt) return postClientID(getClientId);\n  var clientIdCreated = new Date(cart.attributes.createdAt);\n  var timeout = 60 * 60 * 1000; // 60 minutes\n\n  var timePassed = new Date() - clientIdCreated; // only need to resent client ID if it's expired from our Redis cache\n\n  if (timePassed > timeout) {\n    postClientID(getClientId);\n  } // if the cart was last updated more than 60 minutes ago, we also need to send the full contents\n\n\n  if (cart && cart.updated_at) {\n    var cartCreated = new Date(cart.updated_at);\n    var cartAge = new Date() - cartCreated;\n\n    if (cartAge > timeout) {\n      postCartToLittledata(cart);\n    }\n  }\n}\nfunction removePii(string) {\n  var piiRegex = {\n    email: /[\\s&amp;\\/,=]([a-zA-Z0-9_.+-]+(\\@|%40)[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)($|[\\s&amp;\\/,])/,\n    postcode: /[\\s&amp;\\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\\s|%20)[0-9][A-Z]{2})($|[\\s&amp;\\/,])/\n  };\n  var dlRemoved = string;\n  var key;\n\n  for (key in piiRegex) {\n    dlRemoved = dlRemoved.replace(piiRegex[key], 'REMOVED');\n  }\n\n  return dlRemoved;\n}\nvar guid = function () {\n  function s4() {\n    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);\n  }\n\n  return \"\".concat(s4()).concat(s4(), \"-\").concat(s4(), \"-\").concat(s4(), \"-\").concat(s4(), \"-\").concat(s4()).concat(s4()).concat(s4());\n}();\nvar getCookie = function getCookie(_ref) {\n  var name = _ref.name;\n\n  if (document.cookie.length > 0) {\n    var cookieStart = document.cookie.indexOf(\"\".concat(name, \"=\"));\n\n    if (cookieStart !== -1) {\n      cookieStart = cookieStart + name.length + 1;\n      var cookieEnd = document.cookie.indexOf(';', cookieStart);\n\n      if (cookieEnd === -1) {\n        cookieEnd = document.cookie.length;\n      }\n\n      return unescape(document.cookie.substring(cookieStart, cookieEnd));\n    }\n  }\n\n  return '';\n};\nfunction getPersistentClientId() {\n  // needed because Safari wipes 1st party cookies\n  // so we need to persist over localStorage, if available\n  // ignore this and return undefined if we have linker params\n  if (Object(_checkLinker__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()) return;\n  var cookieClientId = getCookie('_ga');\n\n  if (window.localStorage && !LittledataLayer.enhancePrivacy) {\n    var localClientId = window.localStorage.getItem('_ga'); // prefer local storage version, as it was set by this function\n\n    if (localClientId) return localClientId;\n\n    if (cookieClientId) {\n      // set it to local storage for next time\n      window.localStorage.setItem('_ga', cookieClientId);\n    }\n  }\n\n  if (cookieClientId) return cookieClientId; // no id from either, so create new\n\n  var thisGuid = ga.getAll()[0].get('clientId'); // and set localstorage - gtag will set the cookie\n\n  if (window.localStorage) {\n    window.localStorage.setItem('_ga', thisGuid);\n  }\n\n  return thisGuid;\n}\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/productListViews.js":
/*!*********************************!*\
  !*** ./src/productListViews.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (impressionTag) {\n  var waitForScroll;\n  var products = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"getElementsByHref\"])('/products/');\n\n  if (products.length === 0) {\n    return;\n  }\n\n  function trackImpressions() {\n    var viewportTop = document.documentElement.scrollTop;\n    var viewportHeight = window.innerHeight;\n    var viewportBottom = viewportTop + viewportHeight;\n    var impressions = [];\n    products.forEach(function (element, index) {\n      if (!element) return;\n      var elementTop = element.offsetTop;\n      var elementHeight = element.offsetHeight;\n      var elementBottom = elementTop + elementHeight;\n\n      if (elementBottom >= viewportTop && elementTop < viewportBottom) {\n        var pixelsVisible = elementHeight;\n\n        if (elementTop - viewportTop < 0) {\n          pixelsVisible += elementTop - viewportTop;\n        } else if (viewportBottom - elementBottom < 0) {\n          pixelsVisible += viewportBottom - elementBottom;\n        }\n\n        var percentVisible = pixelsVisible / elementHeight;\n\n        if (percentVisible > 0.8) {\n          //remove product from collection\n          products[index] = null; //find this product in the datalayer\n\n          var product = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"findDataLayerProduct\"])(element.href);\n          if (product) impressions.push(product);\n        }\n      }\n    });\n\n    if (impressions.length > 0) {\n      //now send impressions to GA and dataLayer\n      impressionTag(impressions);\n    }\n  }\n\n  window.setTimeout(function () {\n    clearTimeout(waitForScroll);\n    trackImpressions();\n  }, 500);\n  /* wait for pageview to fire first */\n\n  document.addEventListener('scroll', function () {\n    //assumes that people need 300ms after scrolling to register an impression\n    clearTimeout(waitForScroll);\n    waitForScroll = window.setTimeout(function () {\n      trackImpressions();\n    }, 300);\n  });\n});\n\n//# sourceURL=webpack:///./src/productListViews.js?");

/***/ })

/******/ });