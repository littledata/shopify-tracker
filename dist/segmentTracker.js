!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";n.d(e,"d",(function(){return h})),n.d(e,"c",(function(){return f})),n.d(e,"b",(function(){return p})),n.d(e,"e",(function(){return y})),n.d(e,"g",(function(){return g})),n.d(e,"h",(function(){return w})),n.d(e,"f",(function(){return O})),n.d(e,"i",(function(){return L})),n.d(e,"j",(function(){return k})),n.d(e,"k",(function(){return j})),n.d(e,"a",(function(){return S}));const r=[];class i{static add(t,e,n){(function(t,e){let n=a(t,e);n||(n=new i(t,e),r.push(n));return n})(t,e).add(n)}static remove(t,e,n){let r=a(t,e);r&&r.remove(n)}constructor(t,e){this.context=t,this.methodName=e,this.isTask=/Task$/.test(e),this.originalMethodReference=this.isTask?t.get(e):t[e],this.methodChain=[],this.boundMethodChain=[],this.wrappedMethod=(...t)=>(0,this.boundMethodChain[this.boundMethodChain.length-1])(...t),this.isTask?t.set(e,this.wrappedMethod):t[e]=this.wrappedMethod}add(t){this.methodChain.push(t),this.rebindMethodChain()}remove(t){const e=this.methodChain.indexOf(t);e>-1&&(this.methodChain.splice(e,1),this.methodChain.length>0?this.rebindMethodChain():this.destroy())}rebindMethodChain(){this.boundMethodChain=[];for(let t,e=0;t=this.methodChain[e];e++){const n=this.boundMethodChain[e-1]||this.originalMethodReference.bind(this.context);this.boundMethodChain.push(t(n))}}destroy(){const t=r.indexOf(this);t>-1&&(r.splice(t,1),this.isTask?this.context.set(this.methodName,this.originalMethodReference):this.context[this.methodName]=this.originalMethodReference)}}function a(t,e){return r.filter(n=>n.context==t&&n.methodName==e)[0]}class o{constructor(t){history.pushState&&window.addEventListener&&(this.onUrlChange=()=>{console.warn("UrlChangeTracker not given callback")},this.path=c(),this.trackReplaceState=t,this.pushStateOverride=this.pushStateOverride.bind(this),this.replaceStateOverride=this.replaceStateOverride.bind(this),this.handlePopState=this.handlePopState.bind(this),i.add(history,"pushState",this.pushStateOverride),i.add(history,"replaceState",this.replaceStateOverride),window.addEventListener("popstate",this.handlePopState))}setCallback(t){this.onUrlChange=t}pushStateOverride(t){return(...e)=>{t(...e),this.handleUrlChange(!0)}}replaceStateOverride(t){return(...e)=>{t(...e),this.handleUrlChange(!1)}}handlePopState(){this.handleUrlChange(!0)}handleUrlChange(t){setTimeout(()=>{const e=this.path,n=c();e!=n&&this.shouldTrackUrlChange(n,e)&&(this.path=n,(t||this.trackReplaceState)&&this.onUrlChange())},0)}shouldTrackUrlChange(t,e){return!(!t||!e)}remove(){this.queue.destroy(),i.remove(history,"pushState",this.pushStateOverride),i.remove(history,"replaceState",this.replaceStateOverride),window.removeEventListener("popstate",this.handlePopState)}}function c(){return location.pathname+location.search}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(n,!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l,h=function(t){if(!0===document.hidden){var e=!1;document.addEventListener("visibilitychange",(function(){document.hidden||e||(t(),e=!0)}))}else"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(function(){t()})):t();!0!==LittledataLayer.doNotTrackReplaceState&&new o(!0).setCallback(t)},f=function(t){var e=document.getElementsByTagName("a"),n=new RegExp(t);return Array.prototype.slice.call(e).filter((function(t){return t.href&&n.test(t.href)}))},p=function(t){return LittledataLayer.ecommerce.impressions.find((function(e){var n=t.split("/products/"),r=n&&n[1],i=r.split("?"),a=i&&i[0];return a?a===e.handle:r===e.handle}))},y=function(t){LittledataLayer.productClicks&&f("/products/").forEach((function(e){e.addEventListener("click",(function(n){var r=p(this.href);r?(n.preventDefault(),e.timeout=window.setTimeout((function(){document.location.href=e.href}),1e3),t(r,e)):document.location.href=e.href}))}))},m={},g=function(t){Object.keys(t).forEach((function(e){var n="littledata_".concat(e);m[n]=t[e]}))},v={};function b(t,e){var n="".concat(e,"-clientID"),r=t();"string"==typeof r&&0!==r.length&&(v[n]=r,clearTimeout(l),l=setTimeout((function(){v.littledata_updatedAt=(new Date).getTime();var t=new XMLHttpRequest;t.onload=function(){var e=JSON.parse(t.response);LittledataLayer.cart=e;var n=new XMLHttpRequest;n.open("POST","".concat(LittledataLayer.transactionWatcherURL,"/v2/clientID/store")),n.setRequestHeader("Content-Type","application/json"),n.send(JSON.stringify(d({},v,{cartID:"".concat(e.token)})))},t.open("POST","/cart/update.json"),t.setRequestHeader("Content-Type","application/json");var e=d({},v,{},m);t.send(JSON.stringify({attributes:e}))}),1e3))}function w(t,e){var n=LittledataLayer.cart,r=n&&n.attributes||{},i="".concat(e,"-clientID");LittledataLayer[i]||r[i]||(LittledataLayer[i]=t(),b(t,e));var a=r.littledata_updatedAt;if(a){var o=new Date(Number(a));Date.now()-Number(o)>36e5&&(!function(t){var e=new XMLHttpRequest;e.open("POST","".concat(LittledataLayer.transactionWatcherURL,"/cart/store")),e.setRequestHeader("Content-Type","application/json"),e.send(JSON.stringify(t))}(n),setTimeout((function(){b(t,e)}),1e4))}}function O(t){return[{key:"email",regex:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/},{key:"postcode",regex:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/}].reduce((function(t,e){return t.replace(e.regex,"REMOVED")}),t)}!function(){function t(){return Math.floor(1e10*Math.random())}"GA1.2.".concat(t(),".").concat(t())}();var L=function(t){if(!1===LittledataLayer.productPageClicks)return!1;f("^https://cdn.shopify.com/s/files/.*/products/").forEach((function(e){e.addEventListener("click",(function(){var e=this.getElementsByTagName("img")[0],n=e&&e.alt;t(n)}))}))},k=function(t){if(!1===LittledataLayer.productPageClicks)return!1;var e="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";f("".concat(e,".com/(share|pin|intent)")).forEach((function(n){n.addEventListener("click",(function(){var n=this.href.match(new RegExp(e));t(n&&n[0])}))}))},j=function(){if(window.LittledataScriptVersion="8.7",!window.LittledataLayer)throw new Error("Aborting Littledata tracking as LittledataLayer was not found")},S=function(){LittledataLayer.hideBranding||console.log("%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/littledata \n","color: #088f87;")}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return i}));var r=function(t){if(document.cookie.length>0){var e=document.cookie.indexOf("".concat(t,"="));if(-1!==e){var n=e+t.length+1,r=document.cookie.indexOf(";",n);return-1===r&&(r=document.cookie.length),unescape(document.cookie.substring(n,r))}}return""},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=t.match(/(\d{2,11})\.(\d{2,11})/g);return e&&e[0]}},function(t,e,n){"use strict";e.a=()=>{const t=LittledataLayer.ecommerce.detail;if(!t)return null;const e=document.location.href.match(/[0-9]{8,20}/),n=e&&Number(e[0]);if(n){t.shopify_variant_id=n;const e=LittledataLayer.ecommerce.variants;if(e){const r=e.find(t=>t.id===n);r&&(t.id=r.sku,t.variant=r.title)}}return t}},function(t,e,n){"use strict";var r=n(0);e.a=function(t){var e=0,n=Object(r.c)("/products/");function a(){var e=document.documentElement.scrollTop,a=window.innerHeight,o=e+a,c=[];n.forEach((function(t,i){if(t){var a=window.pageYOffset+t.getBoundingClientRect().top,s=t.offsetHeight,d=a+s;if(d>=e&&a<o){var u=s;if(a-e<0?u+=a-e:o-d<0&&(u+=o-d),u/s>.8){n[i]=null;var l=Object(r.b)(t.href);l&&c.push(l)}}}})),c.length>0&&i(c,20).forEach((function(e){return t(e)}))}0!==n.length&&(window.setTimeout((function(){clearTimeout(e),a()}),500),document.addEventListener("scroll",(function(){clearTimeout(e),e=window.setTimeout((function(){a()}),300)})))};var i=function(t,e){return Array.from({length:Math.ceil(t.length/e)},(function(n,r){return t.slice(r*e,r*e+e)}))}},,,function(t,e,n){"use strict";n.r(e);var r=n(0),i=n(1),a=n(3),o=n(2);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach((function(e){d(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function d(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u,l,h,f=function(){return{integration:{name:"shopify_littledata",version:window.LittledataScriptVersion}}},p=function(t,e){window.analytics.track(t,e,{context:f()})},y=function(t){return{brand:t.brand,category:t.category,url:t.handle,product_id:t.id,sku:t.id,position:t.list_position,name:t.name,price:parseFloat(t.price),variant:t.variant,shopify_product_id:t.shopify_product_id,shopify_variant_id:t.shopify_variant_id,compare_at_price:t.compare_at_price}},m=function(t){var e={};return t?(t.address1&&(e.street=t.address1,t.address2&&(e.street+=", ".concat(t.address2))),t.city&&(e.city=t.city),t.zip&&(e.postalCode=t.zip),t.province&&(e.state=t.province),t.country&&(e.country=t.country),e):e};Object(r.k)(),function(){if(window.analytics=window.analytics||[],!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0,analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"],analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),analytics.push(e),analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r),analytics._loadOptions=e},analytics.SNIPPET_VERSION="4.1.0",window.analytics.load(LittledataLayer.writeKey)}window.dataLayer=window.dataLayer||[]}(),Object(r.a)(),u=LittledataLayer.customer,l={},(h=LittledataLayer.cookiesToTrack)&&h.forEach((function(t){l[t]=Object(i.a)(t)})),Object(r.g)(l),u&&window.analytics.identify(u.id,s({email:u.email,name:u.name,phone:u.phone||u.address&&u.address.phone,address:m(u.address)},l)),function(){if(LittledataLayer){LittledataLayer.ecommerce.impressions.length&&(Object(r.e)((function(t){var e=LittledataLayer.ecommerce.impressions.find((function(e){return e.name===t.name&&e.handle===t.handle})),n=e&&e.list_position;window.localStorage.setItem("position",String(n));var r=y(t);p("Product Clicked",s({},r,{currency:LittledataLayer.ecommerce.currencyCode,list_id:t.list}))})),Object(a.a)((function(t){var e=t&&t[0].list,n=t.map(y);p("Product List Viewed",{list_id:e,products:n})})));var t=Object(o.a)();if(t){var e=y(t);Object(r.i)((function(t){e.image_url=t,p("Product Image Clicked",e)})),Object(r.j)((function(t){p("Product Shared",s({},e,{share_via:t}))}))}}}(),Object(r.d)((function(){!function(t){var e=document.title;window.analytics.page(e,{},{context:f(),integrations:t});var n=Object(o.a)();if(n){var r=y(n);r.currency=LittledataLayer.ecommerce.currencyCode,r.position=parseInt(window.localStorage.getItem("position"))||1,p("Product Viewed",r)}}({}),window.analytics.ready((function(){window.analytics.Integrations["Google Analytics"]&&window.ga((function(){var t=window.ga.getAll()[0];t&&Object(r.h)((function(){return t.get("clientId")}),"google")})),Object(r.h)(window.analytics.user().anonymousId,"segment")}))}))}]);