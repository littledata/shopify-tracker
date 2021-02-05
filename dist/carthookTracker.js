/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

exports.getCookie = function (name) {
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

exports.getValidGAClientId = function () {
  var cookie = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var match = cookie.match(/(\d{2,11})\.(\d{2,11})/g);
  return match && match[0];
};

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var getCookie_1 = __webpack_require__(6);

exports.DEFAULT_LINKER_DOMAINS = ['^(?!cdn.)(.*)shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com', 'shop.app'];
exports.extraExcludedReferrers = ['shop.app'];

exports.default = function () {
  var settings = window.LittledataLayer || {};
  var anonymizeIp = settings.anonymizeIp,
      googleSignals = settings.googleSignals,
      ecommerce = settings.ecommerce,
      optimizeId = settings.optimizeId,
      referralExclusion = settings.referralExclusion;
  var extraLinkerDomains = settings.extraLinkerDomains || [];
  var excludeReferral = referralExclusion && referralExclusion.test(document.referrer);

  if (exports.extraExcludedReferrers.includes(document.referrer)) {
    excludeReferral = true;
  }

  if (document.referrer.includes("".concat(location.protocol, "//").concat(location.host))) {
    // valid referrer may have host within the url, like https://newsite.com/about/shopify.com
    // but less likely to have protocol as well, unless the same domain - self-referral
    excludeReferral = true;
  }

  var config = {
    linker: {
      domains: [].concat(_toConsumableArray(exports.DEFAULT_LINKER_DOMAINS), _toConsumableArray(extraLinkerDomains))
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

  var cookie = getCookie_1.getCookie('_ga');

  if (cookie && !getCookie_1.getValidGAClientId(cookie)) {
    //expiring the cookie after this session ensures invalid clientID
    //is not propagated to future sessions
    config.cookie_expires = 0;
  }

  if (settings.cookieUpdate === false) {
    // If the cookie is being overwritten by a server-side cookie to avoid ITP
    // this should be false
    config.cookie_update = false;
  }

  return config;
};

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-env browser */

var getQueryStringParam_1 = __webpack_require__(15);

var helpers_1 = __webpack_require__(16);

var sendCheckoutEvents_1 = __webpack_require__(17);

var sendThankYouEvents_1 = __webpack_require__(19);

var sendUpsellEvents_1 = __webpack_require__(20);

(function () {
  var webPropertyPromise = helpers_1.getWebPropertyIdPromise();
  webPropertyPromise.then(function (webPropertyID) {
    helpers_1.loadGtagScript(webPropertyID);
    helpers_1.initGtag(webPropertyID);
    helpers_1.sendCartId();
  }); // @ts-ignore

  var uniqueIdentifierForOrders = getQueryStringParam_1.getQueryStringParam(document.currentScript.src, 'uniqueIdentifierForOrders');
  var orderId = uniqueIdentifierForOrders === 'orderName' ? 'order_name' : 'order_number';
  window.CH.event(function (EVENT, data) {
    if (EVENT == 'INITIATED_PAGE') {
      var pageType = helpers_1.getPageType();
      if (pageType === 'checkout') sendCheckoutEvents_1.sendCheckoutEvents(data);
      if (pageType === 'upsell') sendUpsellEvents_1.sendUpsellDownsellEvents(); //also for downsell

      if (pageType === 'thankyou') sendThankYouEvents_1.sendThankYouEvents(orderId);
    }
  });
})();

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

exports.getQueryStringParam = function (url, param) {
  if (!url) return '';
  var matches = url.match("".concat(param, "=([a-z,A-Z,0-9,-]+)"));
  if (!matches || !matches.length || !matches[1]) return '';
  return matches[1];
};

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-env browser */

var getCookie_1 = __webpack_require__(6);

var getConfig_1 = __importDefault(__webpack_require__(9));

exports.getWebPropertyIdPromise = function () {
  var baseUrl = getMonitorBaseUrl();
  var storeUrl = getStoreUrl();
  var isCheckout = location.pathname.includes('/checkout/');
  var webPropertyId = window.localStorage && window.localStorage.getItem('webPropertyId');

  if (!isCheckout && webPropertyId) {
    return new Promise(function (resolve) {
      resolve(webPropertyId);
    });
  }

  return requestWebPropertyIdFromAPI(baseUrl, storeUrl);
};

function getMonitorBaseUrl() {
  var STAGING_URL = 'https://transactions-staging.littledata.io';
  var PROD_URL = 'https://transactions.littledata.io';
  var isSandbox = location.pathname.includes('sandbox');
  return isSandbox ? STAGING_URL : PROD_URL;
}

function getStoreUrl() {
  // @ts-ignore
  return CHDataObject && CHDataObject.store_urls && CHDataObject.store_urls.store_url;
}

function requestWebPropertyIdFromAPI(baseUrl, storeUrl) {
  var webPropertyId = fetch("".concat(baseUrl, "/webProperty/").concat(storeUrl)).then(function (response) {
    return response.json();
  }).then(function (json) {
    return json.webPropertyId;
  }).then(function (webPropertyId) {
    return saveToLocalStorage(webPropertyId);
  });
  return webPropertyId;
}

function saveToLocalStorage(webPropertyId) {
  window.localStorage && window.localStorage.setItem('webPropertyId', webPropertyId);
  return webPropertyId;
}

function loadGtagScript(webPropertyId) {
  var gtagLink = "https://www.googletagmanager.com/gtag/js?id=".concat(webPropertyId);
  loadScript(gtagLink, function () {});
}

exports.loadGtagScript = loadGtagScript; // @ts-ignore

function loadScript(src, cb) {
  var script = document.createElement('script');
  script.async = true;
  script.src = src;

  script.onerror = function () {
    cb(new Error('Failed to load' + src));
  };

  script.onload = function () {
    cb();
  };

  document.getElementsByTagName('head')[0].appendChild(script);
}

function initGtag(webPropertyId) {
  window.dataLayer = window.dataLayer || [];

  var stubFunction = function stubFunction() {
    dataLayer.push(arguments);
  }; //eslint-disable-line


  window.gtag = window.gtag || stubFunction; // @ts-ignore

  gtag('js', new Date());
  gtag('config', webPropertyId, getConfig_1["default"]());
}

exports.initGtag = initGtag;

exports.sendCartId = function () {
  var baseUrl = getMonitorBaseUrl();
  var apiUrl = "".concat(baseUrl, "/clientID");
  var gaCookie = getCookie_1.getCookie('_ga');
  var clientID = getCookie_1.getValidGAClientId(gaCookie);
  if (!clientID) return;
  var data = {
    clientID: clientID,
    // @ts-ignore
    cartID: "carthook-".concat(CHDataObject.checkout_session)
  };
  var params = buildPostRequestParams(data);
  fetch(apiUrl, params);
};

function buildPostRequestParams(data) {
  var params = {
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(data),
    method: 'POST'
  };
  return params;
}

exports.getPageType = function () {
  var href = document.location.href;
  if (href.includes('/checkout')) return 'checkout';
  if (href.includes('/oto')) return 'upsell';
  if (href.includes('/thank-you')) return 'thankyou';
};

exports.convertToGtagProducts = function (lineItems) {
  return lineItems.map(function (item) {
    return {
      id: item.sku || String(item.foreign_product_id),
      quantity: Number(item.quantity),
      price: Number(item.line_price || item.price || 0).toFixed(2),
      name: item.title,
      variant: item.variant_title,
      brand: item.vendor
    };
  });
};

exports.sumProductTax = function (lineItems) {
  return lineItems.reduce(function (sum, item) {
    return sum + item.tax_amount || 0;
  }, 0);
};

exports.sumProductSubtotal = function (lineItems) {
  return lineItems.reduce(function (sum, item) {
    return sum + (item.price || 0) * (item.quantity || 0);
  }, 0);
};

exports.sumShipping = function (shippingLines) {
  return shippingLines.reduce(function (sum, item) {
    return sum + (item.price || 0);
  }, 0);
};

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__(18);

var helpers_1 = __webpack_require__(16);

var action = 'Checkout';

exports.sendCheckoutEvents = function (data) {
  var cartData = data.cart_data;
  var currency = cartData.currency,
      coupon = cartData.coupon;
  var items = helpers_1.convertToGtagProducts(cartData.line_items);
  var params = {
    event_category: constants_1.event_category,
    currency: currency,
    items: items,
    coupon: coupon
  }; // GA event for Contact info step, triggered at the page load

  gtag('event', action, _objectSpread({}, params, {
    event_label: 'Contact information',
    checkout_step: 1
  }));
  var contactInfoField = document.getElementById('customer_email');
  var shippingInfoField = document.getElementById('shipping_zip'); // GA event for Shipping info step, triggered on leaving email field
  // we are intentionally removing the event listener to avoid event repetitions

  contactInfoField.addEventListener('blur', listenForContactChange);

  function listenForContactChange() {
    gtag('event', action, _objectSpread({}, params, {
      event_label: 'Shipping information',
      checkout_step: 2
    }));
    contactInfoField.removeEventListener('blur', listenForContactChange);
  } // GA event for Payment info step, triggered on leaving ZIP/postal field


  shippingInfoField.addEventListener('blur', listenForShippingChange);

  function listenForShippingChange() {
    gtag('event', action, _objectSpread({}, params, {
      event_label: 'Payment method',
      checkout_step: 3
    }));
    shippingInfoField.removeEventListener('blur', listenForShippingChange);
  }
};

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.event_category = 'CartHook (Littledata)';

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var helpers_1 = __webpack_require__(16);

exports.sendThankYouEvents = function (orderId) {
  if (!window.chData) {
    console.error('Littledata script unable to find chData');
    return;
  }

  var order = window.chData.order;
  var stepCharged = window.chData.last_charged_page_type;
  var lastChargedLineItems = order.last_charged_line_items;
  var lineItems = order.line_items;

  if (lastChargedLineItems.length > 0) {
    var transactionStepProducts = helpers_1.convertToGtagProducts(lastChargedLineItems);
    var transactionStepTax = helpers_1.sumProductTax(lastChargedLineItems);
    var transactionStepSubTotal = helpers_1.sumProductSubtotal(lastChargedLineItems);
    var transactionStepShipping = helpers_1.sumShipping(order.last_charged_shipping_rates);
    var transactionStepTotal = transactionStepTax + transactionStepSubTotal + transactionStepShipping;
    window.dataLayer.push({
      event: 'transactionStepComplete',
      chTransactionId: order.carthook_order_id,
      transactionStepSubTotal: transactionStepSubTotal,
      transactionStepTotal: transactionStepTotal,
      transactionStepTax: transactionStepTax,
      transactionStepShipping: transactionStepShipping,
      transactionStepProducts: transactionStepProducts,
      stepCharged: stepCharged
    });
  }

  if (lineItems.length > 0) {
    window.dataLayer.push({
      event: 'transactionComplete',
      transactionId: order[orderId],
      transactionSubTotal: helpers_1.sumProductSubtotal(lineItems),
      transactionTotal: order.total_price,
      transactionTax: helpers_1.sumProductTax(lineItems),
      transactionShipping: helpers_1.sumShipping(order.selected_shipping_rates),
      transactionProducts: helpers_1.convertToGtagProducts(lineItems)
    });
  }
};

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var constants_1 = __webpack_require__(18);

var helpers_1 = __webpack_require__(16);

exports.sendUpsellDownsellEvents = function () {
  var transactionEventName = 'transactionBeforeUpsell';
  var viewEventName = 'View upsell offer';
  var pageType = window.CHDataObject.partial_type;

  if (pageType === 'downsell_page') {
    transactionEventName = 'transactionBeforeDownsell';
    viewEventName = 'View downsell offer';
  }

  var acceptButton = document.querySelector('.ch-accept-button'); // HTML selector for Accept button

  var rejectButton = document.querySelector('.ch-decline-button'); // HTML selector for Decline button

  var order = window.chData.order;
  var orderId = order.carthook_order_id;
  var upsellProduct = window.chData.cart_data.line_items[0];
  var lastChargedPage = window.chData.last_charged_page_type;
  var value = order.total_price; // Tracking transaction from the Checkout page, before upsell/downsell

  var lineItems = order.last_charged_line_items;
  var items = helpers_1.convertToGtagProducts(lineItems);
  var tax = helpers_1.sumProductTax(lineItems);
  var subtotal = helpers_1.sumProductSubtotal(lineItems);
  var shippingRates = window.chData.order.last_charged_shipping_rates;
  var shipping = 0;

  for (var i = 0; i < shippingRates.length; i++) {
    shipping += parseFloat(shippingRates[i].price);
  }

  if (items.length > 0) {
    window.dataLayer.push({
      event: transactionEventName,
      orderId: orderId,
      value: value,
      items: items,
      tax: tax,
      subtotal: subtotal,
      shipping: shipping,
      lastChargedPage: lastChargedPage
    });
  }

  var event_label = upsellProduct.title;
  var params = {
    event_category: constants_1.event_category,
    event_label: event_label
  }; // GA event for Upsell step, triggered at the page load

  gtag('event', viewEventName, params); // GA event for Upsell Accepted step, triggered at the click of Accept button

  acceptButton.addEventListener('click', function () {
    gtag('event', 'Accept offer', params);
  }); // GA event for Upsell Rejected step, triggered at the click of Decline button

  rejectButton.addEventListener('click', function () {
    gtag('event', 'Reject offer', params);
  });
};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(14);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;