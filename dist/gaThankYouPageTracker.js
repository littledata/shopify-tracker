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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProperties", function() { return getProperties; });
var getProperties = function getProperties(scriptSrc) {
  var startIndexGa = scriptSrc.indexOf('webPropertyId=');
  var webPropertyId = startIndexGa && scriptSrc.substring(startIndexGa + 14);
  var startIndexSegment = scriptSrc.indexOf('segmentProperty=');
  var segmentProperty = startIndexSegment && scriptSrc.substring(startIndexSegment + 16);
  return {
    webPropertyId: webPropertyId,
    segmentProperty: segmentProperty
  };
};

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _segmentThankYouPageTracker_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


(function () {
  // @ts-ignore
  if (window.Shopify.Checkout && window.Shopify.Checkout.page === 'thank_you') {
    // @ts-ignore
    var scriptSrc = document.currentScript.src;

    var _getProperties = Object(_segmentThankYouPageTracker_helpers__WEBPACK_IMPORTED_MODULE_0__["getProperties"])(scriptSrc),
        webPropertyId = _getProperties.webPropertyId;

    var script = document.createElement('script');
    script.async = true;
    var src = 'https://www.googletagmanager.com/gtag/js?id=' + webPropertyId;
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script); // @ts-ignore

    window.dataLayer = window.dataLayer || [];

    var stubFunction = function stubFunction() {
      dataLayer.push(arguments);
    }; //eslint-disable-line
    // @ts-ignore


    window.gtag = window.gtag || stubFunction; // @ts-ignore

    gtag('js', new Date()); // @ts-ignore

    gtag('config', webPropertyId); // @ts-ignore

    var transaction_total = parseInt(window.Shopify.checkout.total_price); // @ts-ignore

    gtag('event', 'Checkout', {
      event_category: 'Shopify (Littledata)',
      event_label: 'Thank you page',
      value: transaction_total
    });
  }
})();

/***/ })

/******/ });