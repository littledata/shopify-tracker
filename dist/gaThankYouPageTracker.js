/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 7:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var getCookie_1 = __webpack_require__(6);

exports.default = function () {
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

  var cookie = getCookie_1.getCookie('_ga');

  if (cookie && !getCookie_1.getValidGAClientId(cookie)) {
    //expiring the cookie after this session ensures invalid clientID
    //is not propagated to future sessions
    config.cookie_expires = 0;
  }

  return config;
};

/***/ }),

/***/ 6:
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

/***/ 15:
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

/***/ 22:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var getQueryStringParam_1 = __webpack_require__(15);

var getConfig_1 = __importDefault(__webpack_require__(7));

(function () {
  // @ts-ignore
  if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
    // @ts-ignore
    var scriptSrc = document.currentScript.src;
    var webPropertyId = getQueryStringParam_1.getQueryStringParam(scriptSrc, 'webPropertyId');

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
    gtag('config', webPropertyId, getConfig_1["default"]());
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

/******/ 	});
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(22);
/******/ })()
;