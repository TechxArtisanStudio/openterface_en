import { test, expect } from '@playwright/test';

const routes = ['/', '/products/', '/minikvm/'];

for (const route of routes) {
  test(`visual: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}

test('home carousel is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Featured products' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
});

test('product page has buy CTA', async ({ page }) => {
  await page.goto('/minikvm/');
  await expect(page.getByRole('link', { name: 'Order NOW' }).first()).toBeVisible();
});
