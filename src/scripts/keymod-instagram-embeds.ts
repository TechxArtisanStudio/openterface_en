declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } };
  }
}

export function initKeymodInstagramEmbeds(): void {
  window.instgrm?.Embeds?.process();
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
