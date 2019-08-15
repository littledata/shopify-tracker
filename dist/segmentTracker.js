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
        var r = function(t) {
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
            },
            i = n(1);
        function a(t, e) {
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
        function o(t, e, n) {
            return (
                e in t
                    ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = n),
                t
            );
        }
        n.d(e, 'e', function() {
            return c;
        }),
            n.d(e, 'c', function() {
                return s;
            }),
            n.d(e, 'b', function() {
                return u;
            }),
            n.d(e, 'f', function() {
                return d;
            }),
            n.d(e, 'h', function() {
                return f;
            }),
            n.d(e, 'g', function() {
                return p;
            }),
            n.d(e, 'd', function() {
                return y;
            }),
            n.d(e, 'i', function() {
                return g;
            }),
            n.d(e, 'j', function() {
                return m;
            }),
            n.d(e, 'k', function() {
                return w;
            }),
            n.d(e, 'a', function() {
                return v;
            });
        var c = function(t) {
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
            },
            s = function(t) {
                var e = document.getElementsByTagName('a'),
                    n = new RegExp(t);
                return Array.prototype.slice.call(e).filter(function(t) {
                    return t.href && n.test(t.href);
                });
            },
            u = function(t) {
                return LittledataLayer.ecommerce.impressions.find(function(e) {
                    var n = t.split('/products/');
                    return (n && n[1]) === e.handle;
                });
            },
            d = function(t) {
                LittledataLayer.productClicks &&
                    s('/products/').forEach(function(e) {
                        e.addEventListener('click', function(n) {
                            var r = u(this.href);
                            r
                                ? (n.preventDefault(),
                                  (e.timeout = window.setTimeout(function() {
                                      document.location.href = e.href;
                                  }, 1e3)),
                                  t(r, e))
                                : (document.location.href = e.href);
                        });
                    });
            };
        function l(t) {
            setTimeout(function() {
                var e = t(),
                    n = new Date().getTime(),
                    r = new XMLHttpRequest(),
                    i = { clientID: e, updatedAt: n };
                (r.onload = function() {
                    var t = JSON.parse(r.response),
                        e = new XMLHttpRequest();
                    e.open('POST', ''.concat(LittledataLayer.transactionWatcherURL, '/clientID')),
                        e.setRequestHeader('Content-Type', 'application/json'),
                        e.send(
                            JSON.stringify(
                                (function(t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var n = null != arguments[e] ? arguments[e] : {};
                                        e % 2
                                            ? a(n, !0).forEach(function(e) {
                                                  o(t, e, n[e]);
                                              })
                                            : Object.getOwnPropertyDescriptors
                                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                                            : a(n).forEach(function(e) {
                                                  Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                                              });
                                    }
                                    return t;
                                })({}, i, { cartID: t.token }),
                            ),
                        );
                }),
                    r.open('POST', '/cart/update.json'),
                    r.setRequestHeader('Content-Type', 'application/json'),
                    r.send(JSON.stringify({ attributes: i }));
            }, 1e3);
        }
        function f(t) {
            var e = LittledataLayer.cart;
            if (!(e && e.attributes && e.attributes.clientID && e.attributes.updatedAt)) return l(t);
            var n = new Date(Number(e.attributes.updatedAt));
            Date.now() - Number(n) > 36e5 &&
                (!(function(t) {
                    var e = new XMLHttpRequest();
                    e.open('POST', ''.concat(LittledataLayer.transactionWatcherURL, '/cart/store')),
                        e.setRequestHeader('Content-Type', 'application/json'),
                        e.send(JSON.stringify(t));
                })(e),
                setTimeout(function() {
                    l(t);
                }, 1e4));
        }
        function p(t) {
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
        function y() {
            if (!r()) {
                if (window.localStorage && LittledataLayer.persistentUserId) {
                    var t = window.localStorage.getItem('_ga');
                    if (t) return t;
                    var e = Object(i.a)();
                    if (e) return window.localStorage.setItem('_ga', e), e;
                }
                return '';
            }
        }
        var g = function(t) {
                s('^https://cdn.shopify.com/s/files/.*/products/').forEach(function(e) {
                    e.addEventListener('click', function() {
                        var e = this.getElementsByTagName('img')[0],
                            n = e && e.alt;
                        t(n);
                    });
                });
            },
            m = function(t) {
                var e = '(facebook|pinterest|twitter|linkedin|plus.google|instagram)';
                s(''.concat(e, '.com/(share|pin|intent)')).forEach(function(n) {
                    n.addEventListener('click', function() {
                        var n = this.href.match(new RegExp(e));
                        t(n && n[0]);
                    });
                });
            },
            w = function() {
                if (!window.LittledataLayer)
                    throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
            },
            v = function() {
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
        var r = function() {
            if (document.cookie.length > 0) {
                var t = document.cookie.indexOf(''.concat('_ga', '='));
                if (-1 !== t) {
                    t = t + '_ga'.length + 1;
                    var e = document.cookie.indexOf(';', t);
                    -1 === e && (e = document.cookie.length);
                    var n = unescape(document.cookie.substring(t, e));
                    if (n) {
                        var r = n.match(/(\d{2,11})\.(\d{2,11})/g);
                        return r ? r[0] : '';
                    }
                }
            }
            return '';
        };
    },
    function(t, e, n) {
        'use strict';
        var r = n(0);
        e.a = function(t) {
            var e = 0,
                n = Object(r.c)('/products/');
            function i() {
                var e = document.documentElement.scrollTop,
                    i = window.innerHeight,
                    a = e + i,
                    o = [];
                n.forEach(function(t, i) {
                    if (t) {
                        var c = window.pageYOffset + t.getBoundingClientRect().top,
                            s = t.offsetHeight,
                            u = c + s;
                        if (u >= e && c < a) {
                            var d = s;
                            if ((c - e < 0 ? (d += c - e) : a - u < 0 && (d += a - u), d / s > 0.8)) {
                                n[i] = null;
                                var l = Object(r.b)(t.href);
                                l && o.push(l);
                            }
                        }
                    }
                }),
                    o.length > 0 && t(o);
            }
            0 !== n.length &&
                (window.setTimeout(function() {
                    clearTimeout(e), i();
                }, 500),
                document.addEventListener('scroll', function() {
                    clearTimeout(e),
                        (e = window.setTimeout(function() {
                            i();
                        }, 300));
                }));
        };
    },
    ,
    ,
    function(t, e, n) {
        'use strict';
        n.r(e);
        var r = n(0),
            i = n(2);
        function a(t, e) {
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
        function o(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? a(n, !0).forEach(function(e) {
                          c(t, e, n[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                    : a(n).forEach(function(e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                      });
            }
            return t;
        }
        function c(t, e, n) {
            return (
                e in t
                    ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                    : (t[e] = n),
                t
            );
        }
        var s,
            u = function(t) {
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
            d = function(t) {
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
        Object(r.k)(),
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
            (s = LittledataLayer.customer) &&
                window.analytics.identify(s.id, {
                    email: s.email,
                    name: s.name,
                    phone: s.phone || (s.address && s.address.phone),
                    address: d(s.address),
                }),
            Object(r.e)(function() {
                window.analytics.ready(function() {
                    window.analytics.Integrations['Google Analytics']
                        ? window.ga(function() {
                              var t = window.ga.getAll()[0];
                              if (t) {
                                  var e = t.get('clientId');
                                  window.analytics.user().anonymousId(e);
                              }
                              window.analytics.page(), Object(r.h)(window.analytics.user().anonymousId);
                          })
                        : (window.analytics.page(), Object(r.h)(window.analytics.user().anonymousId)),
                        (function() {
                            if (LittledataLayer) {
                                LittledataLayer.ecommerce.impressions.length &&
                                    (Object(r.f)(function(t) {
                                        var e = LittledataLayer.ecommerce.impressions.find(function(e) {
                                                return e.name === t.name && e.handle === t.handle;
                                            }),
                                            n = e && e.list_position;
                                        window.localStorage.setItem('position', String(n));
                                        var r = u(t);
                                        window.analytics.track(
                                            'Product Clicked',
                                            o({}, r, {
                                                list_id: document.location.pathname,
                                                category: 'EnhancedEcommerce',
                                            }),
                                        );
                                    }),
                                    Object(i.a)(function(t) {
                                        var e = t && t[0].list,
                                            n = t.map(u);
                                        window.analytics.track('Product List Viewed', {
                                            list_id: e,
                                            category: 'EnhancedEcommerce',
                                            products: n,
                                        });
                                    }));
                                var t = LittledataLayer.ecommerce.detail;
                                if (t) {
                                    var e = u(t);
                                    (e.list_id = document.location.href),
                                        (e.category = 'EnhancedEcommerce'),
                                        (e.position = parseInt(window.localStorage.getItem('position')) || 1),
                                        window.analytics.track('Product Viewed', e),
                                        Object(r.i)(function(t) {
                                            (e.image_url = t), window.analytics.track('Product Image Clicked', e);
                                        }),
                                        Object(r.j)(function(t) {
                                            window.analytics.track('Product Shared', o({}, e, { share_via: t }));
                                        });
                                }
                            }
                        })();
                });
            });
    },
]);
