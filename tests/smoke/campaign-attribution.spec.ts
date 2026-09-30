import { test, expect } from '@playwright/test';

const campaign = 'utm_source=chatgpt&utm_medium=cpc&utm_campaign=keymod_us_test&utm_content=ad_01';
const ctas = 'a[data-analytics-event="crowdsupply_click"]';

test.beforeEach(async ({ page, baseURL }) => {
  // Exercise the built site without submitting test analytics or navigating to vendors.
  const origin = new URL(baseURL!).origin;
  await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
});

async function preventNavigation(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    for (const type of ['click', 'auxclick']) {
      document.addEventListener(type, event => {
        if ((event.target as Element)?.closest('a')) event.preventDefault();
      }, true);
    }
  });
}

async function clickEvents(page: import('@playwright/test').Page) {
  return page.evaluate(() => ((window as any).dataLayer || [])
    .filter((entry: any) => entry[0] === 'event' && entry[1] === 'crowdsupply_click')
    .map((entry: any) => entry[2]));
}

test('all six KeyMod CTAs carry campaign tags and fire exactly once after consent', async ({ page }) => {
  await page.goto(`/keymod/?${campaign}&oppref=private&_gl=keep-until-google-reads`);
  await page.waitForFunction(() => typeof window.__openterfaceAnalytics?.track === 'function');
  await expect(page.locator(ctas)).toHaveCount(6);
  expect(new URL(page.url()).searchParams.get('_gl')).toBe('keep-until-google-reads');
  for (const href of await page.locator(ctas).evaluateAll(links => links.map(link => (link as HTMLAnchorElement).href))) {
    const query = new URL(href).searchParams;
    expect(query.get('utm_source')).toBe('chatgpt');
    expect(query.get('utm_content')).toBe('ad_01');
    expect(query.has('oppref')).toBe(false);
    expect(query.has('_gl')).toBe(false);
  }
  expect(await page.evaluate(() => sessionStorage.getItem('openterface-campaign'))).toBeNull();
  await preventNavigation(page);
  await page.locator('[data-analytics-placement="keymod_hero"]').click();
  expect(await clickEvents(page)).toHaveLength(0);
  await page.locator('#cookie-consent-accept').click();
  const placements = await page.locator(ctas).evaluateAll(links => links.map(link => (link as HTMLElement).dataset.analyticsPlacement));
  for (const placement of placements) await page.locator(`[data-analytics-placement="${placement}"]`).click();
  const events = await clickEvents(page);
  expect(events).toHaveLength(6);
  expect(events.map((event: any) => event.placement)).toEqual(placements);
  for (const event of events) {
    expect(event).toMatchObject({ product: 'keymod', utm_source: 'chatgpt', utm_medium: 'cpc', utm_content: 'ad_01' });
    expect(new URL(event.link_url).searchParams.get('utm_campaign')).toBe('keymod_us_test');
  }
});

test('attribution survives an untagged page and is cleared on consent revocation', async ({ page }) => {
  await page.goto(`/keymod/?${campaign}`);
  await page.locator('#cookie-consent-accept').click();
  await page.goto('/keymod/');
  await expect(page.locator(ctas).first()).toHaveAttribute('href', /utm_source=chatgpt/);
  await page.locator('#cookie-settings').click();
  await page.locator('#cookie-consent-reject').click();
  await expect(page.locator(ctas).first()).toHaveAttribute('href', /utm_source=openterface/);
  expect(await page.evaluate(() => sessionStorage.getItem('openterface-campaign'))).toBeNull();
  await preventNavigation(page);
  await page.locator('[data-analytics-placement="keymod_hero"]').click();
  expect(await clickEvents(page)).toHaveLength(0);
});

test('middle clicks are tracked once; right clicks are not counted as navigation', async ({ page }) => {
  await page.goto(`/keymod/?${campaign}`);
  await page.locator('#cookie-consent-accept').click();
  await preventNavigation(page);
  const hero = page.locator('[data-analytics-placement="keymod_hero"]');
  await hero.dispatchEvent('auxclick', { button: 2 });
  expect(await clickEvents(page)).toHaveLength(0);
  await hero.dispatchEvent('auxclick', { button: 1 });
  expect(await clickEvents(page)).toHaveLength(1);
});

test('scroll thresholds reached before consent can be recorded after acceptance', async ({ page }) => {
  await page.goto('/keymod/');
  await page.waitForFunction(() => typeof window.__openterfaceAnalytics?.track === 'function');
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await expect.poll(() => page.evaluate(() => window.scrollY / (document.documentElement.scrollHeight - innerHeight))).toBeGreaterThan(0.75);
  expect(await page.evaluate(() => sessionStorage.getItem('km-analytics:scroll:25'))).toBeNull();
  await page.locator('#cookie-consent-accept').click();
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('km-analytics:scroll:25'))).toBe('1');
  expect(await page.evaluate(() => ((window as any).dataLayer || []).filter((e: any) => e[1] === 'scroll_depth' && e[2]?.percent === '25').length)).toBe(1);
});

test('production bootstrap queues one consented page view and preserves incoming linker data', async ({ page, baseURL }) => {
  // Serve the built assets under a production-like origin without touching the live site.
  await page.route('https://attribution-test.openterface.test/**', async route => {
    const url = new URL(route.request().url());
    const response = await page.request.get(`${baseURL}${url.pathname}${url.search}`);
    await route.fulfill({ response });
  });
  await page.goto(`https://attribution-test.openterface.test/keymod/?${campaign}&_gl=incoming`);
  await page.waitForFunction(() => typeof window.__openterfaceAnalytics?.track === 'function');
  const countPageViews = () => page.evaluate(() => ((window as any).dataLayer || []).filter((e: any) => e[0] === 'event' && e[1] === 'page_view').length);
  expect(await countPageViews()).toBe(0);
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(1);
  expect(new URL(page.url()).searchParams.get('_gl')).toBe('incoming');
  await page.locator('#cookie-consent-accept').click();
  expect(await countPageViews()).toBe(1);
  await page.locator('#cookie-settings').click();
  await page.locator('#cookie-consent-accept').click();
  expect(await countPageViews()).toBe(1);
  await preventNavigation(page);
  await page.locator('[data-analytics-placement="keymod_hero"]').click();
  expect(await clickEvents(page)).toHaveLength(1);
});
