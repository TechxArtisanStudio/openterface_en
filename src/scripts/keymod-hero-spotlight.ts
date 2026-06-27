const CYCLE_MS = 2500;
const DRAW_MS = 600;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initKeymodHeroSpotlight(): void {
  const rail = document.querySelector<HTMLElement>('[data-km-hero-rail]');
  if (!rail) return;

  const stations = [...rail.querySelectorAll<HTMLElement>('[data-km-rail-station]')];
  if (stations.length === 0) return;

  let activeIndex = 0;
  let cycleTimer: ReturnType<typeof setInterval> | null = null;
  let drawTimer: ReturnType<typeof setTimeout> | null = null;

  const setActive = (index: number): void => {
    activeIndex = index % stations.length;
    rail.dataset.activeIndex = String(activeIndex);
    stations.forEach((station, i) => {
      station.dataset.active = i === activeIndex ? 'true' : 'false';
    });
  };

  const stopCycle = (): void => {
    if (cycleTimer !== null) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  };

  const startCycle = (): void => {
    if (prefersReducedMotion() || cycleTimer !== null) return;
    cycleTimer = setInterval(() => {
      setActive(activeIndex + 1);
    }, CYCLE_MS);
  };

  const onUserInteract = (): void => {
    rail.dataset.userPaused = 'true';
    stopCycle();
  };

  rail.addEventListener('pointerdown', onUserInteract, { passive: true });
  rail.addEventListener('focusin', onUserInteract);

  if (prefersReducedMotion()) {
    rail.dataset.motion = 'reduced';
    setActive(0);
    stations.forEach((station) => {
      station.dataset.active = 'true';
    });
    return;
  }

  rail.dataset.motion = 'full';
  setActive(0);

  drawTimer = setTimeout(() => {
    rail.dataset.drawn = 'true';
    startCycle();
  }, DRAW_MS);

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotionChange = (): void => {
    if (motionQuery.matches) {
      if (drawTimer !== null) clearTimeout(drawTimer);
      stopCycle();
      rail.dataset.motion = 'reduced';
      stations.forEach((station) => {
        station.dataset.active = 'true';
      });
    }
  };
  motionQuery.addEventListener('change', onMotionChange);
}

document.addEventListener('astro:page-load', initKeymodHeroSpotlight);
