!(function(t) {
    var e = {};
    function n(r) {
        if (e[r]) return e[r].exports;
        var o = (e[r] = { i: r, l: !1, exports: {} });
        return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
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
                for (var o in t)
                    n.d(
                        r,
                        o,
                        function(e) {
                            return t[e];
                        }.bind(null, o),
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
        n((n.s = 4));
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
                                o = r.plugins || [],
                                a = [
                                    t,
                                    r.userAgent,
                                    n.getTimezoneOffset(),
                                    n.getYear(),
                                    n.getDate(),
                                    n.getHours(),
                                    n.getMinutes() + e,
                                ],
                                c = 0;
                            c < o.length;
                            ++c
                        )
                            a.push(o[c].description);
                        return i(a.join('.'));
                    },
                    o = function(t, e) {
                        var n = new Date(),
                            r = window.navigator,
                            o = n.getHours() + Math.floor((n.getMinutes() + e) / 60);
                        return i(
                            [
                                t,
                                r.userAgent,
                                r.language || '',
                                n.getTimezoneOffset(),
                                n.getYear(),
                                n.getDate() + Math.floor(o / 24),
                                (24 + o) % 24,
                                (60 + n.getMinutes() + e) % 60,
                            ].join('.'),
                        );
                    },
                    i = function(t) {
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
                var a,
                    c,
                    u,
                    s,
                    d = n.indexOf('.');
                return (
                    d > -1 &&
                        (n.substring(0, d),
                        (c = (a = n.substring(d + 1)).indexOf('.')),
                        (u = a.substring(0, c)),
                        (s = a.substring(c + 1))),
                    void 0 !== s
                        ? u === r((s = s.split('-').join('')), 0) ||
                          u === r(s, -1) ||
                          u === r(s, -2) ||
                          u === o(s, 0) ||
                          u === o(s, -1) ||
                          u === o(s, -2)
                        : void 0
                );
            },
            o = n(1);
        function i(t, e) {
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
        function a(t, e, n) {
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
                return u;
            }),
            n.d(e, 'b', function() {
                return s;
            }),
            n.d(e, 'f', function() {
                return d;
            }),
            n.d(e, 'h', function() {
                return f;
            }),
            n.d(e, 'g', function() {
                return g;
            }),
            n.d(e, 'd', function() {
                return p;
            }),
            n.d(e, 'i', function() {
                return m;
            }),
            n.d(e, 'j', function() {
                return y;
            }),
            n.d(e, 'k', function() {
                return v;
            }),
            n.d(e, 'a', function() {
                return h;
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
            u = function(t) {
                var e = document.getElementsByTagName('a'),
                    n = new RegExp(t);
                return Array.prototype.slice.call(e).filter(function(t) {
                    return t.href && n.test(t.href);
                });
            },
            s = function(t) {
                return LittledataLayer.ecommerce.impressions.find(function(e) {
                    var n = t.split('/products/');
                    return (n && n[1]) === e.handle;
                });
            },
            d = function(t) {
                LittledataLayer.productClicks &&
                    u('/products/').forEach(function(e) {
                        e.addEventListener('click', function(n) {
                            var r = s(this.href);
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
                    o = { clientID: e, updatedAt: n };
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
                                            ? i(n, !0).forEach(function(e) {
                                                  a(t, e, n[e]);
                                              })
                                            : Object.getOwnPropertyDescriptors
                                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                                            : i(n).forEach(function(e) {
                                                  Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                                              });
                                    }
                                    return t;
                                })({}, o, { cartID: t.token }),
                            ),
                        );
                }),
                    r.open('POST', '/cart/update.json'),
                    r.setRequestHeader('Content-Type', 'application/json'),
                    r.send(JSON.stringify({ attributes: o }));
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
        function g(t) {
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
        function p() {
            if (!r()) {
                if (window.localStorage && LittledataLayer.persistentUserId) {
                    var t = window.localStorage.getItem('_ga');
                    if (t) return t;
                    var e = Object(o.a)();
                    if (e) return window.localStorage.setItem('_ga', e), e;
                }
                return '';
            }
        }
        var m = function(t) {
                u('^https://cdn.shopify.com/s/files/.*/products/').forEach(function(e) {
                    e.addEventListener('click', function() {
                        var e = this.getElementsByTagName('img')[0],
                            n = e && e.alt;
                        t(n);
                    });
                });
            },
            y = function(t) {
                var e = '(facebook|pinterest|twitter|linkedin|plus.google|instagram)';
                u(''.concat(e, '.com/(share|pin|intent)')).forEach(function(n) {
                    n.addEventListener('click', function() {
                        var n = this.href.match(new RegExp(e));
                        t(n && n[0]);
                    });
                });
            },
            v = function() {
                if (!window.LittledataLayer)
                    throw new Error('Aborting Littledata tracking as LittledataLayer was not found');
            },
            h = function() {
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
            function o() {
                var e = document.documentElement.scrollTop,
                    o = window.innerHeight,
                    i = e + o,
                    a = [];
                n.forEach(function(t, o) {
                    if (t) {
                        var c = window.pageYOffset + t.getBoundingClientRect().top,
                            u = t.offsetHeight,
                            s = c + u;
                        if (s >= e && c < i) {
                            var d = u;
                            if ((c - e < 0 ? (d += c - e) : i - s < 0 && (d += i - s), d / u > 0.8)) {
                                n[o] = null;
                                var l = Object(r.b)(t.href);
                                l && a.push(l);
                            }
                        }
                    }
                }),
                    a.length > 0 && t(a);
            }
            0 !== n.length &&
                (window.setTimeout(function() {
                    clearTimeout(e), o();
                }, 500),
                document.addEventListener('scroll', function() {
                    clearTimeout(e),
                        (e = window.setTimeout(function() {
                            o();
                        }, 300));
                }));
        };
    },
    ,
    function(t, e, n) {
        'use strict';
        n.r(e);
        var r = n(0),
            o = n(2);
        function i(t) {
            return (i =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function(t) {
                          return typeof t;
                      }
                    : function(t) {
                          return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                              ? 'symbol'
                              : typeof t;
                      })(t);
        }
        var a = function() {
            var t = LittledataLayer,
                e = t.anonymizeIp,
                n = t.googleSignals,
                o = t.ecommerce,
                i = t.optimizeId,
                a = t.referralExclusion.test(document.referrer);
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
                anonymize_ip: !!e,
                allow_ad_personalization_signals: !!n,
                currency: o.currencyCode,
                link_attribution: !0,
                clientId: Object(r.d)(),
                optimize_id: i,
                page_referrer: a ? document.referrer : null,
                send_page_view: !1,
            };
        };
        Object(r.k)(),
            (window.dataLayer = window.dataLayer || []),
            (window.gtag =
                window.gtag ||
                function() {
                    dataLayer.push(arguments);
                }),
            gtag('js', new Date()),
            gtag('config', LittledataLayer.webPropertyID, a()),
            Object(r.a)(),
            Object(r.e)(function() {
                !(function() {
                    gtag('config', LittledataLayer.webPropertyID, {
                        page_title: Object(r.g)(document.title),
                        page_location: Object(r.g)(document.location.href),
                    });
                    var t = LittledataLayer.googleAdsConversionIds;
                    'object' === i(t) &&
                        t.length > 0 &&
                        t.forEach(function(t) {
                            return gtag('config', t);
                        });
                })(),
                    (function() {
                        Object(r.h)(r.d),
                            LittledataLayer.ecommerce.impressions.length &&
                                (Object(r.f)(function(t, e) {
                                    var n = LittledataLayer.ecommerce.impressions.find(function(e) {
                                            return e.name === t.name && e.handle === t.handle;
                                        }),
                                        r = n && n.list_position;
                                    window.localStorage.setItem('position', String(r)),
                                        dataLayer.push({
                                            event: 'select_content',
                                            ecommerce: { click: { actionField: { list: t.list_name }, products: [t] } },
                                        }),
                                        gtag('event', 'select_content', {
                                            content_type: 'product',
                                            items: [t],
                                            send_to: LittledataLayer.webPropertyID,
                                            event_callback: function() {
                                                window.clearTimeout(e.timeout), (document.location.href = e.href);
                                            },
                                        });
                                }),
                                Object(o.a)(function(t) {
                                    gtag('event', 'view_item_list', {
                                        items: t,
                                        send_to: LittledataLayer.webPropertyID,
                                        non_interaction: !0,
                                    }),
                                        dataLayer.push({ event: 'view_item_list', ecommerce: { impressions: t } });
                                }));
                        var t = LittledataLayer.ecommerce.detail;
                        t &&
                            ((t.list_position = parseInt(window.localStorage.getItem('position')) || 1),
                            gtag('event', 'view_item', {
                                items: [t],
                                non_interaction: !0,
                                send_to: LittledataLayer.webPropertyID,
                            }),
                            dataLayer.push({
                                event: 'view_item',
                                ecommerce: { detail: { actionField: { list: t.list_name }, products: [t] } },
                            }),
                            Object(r.i)(function(t) {
                                dataLayer.push({ event: 'product_image_click', name: t }),
                                    gtag('event', 'Product image click', {
                                        event_category: 'Product details page (Littledata)',
                                        event_label: t,
                                        send_to: LittledataLayer.webPropertyID,
                                    });
                            }),
                            Object(r.j)(function(t) {
                                dataLayer.push({ event: 'share_product', network: t }),
                                    gtag('event', 'Social share', {
                                        event_category: 'Product details page (Littledata)',
                                        event_label: t,
                                        send_to: LittledataLayer.webPropertyID,
                                    });
                            }));
                    })();
            });
    },
]);
