!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=10)}([function(t,e,n){"use strict";n.d(e,"d",(function(){return h})),n.d(e,"c",(function(){return f})),n.d(e,"b",(function(){return p})),n.d(e,"e",(function(){return g})),n.d(e,"g",(function(){return y})),n.d(e,"h",(function(){return b})),n.d(e,"f",(function(){return L})),n.d(e,"i",(function(){return O})),n.d(e,"j",(function(){return _})),n.d(e,"k",(function(){return S})),n.d(e,"a",(function(){return k}));const r=[];class i{static add(t,e,n){(function(t,e){let n=o(t,e);n||(n=new i(t,e),r.push(n));return n})(t,e).add(n)}static remove(t,e,n){let r=o(t,e);r&&r.remove(n)}constructor(t,e){this.context=t,this.methodName=e,this.isTask=/Task$/.test(e),this.originalMethodReference=this.isTask?t.get(e):t[e],this.methodChain=[],this.boundMethodChain=[],this.wrappedMethod=(...t)=>(0,this.boundMethodChain[this.boundMethodChain.length-1])(...t),this.isTask?t.set(e,this.wrappedMethod):t[e]=this.wrappedMethod}add(t){this.methodChain.push(t),this.rebindMethodChain()}remove(t){const e=this.methodChain.indexOf(t);e>-1&&(this.methodChain.splice(e,1),this.methodChain.length>0?this.rebindMethodChain():this.destroy())}rebindMethodChain(){this.boundMethodChain=[];for(let t,e=0;t=this.methodChain[e];e++){const n=this.boundMethodChain[e-1]||this.originalMethodReference.bind(this.context);this.boundMethodChain.push(t(n))}}destroy(){const t=r.indexOf(this);t>-1&&(r.splice(t,1),this.isTask?this.context.set(this.methodName,this.originalMethodReference):this.context[this.methodName]=this.originalMethodReference)}}function o(t,e){return r.filter(n=>n.context==t&&n.methodName==e)[0]}class a{constructor(t){history.pushState&&window.addEventListener&&(this.onUrlChange=()=>{console.warn("UrlChangeTracker not given callback")},this.path=c(),this.trackReplaceState=t,this.pushStateOverride=this.pushStateOverride.bind(this),this.replaceStateOverride=this.replaceStateOverride.bind(this),this.handlePopState=this.handlePopState.bind(this),i.add(history,"pushState",this.pushStateOverride),i.add(history,"replaceState",this.replaceStateOverride),window.addEventListener("popstate",this.handlePopState))}setCallback(t){this.onUrlChange=t}pushStateOverride(t){return(...e)=>{t(...e),this.handleUrlChange(!0)}}replaceStateOverride(t){return(...e)=>{t(...e),this.handleUrlChange(!1)}}handlePopState(){this.handleUrlChange(!0)}handleUrlChange(t){setTimeout(()=>{const e=this.path,n=c();e!=n&&this.shouldTrackUrlChange(n,e)&&(this.path=n,(t||this.trackReplaceState)&&this.onUrlChange())},0)}shouldTrackUrlChange(t,e){return!(!t||!e)}remove(){this.queue.destroy(),i.remove(history,"pushState",this.pushStateOverride),i.remove(history,"replaceState",this.replaceStateOverride),window.removeEventListener("popstate",this.handlePopState)}}function c(){return location.pathname+location.search}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(n,!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l,h=function(t){if(!0===document.hidden){var e=!1;document.addEventListener("visibilitychange",(function(){document.hidden||e||(t(),e=!0)}))}else"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(function(){t()})):t();!0!==LittledataLayer.doNotTrackReplaceState&&new a(!0).setCallback(t)},f=function(t){var e=document.getElementsByTagName("a"),n=new RegExp(t);return Array.prototype.slice.call(e).filter((function(t){return t.href&&n.test(t.href)}))},p=function(t){return LittledataLayer.ecommerce.impressions.find((function(e){var n=t.split("/products/"),r=n&&n[1],i=r.split("?"),o=i&&i[0];return o?o===e.handle:r===e.handle}))},g=function(t){LittledataLayer.productClicks&&f("/products/").forEach((function(e){e.addEventListener("click",(function(n){var r=p(this.href);r?(n.preventDefault(),e.timeout=window.setTimeout((function(){document.location.href=e.href}),1e3),t(r,e)):document.location.href=e.href}))}))},m={},y=function(t){Object.keys(t).forEach((function(e){var n="littledata_".concat(e);m[n]=t[e]}))},w={};function v(t,e,n){var r="".concat(e,"-clientID"),i=t();"string"==typeof i&&0!==i.length&&(w[r]=i,clearTimeout(l),l=setTimeout((function(){w.littledata_updatedAt=(new Date).getTime();var t=new XMLHttpRequest;t.onload=function(){var e,r,i=JSON.parse(t.response);LittledataLayer.cart=i,n&&(e=i,(r=new XMLHttpRequest).open("POST","".concat(LittledataLayer.transactionWatcherURL,"/cart/store")),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(e)));var o=new XMLHttpRequest;o.open("POST","".concat(LittledataLayer.transactionWatcherURL,"/v2/clientID/store")),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(u({},w,{cartID:"".concat(i.token)})))},t.open("POST","/cart/update.json"),t.setRequestHeader("Content-Type","application/json");var e=u({},w,{},m);t.send(JSON.stringify({attributes:e}))}),1e3))}function b(t,e){var n=LittledataLayer.cart,r=n&&n.attributes||{},i="".concat(e,"-clientID");LittledataLayer[i]||r[i]||(LittledataLayer[i]=t(),v(t,e,!1));var o=r.littledata_updatedAt;if(o){var a=new Date(Number(o));Date.now()-Number(a)>36e5&&v(t,e,!0)}}function L(t){return[{key:"email",regex:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/},{key:"postcode",regex:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/}].reduce((function(t,e){return t.replace(e.regex,"REMOVED")}),t)}!function(){function t(){return Math.floor(1e10*Math.random())}"GA1.2.".concat(t(),".").concat(t())}();var O=function(t){if(!1===LittledataLayer.productPageClicks)return!1;f("^https://cdn.shopify.com/s/files/.*/products/").forEach((function(e){e.addEventListener("click",(function(){var e=this.getElementsByTagName("img")[0],n=e&&e.alt;t(n)}))}))},_=function(t){if(!1===LittledataLayer.productPageClicks)return!1;var e="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";f("".concat(e,".com/(share|pin|intent)")).forEach((function(n){n.addEventListener("click",(function(){var n=this.href.match(new RegExp(e));t(n&&n[0])}))}))},S=function(){if(window.LittledataScriptVersion="9.1",!window.LittledataLayer)throw new Error("Aborting Littledata tracking as LittledataLayer was not found")},k=function(t){if(!LittledataLayer.hideBranding){var e="Segment"===t?"segment-com-by-littledata":"littledata";console.log("%c\nThis store uses Littledata 🚀 to automate its ".concat(t," setup and make better, data-driven decisions. Learn more at http://apps.shopify.com/").concat(e," \n"),"color: #088f87;")}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(t){if(document.cookie.length>0){var e=document.cookie.indexOf("".concat(t,"="));if(-1!==e){var n=e+t.length+1,r=document.cookie.indexOf(";",n);return-1===r&&(r=document.cookie.length),unescape(document.cookie.substring(n,r))}}return""},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=t.match(/(\d{2,11})\.(\d{2,11})/g);return e&&e[0]}},function(t,e,n){"use strict";e.a=()=>{const t=LittledataLayer.ecommerce.detail;if(!t)return null;const e=document.location.href.match(/[0-9]{8,20}/),n=e&&Number(e[0]);if(n){t.shopify_variant_id=n;const e=LittledataLayer.ecommerce.variants;if(e){const r=e.find(t=>t.id===n);r&&(t.id=r.sku,t.variant=r.title)}}return t}},function(t,e,n){"use strict";var r=n(0);e.a=function(t){var e=0,n=Object(r.c)("/products/");function o(){var e=document.documentElement.scrollTop,o=window.innerHeight,a=e+o,c=[];n.forEach((function(t,i){if(t){var o=window.pageYOffset+t.getBoundingClientRect().top,s=t.offsetHeight,u=o+s;if(u>=e&&o<a){var d=s;if(o-e<0?d+=o-e:a-u<0&&(d+=a-u),d/s>.8){n[i]=null;var l=Object(r.b)(t.href);l&&c.push(l)}}}})),c.length>0&&i(c,20).forEach((function(e){return t(e)}))}0!==n.length&&(window.setTimeout((function(){clearTimeout(e),o()}),500),document.addEventListener("scroll",(function(){clearTimeout(e),e=window.setTimeout((function(){o()}),300)})))};var i=function(t,e){return Array.from({length:Math.ceil(t.length/e)},(function(n,r){return t.slice(r*e,r*e+e)}))}},,function(t,e,n){"use strict";n.d(e,"b",(function(){return p})),n.d(e,"c",(function(){return m})),n.d(e,"d",(function(){return w})),n.d(e,"a",(function(){return b}));var r=n(1),i=n(0),o=n(2),a=n(3);function c(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(n,!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h,f="Shopify (Littledata)",p=function(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments)},window.ga.l=+new Date,window.ga((function(){!function t(){var e=window.ga&&window.ga.getAll&&window.ga.getAll();if(e&&e.length)return L(e[0]),Object(i.h)(y,"google");if(g>524288e3)return;g*=2,clearTimeout(h),h=window.setTimeout((function(){t()}),g)}()})),gtag("js",new Date),gtag("config",LittledataLayer.webPropertyID,d({},b(),{send_page_view:!1}))},g=10;var m=function(){var t=Object(i.f)(document.title),e=O(document.location.href),n=Object(i.f)(e);gtag("config",LittledataLayer.webPropertyID,d({},b(),{page_title:t,page_location:n})),dataLayer.push({event:"pageview",page_title:t,page_location:n});var r=LittledataLayer.googleAdsConversionIds;"object"===s(r)&&r.length>0&&r.forEach((function(t){return gtag("config",t)}));var a=Object(o.a)();a&&(a.list_position=parseInt(window.localStorage.getItem("position"))||1,gtag("event","view_item",{event_category:f,items:[v(a)],non_interaction:!0,send_to:LittledataLayer.webPropertyID}),dataLayer.push({event:"view_item",ecommerce:{detail:{actionField:{list:a.list_name},products:[a]}}}))};function y(){var t=ga.getAll();if(!t||!t.length)return"";var e=t[0].get("clientId");return Object(r.b)(e)?e:""}var w=function(){LittledataLayer.ecommerce.impressions.length&&(Object(i.e)((function(t,e){var n=LittledataLayer.ecommerce.impressions.find((function(e){return e.name===t.name&&e.handle===t.handle})),r=n&&n.list_position;window.localStorage.setItem("position",String(r)),dataLayer.push({event:"select_content",ecommerce:{click:{actionField:{list:t.list_name},products:[t]}}}),gtag("event","select_content",{event_category:f,content_type:"product",items:[v(t)],send_to:LittledataLayer.webPropertyID,event_callback:function(){window.clearTimeout(e.timeout),document.location.href=e.href}})})),Object(a.a)((function(t){var e=t.map((function(t){return v(t)}));gtag("event","view_item_list",{event_category:f,items:e,send_to:LittledataLayer.webPropertyID,non_interaction:!0}),dataLayer.push({event:"view_item_list",ecommerce:{impressions:t}})}))),Object(o.a)()&&(Object(i.i)((function(t){dataLayer.push({event:"product_image_click",name:t}),gtag("event","Product image click",{event_category:f,event_label:t,send_to:LittledataLayer.webPropertyID})})),Object(i.j)((function(t){dataLayer.push({event:"share_product",network:t}),gtag("event","Social share",{event_category:f,event_label:t,send_to:LittledataLayer.webPropertyID})})))},v=function(t){var e={};return["name","id","price","brand","category","variant","list","list_name","position","list_position"].forEach((function(n){t[n]&&(e[n]=t[n])})),e},b=function(){var t=window.LittledataLayer||{},e=t.anonymizeIp,n=t.googleSignals,i=t.ecommerce,o=t.optimizeId,a=t.referralExclusion,s=t.extraLinkerDomains||[],u=a&&a.test(document.referrer);["shop.app"].includes(document.referrer)&&(u=!0),document.referrer.includes("".concat(location.protocol,"//").concat(location.host))&&(u=!0);var d={linker:{domains:[].concat(["^(?!cdn.)(.*)shopify.com","rechargeapps.com","recurringcheckout.com","carthook.com","checkout.com","shop.app"],c(s))},anonymize_ip:!1!==e,allow_ad_personalization_signals:!0===n,currency:i&&i.currencyCode||"USD",link_attribution:!0,optimize_id:o,page_referrer:u?null:document.referrer},l=t.customer&&t.customer.id;l&&(d.user_id=l);var h=Object(r.a)("_ga");return h&&!Object(r.b)(h)&&(d.cookie_expires=0),d},L=function(t){var e;LittledataLayer.MPEndpoint&&LittledataLayer.MPEndpoint.length&&t.set("customTask",(e=LittledataLayer.MPEndpoint,function(t){window._ga_originalSendHitTask=window._ga_originalSendHitTask||t.get("sendHitTask"),t.set("sendHitTask",(function(t){var n=window._ga_originalSendHitTask;try{n(t);var r=t.get("hitPayload"),i=new XMLHttpRequest;i.open("POST",e,!0),i.withCredentials=!1,i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(r)}catch(e){n(t)}}))}))},O=function(t){var e=t.match(/utm_source=[a-z,A-Z,0-9,-,_]+/);if(!e||!e.length||/(\?|&)utm_medium=/.test(t))return t;var n=e[0],r=n+"&utm_medium=referral";return t.replace(n,r)}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(t){var e=t.indexOf("webPropertyId="),n=t.indexOf("&",e),r=e&&t.substring(e+14,n>-1?n:t.length),i=t.indexOf("segmentProperty="),o=t.indexOf("&",i);return{webPropertyId:r,segmentProperty:i&&t.substring(i+16,o||t.length)}}},,,,function(t,e,n){"use strict";n.r(e);var r=n(6),i=n(5);!function(){if(window.Shopify.Checkout&&"thank_you"===window.Shopify.Checkout.page){var t=document.currentScript.src,e=Object(r.a)(t).webPropertyId;if(!e)throw new Error("Could not add ga thank you page script beacuse of missing webPropertyId");var n=document.createElement("script");n.async=!0;var o="https://www.googletagmanager.com/gtag/js?id="+e;n.src=o,document.getElementsByTagName("head")[0].appendChild(n),window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},gtag("js",new Date),gtag("config",e,Object(i.a)());var a=window.Shopify.checkout&&window.Shopify.checkout.total_price,c=parseInt(a);gtag("event","Checkout",{event_category:"Shopify (Littledata)",event_label:"Thank you page",value:c})}}()}]);