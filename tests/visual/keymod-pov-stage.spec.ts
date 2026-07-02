import { test, expect } from '@playwright/test';
import { KEYMOD_POV_USER_RESUME_MS } from '../../src/scripts/keymod-mode-cycle';

test.describe('KeyMod POV Stage', () => {
  test('renders tabs, switches scene, no mobile overflow', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'commit', timeout: 90_000 });
    await page.waitForSelector('#km-pov-stage', { timeout: 30_000 });

    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await expect(stage.locator('[data-pov-tab="terminal"]')).toBeVisible();
    await expect(stage.locator('[data-pov-tab="ai-chat"]')).toBeVisible();

    await stage.locator('[data-pov-tab="keyboard"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'keyboard', { timeout: 5000 });
    await expect(stage.locator('[data-pov-tab="keyboard"]')).toHaveAttribute('aria-selected', 'true');

    await stage.locator('[data-pov-tab="touchpad"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'touchpad', { timeout: 5000 });
    await expect(stage.locator('[data-pov-tab="touchpad"]')).toHaveAttribute('aria-selected', 'true');

    await stage.locator('[data-pov-tab="km-pro"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'km-pro', { timeout: 5000 });
    await expect(stage.locator('[data-pov-tab="km-pro"]')).toHaveAttribute('aria-selected', 'true');

    await page.setViewportSize({ width: 375, height: 812 });
    await stage.scrollIntoViewIfNeeded();
    const overflow = await stage.evaluate((el) => {
      const artboard = el.querySelector('.km-pov-stage__artboard');
      if (!artboard) return true;
      const r = artboard.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      return r.width > vw + 1 || r.left < -1 || r.right > vw + 1;
    });
    expect(overflow).toBe(false);
  });

  test('auto-advances scene after cycle interval', async ({ page }) => {
    test.slow();
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });

    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    const initialScene = await stage.getAttribute('data-active-scene');
    expect(initialScene).toBeTruthy();

    await page.waitForTimeout(3600);
    await expect(stage).not.toHaveAttribute('data-active-scene', initialScene!, { timeout: 5000 });
  });

  test('autoplay cycles through terminal and agent tabs', async ({ page }) => {
    test.slow();
    test.setTimeout(120_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });

    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });

    await stage.locator('[data-pov-tab="terminal"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'terminal', { timeout: 5000 });

    await stage.locator('[data-pov-tab="ai-chat"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'ai-chat', { timeout: 5000 });

    await stage.locator('[data-pov-tab="keyboard"]').click();
    await page.waitForTimeout(KEYMOD_POV_USER_RESUME_MS + 500);

    const order = await stage.evaluate(() =>
      [...document.querySelectorAll<HTMLButtonElement>('[data-pov-tab]')].map((tab) => tab.dataset.povTab),
    );
    expect(order).toContain('terminal');
    expect(order).toContain('ai-chat');

    let sawTerminal = false;
    let sawAiChat = false;
    for (let i = 0; i < order.length + 1; i += 1) {
      await page.waitForTimeout(3600);
      const scene = await stage.getAttribute('data-active-scene');
      if (scene === 'terminal') sawTerminal = true;
      if (scene === 'ai-chat') sawAiChat = true;
    }
    expect(sawTerminal).toBe(true);
    expect(sawAiChat).toBe(true);
  });

  test('POV stage visual snapshot at 1280', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'networkidle' });
    await page.setViewportSize({ width: 1280, height: 900 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="keyboard"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'keyboard', { timeout: 5000 });
    await expect(stage).toHaveScreenshot('keymod-pov-stage-keyboard-1280.png', {
      maxDiffPixelRatio: 0.03,
    });
  });

  test('POV compose-send portrait phone at 1280', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });
    await page.setViewportSize({ width: 1280, height: 900 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="compose-send"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'compose-send', { timeout: 5000 });
    await expect(
      stage.locator('[data-pov-scene="compose-send"][data-phone-layout="portrait"]'),
    ).toHaveClass(/km-pov-stage__layer--active/);
    await expect(stage).toHaveScreenshot('keymod-pov-stage-compose-send-1280.png', {
      maxDiffPixelRatio: 0.03,
    });
  });

  test('POV touchpad portrait phone at 1280', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });
    await page.setViewportSize({ width: 1280, height: 900 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="touchpad"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'touchpad', { timeout: 5000 });
    await expect(stage).toHaveScreenshot('keymod-pov-stage-touchpad-1280.png', {
      maxDiffPixelRatio: 0.03,
    });
  });

  test('POV terminal portrait phone layout at 1280', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });
    await page.setViewportSize({ width: 1280, height: 900 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="terminal"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'terminal', { timeout: 5000 });
    await expect(
      stage.locator('[data-pov-scene="terminal"][data-phone-layout="portrait"]'),
    ).toHaveClass(/km-pov-stage__layer--active/);
  });

  test('POV keyboard mobile snapshot at 375', async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'commit', timeout: 90_000 });
    await page.waitForSelector('#km-pov-stage', { timeout: 30_000 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="keyboard"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'keyboard', { timeout: 5000 });
    await expect(stage).toHaveScreenshot('keymod-pov-stage-keyboard-375.png', {
      maxDiffPixelRatio: 0.04,
    });
  });

  test('POV touchpad portrait phone at 375', async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'commit', timeout: 90_000 });
    await page.waitForSelector('#km-pov-stage', { timeout: 30_000 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="touchpad"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'touchpad', { timeout: 5000 });
    await expect(
      stage.locator('[data-pov-scene="touchpad"][data-phone-layout="portrait"]'),
    ).toHaveClass(/km-pov-stage__layer--active/);
    await expect(stage).toHaveScreenshot('keymod-pov-stage-touchpad-375.png', {
      maxDiffPixelRatio: 0.04,
    });
  });

  test('POV compose-send portrait phone at 375', async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'commit', timeout: 90_000 });
    await page.waitForSelector('#km-pov-stage', { timeout: 30_000 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="compose-send"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'compose-send', { timeout: 5000 });
    await expect(
      stage.locator('[data-pov-scene="compose-send"][data-phone-layout="portrait"]'),
    ).toHaveClass(/km-pov-stage__layer--active/);
    await expect(stage).toHaveScreenshot('keymod-pov-stage-compose-send-375.png', {
      maxDiffPixelRatio: 0.04,
    });
  });
});
