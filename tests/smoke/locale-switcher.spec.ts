import { test, expect } from '@playwright/test';

test('locale switch preserves UTM params but not _gl in href', async ({ page }) => {
  await page.goto(
    '/?utm_source=test&utm_campaign=launch&_gl=1*abc*_ga*xyz&product=kvm-go',
    { waitUntil: 'domcontentloaded' },
  );

  const deLink = page.locator('a[data-locale-switch][href*="de.openterface.com"]').first();
  await expect(deLink).not.toHaveCount(0);

  const href = await deLink.getAttribute('href');
  expect(href).toContain('utm_source=test');
  expect(href).toContain('utm_campaign=launch');
  expect(href).toContain('product=kvm-go');
  expect(href).not.toContain('_gl=');
  expect(href).not.toContain('_ga');
});

test('_gl is removed from address bar after page load', async ({ page }) => {
  await page.goto('/?_gl=1*abc*_ga*xyz', { waitUntil: 'domcontentloaded' });
  await expect.poll(() => new URL(page.url()).searchParams.has('_gl')).toBe(false);
});

test('gtag config uses shared cookie domain', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const hasCookieDomain = await page.evaluate(() => {
    const dl = window.dataLayer || [];
    return dl.some(
      (e) =>
        e?.[0] === 'config' &&
        e?.[2]?.cookie_domain === '.openterface.com',
    );
  });
  expect(hasCookieDomain).toBe(true);
});
