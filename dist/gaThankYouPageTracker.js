!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}({5:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){var t=e.indexOf("webPropertyId="),n=e.indexOf("&",t),r=e.substring(t+14,n),o=e.indexOf("segmentProperty=",n);return{webPropertyId:r,segmentProperty:e.substring(o)}}},8:function(e,t,n){"use strict";n.r(t);var r=n(5);!function(){if(window.Shopify.Checkout&&"thank_you"===window.Shopify.Checkout.page){var e=document.currentScript.src,t=Object(r.a)(e).webPropertyId,n=document.createElement("script");n.async=!0;var o="https://www.googletagmanager.com/gtag/js?id="+t;n.src=o,document.getElementsByTagName("head")[0].appendChild(n),window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},gtag("js",new Date),gtag("config",t);var a=parseInt(window.Shopify.checkout.total_price);gtag("event","Checkout",{event_category:"Shopify (Littledata)",event_label:"Thank you page",value:a})}}()}});