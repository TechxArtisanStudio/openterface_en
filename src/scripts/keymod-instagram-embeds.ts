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
  /* embed.js loads async — retry once it arrives */
  if (!window.instgrm) {
    window.addEventListener('load', initKeymodInstagramEmbeds, { once: true });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodInstagramEmbeds);
