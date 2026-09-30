# KeyMod paid campaign tracking and GA4 setup

## Release and scope

Deploy these source changes through the site's normal GitHub Pages workflow (push/merge to `main`). Local edits and a successful build alone do not update production. The existing GA4 measurement ID remains `G-EKZEH6QYWT`; do not install a second Google tag or duplicate CTA listener.

This implementation measures outbound interest, not purchases. Crowd Supply checkout is outside this website's control. No OpenAI pixel, conversion API integration, or purchase event is installed by this change.

## Advertising URL

Use this destination, changing `utm_content` per creative and campaign names per campaign:

```text
https://openterface.com/keymod/?utm_source=chatgpt&utm_medium=cpc&utm_campaign=keymod_us_launch&utm_content=ad_01
```

Do not put email addresses, customer names, or other personal information in campaign labels.

## Website behavior

- All instrumented Crowd Supply links receive the current incoming UTM labels. `utm_content` remains the creative identifier; the separate event parameter `placement` identifies the CTA.
- With analytics consent, the latest explicitly tagged visit is retained in sessionStorage on this origin/tab for 30 minutes of inactivity, refreshed by page visits and tracked/decorating interactions. An incoming campaign replaces the old set rather than mixing its fields. This is a handoff policy, not GA4's native session attribution model.
- Before acceptance, only labels already in the current URL are forwarded; no campaign labels are stored. Rejecting/revoking consent clears stored campaign labels. Labels explicitly present in the current URL can still be forwarded.
- Untagged visits without retained attribution receive `utm_source=openterface&utm_medium=referral&utm_campaign=keymod` on KeyMod links. Other product CTAs use their own product slug. Existing explicitly tagged vendor links are retained when there is no incoming campaign.
- Only the six supported UTM parameters are copied. OpenAI `oppref`, Google click IDs, GA linker IDs, and arbitrary query parameters are not copied from the landing URL to Crowd Supply.
- The `oppref` already in a page URL is preserved by locale switching. This is not full OpenAI click-ID persistence or conversion measurement.
- Existing `crowdsupply_click` events retain `product`, `placement`, `link_url`, `site_locale`, and available campaign labels. Middle clicks are supported; context-menu navigation gets a tagged URL but is not guaranteed to generate a click event.
- Internal promotional UTMs have been removed from KeyMod's links to KeyCmd, docs, and the forum. Incoming `_gl` remains available for Google's tag to read. Stale incoming linker values are not manually copied to locale links.
- KeyMod’s footer includes a Cookie settings control to reopen the consent banner.
- Scroll and visible-section events no longer consume their one-time flags when consent prevents sending. Acceptance rechecks the current scroll position and currently visible sections; past clicks are not replayed.

Session storage does not bridge different subdomain origins. Deploy equivalent changes to other locale repositories separately if they have independent builds.

## GA4 configuration (Editor access recommended)

Select the property containing web stream `G-EKZEH6QYWT`.

### 1. Register custom dimensions

Go to **Admin → Data display → Custom definitions → Create custom dimension**. Create only missing definitions:

| Dimension name | Scope | Event parameter |
| --- | --- | --- |
| Product | Event | `product` |
| CTA placement | Event | `placement` |
| Site locale | Event | `site_locale` |

Use native **Session source / medium**, **Session campaign**, and **Session manual ad content** for campaign reporting. Do not register click IDs or full URLs as custom dimensions. New custom definitions may take 24–48 hours to become reportable.

### 2. Create a KeyMod outbound key event

In **Admin → Data display → Events**, open **Custom configurations → Custom events**, select the existing web stream, and click **Create**. This opens the detailed matching conditions for an event derived from an existing event.

- New event name: `keymod_crowdsupply_click`
- ALL matching conditions: `event_name` equals `crowdsupply_click`; `product` equals `keymod`
- Copy parameters from the source event: enabled
- Save the rule, then mark the new event as a key event in Events (or register its exact name as a new key event before it appears)
- Counting method: **Once per session**, to measure sessions with outbound intent
- Default monetary value: leave unset

The website emits `crowdsupply_click`; GA4 creates the product-specific event. Do not add a second website event or a second GA4 creation rule with the same name. Avoid counting both the generic and derived event in the same outcome total. Do not name this event `purchase`, `begin_checkout`, or `generate_lead`: it only proves an outbound click.

### 3. Verify after deployment

1. Open Google Tag Assistant at https://tagassistant.google.com/ and connect to the deployed URL using `utm_campaign=keymod_tracking_test`.
2. Use a fresh browser session and accept cookies. In **Admin → Data display → DebugView**, select your test device.
3. Verify one initial `page_view` and a `crowdsupply_click` after one hero CTA click. Inspect `product=keymod`, `placement=keymod_hero`, and the tagged `link_url`.
4. Check GA4's derived event after the creation rule is processed. If it is absent, verify the stream, exact case-sensitive event names, conditions, and rule setup.
5. Confirm the new Crowd Supply tab has `utm_source=chatgpt`, `utm_medium=cpc`, your campaign, and `utm_content=ad_01`. Check any redirect retains these tags.
6. Return to Openterface, navigate to an untagged page in the same tab, and check another Crowd Supply link retains the campaign.
7. Test Reject in a separate fresh session: no custom CTA events or retained campaign storage should be created. Current URL labels can still appear in outbound links.
8. Exclude the `keymod_tracking_test` campaign when evaluating advertising results. Tag Assistant is for testing; do not enable debug mode globally for normal visitors.

### 4. Report results

In Traffic acquisition, use **Session source / medium** and **Session campaign**, then select `keymod_crowdsupply_click` in the key-event selector. Filter to `chatgpt / cpc` and the intended campaign. For a landing-page conversion rate, also limit the cohort to sessions landing on `/keymod/` (allow its query string).

Use **session key event rate** for the selected event, or sessions containing that event divided by landing sessions. Do not divide all raw CTA clicks by sessions: repeat clicks inflate that ratio.

For button comparisons, create a free-form exploration with CTA placement, event count, and total users, filtered to `event_name=crowdsupply_click` and `product=keymod`. Add session campaign/source as needed. Counts by placement overlap because a visitor can use several buttons.

Compare ad-platform spend with measured outbound sessions to calculate cost per measured outbound session. Ad clicks and consented GA4 sessions will differ. GA4 revenue and purchase ROAS remain unavailable without purchase integration.

## Crowd Supply follow-up

Ask the project manager:

> We are advertising KeyMod through ChatGPT. Links from our website now forward `utm_source=chatgpt`, `utm_medium=cpc`, campaign, and creative tags. Can you provide KeyMod orders and revenue by these UTMs, including attribution through checkout and return visits? If not, do you support a project-scoped GA4 integration, approved conversion pixel, or order export/webhook with a supported attribution identifier?

Do not simply add Crowd Supply to GA4 cross-domain settings: the destination must cooperate in compatible tagging and purchase collection. Do not report outbound clicks as sales. OpenAI Ads purchase attribution separately requires a configured data source and actual matched order events; GA4 key events are not automatically imported into OpenAI Ads.

## References

- [GA4 event-scoped custom dimensions](https://support.google.com/analytics/answer/14239696?hl=en)
- [GA4 create or modify key events](https://support.google.com/analytics/answer/12844695?hl=en)
- [GA4 key-event counting methods](https://support.google.com/analytics/answer/13366706?hl=en)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382?hl=en)
- [Google cross-domain measurement](https://developers.google.com/tag-platform/devguides/cross-domain)
- [OpenAI conversion tracking](https://developers.openai.com/ads/conversion-tracking)
- [Crowd Supply privacy and analytics-sharing policy](https://www.crowdsupply.com/privacy-policy)
