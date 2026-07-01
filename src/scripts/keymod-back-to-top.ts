let btnEl: HTMLButtonElement | null = null;
let cookieBannerEl: HTMLElement | null = null;
let rafId: number | null = null;
let boundOnScroll: (() => void) | null = null;
let boundOnClick: (() => void) | null = null;
let cookieObserver: MutationObserver | null = null;

const SCROLL_THRESHOLD_RATIO = 0.75;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getScrollThreshold(): number {
  return window.innerHeight * SCROLL_THRESHOLD_RATIO;
}

function isCookieBannerVisible(): boolean {
  if (!cookieBannerEl) return false;
  return !cookieBannerEl.hidden && cookieBannerEl.getAttribute('aria-hidden') !== 'true';
}

function updateCookieOffset(): void {
  if (!btnEl) return;
  if (isCookieBannerVisible()) {
    btnEl.dataset.cookieVisible = '';
  } else {
    delete btnEl.dataset.cookieVisible;
  }
}

function updateVisibility(): void {
  if (!btnEl) return;

  const shouldShow = window.scrollY > getScrollThreshold();

  if (shouldShow) {
    btnEl.hidden = false;
    btnEl.dataset.visible = '';
  } else {
    delete btnEl.dataset.visible;
    btnEl.hidden = true;
  }

  updateCookieOffset();
}

function scheduleUpdate(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    updateVisibility();
  });
}

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

function teardown(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (boundOnScroll) {
    window.removeEventListener('scroll', boundOnScroll);
    boundOnScroll = null;
  }
  if (boundOnClick && btnEl) {
    btnEl.removeEventListener('click', boundOnClick);
    boundOnClick = null;
  }
  if (cookieObserver) {
    cookieObserver.disconnect();
    cookieObserver = null;
  }
  btnEl = null;
  cookieBannerEl = null;
}

export function initKeymodBackToTop(): void {
  teardown();

  const btn = document.querySelector<HTMLButtonElement>('.km-back-to-top');
  if (!btn) return;

  btnEl = btn;
  cookieBannerEl = document.getElementById('cookie-consent-banner');

  boundOnScroll = scheduleUpdate;
  boundOnClick = scrollToTop;

  window.addEventListener('scroll', boundOnScroll, { passive: true });
  btnEl.addEventListener('click', boundOnClick);

  if (cookieBannerEl) {
    cookieObserver = new MutationObserver(updateCookieOffset);
    cookieObserver.observe(cookieBannerEl, {
      attributes: true,
      attributeFilter: ['hidden', 'aria-hidden'],
    });
  }

  updateVisibility();
}
