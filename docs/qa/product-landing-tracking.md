# Product landing tracking

## Implemented

Mini-KVM, KVM-GO, KVM Extension and Accessories use the shared ProductLandingV2 page product marker. Consent-gated custom events inherit that product; explicit element product values take precedence. Native GA4 page_view is unchanged: use landing page/path for session denominators.

Stable product values: `minikvm`, `kvm-go`, `uconsole-kvm-extension`, `accessories`; existing KeyMod uses `keymod`.

- Existing hero/footer `crowdsupply_click` and `shop_click` remain.
- KVM Extension purchase buttons: `shop_click`, placement `purchase_options`, variant `extension_only` or `upgrade_bundle`. This describes the button selected, not the SKU purchased.
- Accessories: six stable `sku` values on shop and specs links. These are analytics identifiers, not verified vendor inventory codes.
- Shared secondary CTAs: `app_click`, `docs_click`, `review_click`, `video_click`, `video_catalog_click`, `news_click`, with placement and link_url. App/video clicks do not prove downloads or playback.
- Successful `newsletter_subscribe`: product, placement, form_id. Footer forms inherit page product when present. No name/email is sent to GA4. Backend request schema is unchanged because that service is outside this repository.
- Existing consent gating, middle-click support and Crowd Supply UTM forwarding remain. Shop URLs are not rewritten.

## GA4 actions

Admin → Data display → Custom definitions → Create custom dimension. Keep existing product, placement and site_locale definitions. Add event-scoped dimensions:

| Display name | Event parameter | Purpose |
| --- | --- | --- |
| Accessory SKU | sku | Accessory CTA selection |
| Purchase option | variant | Extension-only versus bundle CTA |

`form_id` is sent with subscriptions; use GA4's built-in Form ID dimension where available. If unavailable in the desired report, register an event-scoped custom dimension for `form_id`, avoiding duplicate existing definitions.

Reference: https://support.google.com/analytics/answer/14239696

No derived GA4 event is required for these website events to arrive. Keep secondary engagement events as ordinary events. Mark newsletter_subscribe as a key event if completed signups are a business goal. For purchase-intent reporting, filter the appropriate shop_click or crowdsupply_click by product; do not sum both generic crowdsupply_click and its derived keymod_crowdsupply_click as separate outcomes. Never label either as purchase or assign an arbitrary monetary value.

In Explore, compare landing-page sessions by Session source / medium and Session campaign. Build a funnel from the product landing page to the product-specific outbound event. Use sessions with the event divided by landing sessions, not raw event count divided by sessions. Use a separate event report with product, placement and sku/variant to compare buttons.

## Verification

Connect Tag Assistant, accept analytics consent and click one CTA. Confirm one custom event with the expected product, placement and optional sku/variant. An automatic GA4 click event alongside it is a different event, not evidence of duplicate custom firing. Check DebugView for receipt. Custom dimension report processing can take 24–48 hours.

Automated browser checks use the production build, block external analytics and mock subscriptions: four landing-page consent/context cases, distinct variants and six SKUs, failed versus successful subscription and no personal data in its event. Existing KeyMod attribution regression tests also run.

## Remaining external integration

TxA Shop checkout analytics is not configured by these changes. Verify the shop uses G-EKZEH6QYWT, consent behavior, checkout integration and purchase events (transaction_id, value, currency, items). If compatible, configure cross-domain measurement for openterface.com and shop.techxartisan.com and verify the Google-generated _gl survives navigation and client/session continuity. Do not assume merely adding a domain enables purchase tracking.

Reference: https://support.google.com/analytics/answer/10071811?hl=en

Crowd Supply purchase attribution still requires Crowd Supply support/data. Newsletter backend campaign/product storage requires changes to its separate service. Header/homepage product discovery tracking is a separate follow-up; this change covers landing-page CTAs.
