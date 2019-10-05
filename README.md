# Shopify Tracker

Littledata's tracking script for Shopify stores.

## Shopify apps

This code is used by two Littledata apps:

-   [Google Analytics by Littledata](https://apps.shopify.com/littledata)

-   [Segment.com by Littedata](https://apps.shopify.com/segment-com-by-littledata)

## Latest version

The latest minified versions of these scripts are hosted on a CDN:

-   https://cdn.jsdelivr.net/gh/littledata/shopify-tracker/dist/gaTracker.js

-   https://cdn.jsdelivr.net/gh/littledata/shopify-tracker/dist/segmentTracker.js

## Dependencies

These scripts rely on the `LittledataLayer` window-scope variable generated by a snippet in the Shopify store theme, and imported into the Store's active layout.

## Configuration

The following fields of the `LittledataLayer` object allow for configuration of tracking features:

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

**productClicks**

By default our tracking code briefly interrupts a click on a product in a product list, in order to send the tracking event before the page reloads. If this is interfering with other apps or scripts you can turn off product list click tracking.

Default: `true`

**productPageClicks**

By default we track clicks on product images and social share buttons on the product details page. If this doesn't work with your theme you can opt out by setting this field to `false`.

Default: `null`

**persistentUserId**

To enable tracking of users across a longer time period of Safari we store the cookie user ID [in the browser local storage](https://blog.littledata.io/2019/05/24/how-to-fix-marketing-attribution-for-safari-itp-2-1/). Since there is no way to clear this local storage when the user deletes their cookies, you may need to check that this is consistent with your privacy policy.

Default: `true` (boolean)

**hideBranding**

Our app generates a branded message in the site console log. You can disable this.

Default: `false` (boolean)
