!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";var i=function(t){var e,n,i=function(t,e){for(var n=new Date,i=window.navigator,r=i.plugins||[],o=[t,i.userAgent,n.getTimezoneOffset(),n.getYear(),n.getDate(),n.getHours(),n.getMinutes()+e],c=0;c<r.length;++c)o.push(r[c].description);return a(o.join("."))},r=function(t,e){var n=new Date,i=window.navigator,r=n.getHours()+Math.floor((n.getMinutes()+e)/60);return a([t,i.userAgent,i.language||"",n.getTimezoneOffset(),n.getYear(),n.getDate()+Math.floor(r/24),(24+r)%24,(60+n.getMinutes()+e)%60].join("."))},a=function(t){var e,n=1;if(t)for(n=0,e=t.length-1;0<=e;e--){var i=t.charCodeAt(e);n=0!=(i=266338304&(n=(n<<6&268435455)+i+(i<<14)))?n^i>>21:n}return n.toString()};if("string"==typeof t&&t.length){if(!/_ga=/.test(t))return"Invalid linker format in string argument!";n=t.split("&").filter(function(t){return"_ga"===t.split("=")[0]}).shift()}else n=(e=/[?&]_ga=/.test(window.location.search)?"search":/[#&]_ga=/.test(window.location.hash)?"hash":void 0)&&window.location[e].substring(1).split("&").filter(function(t){return"_ga"===t.split("=")[0]}).shift();if(void 0===n||!n.length)return"Invalid linker format in URL!";var o,c,u,s,d=n.indexOf(".");return d>-1&&(n.substring(0,d),c=(o=n.substring(d+1)).indexOf("."),u=o.substring(0,c),s=o.substring(c+1)),void 0!==s?u===i(s=s.split("-").join(""),0)||u===i(s,-1)||u===i(s,-2)||u===r(s,0)||u===r(s,-1)||u===r(s,-2):void 0},r=n(1);n.d(e,"e",function(){return a}),n.d(e,"b",function(){return o}),n.d(e,"a",function(){return c}),n.d(e,"f",function(){return u}),n.d(e,"h",function(){return d}),n.d(e,"g",function(){return l}),n.d(e,"c",function(){return f}),n.d(e,"d",function(){return g}),n.d(e,"i",function(){return p}),n.d(e,"j",function(){return m});var a=function(t){if(!0===document.hidden){var e=!1;document.addEventListener("visibilitychange",function(){document.hidden||e||(t(),e=!0)})}else t()},o=function(t){var e=document.getElementsByTagName("a"),n=new RegExp(t);return Array.prototype.slice.call(e).filter(function(t){return t.href&&n.test(t.href)})},c=function(t){return LittledataLayer.ecommerce.impressions.find(function(e){var n=t.split("/products/");return(n&&n[1])===e.handle})},u=function(t){LittledataLayer.productClicks&&o("/products/").forEach(function(e){e.addEventListener("click",function(e){var n=this,i=c(n.href);i?(e.preventDefault(),n.timeout=window.setTimeout(function(){document.location=n.href},1e3),t(i,n)):document.location=n.href})})};function s(t){setTimeout(function(){var e=t(),n=(new Date).getTime(),i=new XMLHttpRequest;i.onload=function(){var t=JSON.parse(i.response),r=new XMLHttpRequest;r.open("POST","https://transactions-staging.littledata.io/clientID"),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify({clientID:e,createdAt:n,cartID:t.token}))},i.open("POST","/cart/update.json"),i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify({attributes:{clientID:e,createdAt:n}}))},1e3)}function d(t){var e=LittledataLayer.cart;if(!(e&&e.attributes&&e.attributes.clientID&&e.attributes.createdAt))return s(t);var n=new Date(e.attributes.createdAt);if(new Date-n>36e5&&s(t),e&&e.updated_at){var i=new Date(e.updated_at);new Date-i>36e5&&function(t){var e=new XMLHttpRequest;e.open("POST","https://transactions-staging.littledata.io/cart/store"),e.setRequestHeader("Content-Type","application/json"),e.send(t)}(e)}}function l(t){var e,n={email:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,postcode:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/},i=t;for(e in n)i=i.replace(n[e],"REMOVED");return i}!function(){function t(){return Math.floor(1e10*Math.random())}"GA1.2.".concat(t(),".").concat(t())}();function f(){if(!i()){if(window.localStorage&&!LittledataLayer.enhancePrivacy){var t=window.localStorage.getItem("_ga");if(t)return t;var e=Object(r.getGaCookie)();if(e)return window.localStorage.setItem("_ga",e),e}return""}}function g(){if(!window.analytics||!window.analytics.user())return"";if(window.localStorage&&!LittledataLayer.enhancePrivacy){var t=window.localStorage.getItem("_ga");if(t)return t;var e=window.analytics.user().anonymousId();if(e)return window.localStorage.setItem("_ga",e),e}return""}var p=function(t){o("^https://cdn.shopify.com/s/files/.*/products/").forEach(function(e){e.addEventListener("click",function(){var e=this.getElementsByTagName("img")[0],n=e&&e.alt;t(n)})})},m=function(t){var e="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";o("".concat(e,".com/(share|pin|intent)")).forEach(function(n){n.addEventListener("click",function(){var n=this.href.match(new RegExp(e));t(n&&n[0])})})}},function(t,e,n){"use strict";n.r(e),n.d(e,"getGaCookie",function(){return i});var i=function(){if(document.cookie.length>0){var t=document.cookie.indexOf("".concat("_ga","="));if(-1!==t){t=t+"_ga".length+1;var e=document.cookie.indexOf(";",t);-1===e&&(e=document.cookie.length);var n=unescape(document.cookie.substring(t,e));if(n){var i=n.match(/(\d{2,11})\.(\d{2,11})/g);return i?i[0]:""}}}return""};window.getGaCookie=i},function(t,e,n){"use strict";var i=n(0);e.a=function(t){var e,n=Object(i.b)("/products/");function r(){var e=document.documentElement.scrollTop,r=window.innerHeight,a=e+r,o=[];n.forEach(function(t,r){if(t){var c=window.pageYOffset+t.getBoundingClientRect().top,u=t.offsetHeight,s=c+u;if(s>=e&&c<a){var d=u;if(c-e<0?d+=c-e:a-s<0&&(d+=a-s),d/u>.8){n[r]=null;var l=Object(i.a)(t.href);l&&o.push(l)}}}}),o.length>0&&t(o)}0!==n.length&&(window.setTimeout(function(){clearTimeout(e),r()},500),document.addEventListener("scroll",function(){clearTimeout(e),e=window.setTimeout(function(){r()},300)}))}},,function(t,e,n){"use strict";n.r(e);var i=n(0),r=n(2);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=window.analytics=window.analytics||[];if(!o.initialize)if(o.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{o.invoked=!0,o.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"],o.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),o.push(e),o}};for(var c=0;c<o.methods.length;c++){var u=o.methods[c];o[u]=o.factory(u)}o.load=function(t,e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(n,i),o._loadOptions=e},o.SNIPPET_VERSION="4.1.0",o.load(LittledataLayer.writeKey)}var s=function(t){return{brand:t.brand,category:t.category,url:t.handle,product_id:t.id,sku:t.id,position:t.list_position,name:t.name,price:parseFloat(t.price),variant:t.variant}};!function(){function t(){if(Object(i.h)(function(){return Object(i.d)()}),LittledataLayer){LittledataLayer.ecommerce.impressions.length&&(Object(i.f)(function(t){var e=LittledataLayer.ecommerce.impressions.find(function(e){return e.name===t.name&&e.handle===t.handle}),n=e&&e.list_position;window.localStorage.setItem("position",n);var i=s(t);i.list_id=document.location.pathname,i.category="EnhancedEcommerce",window.analytics.track("Product Clicked",i)}),Object(r.a)(function(t){var e=t&&t[0].list;t.forEach(function(e,n){var i=s(e);t[n]=i}),window.analytics.track("Product List Viewed",{list_id:e,category:"EnhancedEcommerce",products:t})}));var t=LittledataLayer.ecommerce.detail;if(t){var e=s(t);e.list_id=document.location.href,e.category="EnhancedEcommerce",e.position=parseInt(window.localStorage.getItem("position"))||1,window.analytics.track("Product Viewed",e),Object(i.i)(function(t){e.image_url=t,window.analytics.track("Product Image Clicked",e)}),Object(i.j)(function(t){window.analytics.track("Product Shared",function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){a(t,e,n[e])})}return t}({},e,{share_via:t}))})}}}window.dataLayer=window.dataLayer||[],LittledataLayer?(LittledataLayer.hideBranding||console.log("%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/segment-com-by-littledata \n","color: #088f87;"),LittledataLayer.customer&&window.analytics.identify(LittledataLayer.customer.id,LittledataLayer.customer),Object(i.e)(function(){window.analytics.page()}),"loading"!==document.readyState?window.analytics.ready(function(){t()}):document.addEventListener("DOMContentLoaded",function(){window.analytics.ready(function(){t()})})):console.warn("Aborting Littledata tracking as LittledataLayer was not found")}()}]);