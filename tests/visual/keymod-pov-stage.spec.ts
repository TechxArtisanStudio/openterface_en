import { test, expect } from '@playwright/test';

test.describe('KeyMod POV Stage', () => {
  test('renders tabs, switches scene, no mobile overflow', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'networkidle' });

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
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
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
    await page.waitForTimeout(11_000);

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

  test('POV compose-send portrait hands and phone at 1280', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });
    await page.setViewportSize({ width: 1280, height: 900 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="compose-send"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'compose-send', { timeout: 5000 });
    await expect(stage.locator('[data-pov-hands="portrait"]')).toBeVisible();
    await expect(stage.locator('[data-pov-hands="default"]')).toBeHidden();
    await expect(stage).toHaveScreenshot('keymod-pov-stage-compose-send-1280.png', {
      maxDiffPixelRatio: 0.03,
    });
  });

  test('POV touchpad portrait hands at 1280', async ({ page }) => {
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

  test('POV touchpad portrait phone slot geometry', async ({ page }) => {
    test.setTimeout(60_000);
    await page.goto('/preview/keymod-rebirth/#modes-theater', { waitUntil: 'load' });
    await page.setViewportSize({ width: 1280, height: 900 });
    const stage = page.locator('#km-pov-stage');
    await expect(stage).toBeVisible({ timeout: 20_000 });
    await stage.locator('[data-pov-tab="touchpad"]').click();
    await expect(stage).toHaveAttribute('data-active-scene', 'touchpad', { timeout: 5000 });

    const geometry = await page.evaluate(() => {
      const artboard = document.querySelector('.km-pov-stage__artboard')!;
      const ab = artboard.getBoundingClientRect();
      const hands = document.querySelector<HTMLElement>('[data-pov-hands="portrait"]')!;
      const phone = document.querySelector<HTMLElement>('[data-pov-scene="touchpad"][data-pov-slot="phone"]')!;
      const hb = hands.getBoundingClientRect();
      const pb = phone.getBoundingClientRect();
      const aspect = pb.width / pb.height;
      return {
        handsAspect: hb.width / hb.height,
        phoneAspect: aspect,
        handsWidthRatio: hb.width / ab.width,
        phoneInsideHands:
          pb.left >= hb.left - 2 &&
          pb.right <= hb.right + 2 &&
          pb.top >= hb.top - 2 &&
          pb.bottom <= hb.bottom + 2,
      };
    });

    expect(geometry.handsAspect).toBeGreaterThan(0.75);
    expect(geometry.handsAspect).toBeLessThan(0.85);
    expect(geometry.phoneAspect).toBeGreaterThan(0.42);
    expect(geometry.phoneAspect).toBeLessThan(0.52);
    expect(geometry.phoneInsideHands).toBe(true);
    expect(geometry.handsWidthRatio).toBeGreaterThan(0.22);
  });
});
