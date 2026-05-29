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

test('media hub has legacy press and post content (no samples)', async ({ page }) => {
  await page.goto('/media/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Media' })).toBeVisible();
  await expect(page.locator('.media-catalog-tag--sample')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 2, name: 'In the press' })).toBeVisible();
  await expect(page.locator('.media-catalog-card--coverage').first()).toBeVisible();
  await expect(page.locator('.media-catalog-card--post').first()).toBeVisible();
});

test('media hub format=coverage filter shows press items', async ({ page }) => {
  await page.goto('/media/?format=coverage', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('[data-format-chip="coverage"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.media-catalog-card--coverage')).toHaveCount(6);
  await expect(page.locator('.media-catalog-card--video')).toHaveCount(0);
});

test('media hub format=short filter loads', async ({ page }) => {
  await page.goto('/media/?format=short', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Media' })).toBeVisible();
  await expect(page.locator('[data-format-chip="short"]')).toHaveAttribute('aria-pressed', 'true');
});

test('media hub product=minikvm filter loads', async ({ page }) => {
  await page.goto('/media/?product=minikvm', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Media' })).toBeVisible();
  await expect(page.locator('[data-filter-product]')).toHaveValue('minikvm');
  const visible = page.locator('.media-catalog-card--video');
  expect(await visible.count()).toBeGreaterThanOrEqual(1);
});

test('product landing has single h1', async ({ page }) => {
  await page.goto('/minikvm/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});

test('kvmgo landing has single h1 and pre-order CTA', async ({ page }) => {
  await page.goto('/kvmgo/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Pre-Order NOW' }).first()).toBeVisible();
});

test('keymod landing has single h1 and Crowd Supply CTA', async ({ page }) => {
  await page.goto('/keymod/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Support NOW' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /KeyCmd app hub/i })).toBeVisible();
});

test('kvmext landing has single h1 and Order NOW CTA', async ({ page }) => {
  await page.goto('/kvmext/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Order NOW' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /View certificate on OSHWA/i })).toBeVisible();
});

test('accessories landing has single h1 and SKU grid', async ({ page }) => {
  await page.goto('/accessories/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Shop NOW' }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Shop by SKU' })).toBeVisible();
  await expect(page.getByRole('article').filter({ hasText: 'VGA to HDMI Converter Cable' })).toBeVisible();
});

test('products hub lists all five product lines', async ({ page }) => {
  await page.goto('/products/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { name: 'Openterface KeyMod Series' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Openterface KVM-GO Series' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Openterface Mini-KVM' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Openterface KVM Extension for uConsole' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Openterface Accessories' })).toBeVisible();
});

test('app hub and subpages load with expected CTAs', async ({ page }) => {
  await page.goto('/apps/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Openterface Apps' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: /Explore KVM Control/i })).toBeVisible();

  await page.goto('/kvm/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'KVM Control' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Download on docs' }).first()).toBeVisible();

  await page.goto('/keycmd/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'KeyCmd' })).toHaveCount(1);
  await expect(page.getByRole('link', { name: 'Download Android beta APK' })).toBeVisible();
});

test('home page App CTA links to /apps/', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('link', { name: 'Download Openterface App' })).toHaveAttribute('href', '/apps/');
});

test('/legacy /app/ redirects to /apps/', async ({ page }) => {
  await page.goto('/app/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/apps\/$/);
});

test('/legacy /videos/ redirects to /media/', async ({ page }) => {
  await page.goto('/videos/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/media\/$/);
});

test('ecosystem header shows unified nav items', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const header = page.locator('header');
  for (const label of ['Products', 'Apps', 'Docs', 'Media', 'News', 'Community']) {
    await expect(header).toContainText(label);
  }
});
test('legacy /products/keymod/ redirects to /keymod/', async ({ page }) => {
  await page.goto('/products/keymod/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/keymod\/$/);
});

test('legacy /products/minikvm/ redirects to /minikvm/', async ({ page }) => {
  await page.goto('/products/minikvm/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/minikvm\/$/);
});

test('/use-cases/ redirects to /products/', async ({ page }) => {
  await page.goto('/use-cases/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/products\/$/);
});

test('products hub and flat product routes return 200', async ({ page }) => {
  for (const path of ['/products/', '/minikvm/', '/kvmgo/', '/keymod/', '/kvmext/', '/accessories/', '/apps/', '/media/', '/community/', '/kvm/', '/keycmd/']) {
    const response = await page.goto(path, { waitUntil: 'commit', timeout: 15000 });
    expect(response?.status()).toBe(200);
  }
});

test('legacy nested product URLs redirect to flat paths', async ({ page }) => {
  const redirects: [string, RegExp][] = [
    ['/products/keymod/', /\/keymod\/$/],
    ['/products/kvm-go/', /\/kvmgo\/$/],
    ['/products/uconsole-kvm-extension/', /\/kvmext\/$/],
    ['/products/accessories/', /\/accessories\/$/],
  ];
  for (const [from, toPattern] of redirects) {
    await page.goto(from, { waitUntil: 'commit', timeout: 15000 });
    await expect(page).toHaveURL(toPattern);
  }
});
