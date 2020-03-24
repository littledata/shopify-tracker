!(function(t) {
	var e = {};
	function n(r) {
		if (e[r]) return e[r].exports;
		var i = (e[r] = { i: r, l: !1, exports: {} });
		return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
	}
	(n.m = t),
		(n.c = e),
		(n.d = function(t, e, r) {
			n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
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
			var r = Object.create(null);
			if (
				(n.r(r),
				Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
				2 & e && 'string' != typeof t)
			)
				for (var i in t)
					n.d(
						r,
						i,
						function(e) {
							return t[e];
						}.bind(null, i),
					);
			return r;
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
})([
	function(t, e, n) {
		'use strict';
		var r = n(1);
		const i = [];
		class a {
			static add(t, e, n) {
				(function(t, e) {
					let n = o(t, e);
					n || ((n = new a(t, e)), i.push(n));
					return n;
				})(t, e).add(n);
			}
			static remove(t, e, n) {
				let r = o(t, e);
				r && r.remove(n);
			}
			constructor(t, e) {
				(this.context = t),
					(this.methodName = e),
					(this.isTask = /Task$/.test(e)),
					(this.originalMethodReference = this.isTask ? t.get(e) : t[e]),
					(this.methodChain = []),
					(this.boundMethodChain = []),
					(this.wrappedMethod = (...t) => (0, this.boundMethodChain[this.boundMethodChain.length - 1])(...t)),
					this.isTask ? t.set(e, this.wrappedMethod) : (t[e] = this.wrappedMethod);
			}
			add(t) {
				this.methodChain.push(t), this.rebindMethodChain();
			}
			remove(t) {
				const e = this.methodChain.indexOf(t);
				e > -1 &&
					(this.methodChain.splice(e, 1),
					this.methodChain.length > 0 ? this.rebindMethodChain() : this.destroy());
			}
			rebindMethodChain() {
				this.boundMethodChain = [];
				for (let t, e = 0; (t = this.methodChain[e]); e++) {
					const n = this.boundMethodChain[e - 1] || this.originalMethodReference.bind(this.context);
					this.boundMethodChain.push(t(n));
				}
			}
			destroy() {
				const t = i.indexOf(this);
				t > -1 &&
					(i.splice(t, 1),
					this.isTask
						? this.context.set(this.methodName, this.originalMethodReference)
						: (this.context[this.methodName] = this.originalMethodReference));
			}
		}
		function o(t, e) {
			return i.filter(n => n.context == t && n.methodName == e)[0];
		}
		class c {
			constructor(t) {
				history.pushState &&
					window.addEventListener &&
					((this.onUrlChange = () => {
						console.warn('UrlChangeTracker not given callback');
					}),
					(this.path = s()),
					(this.trackReplaceState = t),
					(this.pushStateOverride = this.pushStateOverride.bind(this)),
					(this.replaceStateOverride = this.replaceStateOverride.bind(this)),
					(this.handlePopState = this.handlePopState.bind(this)),
					a.add(history, 'pushState', this.pushStateOverride),
					a.add(history, 'replaceState', this.replaceStateOverride),
					window.addEventListener('popstate', this.handlePopState));
			}
			setCallback(t) {
				this.onUrlChange = t;
			}
			pushStateOverride(t) {
				return (...e) => {
					t(...e), this.handleUrlChange(!0);
				};
			}
			replaceStateOverride(t) {
				return (...e) => {
					t(...e), this.handleUrlChange(!1);
				};
			}
			handlePopState() {
				this.handleUrlChange(!0);
			}
			handleUrlChange(t) {
				setTimeout(() => {
					const e = this.path,
						n = s();
					e != n &&
						this.shouldTrackUrlChange(n, e) &&
						((this.path = n), (t || this.trackReplaceState) && this.onUrlChange());
				}, 0);
			}
			shouldTrackUrlChange(t, e) {
				return !(!t || !e);
			}
			remove() {
				this.queue.destroy(),
					a.remove(history, 'pushState', this.pushStateOverride),
					a.remove(history, 'replaceState', this.replaceStateOverride),
					window.removeEventListener('popstate', this.handlePopState);
			}
		}
		function s() {
			return location.pathname + location.search;
		}
		function u(t, e) {
			var n = Object.keys(t);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(t);
				e &&
					(r = r.filter(function(e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable;
					})),
					n.push.apply(n, r);
			}
			return n;
		}
		function d(t) {
			for (var e = 1; e < arguments.length; e++) {
				var n = null != arguments[e] ? arguments[e] : {};
				e % 2
					? u(n, !0).forEach(function(e) {
							l(t, e, n[e]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
					: u(n).forEach(function(e) {
							Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
					  });
			}
			return t;
		}
		function l(t, e, n) {
			return (
				e in t
					? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
					: (t[e] = n),
				t
			);
		}
		n.d(e, 'e', function() {
			return h;
		}),
			n.d(e, 'c', function() {
				return p;
			}),
			n.d(e, 'b', function() {
				return g;
			}),
			n.d(e, 'f', function() {
				return m;
			}),
			n.d(e, 'h', function() {
				return v;
			}),
			n.d(e, 'i', function() {
				return O;
			}),
			n.d(e, 'g', function() {
				return L;
			}),
			n.d(e, 'd', function() {
				return j;
			}),
			n.d(e, 'j', function() {
				return S;
			}),
			n.d(e, 'k', function() {
				return k;
			}),
			n.d(e, 'l', function() {
				return C;
			}),
			n.d(e, 'a', function() {
				return P;
			});
		var f,
			h = function(t) {
				if (!0 === document.hidden) {
					var e = !1;
					document.addEventListener('visibilitychange', function() {
						document.hidden || e || (t(), (e = !0));
					});
				} else
					'loading' === document.readyState
						? document.addEventListener('DOMContentLoaded', function() {
								t();
						  })
						: t();
				!0 === LittledataLayer.singlePageApp && new c(LittledataLayer.trackReplaceState || !1).setCallback(t);
			},
			p = function(t) {
				var e = document.getElementsByTagName('a'),
					n = new RegExp(t);
				return Array.prototype.slice.call(e).filter(function(t) {
					return t.href && n.test(t.href);
				});
			},
			g = function(t) {
				return LittledataLayer.ecommerce.impressions.find(function(e) {
					var n = t.split('/products/');
					return (n && n[1]) === e.handle;
				});
			},
			m = function(t) {
				LittledataLayer.productClicks &&
					p('/products/').forEach(function(e) {
						e.addEventListener('click', function(n) {
							var r = g(this.href);
							r
								? (n.preventDefault(),
								  (e.timeout = window.setTimeout(function() {
										document.location.href = e.href;
								  }, 1e3)),
								  t(r, e))
								: (document.location.href = e.href);
						});
					});
			},
			y = {},
			v = function(t) {
				Object.keys(t).forEach(function(e) {
					var n = 'littledata_'.concat(e);
					y[n] = t[e];
				});
			},
			w = {};
		function b(t, e) {
			var n = ''.concat(e, '-clientID'),
				r = t();
			'string' == typeof r &&
				0 !== r.length &&
				((w[n] = r),
				clearTimeout(f),
				(f = setTimeout(function() {
					w.littledata_updatedAt = new Date().getTime();
					var t = new XMLHttpRequest();
					(t.onload = function() {
						var e = JSON.parse(t.response);
						LittledataLayer.cart = e;
						var n = new XMLHttpRequest();
						n.open('POST', ''.concat(LittledataLayer.transactionWatcherURL, '/v2/clientID/store')),
							n.setRequestHeader('Content-Type', 'application/json'),
							n.send(JSON.stringify(d({}, w, { cartID: ''.concat(e.token) })));
					}),
						t.open('POST', '/cart/update.json'),
						t.setRequestHeader('Content-Type', 'application/json');
					var e = d({}, w, {}, y);
					t.send(JSON.stringify({ attributes: e }));
				}, 1e3)));
		}
		function O(t, e) {
			var n = LittledataLayer.cart,
				r = ''.concat(e, '-clientID');
			if (!n || !n.attributes || !n.attributes[r]) return b(t, e);
			var i = n.attributes.littledata_updatedAt || n.attributes.updatedAt;
			if (!i) return b(t, e);
			var a = new Date(Number(i));
			Date.now() - Number(a) > 36e5 &&
				(!(function(t) {
					var e = new XMLHttpRequest();
					e.open('POST', ''.concat(LittledataLayer.transactionWatcherURL, '/cart/store')),
						e.setRequestHeader('Content-Type', 'application/json'),
						e.send(JSON.stringify(t));
				})(n),
				setTimeout(function() {
					b(t, e);
				}, 1e4));
		}
		function L(t) {
			return [
				{
					key: 'email',
					regex: /[\s&amp;\/,=]([a-zA-Z0-9_.+-]+(\@|%40)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)($|[\s&amp;\/,])/,
				},
				{
					key: 'postcode',
					regex: /[\s&amp;\/,=]([A-Z]{1,2}[0-9][0-9A-Z]?(\s|%20)[0-9][A-Z]{2})($|[\s&amp;\/,])/,
				},
			].reduce(function(t, e) {
				return t.replace(e.regex, 'REMOVED');
			}, t);
		}
		!(function() {
			function t() {
				return Math.floor(1e10 * Math.random());
			}
			'GA1.2.'.concat(t(), '.').concat(t());
		})();
		function j() {
			if (
				!(function(t) {
					var e,
						n,
						r = function(t, e) {
							for (
								var n = new Date(),
									r = window.navigator,
									i = r.plugins || [],
									o = [
										t,
										r.userAgent,
										n.getTimezoneOffset(),
										n.getYear(),
										n.getDate(),
										n.getHours(),
										n.getMinutes() + e,
									],
									c = 0;
								c < i.length;
								++c
							)
								o.push(i[c].description);
							return a(o.join('.'));
						},
						i = function(t, e) {
							var n = new Date(),
								r = window.navigator,
								i = n.getHours() + Math.floor((n.getMinutes() + e) / 60);
							return a(
								[
									t,
									r.userAgent,
									r.language || '',
									n.getTimezoneOffset(),
									n.getYear(),
									n.getDate() + Math.floor(i / 24),
									(24 + i) % 24,
									(60 + n.getMinutes() + e) % 60,
								].join('.'),
							);
						},
						a = function(t) {
							var e,
								n = 1;
							if (t)
								for (n = 0, e = t.length - 1; 0 <= e; e--) {
									var r = t.charCodeAt(e);
									n =
										0 != (r = 266338304 & (n = ((n << 6) & 268435455) + r + (r << 14)))
											? n ^ (r >> 21)
											: n;
								}
							return n.toString();
						};
					if ('string' == typeof t && t.length) {
						if (!/_ga=/.test(t)) return !1;
						n = t
							.split('&')
							.filter(function(t) {
								return '_ga' === t.split('=')[0];
							})
							.shift();
					} else
						n =
							(e = /[?&]_ga=/.test(window.location.search)
								? 'search'
								: /[#&]_ga=/.test(window.location.hash)
								? 'hash'
								: void 0) &&
							window.location[e]
								.substring(1)
								.split('&')
								.filter(function(t) {
									return '_ga' === t.split('=')[0];
								})
								.shift();
					if (void 0 === n || !n.length) return !1;
					var o,
						c,
						s,
						u,
						d = n.indexOf('.');
					return (
						d > -1 &&
							(n.substring(0, d),
							(c = (o = n.substring(d + 1)).indexOf('.')),
							(s = o.substring(0, c)),
							(u = o.substring(c + 1))),
						void 0 !== u
							? s === r((u = u.split('-').join('')), 0) ||
							  s === r(u, -1) ||
							  s === r(u, -2) ||
							  s === i(u, 0) ||
							  s === i(u, -1) ||
							  s === i(u, -2)
							: void 0
					);
				})()
			) {
				if (window.localStorage && LittledataLayer.persistentUserId) {
					var t = window.localStorage.getItem('_ga');
					if (t) return t;
					var e = Object(r.a)('_ga');
					if (e) return window.localStorage.setItem('_ga', e), e;
				}
				return '';
			}
		}
		var S = function(t) {
				if (!1 === LittledataLayer.productPageClicks) return !1;
				p('^https://cdn.shopify.com/s/files/.*/products/').forEach(function(e) {
					e.addEventListener('click', function() {
						var e = this.getElementsByTagName('img')[0],
							n = e && e.alt;
						t(n);
					});
				});
			},
			k = function(t) {
				if (!1 === LittledataLayer.productPageClicks) return !1;
				var e = '(facebook|pinterest|twitter|linkedin|plus.google|instagram)';
				p(''.concat(e, '.com/(share|pin|intent)')).forEach(function(n) {
					n.addEventListener('click', function() {
						var n = this.href.match(new RegExp(e));
						t(n && n[0]);
					});
				});
			},
			C = function() {
				if (!window.LittledataLayer)
					throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
			},
			P = function() {
				LittledataLayer.hideBranding ||
					console.log(
						'%c\nThis store uses Littledata 🚀 to automate its analytics and make better, data-driven decisions. Learn more at http://apps.shopify.com/littledata \n',
						'color: #088f87;',
					);
			};
	},
	function(t, e, n) {
		'use strict';
		n.d(e, 'a', function() {
			return r;
		});
		var r = function(t) {
			if (document.cookie.length > 0) {
				var e = document.cookie.indexOf(''.concat(t, '='));
				if (-1 !== e) {
					var n = e + t.length + 1,
						r = document.cookie.indexOf(';', n);
					-1 === r && (r = document.cookie.length);
					var i = unescape(document.cookie.substring(n, r));
					if ('_ga' === t) {
						var a = i.match(/(\d{2,11})\.(\d{2,11})/g);
						return a ? a[0] : '';
					}
					return i;
				}
			}
			return '';
		};
	},
	function(t, e, n) {
		'use strict';
		e.a = () => {
			const t = LittledataLayer.ecommerce.detail;
			if (!t) return null;
			const e = document.location.href.match(/[0-9]{8,20}/),
				n = e && Number(e[0]);
			if (n) {
				const e = LittledataLayer.ecommerce.variants;
				if (e) {
					const r = e.find(t => t.id === n);
					r && ((t.id = r.sku), (t.variant = r.title));
				}
			}
			return t;
		};
	},
	function(t, e, n) {
		'use strict';
		var r = n(0);
		e.a = function(t) {
			var e = 0,
				n = Object(r.c)('/products/');
			function a() {
				var e = document.documentElement.scrollTop,
					a = window.innerHeight,
					o = e + a,
					c = [];
				n.forEach(function(t, i) {
					if (t) {
						var a = window.pageYOffset + t.getBoundingClientRect().top,
							s = t.offsetHeight,
							u = a + s;
						if (u >= e && a < o) {
							var d = s;
							if ((a - e < 0 ? (d += a - e) : o - u < 0 && (d += o - u), d / s > 0.8)) {
								n[i] = null;
								var l = Object(r.b)(t.href);
								l && c.push(l);
							}
						}
					}
				}),
					c.length > 0 &&
						i(c, 20).forEach(function(e) {
							return t(e);
						});
			}
			0 !== n.length &&
				(window.setTimeout(function() {
					clearTimeout(e), a();
				}, 500),
				document.addEventListener('scroll', function() {
					clearTimeout(e),
						(e = window.setTimeout(function() {
							a();
						}, 300));
				}));
		};
		var i = function(t, e) {
			return Array.from({ length: Math.ceil(t.length / e) }, function(n, r) {
				return t.slice(r * e, r * e + e);
			});
		};
	},
	,
	function(t, e, n) {
		'use strict';
		n.r(e);
		var r = n(0),
			i = n(1),
			a = n(3),
			o = n(2);
		function c(t, e) {
			var n = Object.keys(t);
			if (Object.getOwnPropertySymbols) {
				var r = Object.getOwnPropertySymbols(t);
				e &&
					(r = r.filter(function(e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable;
					})),
					n.push.apply(n, r);
			}
			return n;
		}
		function s(t) {
			for (var e = 1; e < arguments.length; e++) {
				var n = null != arguments[e] ? arguments[e] : {};
				e % 2
					? c(n, !0).forEach(function(e) {
							u(t, e, n[e]);
					  })
					: Object.getOwnPropertyDescriptors
					? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
					: c(n).forEach(function(e) {
							Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
					  });
			}
			return t;
		}
		function u(t, e, n) {
			return (
				e in t
					? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
					: (t[e] = n),
				t
			);
		}
		var d,
			l,
			f,
			h = function() {
				return { integration: { name: 'shopify_littledata', version: window.LittledataScriptVersion } };
			},
			p = function(t, e) {
				window.analytics.track(t, e, { context: h() });
			},
			g = function(t) {
				return {
					brand: t.brand,
					category: t.category,
					url: t.handle,
					product_id: t.id,
					sku: t.id,
					position: t.list_position,
					name: t.name,
					price: parseFloat(t.price),
					variant: t.variant,
				};
			},
			m = function(t) {
				var e = {};
				return t
					? (t.address1 && ((e.street = t.address1), t.address2 && (e.street += ', '.concat(t.address2))),
					  t.city && (e.city = t.city),
					  t.zip && (e.postalCode = t.zip),
					  t.province && (e.state = t.province),
					  t.country && (e.country = t.country),
					  e)
					: e;
			};
		(window.LittledataScriptVersion = '8.21'),
			Object(r.l)(),
			(function() {
				if (((window.analytics = window.analytics || []), !analytics.initialize))
					if (analytics.invoked)
						window.console && console.error && console.error('Segment snippet included twice.');
					else {
						(analytics.invoked = !0),
							(analytics.methods = [
								'trackSubmit',
								'trackClick',
								'trackLink',
								'trackForm',
								'pageview',
								'identify',
								'reset',
								'group',
								'track',
								'ready',
								'alias',
								'debug',
								'page',
								'once',
								'off',
								'on',
							]),
							(analytics.factory = function(t) {
								return function() {
									var e = Array.prototype.slice.call(arguments);
									return e.unshift(t), analytics.push(e), analytics;
								};
							});
						for (var t = 0; t < analytics.methods.length; t++) {
							var e = analytics.methods[t];
							analytics[e] = analytics.factory(e);
						}
						(analytics.load = function(t, e) {
							var n = document.createElement('script');
							(n.type = 'text/javascript'),
								(n.async = !0),
								(n.src = 'https://cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js');
							var r = document.getElementsByTagName('script')[0];
							r.parentNode.insertBefore(n, r), (analytics._loadOptions = e);
						}),
							(analytics.SNIPPET_VERSION = '4.1.0'),
							window.analytics.load(LittledataLayer.writeKey);
					}
				window.dataLayer = window.dataLayer || [];
			})(),
			Object(r.a)(),
			(d = LittledataLayer.customer),
			(l = {}),
			(f = LittledataLayer.cookiesToTrack) &&
				f.forEach(function(t) {
					l[t] = Object(i.a)(t);
				}),
			Object(r.h)(l),
			d &&
				window.analytics.identify(
					d.id,
					s(
						{
							email: d.email,
							name: d.name,
							phone: d.phone || (d.address && d.address.phone),
							address: m(d.address),
						},
						l,
					),
				),
			(function() {
				if (LittledataLayer) {
					LittledataLayer.ecommerce.impressions.length &&
						(Object(r.f)(function(t) {
							var e = LittledataLayer.ecommerce.impressions.find(function(e) {
									return e.name === t.name && e.handle === t.handle;
								}),
								n = e && e.list_position;
							window.localStorage.setItem('position', String(n));
							var r = g(t);
							p(
								'Product Clicked',
								s({}, r, {
									currency: LittledataLayer.ecommerce.currencyCode,
									list_id: document.location.pathname,
									category: 'EnhancedEcommerce',
								}),
							);
						}),
						Object(a.a)(function(t) {
							var e = t && t[0].list,
								n = t.map(g);
							p('Product List Viewed', { list_id: e, category: 'EnhancedEcommerce', products: n });
						}));
					var t = Object(o.a)();
					if (t) {
						var e = g(t);
						Object(r.j)(function(t) {
							(e.image_url = t), p('Product Image Clicked', e);
						}),
							Object(r.k)(function(t) {
								p('Product Shared', s({}, e, { share_via: t }));
							});
					}
				}
			})(),
			Object(r.e)(function() {
				!(function(t) {
					var e = document.title;
					window.analytics.page(e, {}, { context: h(), integrations: t });
					var n = Object(o.a)();
					if (n) {
						var r = g(n);
						(r.currency = LittledataLayer.ecommerce.currencyCode),
							(r.category = 'EnhancedEcommerce'),
							(r.position = parseInt(window.localStorage.getItem('position')) || 1),
							p('Product Viewed', r);
					}
				})({}),
					window.analytics.ready(function() {
						window.analytics.Integrations['Google Analytics'] &&
							window.ga(function() {
								var t = window.ga.getAll()[0];
								if (t) {
									var e = t.get('clientId'),
										n = LittledataLayer.customer && LittledataLayer.customer.generatedClientID;
									Object(r.i)(function() {
										return n || e;
									}, 'google');
								}
							}),
							Object(r.i)(window.analytics.user().anonymousId, 'segment');
					});
			});
	},
]);
