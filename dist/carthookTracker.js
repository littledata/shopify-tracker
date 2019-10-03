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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-env browser */


(function () {
  var webPropertyPromise = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["getWebPropertyIdPromise"])();
  webPropertyPromise.then(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(webPropertyID) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('webPropertyID', webPropertyID);
              Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["loadGtagScript"])(webPropertyID);
              Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["initGtag"])(webPropertyID);
              _context.next = 5;
              return Object(_helpers__WEBPACK_IMPORTED_MODULE_0__["sendCartId"])();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
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
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-env browser */

var getWebPropertyIdPromise = function getWebPropertyIdPromise() {
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

var sendCartId =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var baseUrl, apiUrl, data, params;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('getGaCookie()', Object(_common_getGaCookie__WEBPACK_IMPORTED_MODULE_0__["getGaCookie"])()); // @ts-ignore

            console.log('cartID', CHDataObject.checkout_session);
            baseUrl = getMonitorBaseUrl();
            apiUrl = "".concat(baseUrl, "/clientID");
            data = {
              clientID: Object(_common_getGaCookie__WEBPACK_IMPORTED_MODULE_0__["getGaCookie"])(),
              // @ts-ignore
              cartID: CHDataObject.checkout_session
            };
            params = buildPostRequestParams(data);
            _context.next = 8;
            return fetch(apiUrl, params);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendCartId() {
    return _ref.apply(this, arguments);
  };
}();

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