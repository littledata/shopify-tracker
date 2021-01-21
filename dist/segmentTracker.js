(()=>{"use strict";var e={225:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=function(e){if(document.cookie.length>0){var t=document.cookie.indexOf("".concat(e,"="));if(-1!==t){var n=t+e.length+1,r=document.cookie.indexOf(";",n);return-1===r&&(r=document.cookie.length),unescape(document.cookie.substring(n,r))}}return""},t.getValidGAClientId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e.match(/(\d{2,11})\.(\d{2,11})/g);return t&&t[0]}},0:function(e,t,n){function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c,s=o(n(778)),d=n(376),l=n(225);t.pageView=function(e){if(!0===document.hidden){var t=!1;document.addEventListener("visibilitychange",(function(){document.hidden||t||(e(),t=!0)}))}else"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(function(){e()})):e();!0!==LittledataLayer.doNotTrackReplaceState&&new s.default(!0).setCallback(e)},t.getElementsByHref=function(e){var t=document.getElementsByTagName("a"),n=new RegExp(e);return Array.prototype.slice.call(t).filter((function(e){return e.href&&n.test(e.href)}))},t.findDataLayerProduct=function(e){return LittledataLayer.ecommerce.impressions.find((function(t){var n=e.split("/products/"),r=n&&n[1],i=r.split("?"),a=i&&i[0];return a?a===t.handle:r===t.handle}))},t.productListClicks=function(e){LittledataLayer.productClicks&&t.getElementsByHref("/products/").forEach((function(n){n.addEventListener("click",(function(r){var i=t.findDataLayerProduct(this.href);i?(r.preventDefault(),n.timeout=window.setTimeout((function(){document.location.href=n.href}),1e3),e(i,n)):document.location.href=n.href}))}))};var u={};t.setCartOnlyAttributes=function(e){Object.keys(e).forEach((function(t){var n="littledata_".concat(t);u[n]=e[t]}))};var f={};function h(e,t,n){var r="".concat(t,"-clientID");"string"==typeof e&&0!==e.length&&(f[r]=e,clearTimeout(c),c=setTimeout((function(){f.littledata_updatedAt=(new Date).getTime();var e=new XMLHttpRequest;e.onload=function(){var t,r,a=JSON.parse(e.response);LittledataLayer.cart=a,n&&(t=a,(r=new XMLHttpRequest).open("POST","".concat(LittledataLayer.transactionWatcherURL,"/cart/store")),r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(t)));var o=new XMLHttpRequest;o.open("POST","".concat(LittledataLayer.transactionWatcherURL,"/v2/clientID/store")),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(i({},f,{cartID:"".concat(a.token)})))},e.open("POST","/cart/update.json"),e.setRequestHeader("Content-Type","application/json");var t=i({},f,{},u);e.send(JSON.stringify({attributes:t}))}),1e3))}function p(e,t){var n=LittledataLayer.cart,r=n&&n.attributes||{},i="".concat(t,"-clientID");LittledataLayer[i]||r[i]||(LittledataLayer[i]=e,h(e,t,!1));var a=r.littledata_updatedAt;if(a){var o=new Date(Number(a));Date.now()-Number(o)>36e5&&h(e,t,!0)}}function m(e,n){var r=window.ga&&window.ga.getAll&&window.ga.getAll();if(r&&r.length)return console.log("getGAClientId",y(r[0])),t.setCustomTask(),p(y(r[0]),"google");n>524288e3||(n*=2,clearTimeout(e),e=window.setTimeout((function(){m(e,n)}),n))}function y(e){var t=e.get("clientId");return l.getValidGAClientId(t)?t:""}t.setClientID=p,t.removePii=function(e){return[{key:"email",regex:/[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/},{key:"postcode",regex:/[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/}].reduce((function(e,t){return e.replace(t.regex,"REMOVED")}),e)},t.guid=function(){function e(){return Math.floor(1e10*Math.random())}return"GA1.2.".concat(e(),".").concat(e())}(),t.trackProductImageClicks=function(e){if(!1===LittledataLayer.productPageClicks)return!1;t.getElementsByHref("^https://cdn.shopify.com/s/files/.*/products/").forEach((function(t){t.addEventListener("click",(function(){var t=this.getElementsByTagName("img")[0];if(!t)return!1;e(t)}))}))},t.trackSocialShares=function(e){if(!1===LittledataLayer.productPageClicks)return!1;var n="(facebook|pinterest|twitter|linkedin|plus.google|instagram)";t.getElementsByHref("".concat(n,".com/(share|pin|intent)")).forEach((function(t){t.addEventListener("click",(function(){var t=this.href.match(new RegExp(n));e(t&&t[0])}))}))},t.validateLittledataLayer=function(){if(window.LittledataScriptVersion="10.0.4",!window.LittledataLayer)throw new Error("Aborting Littledata tracking as LittledataLayer was not found")},t.advertiseLD=function(e){if(!LittledataLayer.hideBranding){var t="Segment"===e?"segment-com-by-littledata":"littledata";console.log("%c\nThis store uses Littledata 🚀 to automate its ".concat(e," setup and make better, data-driven decisions. Learn more at http://apps.shopify.com/").concat(t," \n"),"color: #088f87;")}},t.retrieveAndStoreClientId=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=new Promise((function(e){gtag("get",LittledataLayer.webPropertyID||LittledataLayer.measurementID,"client_id",e)}));return n.then((function(n){return e&&t.setCustomTask(),p(n,"google")})).catch((function(){m(undefined,10)}))},t.setCustomTask=function(){var e=window.ga&&window.ga.getAll&&window.ga.getAll();e&&e.length&&(LittledataLayer.MPEndpoint&&LittledataLayer.MPEndpoint.length&&e[0].set("customTask",d.customTask(LittledataLayer.MPEndpoint)))},t.documentReady=function(e){"complete"===document.readyState||"interactive"===document.readyState?setTimeout(e,1):document.addEventListener("DOMContentLoaded",e)}},632:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default=function(e){var t=0,n=r.getElementsByHref("/products/");function a(){var t=document.documentElement.scrollTop,a=window.innerHeight,o=t+a,c=[];n.forEach((function(e,i){if(e){var a=window.pageYOffset+e.getBoundingClientRect().top,s=e.offsetHeight,d=a+s;if(d>=t&&a<o){var l=s;if(a-t<0?l+=a-t:o-d<0&&(l+=o-d),l/s>.8){n[i]=null;var u=r.findDataLayerProduct(e.href);u&&c.push(u)}}}})),c.length>0&&i(c,20).forEach((function(t){return e(t)}))}0!==n.length&&(window.setTimeout((function(){clearTimeout(t),a()}),500),document.addEventListener("scroll",(function(){clearTimeout(t),t=window.setTimeout((function(){a()}),300)})))};var i=function(e,t){return Array.from({length:Math.ceil(e.length/t)},(function(n,r){return e.slice(r*t,r*t+t)}))}},376:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.customTask=function(e){return function(t){window._ga_originalSendHitTask=window._ga_originalSendHitTask||t.get("sendHitTask"),t.set("sendHitTask",(function(t){var n=window._ga_originalSendHitTask;try{n(t);var r=t.get("hitPayload"),i=new XMLHttpRequest;i.open("POST",e,!0),i.withCredentials=!1,i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(r)}catch(e){n(t)}}))}}},921:function(e,t,n){function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=n(0),s=n(877),d=n(880),l=n(225),u=o(n(632)),f=o(n(22)),h=function(){return{integration:{name:"shopify_littledata",version:window.LittledataScriptVersion}}},p=function(e,t){window.analytics.track(e,t,{context:h()})};t.identifyCustomer=function(e){var t={},n=LittledataLayer.cookiesToTrack;n&&n.forEach((function(e){t[e]=l.getCookie(e)})),c.setCartOnlyAttributes(t),e&&window.analytics.identify(e.id,i({email:e.email,name:e.name,phone:e.phone||e.address&&e.address.phone,address:m(e.address)},t))},t.trackEvents=function(){if(LittledataLayer){LittledataLayer.ecommerce.impressions.length&&(c.productListClicks((function(e){var t=LittledataLayer.ecommerce.impressions.find((function(t){return t.name===e.name&&t.handle===e.handle})),n=t&&t.list_position;window.localStorage.setItem("position",String(n)),p("Product Clicked",i({},d.segmentProduct(e),{currency:LittledataLayer.ecommerce.currencyCode,list_id:e.list}))})),u.default((function(e){var t=e&&e[0].list,n=e.map(d.segmentProduct);p("Product List Viewed",{list_id:t,products:n})})));var e=f.default();if(e){var t=d.segmentProduct(e);c.trackProductImageClicks((function(e){t.image_url=e.src,p("Product Image Clicked",t)})),c.trackSocialShares((function(e){p("Product Shared",i({},t,{share_via:e}))}))}}},t.initSegment=function(){var e=window.analytics=window.analytics||[];if(!e.initialize)if(e.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{e.invoked=!0,e.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"],e.factory=function(t){return function(){var n=Array.prototype.slice.call(arguments);return n.unshift(t),e.push(n),e}};for(var t=0;t<e.methods.length;t++){var n=e.methods[t];e[n]=e.factory(n)}var r=LittledataLayer.CDNForAnalyticsJS||"https://cdn.segment.com";e.load=function(t,n){var i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="".concat(r,"/analytics.js/v1/").concat(t,"/analytics.min.js");var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a),e._loadOptions=n},e.SNIPPET_VERSION="4.1.0",e.addSourceMiddleware(s.addEmailToTrackEvents),e.load(LittledataLayer.writeKey),window.dataLayer=window.dataLayer||[]}};var m=function(e){var t={};return e?(e.address1&&(t.street=e.address1,e.address2&&(t.street+=", ".concat(e.address2))),e.city&&(t.city=e.city),e.zip&&(t.postalCode=e.zip),e.province&&(t.state=e.province),e.country&&(t.country=e.country),t):t};t.callSegmentPage=function(e){var t=document.title;window.analytics.page(t,{},{context:h(),integrations:e});var n=f.default();if(n){var r=d.segmentProduct(n);r.currency=LittledataLayer.ecommerce.currencyCode,r.position=parseInt(window.localStorage.getItem("position"))||1,window.analytics.ready((function(){p("Product Viewed",r)}))}}},877:(e,t)=>{function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.addEmailToTrackEvents=function(e){var t=e.payload,a=e.next;if("track"!==t.action())return a(t);t.obj=function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(i,!0).forEach((function(t){r(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(i).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},t.obj,{properties:i(t.obj.properties)}),a(t)};var i=function(e){var t=window.analytics.user&&window.analytics.user().traits().email;return t&&(e.email=t),e}},880:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.segmentProduct=function(e){var t={brand:e.brand,category:e.category,url:"".concat(window.document.location.origin,"/products/").concat(e.handle),product_id:String(e.id),sku:e.id,name:e.name,price:parseFloat(e.price),variant:e.variant,shopify_product_id:String(e.shopify_product_id),shopify_variant_id:String(e.shopify_variant_id)};return e.image_url&&(t.image_url=e.image_url),e.list_position&&(t.position=e.list_position),e.compare_at_price&&(t.compare_at_price=e.compare_at_price),t}},268:(e,t,n)=>{var r=n(0),i=n(921);r.validateLittledataLayer(),i.initSegment(),r.advertiseLD("Segment"),i.identifyCustomer(LittledataLayer.customer),r.documentReady(i.trackEvents),r.pageView((function(){i.callSegmentPage({}),window.analytics.ready((function(){window.analytics.Integrations["Google Analytics"]&&r.retrieveAndStoreClientId();var e=window.analytics.user;if(e){r.setClientID(e().anonymousId(),"segment");var t=e().traits().email;t&&r.setClientID(t,"email")}}))}))},778:(e,t,n)=>{n.r(t),n.d(t,{default:()=>o});const r=[];class i{static add(e,t,n){(function(e,t){let n=a(e,t);n||(n=new i(e,t),r.push(n));return n})(e,t).add(n)}static remove(e,t,n){let r=a(e,t);r&&r.remove(n)}constructor(e,t){this.context=e,this.methodName=t,this.isTask=/Task$/.test(t),this.originalMethodReference=this.isTask?e.get(t):e[t],this.methodChain=[],this.boundMethodChain=[],this.wrappedMethod=(...e)=>(0,this.boundMethodChain[this.boundMethodChain.length-1])(...e),this.isTask?e.set(t,this.wrappedMethod):e[t]=this.wrappedMethod}add(e){this.methodChain.push(e),this.rebindMethodChain()}remove(e){const t=this.methodChain.indexOf(e);t>-1&&(this.methodChain.splice(t,1),this.methodChain.length>0?this.rebindMethodChain():this.destroy())}rebindMethodChain(){this.boundMethodChain=[];for(let e,t=0;e=this.methodChain[t];t++){const n=this.boundMethodChain[t-1]||this.originalMethodReference.bind(this.context);this.boundMethodChain.push(e(n))}}destroy(){const e=r.indexOf(this);e>-1&&(r.splice(e,1),this.isTask?this.context.set(this.methodName,this.originalMethodReference):this.context[this.methodName]=this.originalMethodReference)}}function a(e,t){return r.filter((n=>n.context==e&&n.methodName==t))[0]}class o{constructor(e){history.pushState&&window.addEventListener&&(this.onUrlChange=()=>{console.warn("UrlChangeTracker not given callback")},this.path=c(),this.trackReplaceState=e,this.pushStateOverride=this.pushStateOverride.bind(this),this.replaceStateOverride=this.replaceStateOverride.bind(this),this.handlePopState=this.handlePopState.bind(this),i.add(history,"pushState",this.pushStateOverride),i.add(history,"replaceState",this.replaceStateOverride),window.addEventListener("popstate",this.handlePopState))}setCallback(e){this.onUrlChange=e}pushStateOverride(e){return(...t)=>{e(...t),this.handleUrlChange(!0)}}replaceStateOverride(e){return(...t)=>{e(...t),this.handleUrlChange(!1)}}handlePopState(){this.handleUrlChange(!0)}handleUrlChange(e){setTimeout((()=>{const t=this.path,n=c();t!=n&&this.shouldTrackUrlChange(n,t)&&(this.path=n,(e||this.trackReplaceState)&&this.onUrlChange())}),0)}shouldTrackUrlChange(e,t){return!(!e||!t)}remove(){this.queue.destroy(),i.remove(history,"pushState",this.pushStateOverride),i.remove(history,"replaceState",this.replaceStateOverride),window.removeEventListener("popstate",this.handlePopState)}}function c(){return location.pathname+location.search}},22:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r=()=>{const e=LittledataLayer.ecommerce.detail;if(!e)return null;const t=document.location.href.match(/[0-9]{8,20}/),n=t&&Number(t[0]);if(n){e.shopify_variant_id=n;const t=LittledataLayer.ecommerce.variants;if(t){const r=t.find((e=>e.id===n));r&&(e.id=r.sku,e.variant=r.title)}}return e}}},t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(268)})();