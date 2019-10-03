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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
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

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* eslint-env browser */


(function () {
  var webPropertyPromise = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getWebPropertyIdPromise"])();
  webPropertyPromise.then(function (webPropertyID) {
    console.log('webPropertyID', webPropertyID);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["loadGtagScript"])(webPropertyID);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["initGtag"])(webPropertyID);
    Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["sendCartId"])();
  });
})();

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWebPropertyIdPromise", function() { return getWebPropertyIdPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadGtagScript", function() { return loadGtagScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initGtag", function() { return initGtag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendCartId", function() { return sendCartId; });
/* harmony import */ var _common_getGaCookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* eslint-env browser */

var getWebPropertyIdPromise = function getWebPropertyIdPromise() {
  var baseUrl = getMonitorBaseUrl();
  var storeUrl = getStoreUrl();
  var isCheckout = location.pathname.includes('/checkout/');
  var webPropertyId = window.localStorage && window.localStorage.getItem('webPropertyId');
  console.log('webPropertyId', webPropertyId);

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
  console.log('window.localStorage', window.localStorage);
  return webPropertyId;
}

function loadGtagScript(webPropertyId) {
  var gtagLink = "https://www.googletagmanager.com/gtag/js?id=".concat(webPropertyId);
  loadScript(gtagLink, function () {});
} // @ts-ignore

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
  gtag('config', webPropertyId, getConfig());
}

var getConfig = function getConfig() {
  var config = {
    linker: {
      domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com']
    }
  };
  return config;
};

var sendCartId = function sendCartId() {
  console.log('getGaCookie()', Object(_common_getGaCookie__WEBPACK_IMPORTED_MODULE_0__["getGaCookie"])()); // @ts-ignore

  console.log('cartID', CHDataObject.checkout_session);
  var baseUrl = getMonitorBaseUrl();
  var apiUrl = "".concat(baseUrl, "/clientID");
  var data = {
    clientID: Object(_common_getGaCookie__WEBPACK_IMPORTED_MODULE_0__["getGaCookie"])(),
    // @ts-ignore
    cartID: CHDataObject.checkout_session
  };
  var params = buildPostRequestParams(data);
  fetch(apiUrl, params).then(function (response) {
    console.log('resp:', JSON.stringify(response));
    console.log('status:', JSON.stringify(response.status));
    console.log('statusText:', JSON.stringify(response.statusText));
  });
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

/***/ })

/******/ });