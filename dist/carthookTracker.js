!(function(t) {
	var e = {};
	function n(o) {
		if (e[o]) return e[o].exports;
		var r = (e[o] = { i: o, l: !1, exports: {} });
		return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
	}
	(n.m = t),
		(n.c = e),
		(n.d = function(t, e, o) {
			n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
		}),
		(n.r = function(t) {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(t, '__esModule', { value: !0 });
		}),
		(n.t = function(t, e) {
			if ((1 & e && (t = n(t)), 8 & e)) return t;
			if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
			var o = Object.create(null);
			if (
				(n.r(o),
				Object.defineProperty(o, 'default', { enumerable: !0, value: t }),
				2 & e && 'string' != typeof t)
			)
				for (var r in t)
					n.d(
						o,
						r,
						function(e) {
							return t[e];
						}.bind(null, r),
					);
			return o;
		}),
		(n.n = function(t) {
			var e =
				t && t.__esModule
					? function() {
							return t.default;
					  }
					: function() {
							return t;
					  };
			return n.d(e, 'a', e), e;
		}),
		(n.o = function(t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(n.p = ''),
		n((n.s = 5));
})({
	1: function(t, e, n) {
		'use strict';
		n.d(e, 'a', function() {
			return o;
		});
		var o = function() {
			if (document.cookie.length > 0) {
				var t = document.cookie.indexOf(''.concat('_ga', '='));
				if (-1 !== t) {
					t = t + '_ga'.length + 1;
					var e = document.cookie.indexOf(';', t);
					-1 === e && (e = document.cookie.length);
					var n = unescape(document.cookie.substring(t, e));
					if (n) {
						var o = n.match(/(\d{2,11})\.(\d{2,11})/g);
						return o ? o[0] : '';
					}
				}
			}
			return '';
		};
	},
	5: function(t, e, n) {
		'use strict';
		n.r(e);
		var o = n(1);
		function r() {
			return location.pathname.includes('sandbox')
				? 'https://transactions-staging.littledata.io'
				: 'https://transactions.littledata.io';
		}
		function c(t) {
			var e,
				n,
				o,
				r = 'https://www.googletagmanager.com/gtag/js?id='.concat(t);
			(e = r),
				(n = function() {}),
				((o = document.createElement('script')).async = !0),
				(o.src = e),
				(o.onerror = function() {
					n(new Error('Failed to load' + e));
				}),
				(o.onload = function() {
					n();
				}),
				document.getElementsByTagName('head')[0].appendChild(o);
		}
		var a = function() {
				return {
					linker: {
						domains: [
							'shopify.com',
							'rechargeapps.com',
							'recurringcheckout.com',
							'carthook.com',
							'checkout.com',
						],
					},
				};
			},
			i = function() {
				var t = r(),
					e = ''.concat(t, '/clientID'),
					n = Object(o.a)();
				if (n) {
					var c = (function(t) {
						return {
							headers: { 'content-type': 'application/json; charset=UTF-8' },
							body: JSON.stringify(t),
							method: 'POST',
						};
					})({ clientID: n, cartID: 'carthook-'.concat(CHDataObject.checkout_session) });
					fetch(e, c);
				}
			};
		(function() {
			var t = r(),
				e = CHDataObject && CHDataObject.store_urls && CHDataObject.store_urls.store_url,
				n = location.pathname.includes('/checkout/'),
				o = window.localStorage && window.localStorage.getItem('webPropertyId');
			return !n && o
				? new Promise(function(t) {
						t(o);
				  })
				: (function(t, e) {
						return fetch(''.concat(t, '/webProperty/').concat(e))
							.then(function(t) {
								return t.json();
							})
							.then(function(t) {
								return t.webPropertyId;
							})
							.then(function(t) {
								return (function(t) {
									return window.localStorage && window.localStorage.setItem('webPropertyId', t), t;
								})(t);
							});
				  })(t, e);
		})().then(function(t) {
			var e;
			c(t),
				(e = t),
				(window.dataLayer = window.dataLayer || []),
				(window.gtag =
					window.gtag ||
					function() {
						dataLayer.push(arguments);
					}),
				gtag('js', new Date()),
				gtag('config', e, a()),
				i();
		});
	},
});
