!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";n.d(e,"d",function(){return r}),n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"f",function(){return c}),n.d(e,"e",function(){return u}),n.d(e,"a",function(){return s});var r=function(t){if(!0===document.hidden){var e=!1;document.addEventListener("visibilitychange",function(){document.hidden||e||(t(),e=!0)})}else t()},a=function(){try{return localStorage.setItem("littledata_test_storage","test"),localStorage.removeItem("littledata_test_storage"),!0}catch(t){return!1}}(),o=function(t,e){if(window.setTimeout(function(){t()},500),LittledataLayer.productClicks){var n=document.getElementsByTagName("a");Array.prototype.slice.call(n).filter(function(){return-1!==this.href.indexOf("/products")}).addEventListener("click",function(t){var n=this,r=LittledataLayer.ecommerce.impressions.filter(function(t){var e=n.href.split("/products/");return(e&&e[1])===t.handle})[0];r?(t.preventDefault(),n.timeout=window.setTimeout(function(){document.location=n.href},1e3),a&&(localStorage.list=document.location.pathname),e(r,n)):document.location=n.href})}};function i(){setTimeout(function(){ga(function(){var t=ga.getByName("gtag_UA_424242_4").get("clientId"),e=(new Date).getTime(),n=new XMLHttpRequest;n.onload=function(){var r=JSON.parse(n.response),a=new XMLHttpRequest;a.open("POST","https://transactions-staging.littledata.io/clientID"),a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify({clientID:t,createdAt:e,cartID:r.token}))},n.open("POST","/cart/update.json"),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify({attributes:{clientID:t,createdAt:e}}))})},1e3)}function c(){var t=LittledataLayer.cart;if(!t.attributes||!t.attributes.clientID||!t.attributes.createdAt)return i();var e=new Date(t.attributes.createdAt);new Date-e<36e5||i()}function u(t){var e,n={email:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,postcode:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/},r=t;for(e in n)r=r.replace(n[e],"REMOVED");return r}!function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}"".concat(t()).concat(t(),"-").concat(t(),"-").concat(t(),"-").concat(t(),"-").concat(t()).concat(t()).concat(t())}();var d=function(t){var e=t.name;if(document.cookie.length>0){var n=document.cookie.indexOf("".concat(e,"="));if(-1!==n){n=n+e.length+1;var r=document.cookie.indexOf(";",n);return-1===r&&(r=document.cookie.length),unescape(document.cookie.substring(n,r))}}return""};function s(){var t=d("_ga");if(a&&!LittledataLayer.enhancePrivacy){var e=localStorage.getItem("_ga");if(e)return e;t&&localStorage.setItem("_ga",t)}if(t)return t;var n=ga.getAll()[0].get("clientId");try{localStorage.setItem("_ga",n)}catch(t){return n}return n}},,function(t,e,n){"use strict";n.r(e);var r=n(0),a=window.analytics=window.analytics||[];if(!a.initialize)if(a.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{a.invoked=!0,a.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"],a.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),a.push(e),a}};for(var o=0;o<a.methods.length;o++){var i=a.methods[o];a[i]=a.factory(i)}a.load=function(t,e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r),a._loadOptions=e},a.SNIPPET_VERSION="4.1.0",a.load(LittledataLayer.writeKey)}window.dataLayer=window.dataLayer||[],LittledataLayer?(LittledataLayer.customer&&a.identify(LittledataLayer.customer.id,LittledataLayer.customer),Object(r.d)(function(){a.page()}),document.addEventListener("ready",function(){if(Object(r.f)(function(){return a.user().anonymousId()}),LittledataLayer){LittledataLayer.ecommerce.impressions.length&&Object(r.c)(function(){a.track("Product List Viewed",{list_id:LittledataLayer.ecommerce.impressions[0].list,category:"EnhancedEcommerce",products:LittledataLayer.ecommerce.impressions})},function(t){var e=t;e.list_id=document.location.pathname,e.category="EnhancedEcommerce",a.track("Product Clicked",e)});var t=LittledataLayer.ecommerce.detail;t&&(r.b&&(t.list_id=localStorage.list),t.category="EnhancedEcommerce",a.track("Product Viewed",t))}})):console.warn("Aborting Littledata tracking as LittledataLayer was not found")}]);