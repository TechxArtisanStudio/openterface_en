/** Campaign labels only: never forward click IDs or arbitrary query parameters to a vendor. */
export const UTM_PARAM_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id',
] as const;

export const CAMPAIGN_STORAGE_KEY = 'openterface-campaign';
const CAMPAIGN_IDLE_MS = 30 * 60 * 1000;

export function readCampaign(search: string): Record<string, string> {
  const query = new URLSearchParams(search);
  return Object.fromEntries(UTM_PARAM_KEYS.flatMap(key => {
    const value = query.get(key);
    return value ? [[key, value]] : [];
  }));
}

/** Last explicitly tagged visit, retained in this tab after consent for 30 minutes of inactivity.
 * This is outbound-link attribution, not a replacement for GA4's native session attribution.
 */
export function getCampaign(search: string, consent: boolean, storage?: Storage, now = Date.now()): Record<string, string> {
  const current = readCampaign(search);
  let campaign = current;
  try {
    if (!consent) {
      storage?.removeItem(CAMPAIGN_STORAGE_KEY);
      return current;
    }
    if (!Object.keys(current).length) {
      const saved = JSON.parse(storage?.getItem(CAMPAIGN_STORAGE_KEY) || 'null');
      if (saved && typeof saved.updatedAt === 'number' && now >= saved.updatedAt && now - saved.updatedAt < CAMPAIGN_IDLE_MS) {
        // Read only supported string fields, even if storage was malformed or edited.
        campaign = Object.fromEntries(UTM_PARAM_KEYS.flatMap(key =>
          typeof saved.campaign?.[key] === 'string' && saved.campaign[key] ? [[key, saved.campaign[key]]] : [],
        ));
      }
    }
    if (Object.keys(campaign).length) {
      storage?.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify({ campaign, updatedAt: now }));
    } else {
      storage?.removeItem(CAMPAIGN_STORAGE_KEY);
    }
  } catch {
    // Blocked/unavailable storage must not break navigation or event tracking.
  }
  return campaign;
}

export function crowdSupplyCampaignUrl(href: string, campaign: Record<string, string>, product?: string): string {
  const url = new URL(href);
  if (url.protocol !== 'https:' || !['crowdsupply.com', 'www.crowdsupply.com'].includes(url.hostname)) return href;
  // Leave explicitly tagged destinations intact when there is no incoming campaign.
  if (!Object.keys(campaign).length && UTM_PARAM_KEYS.some(key => url.searchParams.has(key))) return href;
  for (const key of UTM_PARAM_KEYS) url.searchParams.delete(key);
  const labels = Object.keys(campaign).length ? campaign : {
    utm_source: 'openterface', utm_medium: 'referral', utm_campaign: product || 'website',
  };
  for (const key of UTM_PARAM_KEYS) {
    if (labels[key]) url.searchParams.set(key, labels[key]);
  }
  return url.href;
}
