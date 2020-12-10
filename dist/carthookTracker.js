/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 13:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-env browser */

var helpers_1 = __webpack_require__(14);

(function () {
  var webPropertyPromise = helpers_1.getWebPropertyIdPromise();
  webPropertyPromise.then(function (webPropertyID) {
    helpers_1.loadGtagScript(webPropertyID);
    helpers_1.initGtag(webPropertyID);
    helpers_1.sendCartId();
  });
})();

/***/ }),

/***/ 14:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/* eslint-env browser */

var getCookie_1 = __webpack_require__(2);

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
  gtag('config', webPropertyId, getConfig());
}

exports.initGtag = initGtag;

var getConfig = function getConfig() {
  var config = {
    linker: {
      domains: ['shopify.com', 'rechargeapps.com', 'recurringcheckout.com', 'carthook.com', 'checkout.com', 'shop.app']
    }
  };
  return config;
};

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

/***/ }),

/***/ 2:
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(13);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;