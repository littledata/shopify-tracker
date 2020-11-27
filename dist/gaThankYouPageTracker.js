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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initGtag", function() { return initGtag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendPageview", function() { return sendPageview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackEvents", function() { return trackEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterGAProductFields", function() { return filterGAProductFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony import */ var _common_getCookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _common_getProductDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _common_productListViews__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var event_category = 'Shopify (Littledata)';
var initGtag = function initGtag() {
  window.dataLayer = window.dataLayer || [];

  var stubFunction = function stubFunction() {
    dataLayer.push(arguments);
  }; //eslint-disable-line


  window.gtag = window.gtag || stubFunction;

  window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
  };

  window.ga.l = +new Date();
  Object(_common_helpers__WEBPACK_IMPORTED_MODULE_1__["retrieveAndStoreClientId"])(true); // @ts-ignore

  gtag('js', new Date());
  gtag('config', LittledataLayer.webPropertyID, _objectSpread({}, getConfig(), {
    send_page_view: false
  }));
};
var sendPageview = function sendPageview() {
  var page_title = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_1__["removePii"])(document.title);
  var locationWithMedium = addUTMMediumIfMissing(document.location.href);
  var page_location = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_1__["removePii"])(locationWithMedium);
  gtag('config', LittledataLayer.webPropertyID, _objectSpread({}, getConfig(), {
    page_title: page_title,
    page_location: page_location
  }));
  dataLayer.push({
    event: 'pageview',
    page_title: page_title,
    page_location: page_location
  });
  var googleAds = LittledataLayer.googleAdsConversionIds;

  if (_typeof(googleAds) === 'object' && googleAds.length > 0) {
    googleAds.forEach(function (adId) {
      return gtag('config', adId);
    });
  }

  var product = Object(_common_getProductDetail__WEBPACK_IMPORTED_MODULE_2__["default"])();

  if (product) {
    product.list_position = parseInt(window.localStorage.getItem('position')) || 1;
    gtag('event', 'view_item', {
      event_category: event_category,
      items: [filterGAProductFields(product)],
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
    });
  }
};
var trackEvents = function trackEvents() {
  /* run list, product, and clientID scripts everywhere */
  if (LittledataLayer.ecommerce.impressions.length) {
    Object(_common_helpers__WEBPACK_IMPORTED_MODULE_1__["productListClicks"])(function (product, self) {
      var productFromImpressions = LittledataLayer.ecommerce.impressions.find(function (prod) {
        return prod.name === product.name && prod.handle === product.handle;
      });
      var pos = productFromImpressions && productFromImpressions.list_position;
      window.localStorage.setItem('position', String(pos));
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
        event_category: event_category,
        content_type: 'product',
        items: [filterGAProductFields(product)],
        send_to: LittledataLayer.webPropertyID,
        event_callback: function event_callback() {
          window.clearTimeout(self.timeout);
          document.location.href = self.href;
        }
      });
    });
    Object(_common_productListViews__WEBPACK_IMPORTED_MODULE_3__["default"])(function (products) {
      var gaProducts = products.map(function (product) {
        return filterGAProductFields(product);
      });
      gtag('event', 'view_item_list', {
        event_category: event_category,
        items: gaProducts,
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

  var product = Object(_common_getProductDetail__WEBPACK_IMPORTED_MODULE_2__["default"])();

  if (product) {
    // if PDP, we can also track clicks on images and social shares
    Object(_common_helpers__WEBPACK_IMPORTED_MODULE_1__["trackProductImageClicks"])(function (name) {
      dataLayer.push({
        event: 'product_image_click',
        name: name
      });
      gtag('event', 'Product image click', {
        event_category: event_category,
        event_label: name,
        send_to: LittledataLayer.webPropertyID
      });
    });
    Object(_common_helpers__WEBPACK_IMPORTED_MODULE_1__["trackSocialShares"])(function (network) {
      dataLayer.push({
        event: 'share_product',
        network: network
      });
      gtag('event', 'Social share', {
        event_category: event_category,
        event_label: network,
        send_to: LittledataLayer.webPropertyID
      });
    });
  }
};
var filterGAProductFields = function filterGAProductFields(product) {
  //pick only the allowed fields from GA EE specification
  //https://developers.google.com/tag-manager/enhanced-ecommerce#product-impressions
  var gaProductFields = ['name', 'id', 'price', 'brand', 'category', 'variant', 'list', 'list_name', 'position', 'list_position'];
  var gaProduct = {};
  gaProductFields.forEach(function (field) {
    if (product[field]) gaProduct[field] = product[field];
  });
  return gaProduct;
};
var getConfig = function getConfig() {
  var settings = window.LittledataLayer || {};
  var anonymizeIp = settings.anonymizeIp,
      googleSignals = settings.googleSignals,
      ecommerce = settings.ecommerce,
      optimizeId = settings.optimizeId,
      referralExclusion = settings.referralExclusion;
  var DEFAULT_LINKER_DOMAINS = ['^(?!cdn.)(.*)shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com', 'shop.app'];
  var extraLinkerDomains = settings.extraLinkerDomains || [];
  var excludeReferral = referralExclusion && referralExclusion.test(document.referrer);
  var extraExcludedReferrers = ['shop.app'];

  if (extraExcludedReferrers.includes(document.referrer)) {
    excludeReferral = true;
  }

  if (document.referrer.includes("".concat(location.protocol, "//").concat(location.host))) {
    //valid referrer may have host within the url, like https://newsite.com/about/shopify.com
    //but less likely to have protocol as well, unless the same domain - self-referral
    excludeReferral = true;
  }

  var config = {
    linker: {
      domains: [].concat(DEFAULT_LINKER_DOMAINS, _toConsumableArray(extraLinkerDomains))
    },
    anonymize_ip: anonymizeIp === false ? false : true,
    allow_ad_personalization_signals: googleSignals === true ? true : false,
    currency: ecommerce && ecommerce.currencyCode || 'USD',
    link_attribution: true,
    optimize_id: optimizeId,
    page_referrer: excludeReferral ? null : document.referrer
  };
  var userId = settings.customer && settings.customer.id;

  if (userId) {
    config.user_id = userId;
  }

  var cookie = Object(_common_getCookie__WEBPACK_IMPORTED_MODULE_0__["getCookie"])('_ga');

  if (cookie && !Object(_common_getCookie__WEBPACK_IMPORTED_MODULE_0__["getValidGAClientId"])(cookie)) {
    //expiring the cookie after this session ensures invalid clientID
    //is not propagated to future sessions
    config.cookie_expires = 0;
  }

  return config;
};

var addUTMMediumIfMissing = function addUTMMediumIfMissing(url) {
  var utmMedium = /(\?|&)utm_medium=/;
  var utmSource = /utm_source=[a-z,A-Z,0-9,-,_]+/;
  var sourceMatches = url.match(utmSource);

  if (!sourceMatches || !sourceMatches.length || utmMedium.test(url)) {
    return url;
  } // Shopify adds a utm_source tag for it's own tracking, without specifying utm_medium
  // we add 'referral' to ensure it shows up in GA


  var sourceTag = sourceMatches[0];
  var utmTags = sourceTag + '&utm_medium=referral';
  return url.replace(sourceTag, utmTags);
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValidGAClientId", function() { return getValidGAClientId; });
var getCookie = function getCookie(name) {
  if (document.cookie.length > 0) {
    var cookieStart = document.cookie.indexOf("".concat(name, "="));

    if (cookieStart !== -1) {
      var valueStart = cookieStart + name.length + 1;
      var cookieEnd = document.cookie.indexOf(';', valueStart);

      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }

      var cookie = unescape(document.cookie.substring(valueStart, cookieEnd));
      return cookie;
    }
  }

  return '';
};
var getValidGAClientId = function getValidGAClientId() {
  var cookie = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var match = cookie.match(/(\d{2,11})\.(\d{2,11})/g);
  return match && match[0];
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageView", function() { return pageView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementsByHref", function() { return getElementsByHref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDataLayerProduct", function() { return findDataLayerProduct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productListClicks", function() { return productListClicks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCartOnlyAttributes", function() { return setCartOnlyAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setClientID", function() { return setClientID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePii", function() { return removePii; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guid", function() { return guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackProductImageClicks", function() { return trackProductImageClicks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackSocialShares", function() { return trackSocialShares; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLittledataLayer", function() { return validateLittledataLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "advertiseLD", function() { return advertiseLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retrieveAndStoreClientId", function() { return retrieveAndStoreClientId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentReady", function() { return documentReady; });
/* harmony import */ var _UrlChangeTracker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _gaTracker_customTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 *
 * @param fireTag - callback to call when willing to fire pageviews
 */

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
  } // now listen for changes of URL on product and other pages
  // Shopify uses history.replaceState() when variant changes


  if (LittledataLayer.doNotTrackReplaceState !== true) {
    var urlChangeTracker = new _UrlChangeTracker__WEBPACK_IMPORTED_MODULE_0__["default"](true);
    urlChangeTracker.setCallback(fireTag);
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
    var productLinkWithParams = linkSplit && linkSplit[1];
    var productLinkWithParamsArray = productLinkWithParams.split('?');
    var productLink = productLinkWithParamsArray && productLinkWithParamsArray[0];
    return productLink ? productLink === p.handle : productLinkWithParams === p.handle;
  });
};
var productListClicks = function productListClicks(clickTag) {
  /* product list clicks */
  if (!LittledataLayer.productClicks) return;
  getElementsByHref('/products/').forEach(function (element) {
    element.addEventListener('click', function (ev) {
      // only add event to products
      var product = findDataLayerProduct(this.href);

      if (product) {
        ev.preventDefault();
        /* only wait 1 second before redirecting */

        element.timeout = window.setTimeout(function () {
          document.location.href = element.href;
        }, 1000);
        clickTag(product, element);
      } else {
        document.location.href = element.href;
      }
    });
  });
};
var postCartTimeout;
var cartOnlyAttributes = {};
var setCartOnlyAttributes = function setCartOnlyAttributes(setAttributes) {
  var toSet = Object.keys(setAttributes);
  toSet.forEach(function (name) {
    var fieldName = "littledata_".concat(name);
    cartOnlyAttributes[fieldName] = setAttributes[name];
  });
};
var attributes = {}; //persist any previous attributes sent from this page

function postClientID(clientId, platform, sendCartToLittledata) {
  var attribute = "".concat(platform, "-clientID");
  if (typeof clientId !== 'string' || clientId.length === 0) return;
  attributes[attribute] = clientId;
  clearTimeout(postCartTimeout); // timeout is to allow 2 client IDs posted within 1 second
  // to be included in the same cart update

  postCartTimeout = setTimeout(function () {
    attributes.littledata_updatedAt = new Date().getTime();
    var cartUpdateReq = new XMLHttpRequest(); // new HttpRequest instance

    cartUpdateReq.onload = function () {
      var updatedCart = JSON.parse(cartUpdateReq.response);
      LittledataLayer.cart = updatedCart;

      if (sendCartToLittledata) {
        postCartToLittledata(updatedCart);
      }

      var clientIDReq = new XMLHttpRequest();
      clientIDReq.open('POST', "".concat(LittledataLayer.transactionWatcherURL, "/v2/clientID/store"));
      clientIDReq.setRequestHeader('Content-Type', 'application/json');
      clientIDReq.send(JSON.stringify(_objectSpread({}, attributes, {
        cartID: "".concat(updatedCart.token)
      })));
    };

    cartUpdateReq.open('POST', '/cart/update.json');
    cartUpdateReq.setRequestHeader('Content-Type', 'application/json');

    var cartAttributes = _objectSpread({}, attributes, {}, cartOnlyAttributes);

    cartUpdateReq.send(JSON.stringify({
      attributes: cartAttributes
    }));
  }, 1000);
}

function postCartToLittledata(cart) {
  var httpRequest = new XMLHttpRequest(); // new HttpRequest instance

  httpRequest.open('POST', "".concat(LittledataLayer.transactionWatcherURL, "/cart/store"));
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify(cart));
}

function setClientID(clientId, platform) {
  var _LittledataLayer = LittledataLayer,
      cart = _LittledataLayer.cart;
  var cartAttributes = cart && cart.attributes || {};
  var clientIDProperty = "".concat(platform, "-clientID");

  if (!LittledataLayer[clientIDProperty] && // don't resend for the same page
  !cartAttributes[clientIDProperty] // don't resend for the same cart
  ) {
      // set it on data layer, so subsequent setClientID call is ignored
      LittledataLayer[clientIDProperty] = clientId;
      postClientID(clientId, platform, false);
    }

  var updatedAt = cartAttributes.littledata_updatedAt;

  if (updatedAt) {
    var clientIdCreated = new Date(Number(updatedAt));
    var timeout = 60 * 60 * 1000; // 60 minutes is the time cart is cached in Redis

    var timePassed = Date.now() - Number(clientIdCreated); // only need to resend cart if it's expired from our Redis cache

    if (timePassed > timeout) {
      //cart from LittledataLayer may have no token, so we need to fetch from API before storing
      postClientID(clientId, platform, true);
    }
  }
}
function removePii(str) {
  var piiRegexs = [{
    key: 'email',
    regex: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/
  }, {
    key: 'postcode',
    regex: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/
  }];
  return piiRegexs.reduce(function (memo, curr) {
    return memo.replace(curr.regex, 'REMOVED');
  }, str);
}
/**
 * guid
 */

var guid = function () {
  function s10() {
    return Math.floor(Math.random() * 10e9);
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

var trackProductImageClicks = function trackProductImageClicks(clickTag) {
  if (LittledataLayer.productPageClicks === false) return false;
  getElementsByHref('^https://cdn.shopify.com/s/files/.*/products/').forEach(function (element) {
    element.addEventListener('click', function () {
      // only add event to product images
      var image = this.getElementsByTagName('img')[0];
      var name = image && image.alt;
      clickTag(name);
    });
  });
};
var trackSocialShares = function trackSocialShares(clickTag) {
  if (LittledataLayer.productPageClicks === false) return false;
  var networks = '(facebook|pinterest|twitter|linkedin|plus.google|instagram)';
  getElementsByHref("".concat(networks, ".com/(share|pin|intent)")).forEach(function (element) {
    element.addEventListener('click', function () {
      var match = this.href.match(new RegExp(networks));
      clickTag(match && match[0]);
    });
  });
};
var validateLittledataLayer = function validateLittledataLayer() {
  window.LittledataScriptVersion = '9.2';

  if (!window.LittledataLayer) {
    throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
  }
};
var advertiseLD = function advertiseLD(app) {
  if (!LittledataLayer.hideBranding) {
    var appURI = app === 'Segment' ? 'segment-com-by-littledata' : 'littledata';
    console.log("%c\nThis store uses Littledata \uD83D\uDE80 to automate its ".concat(app, " setup and make better, data-driven decisions. Learn more at http://apps.shopify.com/").concat(appURI, " \n"), 'color: #088f87;');
  }
};
function retrieveAndStoreClientId() {
  var withCustomTask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var clientIdPromise = new Promise(function (resolve) {
    // @ts-ignore
    gtag('get', LittledataLayer.webPropertyID, 'client_id', resolve);
  });
  clientIdPromise.then(function (clientId) {
    if (withCustomTask) {
      setCustomTask();
    }

    return setClientID(clientId, 'google');
  });
}

var setCustomTask = function setCustomTask() {
  var trackers = window.ga && window.ga.getAll && window.ga.getAll();
  if (!trackers || !trackers.length) return;
  var MPEndpointLength = LittledataLayer.MPEndpoint && LittledataLayer.MPEndpoint.length;

  if (MPEndpointLength) {
    trackers[0].set('customTask', Object(_gaTracker_customTask__WEBPACK_IMPORTED_MODULE_1__["customTask"])(LittledataLayer.MPEndpoint));
  }
};

var documentReady = function documentReady(callback) {
  // see if DOM is already available
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(callback, 1);
  } else {
    // @ts-ignore
    document.addEventListener('DOMContentLoaded', callback);
  }
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UrlChangeTracker; });
/* harmony import */ var _MethodChain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


/**
 * Class for the `urlChangeTracker` analytics.js plugin.
 * @implements {UrlChangeTrackerPublicInterface}
 */
class UrlChangeTracker {
	constructor(trackReplaceState) {
		// Feature detects to prevent errors in unsupporting browsers.
		if (!history.pushState || !window.addEventListener) return;

		//fallback if not given callback
		this.onUrlChange = () => {
			console.warn('UrlChangeTracker not given callback');
		};

		// Sets the initial page field.
		// Don't set this on the tracker yet so campaign data can be retreived
		// from the location field.
		this.path = getPath();

		//
		this.trackReplaceState = trackReplaceState;

		// Binds methods.
		this.pushStateOverride = this.pushStateOverride.bind(this);
		this.replaceStateOverride = this.replaceStateOverride.bind(this);
		this.handlePopState = this.handlePopState.bind(this);

		// Watches for history changes.
		_MethodChain__WEBPACK_IMPORTED_MODULE_0__["default"].add(history, 'pushState', this.pushStateOverride);
		_MethodChain__WEBPACK_IMPORTED_MODULE_0__["default"].add(history, 'replaceState', this.replaceStateOverride);
		window.addEventListener('popstate', this.handlePopState);
	}

	// function to call when URL changes
	setCallback(tag) {
		this.onUrlChange = tag;
	}

	/**
	 * Handles invocations of the native `history.pushState` and calls
	 * `handleUrlChange()` indicating that the history updated.
	 * @param {!Function} originalMethod A reference to the overridden method.
	 * @return {!Function}
	 */
	pushStateOverride(originalMethod) {
		return (...args) => {
			originalMethod(...args);
			this.handleUrlChange(true);
		};
	}

	/**
	 * Handles invocations of the native `history.replaceState` and calls
	 * `handleUrlChange()` indicating that history was replaced.
	 * @param {!Function} originalMethod A reference to the overridden method.
	 * @return {!Function}
	 */
	replaceStateOverride(originalMethod) {
		return (...args) => {
			originalMethod(...args);
			this.handleUrlChange(false);
		};
	}

	/**
	 * Handles responding to the popstate event and calls
	 * `handleUrlChange()` indicating that history was updated.
	 */
	handlePopState() {
		this.handleUrlChange(true);
	}

	/**
	 * Updates the page and title fields on the tracker and sends a pageview
	 * if a new history entry was created.
	 * @param {boolean} historyDidUpdate True if the history was changed via
	 *     `pushState()` or the `popstate` event. False if the history was just
	 *     modified via `replaceState()`.
	 */
	handleUrlChange(historyDidUpdate) {
		// Call the update logic asychronously to help ensure that app logic
		// responding to the URL change happens prior to this.
		setTimeout(() => {
			const oldPath = this.path;
			const newPath = getPath();

			if (oldPath != newPath && this.shouldTrackUrlChange(newPath, oldPath)) {
				this.path = newPath;
				if (historyDidUpdate || this.trackReplaceState) {
					this.onUrlChange();
				}
			}
		}, 0);
	}

	/**
	 * Determines whether or not the tracker should send a hit with the new page
	 * data.
	 * @param {string} newPath The path after the URL change.
	 * @param {string} oldPath The path prior to the URL change.
	 * @return {boolean} Whether or not the URL change should be tracked.
	 */
	shouldTrackUrlChange(newPath, oldPath) {
		return !!(newPath && oldPath);
	}

	/**
	 * Removes all event listeners and restores overridden methods.
	 */
	remove() {
		this.queue.destroy();
		_MethodChain__WEBPACK_IMPORTED_MODULE_0__["default"].remove(history, 'pushState', this.pushStateOverride);
		_MethodChain__WEBPACK_IMPORTED_MODULE_0__["default"].remove(history, 'replaceState', this.replaceStateOverride);
		window.removeEventListener('popstate', this.handlePopState);
	}
}

/**
 * @return {string} The path value of the current URL.
 */
function getPath() {
	return location.pathname + location.search;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MethodChain; });
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * The functions exported by this module make it easier (and safer) to override
 * foreign object methods (in a modular way) and respond to or modify their
 * invocation. The primary feature is the ability to override a method without
 * worrying if it's already been overridden somewhere else in the codebase. It
 * also allows for safe restoring of an overridden method by only fully
 * restoring a method once all overrides have been removed.
 */

const instances = [];

/**
 * A class that wraps a foreign object method and emit events before and
 * after the original method is called.
 */
class MethodChain {
	/**
	 * Adds the passed override method to the list of method chain overrides.
	 * @param {!Object} context The object containing the method to chain.
	 * @param {string} methodName The name of the method on the object.
	 * @param {!Function} methodOverride The override method to add.
	 */
	static add(context, methodName, methodOverride) {
		getOrCreateMethodChain(context, methodName).add(methodOverride);
	}

	/**
	 * Removes a method chain added via `add()`. If the override is the
	 * only override added, the original method is restored. If the method
	 * chain does not exist, nothing happens.
	 * @param {!Object} context The object containing the method to unchain.
	 * @param {string} methodName The name of the method on the object.
	 * @param {!Function} methodOverride The override method to remove.
	 */
	static remove(context, methodName, methodOverride) {
		let methodChain = getMethodChain(context, methodName);
		if (methodChain) {
			methodChain.remove(methodOverride);
		}
	}

	/**
	 * Wraps a foreign object method and overrides it. Also stores a reference
	 * to the original method so it can be restored later.
	 * @param {!Object} context The object containing the method.
	 * @param {string} methodName The name of the method on the object.
	 */
	constructor(context, methodName) {
		this.context = context;
		this.methodName = methodName;
		this.isTask = /Task$/.test(methodName);

		this.originalMethodReference = this.isTask ? context.get(methodName) : context[methodName];

		this.methodChain = [];
		this.boundMethodChain = [];

		// Wraps the original method.
		this.wrappedMethod = (...args) => {
			const lastBoundMethod = this.boundMethodChain[this.boundMethodChain.length - 1];

			return lastBoundMethod(...args);
		};

		// Override original method with the wrapped one.
		if (this.isTask) {
			context.set(methodName, this.wrappedMethod);
		} else {
			context[methodName] = this.wrappedMethod;
		}
	}

	/**
	 * Adds a method to the method chain.
	 * @param {!Function} overrideMethod The override method to add.
	 */
	add(overrideMethod) {
		this.methodChain.push(overrideMethod);
		this.rebindMethodChain();
	}

	/**
	 * Removes a method from the method chain and restores the prior order.
	 * @param {!Function} overrideMethod The override method to remove.
	 */
	remove(overrideMethod) {
		const index = this.methodChain.indexOf(overrideMethod);
		if (index > -1) {
			this.methodChain.splice(index, 1);
			if (this.methodChain.length > 0) {
				this.rebindMethodChain();
			} else {
				this.destroy();
			}
		}
	}

	/**
	 * Loops through the method chain array and recreates the bound method
	 * chain array. This is necessary any time a method is added or removed
	 * to ensure proper original method context and order.
	 */
	rebindMethodChain() {
		this.boundMethodChain = [];
		for (let method, i = 0; (method = this.methodChain[i]); i++) {
			const previousMethod = this.boundMethodChain[i - 1] || this.originalMethodReference.bind(this.context);
			this.boundMethodChain.push(method(previousMethod));
		}
	}

	/**
	 * Calls super and destroys the instance if no registered handlers remain.
	 */
	destroy() {
		const index = instances.indexOf(this);
		if (index > -1) {
			instances.splice(index, 1);
			if (this.isTask) {
				this.context.set(this.methodName, this.originalMethodReference);
			} else {
				this.context[this.methodName] = this.originalMethodReference;
			}
		}
	}
}

/**
 * Gets a MethodChain instance for the passed object and method.
 * @param {!Object} context The object containing the method.
 * @param {string} methodName The name of the method on the object.
 * @return {!MethodChain|undefined}
 */
function getMethodChain(context, methodName) {
	return instances.filter(h => h.context == context && h.methodName == methodName)[0];
}

/**
 * Gets a MethodChain instance for the passed object and method. If the method
 * has already been wrapped via an existing MethodChain instance, that
 * instance is returned.
 * @param {!Object} context The object containing the method.
 * @param {string} methodName The name of the method on the object.
 * @return {!MethodChain}
 */
function getOrCreateMethodChain(context, methodName) {
	let methodChain = getMethodChain(context, methodName);

	if (!methodChain) {
		methodChain = new MethodChain(context, methodName);
		instances.push(methodChain);
	}
	return methodChain;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customTask", function() { return customTask; });
var customTask = function customTask(endpoint) {
  return function (customTaskModel) {
    window._ga_originalSendHitTask = window._ga_originalSendHitTask || customTaskModel.get('sendHitTask');
    customTaskModel.set('sendHitTask', function (sendHitTaskModel) {
      var originalSendHitTask = window._ga_originalSendHitTask;

      try {
        originalSendHitTask(sendHitTaskModel);
        var hitPayload = sendHitTaskModel.get('hitPayload');
        var request = new XMLHttpRequest();
        request.open('POST', endpoint, true);
        request.withCredentials = false;
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(hitPayload);
      } catch (err) {
        originalSendHitTask(sendHitTaskModel);
      }
    });
  };
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => {
	const detail = LittledataLayer.ecommerce.detail;
	if (!detail) return null;

	// Is the variant ID specified in the URL?
	// variant is a 8 to 20 digit number like 31524084842532
	const matches = document.location.href.match(/[0-9]{8,20}/);
	const variantId = matches && Number(matches[0]);
	if (variantId) {
		detail.shopify_variant_id = variantId;
		//find variant in the list of variants
		const variantList = LittledataLayer.ecommerce.variants;
		if (variantList) {
			const variant = variantList.find(obj => obj.id === variantId);
			if (variant) {
				detail.id = variant.sku;
				detail.variant = variant.title;
			}
		}
	}

	return detail;
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/* harmony default export */ __webpack_exports__["default"] = (function (impressionTag) {
  var waitForScroll = 0;
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
      //maximum batch size is 20
      chunk(impressions, 20).forEach(function (batch) {
        return impressionTag(batch);
      });
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

var chunk = function chunk(arr, size) {
  return Array.from({
    length: Math.ceil(arr.length / size)
  }, function (v, i) {
    return arr.slice(i * size, i * size + size);
  });
};

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProperties", function() { return getProperties; });
var getProperties = function getProperties(scriptSrc) {
  var startIndexGa = scriptSrc.indexOf('webPropertyId=');
  var endIndexGa = scriptSrc.indexOf('&', startIndexGa);
  var webPropertyId = startIndexGa && scriptSrc.substring(startIndexGa + 14, endIndexGa > -1 ? endIndexGa : scriptSrc.length);
  var startIndexSegment = scriptSrc.indexOf('segmentProperty=');
  var endIndexSegment = scriptSrc.indexOf('&', startIndexSegment);
  var segmentProperty = startIndexSegment && scriptSrc.substring(startIndexSegment + 16, endIndexSegment ? endIndexSegment : scriptSrc.length);
  return {
    webPropertyId: webPropertyId,
    segmentProperty: segmentProperty
  };
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _segmentThankYouPageTracker_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _gaTracker_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



(function () {
  // @ts-ignore
  if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
    // @ts-ignore
    var scriptSrc = document.currentScript.src;

    var _getProperties = Object(_segmentThankYouPageTracker_helpers__WEBPACK_IMPORTED_MODULE_0__["getProperties"])(scriptSrc),
        webPropertyId = _getProperties.webPropertyId;

    if (!webPropertyId) {
      throw new Error('Could not add ga thank you page script beacuse of missing webPropertyId');
    }

    var script = document.createElement('script');
    script.async = true;
    var src = 'https://www.googletagmanager.com/gtag/js?id=' + webPropertyId;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
    window.dataLayer = window.dataLayer || [];

    var stubFunction = function stubFunction() {
      dataLayer.push(arguments);
    }; //eslint-disable-line


    window.gtag = window.gtag || stubFunction; // @ts-ignore

    gtag('js', new Date());
    gtag('config', webPropertyId, Object(_gaTracker_helpers__WEBPACK_IMPORTED_MODULE_1__["getConfig"])());
    var total = window.Shopify.checkout && window.Shopify.checkout.total_price;
    var value = parseInt(total);
    gtag('event', 'Checkout', {
      event_category: 'Shopify (Littledata)',
      event_label: 'Thank you page',
      value: value
    });
  }
})();

/***/ })
/******/ ]);