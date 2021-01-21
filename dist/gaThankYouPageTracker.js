(()=>{"use strict";var e={225:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=function(e){if(document.cookie.length>0){var t=document.cookie.indexOf("".concat(e,"="));if(-1!==t){var n=t+e.length+1,r=document.cookie.indexOf(";",n);return-1===r&&(r=document.cookie.length),unescape(document.cookie.substring(n,r))}}return""},t.getValidGAClientId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e.match(/(\d{2,11})\.(\d{2,11})/g);return t&&t[0]}},0:function(e,t,n){function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c,d=o(n(778)),s=n(376),u=n(225);t.pageView=function(e){if(!0===document.hidden){var t=!1;document.addEventListener("visibilitychange",(function(){document.hidden||t||(e(),t=!0)}))}else"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(function(){e()})):e();!0!==LittledataLayer.doNotTrackReplaceState&&new d.default(!0).setCallback(e)},t.getElementsByHref=function(e){var t=document.getElementsByTagName("a"),n=new RegExp(e);return Array.prototype.slice.call(t).filter((function(e){return e.href&&n.test(e.href)}))},t.findDataLayerProduct=function(e){return LittledataLayer.ecommerce.impressions.find((function(t){var n=e.split("/products/"),r=n&&n[1],i=r.split("?"),a=i&&i[0];return a?a===t.handle:r===t.handle}))},t.productListClicks=function(e){LittledataLayer.productClicks&&t.getElementsByHref("/products/").forEach((function(n){n.addEventListener("click",(function(r){var i=t.findDataLayerProduct(this.href);i?(r.preventDefault(),n.timeout=window.setTimeout((function(){document.location.href=n.href}),1e3),e(i,n)):document.location.href=n.href}))}))};var l={};t.setCartOnlyAttributes=function(e){Object.keys(e).forEach((function(t){var n="littledata_".concat(t);l[n]=e[t]}))};var h={};function f(e,t,n){var r="".concat(t,"-clientID");"string"==typeof e&&0!==e.length&&(h[r]=e,clearTimeout(c),c=setTimeout((function(){h.littledata_updatedAt=(new Date).getTime();var e=new XMLHttpRequest;e.onload=function(){var t,r,a=JSON.parse(e.response);LittledataLayer.cart=a,n&&(t=a,(r=new XMLHttpRequest).open("POST","".concat(LittledataLayer.transactionWatcherURL,"/cart/store")),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(t)));var o=new XMLHttpRequest;o.open("POST","".concat(LittledataLayer.transactionWatcherURL,"/v2/clientID/store")),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(i({},h,{cartID:"".concat(a.token)})))},e.open("POST","/cart/update.json"),e.setRequestHeader("Content-Type","application/json");var t=i({},h,{},l);e.send(JSON.stringify({attributes:t}))}),1e3))}function p(e,t){var n=LittledataLayer.cart,r=n&&n.attributes||{},i="".concat(t,"-clientID");LittledataLayer[i]||r[i]||(LittledataLayer[i]=e,f(e,t,!1));var a=r.littledata_updatedAt;if(a){var o=new Date(Number(a));Date.now()-Number(o)>36e5&&f(e,t,!0)}}function m(e,n){var r=window.ga&&window.ga.getAll&&window.ga.getAll();if(r&&r.length)return console.log("getGAClientId",g(r[0])),t.setCustomTask(),p(g(r[0]),"google");n>524288e3||(n*=2,clearTimeout(e),e=window.setTimeout((function(){m(e,n)}),n))}function g(e){var t=e.get("clientId");return u.getValidGAClientId(t)?t:""}t.setClientID=p,t.removePii=function(e){return[{key:"email",regex:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/},{key:"postcode",regex:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/}].reduce((function(e,t){return e.replace(t.regex,"REMOVED")}),e)},t.guid=function(){function e(){return Math.floor(1e10*Math.random())}return"GA1.2.".concat(e(),".").concat(e())}(),t.trackProductImageClicks=function(e){if(!1===LittledataLayer.productPageClicks)return!1;t.getElementsByHref("^https://cdn.shopify.com/s/files/.*/products/").forEach((function(t){t.addEventListener("click",(function(){var t=this.getElementsByTagName("img")[0];if(!t)return!1;e(t)}))}))},t.trackSocialShares=function(e){if(!1===LittledataLayer.productPageClicks)return!1;var n="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";t.getElementsByHref("".concat(n,".com/(share|pin|intent)")).forEach((function(t){t.addEventListener("click",(function(){var t=this.href.match(new RegExp(n));e(t&&t[0])}))}))},t.validateLittledataLayer=function(){if(window.LittledataScriptVersion="10.0.4",!window.LittledataLayer)throw new Error("Aborting Littledata tracking as LittledataLayer was not found")},t.advertiseLD=function(e){if(!LittledataLayer.hideBranding){var t="Segment"===e?"segment-com-by-littledata":"littledata";console.log("%c\nThis store uses Littledata 🚀 to automate its ".concat(e," setup and make better, data-driven decisions. Learn more at http://apps.shopify.com/").concat(t," \n"),"color: #088f87;")}},t.retrieveAndStoreClientId=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=new Promise((function(e){gtag("get",LittledataLayer.webPropertyID||LittledataLayer.measurementID,"client_id",e)}));return n.then((function(n){return e&&t.setCustomTask(),p(n,"google")})).catch((function(){m(undefined,10)}))},t.setCustomTask=function(){var e=window.ga&&window.ga.getAll&&window.ga.getAll();e&&e.length&&(LittledataLayer.MPEndpoint&&LittledataLayer.MPEndpoint.length&&e[0].set("customTask",s.customTask(LittledataLayer.MPEndpoint)))},t.documentReady=function(e){"complete"===document.readyState||"interactive"===document.readyState?setTimeout(e,1):document.addEventListener("DOMContentLoaded",e)}},632:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default=function(e){var t=0,n=r.getElementsByHref("/products/");function a(){var t=document.documentElement.scrollTop,a=window.innerHeight,o=t+a,c=[];n.forEach((function(e,i){if(e){var a=window.pageYOffset+e.getBoundingClientRect().top,d=e.offsetHeight,s=a+d;if(s>=t&&a<o){var u=d;if(a-t<0?u+=a-t:o-s<0&&(u+=o-s),u/d>.8){n[i]=null;var l=r.findDataLayerProduct(e.href);l&&c.push(l)}}}})),c.length>0&&i(c,20).forEach((function(t){return e(t)}))}0!==n.length&&(window.setTimeout((function(){clearTimeout(t),a()}),500),document.addEventListener("scroll",(function(){clearTimeout(t),t=window.setTimeout((function(){a()}),300)})))};var i=function(e,t){return Array.from({length:Math.ceil(e.length/t)},(function(n,r){return e.slice(r*t,r*t+t)}))}},90:(e,t,n)=>{var r=n(488),i=n(955);!function(){if(window.Shopify.Checkout&&"thank_you"===window.Shopify.Checkout.page){var e=document.currentScript.src,t=r.getProperties(e).webPropertyId;if(!t)throw new Error("Could not add ga thank you page script beacuse of missing webPropertyId");var n=document.createElement("script");n.async=!0;var a="https://www.googletagmanager.com/gtag/js?id="+t;n.src=a,document.getElementsByTagName("head")[0].appendChild(n),window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},gtag("js",new Date),gtag("config",t,i.getConfig());var o=window.Shopify.checkout&&window.Shopify.checkout.total_price,c=parseInt(o);gtag("event","Checkout",{event_category:"Shopify (Littledata)",event_label:"Thank you page",value:c})}}()},376:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.customTask=function(e){return function(t){window._ga_originalSendHitTask=window._ga_originalSendHitTask||t.get("sendHitTask"),t.set("sendHitTask",(function(t){var n=window._ga_originalSendHitTask;try{n(t);var r=t.get("hitPayload"),i=new XMLHttpRequest;i.open("POST",e,!0),i.withCredentials=!1,i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(r)}catch(e){n(t)}}))}}},955:function(e,t,n){function r(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(n,!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=n(225),u=n(0),l=d(n(22)),h=d(n(632)),f="Shopify (Littledata)";t.initGtag=function(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments)},window.ga.l=+new Date,u.retrieveAndStoreClientId(!0),gtag("js",new Date),gtag("config",LittledataLayer.webPropertyID,o({},t.getConfig(),{send_page_view:!1}))},t.sendPageview=function(){var e=u.removePii(document.title),n=p(document.location.href),r=u.removePii(n);gtag("config",LittledataLayer.webPropertyID,o({},t.getConfig(),{page_title:e,page_location:r})),dataLayer.push({event:"pageview",page_title:e,page_location:r});var a=LittledataLayer.googleAdsConversionIds;"object"===i(a)&&a.length>0&&a.forEach((function(e){return gtag("config",e)}));var c=l.default();c&&(c.list_position=parseInt(window.localStorage.getItem("position"))||1,function(e){m()&&gtag("event","view_item",{items:y(new Array(e),!1),send_to:LittledataLayer.measurementID});g()&&gtag("event","view_item",{event_category:f,items:[t.filterGAProductFields(e)],non_interaction:!0,send_to:LittledataLayer.webPropertyID});dataLayer.push({event:"view_item",ecommerce:{detail:{actionField:{list:e.list_name},products:[e]}}})}(c))},t.trackEvents=function(){LittledataLayer.ecommerce.impressions.length&&(u.productListClicks((function(e,n){var r=LittledataLayer.ecommerce.impressions.find((function(t){return t.name===e.name&&t.handle===e.handle})),i=r&&r.list_position;window.localStorage.setItem("position",String(i)),function(e,n){dataLayer.push({event:"select_content",ecommerce:{click:{actionField:{list:e.list_name},products:[e]}}}),m()&&gtag("event","select_item",{items:y(new Array(e),!0),send_to:LittledataLayer.measurementID,event_callback:function(){window.clearTimeout(n.timeout),document.location.href=n.href}});g()&&gtag("event","select_content",{event_category:f,content_type:"product",items:[t.filterGAProductFields(e)],send_to:LittledataLayer.webPropertyID,event_callback:function(){window.clearTimeout(n.timeout),document.location.href=n.href}})}(e,n)})),h.default((function(e){!function(e){if(m()){var n=e&&e.length&&e[0].list_name||"",r=u.removePii(document.title);gtag("event","view_item_list",{items:y(e,!0),item_list_name:r,item_list_id:n,send_to:LittledataLayer.measurementID})}if(g()){var i=e.map((function(e){return t.filterGAProductFields(e)}));gtag("event","view_item_list",{event_category:f,items:i,send_to:LittledataLayer.webPropertyID,non_interaction:!0})}dataLayer.push({event:"view_item_list",ecommerce:{impressions:e}})}(e)})));var e=l.default();e&&(u.trackProductImageClicks((function(t){dataLayer.push({event:"product_image_click",name:t.name,image_url:t.src}),m()&&gtag("event","select_content",{content_type:"product",item_id:e.shopify_product_id,item_sku:e.id,item_variant_id:e.shopify_variant_id,image_url:t.src,send_to:LittledataLayer.measurementID}),g()&&gtag("event","Product image click",{event_category:f,event_label:t.name,send_to:LittledataLayer.webPropertyID})})),u.trackSocialShares((function(e){dataLayer.push({event:"share_product",network:e}),m()&&gtag("event","share",{method:e,send_to:LittledataLayer.measurementID}),g()&&gtag("event","Social share",{event_category:f,event_label:e,send_to:LittledataLayer.webPropertyID})})))},t.filterGAProductFields=function(e){var t={};return["name","id","price","brand","category","variant","list","list_name","position","list_position"].forEach((function(n){e[n]&&(t[n]=e[n])})),t},t.getConfig=function(){var e=window.LittledataLayer||{},t=e.anonymizeIp,n=e.googleSignals,i=e.ecommerce,a=e.optimizeId,o=e.referralExclusion,c=e.extraLinkerDomains||[],d=o&&o.test(document.referrer);["shop.app"].includes(document.referrer)&&(d=!0),document.referrer.includes("".concat(location.protocol,"//").concat(location.host))&&(d=!0);var u={linker:{domains:[].concat(["^(?!cdn.)(.*)shopify.com","rechargeapps.com","recurringcheckout.com","carthook.com","checkout.com","shop.app"],r(c))},anonymize_ip:!1!==t,allow_ad_personalization_signals:!0===n,currency:i&&i.currencyCode||"USD",link_attribution:!0,optimize_id:a,page_referrer:d?null:document.referrer},l=e.customer&&e.customer.id;l&&(u.user_id=l);var h=s.getCookie("_ga");return h&&!s.getValidGAClientId(h)&&(u.cookie_expires=0),u};var p=function(e){var t=e.match(/utm_source=[a-z,A-Z,0-9,-,_]+/);if(!t||!t.length||/(\?|&)utm_medium=/.test(e))return e;var n=t[0],r=n+"&utm_medium=referral";return e.replace(n,r)};function m(){return void 0!==LittledataLayer.measurementID}function g(){return void 0!==LittledataLayer.webPropertyID}function y(e,t){return e.map((function(e){var n={currency:LittledataLayer.ecommerce&&LittledataLayer.ecommerce.currencyCode||"",item_id:e.shopify_product_id,item_name:e.name,item_brand:e.brand,item_category:e.category,item_variant:e.variant,item_sku:e.id,item_variant_id:e.shopify_variant_id,price:e.price,index:e.list_position};return t||delete n.index,n}))}},488:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getProperties=function(e){var t=e.indexOf("webPropertyId="),n=e.indexOf("&",t),r=t&&e.substring(t+14,n>-1?n:e.length),i=e.indexOf("segmentProperty="),a=e.indexOf("&",i);return{webPropertyId:r,segmentProperty:i&&e.substring(i+16,a||e.length)}}},778:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const r=[];class i{static add(e,t,n){(function(e,t){let n=a(e,t);n||(n=new i(e,t),r.push(n));return n})(e,t).add(n)}static remove(e,t,n){let r=a(e,t);r&&r.remove(n)}constructor(e,t){this.context=e,this.methodName=t,this.isTask=/Task$/.test(t),this.originalMethodReference=this.isTask?e.get(t):e[t],this.methodChain=[],this.boundMethodChain=[],this.wrappedMethod=(...e)=>(0,this.boundMethodChain[this.boundMethodChain.length-1])(...e),this.isTask?e.set(t,this.wrappedMethod):e[t]=this.wrappedMethod}add(e){this.methodChain.push(e),this.rebindMethodChain()}remove(e){const t=this.methodChain.indexOf(e);t>-1&&(this.methodChain.splice(t,1),this.methodChain.length>0?this.rebindMethodChain():this.destroy())}rebindMethodChain(){this.boundMethodChain=[];for(let e,t=0;e=this.methodChain[t];t++){const n=this.boundMethodChain[t-1]||this.originalMethodReference.bind(this.context);this.boundMethodChain.push(e(n))}}destroy(){const e=r.indexOf(this);e>-1&&(r.splice(e,1),this.isTask?this.context.set(this.methodName,this.originalMethodReference):this.context[this.methodName]=this.originalMethodReference)}}function a(e,t){return r.filter((n=>n.context==e&&n.methodName==t))[0]}class o{constructor(e){history.pushState&&window.addEventListener&&(this.onUrlChange=()=>{console.warn("UrlChangeTracker not given callback")},this.path=c(),this.trackReplaceState=e,this.pushStateOverride=this.pushStateOverride.bind(this),this.replaceStateOverride=this.replaceStateOverride.bind(this),this.handlePopState=this.handlePopState.bind(this),i.add(history,"pushState",this.pushStateOverride),i.add(history,"replaceState",this.replaceStateOverride),window.addEventListener("popstate",this.handlePopState))}setCallback(e){this.onUrlChange=e}pushStateOverride(e){return(...t)=>{e(...t),this.handleUrlChange(!0)}}replaceStateOverride(e){return(...t)=>{e(...t),this.handleUrlChange(!1)}}handlePopState(){this.handleUrlChange(!0)}handleUrlChange(e){setTimeout((()=>{const t=this.path,n=c();t!=n&&this.shouldTrackUrlChange(n,t)&&(this.path=n,(e||this.trackReplaceState)&&this.onUrlChange())}),0)}shouldTrackUrlChange(e,t){return!(!e||!t)}remove(){this.queue.destroy(),i.remove(history,"pushState",this.pushStateOverride),i.remove(history,"replaceState",this.replaceStateOverride),window.removeEventListener("popstate",this.handlePopState)}}function c(){return location.pathname+location.search}},22:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=()=>{const e=LittledataLayer.ecommerce.detail;if(!e)return null;const t=document.location.href.match(/[0-9]{8,20}/),n=t&&Number(t[0]);if(n){e.shopify_variant_id=n;const t=LittledataLayer.ecommerce.variants;if(t){const r=t.find((e=>e.id===n));r&&(e.id=r.sku,e.variant=r.title)}}return e}}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(90)})();