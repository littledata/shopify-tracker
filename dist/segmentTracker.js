!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";var r=function(t){var e,n,r=function(t,e){for(var n=new Date,r=window.navigator,i=r.plugins||[],a=[t,r.userAgent,n.getTimezoneOffset(),n.getYear(),n.getDate(),n.getHours(),n.getMinutes()+e],c=0;c<i.length;++c)a.push(i[c].description);return o(a.join("."))},i=function(t,e){var n=new Date,r=window.navigator,i=n.getHours()+Math.floor((n.getMinutes()+e)/60);return o([t,r.userAgent,r.language||"",n.getTimezoneOffset(),n.getYear(),n.getDate()+Math.floor(i/24),(24+i)%24,(60+n.getMinutes()+e)%60].join("."))},o=function(t){var e,n=1;if(t)for(n=0,e=t.length-1;0<=e;e--){var r=t.charCodeAt(e);n=0!=(r=266338304&(n=(n<<6&268435455)+r+(r<<14)))?n^r>>21:n}return n.toString()};if("string"==typeof t&&t.length){if(!/_ga=/.test(t))return"Invalid linker format in string argument!";n=t.split("&").filter(function(t){return"_ga"===t.split("=")[0]}).shift()}else n=(e=/[?&]_ga=/.test(window.location.search)?"search":/[#&]_ga=/.test(window.location.hash)?"hash":void 0)&&window.location[e].substring(1).split("&").filter(function(t){return"_ga"===t.split("=")[0]}).shift();if(void 0===n||!n.length)return"Invalid linker format in URL!";var a,c,u,s,d=n.indexOf(".");return d>-1&&(n.substring(0,d),c=(a=n.substring(d+1)).indexOf("."),u=a.substring(0,c),s=a.substring(c+1)),void 0!==s?u===r(s=s.split("-").join(""),0)||u===r(s,-1)||u===r(s,-2)||u===i(s,0)||u===i(s,-1)||u===i(s,-2):void 0},i=n(1);n.d(e,"d",function(){return o}),n.d(e,"b",function(){return a}),n.d(e,"a",function(){return c}),n.d(e,"e",function(){return u}),n.d(e,"g",function(){return d}),n.d(e,"f",function(){return f}),n.d(e,"c",function(){return l}),n.d(e,"h",function(){return g}),n.d(e,"i",function(){return p});var o=function(t){if(!0===document.hidden){var e=!1;document.addEventListener("visibilitychange",function(){document.hidden||e||(t(),e=!0)})}else t()},a=function(t){var e=document.getElementsByTagName("a"),n=new RegExp(t);return Array.prototype.slice.call(e).filter(function(t){return t.href&&n.test(t.href)})},c=function(t){return LittledataLayer.ecommerce.impressions.find(function(e){var n=t.split("/products/");return(n&&n[1])===e.handle})},u=function(t){LittledataLayer.productClicks&&a("/products/").forEach(function(e){e.addEventListener("click",function(e){var n=this,r=c(n.href);r?(e.preventDefault(),n.timeout=window.setTimeout(function(){document.location=n.href},1e3),t(r,n)):document.location=n.href})})};function s(t){setTimeout(function(){var e=t(),n=(new Date).getTime(),r=new XMLHttpRequest;r.onload=function(){var t=JSON.parse(r.response),i=new XMLHttpRequest;i.open("POST","https://transactions-staging.littledata.io/clientID"),i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify({clientID:e,createdAt:n,cartID:t.token}))},r.open("POST","/cart/update.json"),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify({attributes:{clientID:e,createdAt:n}}))},1e3)}function d(t){var e=LittledataLayer.cart;if(!(e&&e.attributes&&e.attributes.clientID&&e.attributes.createdAt))return s(t);var n=new Date(e.attributes.createdAt);if(new Date-n>36e5&&s(t),e&&e.updated_at){var r=new Date(e.updated_at);new Date-r>36e5&&function(t){var e=new XMLHttpRequest;e.open("POST","https://transactions-staging.littledata.io/cart/store"),e.setRequestHeader("Content-Type","application/json"),e.send(t)}(e)}}function f(t){var e,n={email:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,postcode:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/},r=t;for(e in n)r=r.replace(n[e],"REMOVED");return r}!function(){function t(){return Math.floor(1e10*Math.random())}"GA1.2.".concat(t(),".").concat(t())}();function l(){if(!r()){var t=Object(i.getGaCookie)();if(window.localStorage&&!LittledataLayer.enhancePrivacy){var e=window.localStorage.getItem("_ga");if(e)return e;t&&window.localStorage.setItem("_ga",t)}return t||""}}var g=function(t){a("^https://cdn.shopify.com/s/files/.*/products/").forEach(function(e){e.addEventListener("click",function(){var e=this.getElementsByTagName("img")[0],n=e&&e.alt;t(n)})})},p=function(t){var e="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";a("".concat(e,".com/(share|pin|intent)")).forEach(function(n){n.addEventListener("click",function(){var n=this.href.match(new RegExp(e));t(n&&n[0])})})}},function(t,e,n){"use strict";n.r(e),n.d(e,"getGaCookie",function(){return r});var r=function(){if(document.cookie.length>0){var t=document.cookie.indexOf("".concat("_ga","="));if(-1!==t){t=t+"_ga".length+1;var e=document.cookie.indexOf(";",t);-1===e&&(e=document.cookie.length);var n=unescape(document.cookie.substring(t,e));if(n){var r=n.match(/[0-9]{10}\.[0-9]{10}/);return r?r[0]:""}}}return""};window.getGaCookie=r},function(t,e,n){"use strict";var r=n(0);e.a=function(t){var e,n=Object(r.b)("/products/");function i(){var e=document.documentElement.scrollTop,i=window.innerHeight,o=e+i,a=[];n.forEach(function(t,i){if(t){var c=window.pageYOffset+t.getBoundingClientRect().top,u=t.offsetHeight,s=c+u;if(s>=e&&c<o){var d=u;if(c-e<0?d+=c-e:o-s<0&&(d+=o-s),d/u>.8){n[i]=null;var f=Object(r.a)(t.href);f&&a.push(f)}}}}),a.length>0&&t(a)}0!==n.length&&(window.setTimeout(function(){clearTimeout(e),i()},500),document.addEventListener("scroll",function(){clearTimeout(e),e=window.setTimeout(function(){i()},300)}))}},,function(t,e,n){"use strict";n.r(e);var r=n(0),i=n(2);function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){a(t,e,n[e])})}return t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c=window.analytics=window.analytics||[];if(!c.initialize)if(c.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{c.invoked=!0,c.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"],c.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),c.push(e),c}};for(var u=0;u<c.methods.length;u++){var s=c.methods[u];c[s]=c.factory(s)}c.load=function(t,e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r),c._loadOptions=e},c.SNIPPET_VERSION="4.1.0",c.load(LittledataLayer.writeKey)}var d=function(t){return o({},t,{product_id:t.id,sku:t.id})};!function(){function t(){if(Object(r.g)(function(){return window.analytics.user().anonymousId()}),LittledataLayer){LittledataLayer.ecommerce.impressions.length&&(Object(r.e)(function(t){var e=LittledataLayer.ecommerce.impressions.find(function(e){return e.name===t.name&&e.handle===t.handle}),n=e&&e.list_position;window.localStorage.setItem("position",n);var r=d(t);r.list_id=document.location.pathname,r.category="EnhancedEcommerce",c.track("Product Clicked",r)}),Object(i.a)(function(t){c.track("Product List Viewed",{list_id:t[0].list,category:"EnhancedEcommerce",products:t})}));var t=LittledataLayer.ecommerce.detail;if(t){var e=d(t);e.list_id=document.location.href,e.category="EnhancedEcommerce",e.list_position=parseInt(window.localStorage.getItem("position"))||1,c.track("Product Viewed",e),Object(r.h)(function(t){e.image_url=t,c.track("Product Image Clicked",e)}),Object(r.i)(function(t){c.track("Product Shared",o({},e,{share_via:t}))})}}}window.dataLayer=window.dataLayer||[],LittledataLayer?(LittledataLayer.hideBranding||console.log("%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/segment-com-by-littledata \n","color: #088f87;"),LittledataLayer.customer&&c.identify(LittledataLayer.customer.id,LittledataLayer.customer),Object(r.d)(function(){c.page()}),"loading"!==document.readyState?c.ready(function(){t()}):document.addEventListener("DOMContentLoaded",function(){c.ready(function(){t()})})):console.warn("Aborting Littledata tracking as LittledataLayer was not found")}()}]);