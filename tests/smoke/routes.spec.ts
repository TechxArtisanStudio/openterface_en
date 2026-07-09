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

test('kvm-go product page has product subscribe form', async ({ page }) => {
  await page.goto('/kvmgo/', { waitUntil: 'commit', timeout: 15000 });
  const form = page.locator('#product-subscribe-form-kvm-go');
  await expect(form).toBeVisible({ timeout: 10000 });
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
  await expect(page.getByRole('heading', { level: 2, name: 'Videos' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'In the press' })).toBeVisible();
  await expect(page.locator('.media-catalog-card--coverage')).toHaveCount(10);
  await expect(page.locator('.media-catalog-card--post').first()).toBeVisible();
});

test('media hub format=coverage filter shows press items only', async ({ page }) => {
  await page.goto('/media/?format=coverage', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('[data-format-chip="coverage"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-media-section="coverage"] .media-catalog-card--coverage')).toHaveCount(10);
  await expect(page.locator('[data-media-section="long"]')).toBeHidden();
  await expect(page.locator('[data-media-section="short"]')).toBeHidden();
  await expect(page.locator('.media-catalog-card--video')).toHaveCount(0);
});

test('media hub format=short filter hides other sections', async ({ page }) => {
  await page.goto('/media/?format=short', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Media' })).toBeVisible();
  await expect(page.locator('[data-format-chip="short"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-media-section="long"]')).toBeHidden();
  await expect(page.locator('[data-media-section="coverage"]')).toBeHidden();
});

test('media hub product=minikvm filter loads', async ({ page }) => {
  await page.goto('/media/?product=minikvm', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1, name: 'Media' })).toBeVisible();
  await expect(page.locator('[data-filter-product]')).toHaveValue('minikvm');
  const visible = page.locator('.media-catalog-card--video');
  expect(await visible.count()).toBeGreaterThanOrEqual(1);
});

test('media hub product=kvm-go filter shows kvm-go press and posts', async ({ page }) => {
  await page.goto('/media/?product=kvm-go', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('[data-filter-product]')).toHaveValue('kvm-go');
  await expect(page.locator('[data-media-section="coverage"] .media-catalog-card--coverage')).toHaveCount(4);
  await expect(page.locator('[data-media-section="post"] .media-catalog-card--post')).toHaveCount(5);
});

test('media hub format=post shows post cards with preview images', async ({ page }) => {
  await page.goto('/media/?format=post', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('[data-format-chip="post"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-media-section="post"] .media-catalog-card--post')).toHaveCount(27);
  await expect(
    page.locator('[data-media-section="post"] .media-catalog-card--post .media-catalog-thumb img').first(),
  ).toBeVisible();
});

test('media hub legacy format=testimonial URL maps to Posts filter', async ({ page }) => {
  await page.goto('/media/?format=testimonial', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('[data-format-chip="post"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-media-section="post"] .media-catalog-card--post')).toHaveCount(27);
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
  await expect(page.getByRole('link', { name: 'Pre-launch' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'KeyCmd app' }).first()).toBeVisible();
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
  await expect(page.getByRole('heading', { name: 'Openterface uConsole KVM Extension Module v2' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Openterface Accessories' })).toBeVisible();
});

test('app hub lists downloads and flat app pages serve content', async ({ page }) => {
  await page.goto('/apps/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 2, name: 'Openterface KVM' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'iPadOS' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Web' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'KeyCmd' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Installer/i }).first()).toBeVisible();

  await page.goto('/kvm/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/kvm\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Openterface KVM' })).toBeVisible();

  await page.goto('/keycmd/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/keycmd\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'KeyCmd' })).toBeVisible();
});

test('home page App CTA links to /kvm/', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('link', { name: 'Download Openterface App' })).toHaveAttribute('href', '/kvm/');
});

test('/legacy /app/ redirects to /apps/', async ({ page }) => {
  await page.goto('/app/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/apps\/$/);
});

test('/legacy /videos/ redirects to /media/', async ({ page }) => {
  await page.goto('/videos/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/media\/$/);
});

test('/support/appointment redirects to Google Calendar booking', async ({ request }) => {
  const response = await request.get('/support/appointment/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toMatch(/calendar\.app\.google/);
  expect(html).toMatch(/http-equiv="refresh"/);
});

test('ecosystem header shows unified nav items', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const header = page.locator('header');
  for (const label of ['Products', 'Apps', 'Docs', 'Media', 'News', 'Forum']) {
    await expect(header).toContainText(label);
  }
});

test('header Forum link points to forum.openterface.com with New badge', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const forumLink = page.locator('nav[aria-label="Main navigation"] a.site-header__nav-link', { hasText: 'Forum' });
  await expect(forumLink).toHaveAttribute('href', /forum\.openterface\.com/);
  await expect(forumLink).toHaveAttribute('target', '_blank');
  await expect(page.locator('nav[aria-label="Main navigation"] .site-header__nav-badge', { hasText: 'New' })).toBeVisible();
});

test('footer shows social channel icon links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const social = page.locator('nav.footer-social');
  await expect(social).toBeVisible();
  await expect(social.getByRole('link', { name: 'Discord' })).toHaveAttribute('href', /discord\.gg/);
  await expect(social.getByRole('link', { name: 'YouTube' })).toHaveAttribute('href', /youtube\.com/);
});

test('/community/ redirects to forum', async ({ request }) => {
  const response = await request.get('/community/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toMatch(/forum\.openterface\.com/);
  expect(html).toMatch(/http-equiv="refresh"/);
});

test('products mega-menu opens and links to flat product pages', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const trigger = page.locator('nav[aria-label="Main navigation"] .products-mega__trigger');
  await trigger.click();
  const panel = page.locator('#products-mega-panel');
  await expect(panel).toBeVisible({ timeout: 5000 });
  await expect(panel.getByRole('link', { name: /Openterface KeyMod Series/i })).toHaveAttribute('href', '/keymod/');
  await expect(panel.getByRole('link', { name: /Openterface KVM-GO Series/i })).toHaveAttribute('href', '/kvmgo/');
});

test('apps mega-menu opens with curated tiles and no inner scroll', async ({ page }) => {
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const trigger = page.locator('nav[aria-label="Main navigation"] .apps-mega__trigger');
  await trigger.click();
  const panel = page.locator('#apps-mega-panel');
  await expect(panel).toBeVisible({ timeout: 5000 });
  await expect(panel.getByRole('link', { name: 'All downloads →' }).first()).toHaveAttribute('href', '/kvm/');
  await expect(panel.getByRole('link', { name: 'All downloads →' }).nth(1)).toHaveAttribute('href', '/keycmd/');
  await expect(panel.getByRole('link', { name: 'Installer' }).first()).toHaveAttribute('href', /github\.com/);
  await expect(panel.getByRole('link', { name: 'All Linux packages' })).toHaveAttribute('href', '/kvm/#linux');
  await expect(panel.getByRole('link', { name: 'Beta APK' })).toHaveAttribute('href', /github\.com|openterface/);

  const noInnerScroll = await page.evaluate(() => {
    const columns = document.querySelector('.apps-mega__columns');
    if (!columns) return false;
    const style = window.getComputedStyle(columns);
    return style.overflowY !== 'auto' && style.overflowY !== 'scroll';
  });
  expect(noInnerScroll).toBe(true);
});

test('/product/ redirects to /products/', async ({ page }) => {
  await page.goto('/product/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page).toHaveURL(/\/products\/$/);
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
  for (const path of ['/products/', '/minikvm/', '/kvmgo/', '/keymod/', '/kvmext/', '/accessories/', '/apps/', '/kvm/', '/keycmd/', '/media/']) {
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
