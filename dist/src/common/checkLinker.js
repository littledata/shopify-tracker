/* eslint-disable */
//from https://gist.github.com/sahava/f3718f981bb01768c0eba714ee94e2d2
export default function (str) {
    // First browser fingerprint method.
    // Uses the clientId / gid string, user agent, time, and browser plugin descriptions.
    var joiner = function (cidGid, offset) {
        var a = new Date, b = window.navigator, c = b.plugins || [];
        var d = [cidGid, b.userAgent, a.getTimezoneOffset(), a.getYear(), a.getDate(), a.getHours(), a.getMinutes() + offset];
        for (var e = 0; e < c.length; ++e) {
            d.push(c[e].description);
        }
        return jumble(d.join('.'));
    };
    // Second browser fingerprint method.
    // Uses the clientId / gid string, time, user agent, browser language.
    var joiner2 = function (cidGid, offset) {
        var a = new Date, b = window.navigator, c = a.getHours() + Math.floor((a.getMinutes() + offset) / 60);
        return jumble([cidGid, b.userAgent, b.language || "", a.getTimezoneOffset(), a.getYear(), a.getDate() + Math.floor(c / 24), (24 + c) % 24, (60 + a.getMinutes() + offset) % 60].join("."));
    };
    // One-way hash of the fingerprint, included in the linker parameter.
    var jumble = function (arr) {
        var b = 1, c;
        if (arr) {
            for (b = 0, c = arr.length - 1; 0 <= c; c--) {
                var d = arr.charCodeAt(c);
                b = (b << 6 & 268435455) + d + (d << 14);
                d = b & 266338304;
                b = 0 != d ? b ^ d >> 21 : b;
            }
        }
        return b.toString();
    };
    var linkerType, linker;
    // Check Linker validity and isolate the Linker parameter string.
    if (typeof str === 'string' && str.length) {
        if (!/_ga=/.test(str)) {
            return false;
        }
        linker = str.split('&').filter(function (p) { return p.split('=')[0] === '_ga'; }).shift();
    }
    else {
        linkerType = /[?&]_ga=/.test(window.location.search) ? 'search' : /[#&]_ga=/.test(window.location.hash) ? 'hash' : undefined;
        linker = linkerType && window.location[linkerType].substring(1).split('&').filter(function (p) { return p.split('=')[0] === '_ga'; }).shift();
    }
    if (typeof linker === 'undefined' || !linker.length) {
        return false;
    }
    // Get the finger print and Client ID / Google ID strings from the parameter.
    var a = linker.indexOf('.'), b, c, d, fingerprint, cidGid;
    if (a > -1) {
        b = linker.substring(0, a);
        c = linker.substring(a + 1);
        d = c.indexOf(".");
        fingerprint = c.substring(0, d);
        cidGid = c.substring(d + 1);
    }
    // Jumble the Client ID / Google ID string and compare it against the fingerprint.
    // Check current minute, one minute back, and two minutes back.
    if (typeof cidGid !== 'undefined') {
        cidGid = cidGid.split('-').join('');
        return fingerprint === joiner(cidGid, 0) ||
            fingerprint === joiner(cidGid, -1) ||
            fingerprint === joiner(cidGid, -2) ||
            fingerprint === joiner2(cidGid, 0) ||
            fingerprint === joiner2(cidGid, -1) ||
            fingerprint === joiner2(cidGid, -2);
    }
}
