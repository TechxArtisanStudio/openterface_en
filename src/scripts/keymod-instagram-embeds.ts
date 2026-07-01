declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } };
  }
}

const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';
const EMBED_TIMEOUT_MS = 6000;
const EMBED_POLL_MS = 250;

function getSocialProofRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-km-social-proof]');
}

function embedIframesReady(root: HTMLElement): boolean {
  return root.querySelectorAll('.instagram-media iframe').length > 0;
}

function showTextFallback(root: HTMLElement): void {
  const fallback = root.querySelector<HTMLElement>('[data-km-social-fallback]');
  const embeds = root.querySelector<HTMLElement>('[data-km-social-embeds]');
  if (!fallback || !embeds) return;

  root.classList.add('km-social-proof--fallback-only');
  fallback.hidden = false;
  embeds.hidden = true;
}

function waitForEmbedIframes(root: HTMLElement, deadline: number): void {
  if (embedIframesReady(root)) {
    window.instgrm?.Embeds?.process();
    return;
  }

  if (Date.now() >= deadline) {
    showTextFallback(root);
    return;
  }

  window.setTimeout(() => waitForEmbedIframes(root, deadline), EMBED_POLL_MS);
}

function loadInstagramEmbedScript(): Promise<void> {
  if (window.instgrm?.Embeds) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('embed.js failed')), { once: true });
      if (window.instgrm?.Embeds) resolve();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = EMBED_SCRIPT;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('embed.js failed')), { once: true });
    document.head.appendChild(script);
  });
}

export function initKeymodInstagramEmbeds(): void {
  const root = getSocialProofRoot();
  if (!root || root.classList.contains('km-social-proof--fallback-only')) return;

  loadInstagramEmbedScript()
    .then(() => {
      window.instgrm?.Embeds?.process();
      waitForEmbedIframes(root, Date.now() + EMBED_TIMEOUT_MS);
    })
    .catch(() => {
      showTextFallback(root);
    });
}

function boot(): void {
  initKeymodInstagramEmbeds();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodInstagramEmbeds);
