(()=>{"use strict";var e={839:(e,t,r)=>{function o(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}Object.defineProperty(t,"__esModule",{value:!0});var n=r(225);t.default=function(){var e=window.LittledataLayer||{},t=e.anonymizeIp,r=e.googleSignals,a=e.ecommerce,i=e.optimizeId,c=e.referralExclusion,u=e.extraLinkerDomains||[],d=c&&c.test(document.referrer);["shop.app"].includes(document.referrer)&&(d=!0),document.referrer.includes("".concat(location.protocol,"//").concat(location.host))&&(d=!0);var l={linker:{domains:[].concat(["^(?!cdn.)(.*)shopify.com","rechargeapps.com","recurringcheckout.com","carthook.com","checkout.com","shop.app"],o(u))},anonymize_ip:!1!==t,allow_ad_personalization_signals:!0===r,currency:a&&a.currencyCode||"USD",link_attribution:!0,optimize_id:i,page_referrer:d?null:document.referrer},s=e.customer&&e.customer.id;s&&(l.user_id=s);var g=n.getCookie("_ga");return g&&!n.getValidGAClientId(g)&&(l.cookie_expires=0),l}},225:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getCookie=function(e){if(document.cookie.length>0){var t=document.cookie.indexOf("".concat(e,"="));if(-1!==t){var r=t+e.length+1,o=document.cookie.indexOf(";",r);return-1===o&&(o=document.cookie.length),unescape(document.cookie.substring(r,o))}}return""},t.getValidGAClientId=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=e.match(/(\d{2,11})\.(\d{2,11})/g);return t&&t[0]}},798:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getQueryStringParam=function(e,t){if(!e)return"";var r=e.match("".concat(t,"=([a-z,A-Z,0-9,-]+)"));return r&&r.length&&r[1]?r[1]:""}},90:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var n=r(798),a=o(r(839));!function(){if(window.Shopify.Checkout&&"thank_you"===window.Shopify.Checkout.page){var e=document.currentScript.src,t=n.getQueryStringParam(e,"webPropertyId");if(!t)throw new Error("Could not add ga thank you page script beacuse of missing webPropertyId");var r=document.createElement("script");r.async=!0;var o="https://www.googletagmanager.com/gtag/js?id="+t;r.src=o,document.getElementsByTagName("head")[0].appendChild(r),window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)},gtag("js",new Date),gtag("config",t,a.default());var i=window.Shopify.checkout&&window.Shopify.checkout.total_price,c=parseInt(i);gtag("event","Checkout",{event_category:"Shopify (Littledata)",event_label:"Thank you page",value:c})}}()}},t={};!function r(o){if(t[o])return t[o].exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}(90)})();