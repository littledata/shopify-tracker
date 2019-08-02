# Shopify Tracker
Littledata's tracking script for Shopify stores.

Shopify apps:
---

- [Google Analytics by Littledata](https://apps.shopify.com/littledata)

- [Segment.com by Littedata](https://apps.shopify.com/segment-com-by-littledata)


Dependencies
---

These scripts rely on `LittledataLayer` window-scope variable generated by a snippet in the Shopify store theme


Configuration
---

The following fields of the `LittledataLayer` object allow for finer configuration of tracking features:

**googleAdsConversionId**

Add the Google Ads (AdWords) conversion ID that you [configured with Ads]](https://support.google.com/google-ads/answer/9266898). Our script will automatically add this to `gtag('config')` command.

Default: `null`


**optimizeId**

This is where to add the Google Optimize container ID that you want to [configure with gtag](https://support.google.com/optimize/answer/7513085). Our script will automatically add this to `gtag('config')` command.

Default: `null`


**anonymizeIp**

This field to instructs the gtag library to [mask the last 3 numbers of the user's IP address](https://support.google.com/analytics/answer/2763052), to support greater user privacy at the expense of some geo-location accuracy.

Default: `true`


**googleSignals**

This field opts your site into using [Google Signals](https://support.google.com/analytics/answer/7532985?hl=en), to enable more powerful demographic reports and cross-device tracking using the Google Ads cookie. You need to check this is compatible with your website terms of use.

Default: `true`


**productClicks**

By default our tracking code briefly interrupts a click on a product in a product list, in order to send the tracking event before the page reloads. If this is interfering with other apps or scripts you can turn off product list click tracking.

Default: `true`


**persistentUserId**

To enable tracking of users across a longer time period of Safari we store the cookie user ID [in the browser local storage](https://blog.littledata.io/2019/05/24/how-to-fix-marketing-attribution-for-safari-itp-2-1/). Since there is no way to clear this local storage when the user deletes their cookies, you may need to check that this is consistent with your privacy policy.

Default: `true`

**hideBranding**

Our app generates a branded message in the site console log. You can disable this.

Default: `false`
