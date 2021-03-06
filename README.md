# Shopify Tracker

Littledata's tracking script for Shopify stores.

## Shopify apps

This script is used by two Littledata apps:

-   [Google Analytics by Littledata](https://apps.shopify.com/littledata) ([source code](https://github.com/littledata/shopify-tracker/tree/master/src/gaTracker))

-   [Segment.com by Littedata](https://apps.shopify.com/segment-com-by-littledata) ([source code](https://github.com/littledata/shopify-tracker/tree/master/src/segmentTracker))

There is also an extra tracker for our [Carthook checkout connection](https://www.littledata.io/connections/carthook) ([source code](https://github.com/littledata/shopify-tracker/tree/master/src/cartHookTracker))

## Latest version

The latest minified versions of these scripts are hosted on a CDN:

-   https://master-shopify-tracker.s3.amazonaws.com/gaTracker.js

-   https://master-shopify-tracker.s3.amazonaws.com/segmentTracker.js

You can find which version your browser has loaded by looking at `LittledataScriptVersion` window-scope variable.

## Dependencies

These scripts rely on the `LittledataLayer` window-scope variable generated by a snippet in the Shopify store theme, and imported into the store's active layout.

The Google Analytics script iniatialises Google's [gtag library](https://developers.google.com/analytics/devguides/collection/gtagjs) on the page, so `gtag('event', 'event_action')` commands will queue for sending.

The Segment script iniatialises Segment's [Analytics.js library](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) on the page, so `analytics.track('Event action')` commands will queue for sending.

## Configuration

The following fields of the `LittledataLayer` object allow for configuration of tracking features:

### For both Segment and Google Analytics

**productClicks**

By default our tracking code briefly interrupts a click on a product in a product list, in order to send the tracking event before the page reloads. If this is interfering with other apps or scripts you can turn off product list click tracking.

Default: `true`

**productPageClicks**

By default we track clicks on product images and social share buttons on the product details page. If this doesn't work with your theme you can opt out by setting this field to `false`.

Default: `null`

**hideBranding**

Our app generates a branded message in the site console log. You can disable this.

Default: `false` (boolean)

**doNotTrackReplaceState**

For some themes, where the URL changes (e.g. a new variant) without a new page load our script will track a new page view. Change this setting to `true` to disable a new page view on `history.replaceState()` via [browser History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

Default: `undefined` (boolean)

### Google Analytics configuration

**referralExclusion**

By default, a referral automatically triggers a new session in Google Analytics. When you exclude a referral source, traffic that arrives to your site from the excluded domain doesn’t trigger a new session. If a referring domain is matched by this regular expression the referring domain is ignored, and the pageview is counted as part of the same session. This is in addition to any referrers excluded in the [GA property settings](https://support.google.com/analytics/answer/2795830?hl=en)

Example: `/paypal\.com/` (regex)

**extraLinkerDomains**

To enable [cross-domain tracking](https://support.google.com/analytics/answer/1033876?hl=en) on pages that your Shopify store **links to** (destination domains) you can add an extra array of domains to the data layer. You **do not** need to add domains here which only send traffic to your Shopify store (source domains) - by default this script will look for the linker URL parameters.

You will also need to [enable the Google Analytics linker](https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain) on those source or destination domains.

Example: `['mylandingpage.com']` (array)

**googleAdsConversionIds**

Add the Google Ads (AdWords) conversion IDs that you [configured with Ads](https://support.google.com/google-ads/answer/9266898). This accepts an array of strings. Our script will automatically add this to `gtag('config')` command.

Example: `['AW-11111111', 'AW-22222222']` (array)

**optimizeId**

This is where to add the Google Optimize container ID that you want to [configure with gtag](https://support.google.com/optimize/answer/7513085). Our script will automatically add this to `gtag('config')` command.

Example: `GTM-123ABC` (string)

**anonymizeIp**

This field to instructs the gtag library to [mask the last 3 numbers of the user's IP address](https://support.google.com/analytics/answer/2763052), to support greater user privacy at the expense of some geo-location accuracy.

Default: `true` (boolean)

**googleSignals**

This field opts your site into using [Google Signals](https://support.google.com/analytics/answer/7532985?hl=en), to enable more powerful demographic reports and cross-device tracking using the Google Ads cookie. You need to check this is compatible with your website terms of use.

Default: `true` (boolean)

**MPEndpoint**

If you wish to duplicate the Measurement Protocol hits sent to Google Analytics to a custom collection endpoint of your choosing, add it here.

Example: `https://collector.littledata.io/collect` (string)

**cookieUpdate**

This passes on the [cookie_update field](https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id#cookie_update) to gtag. A common use is when the \_ga cookie was overwritten as server-side cookie to preserve it.

Default: `true` (boolean)

### Segment configuration

**cookiesToTrack**

Grab the values from an array of named cookies and pass them as traits on Segment identify calls.

Example: `['iterableEmailCampaignId]` (array)

**CDNForAnalyticsJS**

If you have a [proxy CDN setup](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/custom-proxy/), redirecting to `https://cdn.segment.com`, to load Segment's AnalyticsJS library from your own domain you can specify it here. It must include the full domain, with no trailing slash.

Default: `https://cdn.segment.com` (string)

**segmentUserId**

You can [choose an identifier to use](https://segment.com/docs/connections/sources/catalog/libraries/website/shopify-littledata/#user-identity) for logged-in users.WARNING: this must match what is configured for server-side events in Littledata's app settings.

Possible values: `none`, `shopifyCustomerId`, `email`, `md5EmailHash`
Default: `shopifyCustomerId` (string)
