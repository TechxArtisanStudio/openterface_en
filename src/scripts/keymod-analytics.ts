/** Session-scoped GA4 helpers for /keymod/ landing engagement. */

const SESSION_PREFIX = 'km-analytics:';

// Mark an interaction as sent only when the consent-gated tracker actually queues it.
const sentInMemory = new Set<string>();
export function trackKeymodOnce(eventName: string, sessionKey: string, params: Record<string, string>): boolean {
  const key = `${SESSION_PREFIX}${sessionKey}`;
  if (sentInMemory.has(key)) return true;
  try { if (sessionStorage.getItem(key)) return true; } catch { /* Use memory instead. */ }
  if (!window.__openterfaceAnalytics?.track?.(eventName, params)) return false;
  sentInMemory.add(key);
  try { sessionStorage.setItem(key, '1'); } catch { /* Use memory instead. */ }
  return true;
}

export function trackKeymodZoneView(zone: string): void {
  trackKeymodOnce('keymod_zone_view', `zone:${zone}`, { zone, product: 'keymod' });
}

export function trackKeymodTheaterNav(zone: string): void {
  trackKeymodOnce('keymod_theater_nav', `nav:${zone}`, { zone, product: 'keymod' });
}

export function trackKeymodPovTab(scene: string): void {
  trackKeymodOnce('keymod_pov_tab', `pov:${scene}`, { scene, product: 'keymod' });
}

export function initKeymodScrollDepth(): void {
  if (!document.body.classList.contains('keymod-landing')) return;

  const thresholds = [25, 50, 75, 100];
  let maxReported = 0;

  const report = (): void => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    if (height <= 0) return;

    const percent = Math.min(100, Math.round((scrollTop / height) * 100));
    for (const threshold of thresholds) {
      if (percent >= threshold && threshold > maxReported) {
        const sent = trackKeymodOnce('scroll_depth', `scroll:${threshold}`, {
          percent: String(threshold),
          product: 'keymod',
        });
        if (sent) maxReported = threshold;
      }
    }
  };

  window.addEventListener('scroll', report, { passive: true });
  window.addEventListener('openterface:consent-change', report);
  report();
}

export function initKeymodZoneObservers(): void {
  const zones = document.querySelectorAll<HTMLElement>('[data-km-zone]');
  if (zones.length === 0) return;

  const visibleZones = new Set<string>();
  window.addEventListener('openterface:consent-change', () => {
    visibleZones.forEach(trackKeymodZoneView);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const zone = entry.target.getAttribute('data-km-zone');
        if (!zone) continue;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          visibleZones.add(zone);
          trackKeymodZoneView(zone);
        } else {
          visibleZones.delete(zone);
        }
      }
    },
    { threshold: 0.35 },
  );

  zones.forEach((el) => observer.observe(el));
}
