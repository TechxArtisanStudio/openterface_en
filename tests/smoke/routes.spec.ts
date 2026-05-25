import { test, expect } from '@playwright/test';

test('home page loads and has carousel', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('region', { name: 'Featured products' })).toBeVisible({ timeout: 10000 });
  await expect(page.locator('h1').first()).toBeVisible();
});

test('home page has newsletter subscribe form', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { name: /Get KVM-GO, KeyMod/i })).toBeVisible({ timeout: 10000 });
  const form = page.locator('#home-subscribe-form');
  await expect(form).toBeVisible();
  await expect(form.locator('input[type="email"]')).toBeVisible();
});

test('home page has YouTube video strip with external links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const strip = page.getByRole('region', { name: 'Community videos on YouTube' });
  await expect(strip).toBeVisible({ timeout: 10000 });
  const youtubeLinks = strip.locator('a[href*="youtube.com/watch"]');
  await expect(youtubeLinks.first()).toBeVisible();
  expect(await youtubeLinks.count()).toBeGreaterThanOrEqual(5);
});

test('videos catalog page loads with filter controls and video grid', async ({ page }) => {
  await page.goto('/videos/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: /YouTube Videos/i })).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByRole('region', { name: 'Video catalog filters' })).toBeVisible();
  const cards = page.locator('.video-catalog-card a[href*="youtube.com/watch"]');
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThanOrEqual(10);
});

test('product landing has single h1', async ({ page }) => {
  await page.goto('/products/minikvm/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});

test('all product routes return 200', async ({ page }) => {
  for (const slug of ['keymod', 'kvm-go', 'minikvm', 'uconsole-kvm-extension', 'accessories']) {
    const response = await page.goto(`/products/${slug}/`, { waitUntil: 'commit', timeout: 15000 });
    expect(response?.status()).toBe(200);
  }
});
