import { UTM_PARAM_KEYS, getCampaign, crowdSupplyCampaignUrl } from './campaign-attribution';
export { UTM_PARAM_KEYS };

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __openterfaceAnalyticsConfig?: { siteLocale: string; storageKey: string };
    __openterfaceAnalytics?: {
      grant: () => void;
      deny: () => void;
      showBanner: () => void;
      track?: (eventName: string, params?: Record<string, string | undefined>) => boolean;
    };
  }
}

export function hasAnalyticsConsent(storageKey: string): boolean {
  try { return localStorage.getItem(storageKey) === 'granted'; } catch { return false; }
}

function landingCampaign(storageKey: string): Record<string, string> {
  let storage: Storage | undefined;
  try { storage = window.sessionStorage; } catch { /* Storage may be blocked. */ }
  return getCampaign(window.location.search, hasAnalyticsConsent(storageKey), storage);
}

export function trackEvent(
  eventName: string,
  storageKey: string,
  siteLocale: string,
  params: Record<string, string | undefined> = {},
): boolean {
  if (!hasAnalyticsConsent(storageKey)) return false;
  if (typeof window.gtag !== 'function') return false;

  const payload: Record<string, string> = {
    site_locale: siteLocale,
    ...landingCampaign(storageKey),
  };

  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') payload[key] = value;
  }

  window.gtag('event', eventName, payload);
  return true;
}

export function initAnalyticsEvents(siteLocale: string, storageKey: string): void {
  const track = (eventName: string, params?: Record<string, string | undefined>) => {
    return trackEvent(eventName, storageKey, siteLocale, params);
  };

  if (window.__openterfaceAnalytics) {
    window.__openterfaceAnalytics.track = track;
  } else {
    window.__openterfaceAnalytics = {
      grant: () => {},
      deny: () => {},
      showBanner: () => {},
      track,
    };
  }

  // Decorate real hrefs, so keyboard, middle-click and context-menu navigation work too.
  const originalHrefs = new WeakMap<HTMLAnchorElement, string>();
  const decorate = () => {
    const campaign = landingCampaign(storageKey);
    document.querySelectorAll<HTMLAnchorElement>('a[data-analytics-event="crowdsupply_click"]').forEach(link => {
      const original = originalHrefs.get(link) ?? link.href;
      originalHrefs.set(link, original);
      link.href = crowdSupplyCampaignUrl(original, campaign, link.dataset.analyticsProduct);
    });
  };
  decorate();
  window.addEventListener('openterface:consent-change', decorate);
  window.addEventListener('pageshow', decorate);
  document.addEventListener('pointerdown', decorate);
  document.addEventListener('focusin', decorate);
  document.addEventListener('contextmenu', decorate);

  const handleClick = (event: MouseEvent) => {
    if (event.type === 'auxclick' && event.button !== 1) return;
    decorate();
    const target = (event.target as Element | null)?.closest('[data-analytics-event]');
    if (!target || !(target instanceof HTMLElement)) return;

    const eventName = target.dataset.analyticsEvent;
    if (!eventName) return;

    const linkUrl =
      target instanceof HTMLAnchorElement
        ? target.href
        : target.closest('a') instanceof HTMLAnchorElement
          ? (target.closest('a') as HTMLAnchorElement).href
          : undefined;

    track(eventName, {
      product: target.dataset.analyticsProduct,
      link_url: linkUrl,
      placement: target.dataset.analyticsPlacement,
    });
  };
  document.addEventListener('click', handleClick);
  document.addEventListener('auxclick', handleClick);
}
