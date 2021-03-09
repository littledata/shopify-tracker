(()=>{"use strict";var e={839:(e,t,n)=>{function r(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}Object.defineProperty(t,"__esModule",{value:!0});var a=n(225);t.DEFAULT_LINKER_DOMAINS=["^(?!cdn.)(.*)shopify.com","rechargeapps.com","recurringcheckout.com","carthook.com","checkout.com","shop.app"],t.extraExcludedReferrers=["shop.app"],t.default=function(){var e=window.LittledataLayer||{},n=e.anonymizeIp,i=e.googleSignals,o=e.ecommerce,c=e.optimizeId,s=e.referralExclusion,d=e.extraLinkerDomains||[],u="string"==typeof s?new RegExp(s.replace(/^\//,"").replace(/\/$/,"")):s,l=u&&u.test(document.referrer);t.extraExcludedReferrers.includes(document.referrer)&&(l=!0),document.referrer.includes("".concat(location.protocol,"//").concat(location.host))&&(l=!0);var f={linker:{domains:[].concat(r(t.DEFAULT_LINKER_DOMAINS),r(d)),accept_incoming:!0},anonymize_ip:!1!==n,allow_ad_personalization_signals:!0===i,currency:o&&o.currencyCode||"USD",link_attribution:!0,optimize_id:c,page_referrer:l?null:document.referrer},h=e.customer&&e.customer.id;h&&(f.user_id=h);var p=a.getCookie("_ga");return p&&!a.getValidGAClientId(p)&&(f.cookie_expires=0),!1===e.cookieUpdate&&(f.cookie_update=!1),f}},225:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=function(e){if(document.cookie.length>0){var t=document.cookie.indexOf("".concat(e,"="));if(-1!==t){var n=t+e.length+1,r=document.cookie.indexOf(";",n);return-1===r&&(r=document.cookie.length),unescape(document.cookie.substring(n,r))}}return""},t.getValidGAClientId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e.match(/(\d{2,11})\.(\d{2,11})/g);return t&&t[0]}},0:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(778)),i=n(376),o=n(225),c=n(274);function s(e,n){var r,a,i=window.ga&&window.ga.getAll&&window.ga.getAll();if(i&&i.length)return t.setCustomTask(i[0]),c.setClientID((r=i[0],a=r.get("clientId"),o.getValidGAClientId(a)?a:""),"google");n>524288e3||(n*=2,clearTimeout(e),e=window.setTimeout((function(){s(e,n)}),n))}t.pageView=function(e){if(!0===document.hidden){var t=!1;document.addEventListener("visibilitychange",(function(){document.hidden||t||(e(),t=!0)}))}else"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(function(){e()})):e();!0!==LittledataLayer.doNotTrackReplaceState&&new a.default(!0).setCallback(e)},t.getElementsByHref=function(e){var t=document.getElementsByTagName("a"),n=new RegExp(e);return Array.prototype.slice.call(t).filter((function(e){return e.href&&n.test(e.href)}))},t.findDataLayerProduct=function(e){return LittledataLayer.ecommerce.impressions.find((function(t){var n=e.split("/products/"),r=n&&n[1],a=r.split("?"),i=a&&a[0];return i?i===t.handle:r===t.handle}))},t.productListClicks=function(e){LittledataLayer.productClicks&&t.getElementsByHref("/products/").forEach((function(n){n.addEventListener("click",(function(r){var a=t.findDataLayerProduct(this.href);a?(r.preventDefault(),n.timeout=window.setTimeout((function(){document.location.href=n.href}),1e3),e(a,n)):document.location.href=n.href}))}))},t.removePii=function(e){return[{key:"email",regex:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/},{key:"postcode",regex:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/}].reduce((function(e,t){return e.replace(t.regex,"REMOVED")}),e)},t.trackProductImageClicks=function(e){if(!1===LittledataLayer.productPageClicks)return!1;t.getElementsByHref("^https://cdn.shopify.com/s/files/.*/products/").forEach((function(t){t.addEventListener("click",(function(){var t=this.getElementsByTagName("img")[0];if(!t)return!1;e(t)}))}))},t.trackSocialShares=function(e){if(!1===LittledataLayer.productPageClicks)return!1;var n="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";t.getElementsByHref("".concat(n,".com/(share|pin|intent)")).forEach((function(t){t.addEventListener("click",(function(){var t=this.href.match(new RegExp(n));e(t&&t[0])}))}))},t.validateLittledataLayer=function(){if(window.LittledataScriptVersion="10.2.1",!window.LittledataLayer)throw new Error("Aborting Littledata tracking as LittledataLayer was not found")},t.advertiseLD=function(e){if(!LittledataLayer.hideBranding){var t="Segment"===e?"segment-com-by-littledata":"littledata";console.log("%c\nThis store uses Littledata 🚀 to automate its ".concat(e," setup and make better, data-driven decisions. Learn more at http://apps.shopify.com/").concat(t," \n"),"color: #088f87;")}},t.retrieveAndStoreClientId=function(){s(undefined,50)},t.setCustomTask=function(e){LittledataLayer.MPEndpoint&&LittledataLayer.MPEndpoint.length&&e.set("customTask",i.customTask(LittledataLayer.MPEndpoint))},t.documentReady=function(e){"complete"===document.readyState||"interactive"===document.readyState?setTimeout(e,1):document.addEventListener("DOMContentLoaded",e)}},973:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.httpRequest={getJSON:function(e){return new Promise((function(t,n){var r=new XMLHttpRequest;r.open("GET",e),r.onload=function(){r.status>=200&&r.status<300?t(JSON.parse(r.response)):n(r.statusText)},r.onerror=function(){return n(r.statusText)},r.send()}))},postJSON:function(e,t){return new Promise((function(n,r){var a=new XMLHttpRequest;a.onload=function(){a.status>=200&&a.status<300?n(JSON.parse(a.response)):r(a.statusText)},a.onerror=function(){return r(a.statusText)},a.open("POST",e),a.setRequestHeader("Content-Type","application/json"),a.send(JSON.stringify(t))}))}}},632:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default=function(e){var t=0,n=r.getElementsByHref("/products/");function i(){var t=document.documentElement.scrollTop,i=window.innerHeight,o=t+i,c=[];n.forEach((function(e,a){if(e){var i=window.pageYOffset+e.getBoundingClientRect().top,s=e.offsetHeight,d=i+s;if(d>=t&&i<o){var u=s;if(i-t<0?u+=i-t:o-d<0&&(u+=o-d),u/s>.8){n[a]=null;var l=r.findDataLayerProduct(e.href);l&&c.push(l)}}}})),c.length>0&&a(c,20).forEach((function(t){return e(t)}))}0!==n.length&&(window.setTimeout((function(){clearTimeout(t),i()}),500),document.addEventListener("scroll",(function(){clearTimeout(t),t=window.setTimeout((function(){i()}),300)})))};var a=function(e,t){return Array.from({length:Math.ceil(e.length/t)},(function(n,r){return e.slice(r*t,r*t+t)}))}},274:(e,t,n)=>{function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var o,c=n(973),s={};t.setClientID=function(e,n){if(window.LittledataLayer.attributes=window.LittledataLayer.attributes||{},"string"==typeof e&&0!==e.length){var r="".concat(n,"-clientID");window.LittledataLayer.cart&&window.LittledataLayer.cart.attributes[r]||(window.LittledataLayer.attributes[r]=e,clearTimeout(o),o=setTimeout((function(){t.getCartWithToken().then((function(e){l(e),f(e)}))}),1e3))}},t.setCartOnlyAttributes=function(e){var t=Object.keys(e),n=!1;t.forEach((function(t){var r="littledata_".concat(t);s[r]!==e[t]&&(s[r]=e[t],n=!0)})),n&&u(a({},window.LittledataLayer.attributes,{},s))},t.getCartWithToken=function(){var e=window.LittledataLayer.cart;return e?d(e):c.httpRequest.getJSON("/cart.json").then((function(e){if(!e.token)throw new Error("cart had no cart token");return window.LittledataLayer.cart=e,d(e)})).catch((function(e){console.error("Littledata tracker unable to fetch cart token from Shopify",e)}))};var d=function(e){var t=Object.keys(window.LittledataLayer.attributes),n=Object.keys(e.attributes);return t.every((function(e){return n.includes(e)}))?Promise.resolve(e):u(a({},window.LittledataLayer.attributes,{littledata_updatedAt:(new Date).getTime()}))},u=function(e){return c.httpRequest.postJSON("/cart/update.json",{attributes:e}).then((function(e){return window.LittledataLayer.cart=a({},window.LittledataLayer.cart,{},e),e}))},l=function(e){if(!h(e,36e5)){var t="".concat(window.LittledataLayer.transactionWatcherURL,"/cart/store");c.httpRequest.postJSON(t,e)}},f=function(e){if(h(e,4e3)){var t=e.token,n="".concat(window.LittledataLayer.transactionWatcherURL,"/v2/clientID/store");c.httpRequest.postJSON(n,a({},window.LittledataLayer.attributes,{cartID:t}))}},h=function(e,t){var n=e.attributes.littledata_updatedAt;if(!n)return!1;var r=new Date(Number(n));return Date.now()-Number(r)<t}},376:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.customTask=function(e){return function(t){window._ga_originalSendHitTask=window._ga_originalSendHitTask||t.get("sendHitTask"),t.set("sendHitTask",(function(t){var n=window._ga_originalSendHitTask;try{n(t);var r=t.get("hitPayload"),a=new XMLHttpRequest;a.open("POST",e,!0),a.withCredentials=!1,a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.send(r)}catch(e){n(t)}}))}}},322:(e,t,n)=>{var r=n(955),a=n(0);a.validateLittledataLayer(),r.initGtag(),a.advertiseLD("Google Analytics"),a.documentReady(r.trackEvents),a.pageView((function(){r.sendPageview()}))},955:function(e,t,n){function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(n,!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=n(0),d=c(n(839)),u=c(n(22)),l=c(n(632)),f="Shopify (Littledata)";t.initGtag=function(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments)},window.ga.l=+new Date,gtag("js",new Date),p()&&gtag("config",LittledataLayer.measurementID,i({},d.default(),{send_page_view:!1})),m()&&gtag("config",LittledataLayer.webPropertyID,i({},d.default(),{send_page_view:!1}))},t.sendPageview=function(){var e=s.removePii(document.title),n=h(document.location.href),a=s.removePii(n);p()&&gtag("config",LittledataLayer.measurementID,i({},d.default(),{page_title:e,page_location:a,send_page_view:!0})),m()&&gtag("config",LittledataLayer.webPropertyID,i({},d.default(),{page_title:e,page_location:a,send_page_view:!0})),s.retrieveAndStoreClientId(),dataLayer.push({event:"pageview",page_title:e,page_location:a});var o=LittledataLayer.googleAdsConversionIds;"object"===r(o)&&o.length>0&&o.forEach((function(e){return gtag("config",e)}));var c=u.default();c&&(c.list_position=parseInt(window.localStorage.getItem("position"))||1,function(e){p()&&gtag("event","view_item",{items:g(new Array(e),!1),send_to:LittledataLayer.measurementID});m()&&gtag("event","view_item",{event_category:f,items:[t.filterGAProductFields(e)],non_interaction:!0,send_to:LittledataLayer.webPropertyID});dataLayer.push({event:"view_item",ecommerce:{detail:{actionField:{list:e.list_name},products:[e]}}})}(c))},t.trackEvents=function(){LittledataLayer.ecommerce.impressions.length&&(s.productListClicks((function(e,n){var r=LittledataLayer.ecommerce.impressions.find((function(t){return t.name===e.name&&t.handle===e.handle})),a=r&&r.list_position;window.localStorage.setItem("position",String(a)),function(e,n){dataLayer.push({event:"select_content",ecommerce:{click:{actionField:{list:e.list_name},products:[e]}}}),p()&&gtag("event","select_item",{items:g(new Array(e),!0),send_to:LittledataLayer.measurementID,event_callback:function(){window.clearTimeout(n.timeout),document.location.href=n.href}});m()&&gtag("event","select_content",{event_category:f,content_type:"product",items:[t.filterGAProductFields(e)],send_to:LittledataLayer.webPropertyID,event_callback:function(){window.clearTimeout(n.timeout),document.location.href=n.href}})}(e,n)})),l.default((function(e){!function(e){if(p()){var n=e&&e.length&&e[0].list_name||"",r=s.removePii(document.title);gtag("event","view_item_list",{items:g(e,!0),item_list_name:r,item_list_id:n,send_to:LittledataLayer.measurementID})}if(m()){var a=e.map((function(e){return t.filterGAProductFields(e)}));gtag("event","view_item_list",{event_category:f,items:a,send_to:LittledataLayer.webPropertyID,non_interaction:!0})}dataLayer.push({event:"view_item_list",ecommerce:{impressions:e}})}(e)})));var e=u.default();e&&(s.trackProductImageClicks((function(t){dataLayer.push({event:"product_image_click",name:t.name,image_url:t.src}),p()&&gtag("event","select_content",{content_type:"product",item_product_id:e.shopify_product_id,item_sku:e.id,item_variant_id:e.shopify_variant_id,image_url:t.src,send_to:LittledataLayer.measurementID}),m()&&gtag("event","Product image click",{event_category:f,event_label:t.name,send_to:LittledataLayer.webPropertyID})})),s.trackSocialShares((function(e){dataLayer.push({event:"share_product",network:e}),p()&&gtag("event","share",{method:e,send_to:LittledataLayer.measurementID}),m()&&gtag("event","Social share",{event_category:f,event_label:e,send_to:LittledataLayer.webPropertyID})})))},t.filterGAProductFields=function(e){var t={};return["name","id","price","brand","category","variant","list","list_name","position","list_position"].forEach((function(n){e[n]&&(t[n]=e[n])})),t};var h=function(e){var t=e.match(/utm_source=[a-z,A-Z,0-9,-,_]+/);if(!t||!t.length||/(\?|&)utm_medium=/.test(e))return e;var n=t[0],r=n+"&utm_medium=referral";return e.replace(n,r)};function p(){return void 0!==LittledataLayer.measurementID}function m(){return void 0!==LittledataLayer.webPropertyID}function g(e,t){return e.map((function(e){var n={currency:LittledataLayer.ecommerce&&LittledataLayer.ecommerce.currencyCode||"",item_product_id:e.shopify_product_id,item_name:e.name,item_brand:e.brand,item_category:e.category,item_variant:e.variant,item_sku:e.id,item_variant_id:e.shopify_variant_id,price:e.price,index:e.list_position};return t||delete n.index,n}))}},778:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const r=[];class a{static add(e,t,n){(function(e,t){let n=i(e,t);n||(n=new a(e,t),r.push(n));return n})(e,t).add(n)}static remove(e,t,n){let r=i(e,t);r&&r.remove(n)}constructor(e,t){this.context=e,this.methodName=t,this.isTask=/Task$/.test(t),this.originalMethodReference=this.isTask?e.get(t):e[t],this.methodChain=[],this.boundMethodChain=[],this.wrappedMethod=(...e)=>(0,this.boundMethodChain[this.boundMethodChain.length-1])(...e),this.isTask?e.set(t,this.wrappedMethod):e[t]=this.wrappedMethod}add(e){this.methodChain.push(e),this.rebindMethodChain()}remove(e){const t=this.methodChain.indexOf(e);t>-1&&(this.methodChain.splice(t,1),this.methodChain.length>0?this.rebindMethodChain():this.destroy())}rebindMethodChain(){this.boundMethodChain=[];for(let e,t=0;e=this.methodChain[t];t++){const n=this.boundMethodChain[t-1]||this.originalMethodReference.bind(this.context);this.boundMethodChain.push(e(n))}}destroy(){const e=r.indexOf(this);e>-1&&(r.splice(e,1),this.isTask?this.context.set(this.methodName,this.originalMethodReference):this.context[this.methodName]=this.originalMethodReference)}}function i(e,t){return r.filter((n=>n.context==e&&n.methodName==t))[0]}class o{constructor(e){history.pushState&&window.addEventListener&&(this.onUrlChange=()=>{console.warn("UrlChangeTracker not given callback")},this.path=c(),this.trackReplaceState=e,this.pushStateOverride=this.pushStateOverride.bind(this),this.replaceStateOverride=this.replaceStateOverride.bind(this),this.handlePopState=this.handlePopState.bind(this),a.add(history,"pushState",this.pushStateOverride),a.add(history,"replaceState",this.replaceStateOverride),window.addEventListener("popstate",this.handlePopState))}setCallback(e){this.onUrlChange=e}pushStateOverride(e){return(...t)=>{e(...t),this.handleUrlChange(!0)}}replaceStateOverride(e){return(...t)=>{e(...t),this.handleUrlChange(!1)}}handlePopState(){this.handleUrlChange(!0)}handleUrlChange(e){setTimeout((()=>{const t=this.path,n=c();t!=n&&this.shouldTrackUrlChange(n,t)&&(this.path=n,(e||this.trackReplaceState)&&this.onUrlChange())}),0)}shouldTrackUrlChange(e,t){return!(!e||!t)}remove(){this.queue.destroy(),a.remove(history,"pushState",this.pushStateOverride),a.remove(history,"replaceState",this.replaceStateOverride),window.removeEventListener("popstate",this.handlePopState)}}function c(){return location.pathname+location.search}},22:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=()=>{const e=LittledataLayer.ecommerce.detail;if(!e)return null;const t=document.location.href.match(/[0-9]{8,20}/),n=t&&Number(t[0]);if(n){e.shopify_variant_id=n;const t=LittledataLayer.ecommerce.variants;if(t){const r=t.find((e=>e.id===n));r&&(e.id=r.sku,e.variant=r.title)}}return e}}},t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(322)})();