import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.route('**/*', route => new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
});
async function events(page: import('@playwright/test').Page, name: string) {
  return page.evaluate(name => ((window as any).dataLayer || []).filter((e: any) => e[0] === 'event' && e[1] === name).map((e: any) => e[2]), name);
}
async function stopLinks(page: import('@playwright/test').Page) {
  await page.evaluate(() => document.addEventListener('click', e => {
    if ((e.target as Element).closest('a')) e.preventDefault();
  }, true));
}
for (const [path, product] of [['minikvm', 'minikvm'], ['kvmgo', 'kvm-go'], ['kvmext', 'uconsole-kvm-extension'], ['accessories', 'accessories']]) {
  test(`${path}: consent gating and shared app/docs product context`, async ({ page }) => {
    await page.goto(`/${path}/`);
    await page.waitForFunction(() => !!window.__openterfaceAnalytics?.track);
    await stopLinks(page);
    const app = page.locator('[data-analytics-event="app_click"]').first();
    await app.click();
    expect(await events(page, 'app_click')).toHaveLength(0);
    await page.locator('#cookie-consent-accept').click();
    await app.click();
    expect(await events(page, 'app_click')).toEqual([expect.objectContaining({ product, placement: 'product_hero' })]);
    await page.locator('[data-analytics-event="docs_click"]').first().click();
    expect(await events(page, 'docs_click')).toEqual([expect.objectContaining({ product })]);
  });
}
test('purchase variants and six accessory identifiers remain distinct', async ({ page }) => {
  await page.goto('/kvmext/');
  await page.locator('#cookie-consent-accept').click();
  await stopLinks(page);
  for (const variant of ['extension_only', 'upgrade_bundle']) await page.locator(`[data-analytics-variant="${variant}"]`).click();
  expect((await events(page, 'shop_click')).map((e: any) => e.variant)).toEqual(['extension_only', 'upgrade_bundle']);
  await page.goto('/accessories/');
  await stopLinks(page);
  const links = page.locator('[data-analytics-event="shop_click"][data-analytics-sku]');
  await expect(links).toHaveCount(6);
  for (let i = 0; i < 6; i++) await links.nth(i).click();
  const hits = await events(page, 'shop_click');
  expect(hits).toHaveLength(6);
  expect(new Set(hits.map((e: any) => e.sku)).size).toBe(6);
  expect(hits.every((e: any) => e.product === 'accessories')).toBe(true);
});
test('subscription tracks success only, with product and form context but no personal data', async ({ page }) => {
  let success = false;
  await page.route('https://subscribe.openterface.com/**', route => route.fulfill({ json: { success } }));
  await page.goto('/minikvm/');
  await page.locator('#cookie-consent-accept').click();
  const form = page.locator('#product-subscribe-form-minikvm');
  await form.locator('[name="email"]').fill('tracking-test@example.com');
  await form.locator('button[type="submit"]').click();
  await expect(form.locator('button[type="submit"]')).toBeEnabled();
  expect(await events(page, 'newsletter_subscribe')).toHaveLength(0);
  success = true;
  await form.locator('button[type="submit"]').click();
  await expect.poll(() => events(page, 'newsletter_subscribe')).toHaveLength(1);
  const hits = await events(page, 'newsletter_subscribe');
  expect(hits[0]).toMatchObject({ product: 'minikvm', placement: 'product_page', form_id: 'product-subscribe-form-minikvm' });
  expect(JSON.stringify(hits)).not.toContain('tracking-test');
});
