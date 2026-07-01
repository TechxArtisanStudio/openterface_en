const AUTO_DELAY_MS = 3500;
const SEND_DURATION_MS = 10000;
const COMPLETE_HOLD_MS = 2500;
const PROGRESS_MIN_UNITS = 56;
const INTERSECTION_THRESHOLD = 0.35;

type FlowState = 'idle' | 'countdown' | 'sending' | 'complete';

let rootEl: HTMLElement | null = null;
let demoText = '';
let progressSuffix = 'left';
let autoTimer: number | null = null;
let completeTimer: number | null = null;
let sendStartMs = 0;
let rafId: number | null = null;
let observer: IntersectionObserver | null = null;
let inView = false;
let state: FlowState = 'idle';
let reducedMotion = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function q<T extends Element>(sel: string): T | null {
  return rootEl?.querySelector<T>(sel) ?? null;
}

function clearTimers(): void {
  if (autoTimer !== null) {
    window.clearTimeout(autoTimer);
    autoTimer = null;
  }
  if (completeTimer !== null) {
    window.clearTimeout(completeTimer);
    completeTimer = null;
  }
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function totalUnits(): number {
  return demoText.length;
}

function setState(next: FlowState): void {
  state = next;
  if (!rootEl) return;

  rootEl.dataset.flowState = next;
  rootEl.classList.toggle('km-compose-flow--sending', next === 'sending');
  rootEl.classList.toggle('km-compose-flow--complete', next === 'complete');
  rootEl.classList.toggle('km-compose-flow--countdown', next === 'countdown');

  const editor = q<HTMLElement>('[data-km-compose-editor]');
  const sendBtn = q<HTMLButtonElement>('[data-km-compose-send]');
  const progressWrap = q<HTMLElement>('[data-km-compose-progress-wrap]');
  const sendHint = q<HTMLElement>('[data-km-compose-send-hint]');
  const iconSend = q<HTMLElement>('.km-compose-flow__icon-send');
  const iconStop = q<HTMLElement>('.km-compose-flow__icon-stop');

  if (editor) {
    editor.classList.toggle('km-compose-flow__editor--disabled', next === 'sending');
  }

  if (sendBtn) {
    const stopLabel = rootEl.dataset.stopLabel ?? 'Stop';
    const sendLabel = rootEl.dataset.sendLabel ?? 'Send';
    sendBtn.setAttribute('aria-label', next === 'sending' ? stopLabel : sendLabel);
    sendBtn.disabled = next === 'complete';
  }

  if (sendHint) {
    sendHint.hidden = next === 'sending' || next === 'complete';
  }

  if (iconSend && iconStop) {
    iconSend.hidden = next === 'sending';
    iconStop.hidden = next !== 'sending';
  }

  if (progressWrap) {
    const showProgress = next === 'sending' && totalUnits() >= PROGRESS_MIN_UNITS;
    progressWrap.hidden = !showProgress;
  }
}

function updateProgress(completed: number, total: number): void {
  const remaining = Math.max(0, total - completed);
  const pct = total > 0 ? (completed / total) * 100 : 0;

  const bar = q<HTMLElement>('[data-km-compose-progress-bar]');
  const label = q<HTMLElement>('[data-km-compose-progress-label]');
  const terminalOut = q<HTMLElement>('[data-km-compose-terminal-output]');
  const live = q<HTMLElement>('[data-km-compose-live]');

  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `${remaining} ${progressSuffix}`;
  if (terminalOut) terminalOut.textContent = demoText.slice(0, completed);
  if (live && state === 'sending') {
    live.textContent = `Sending: ${remaining} ${progressSuffix}`;
  }
}

function showStaticComplete(): void {
  updateProgress(totalUnits(), totalUnits());
  setState('complete');
}

function resetToIdle(): void {
  clearTimers();
  updateProgress(0, totalUnits());
  setState('idle');
  const live = q<HTMLElement>('[data-km-compose-live]');
  if (live) live.textContent = '';
}

function scheduleAutoStart(): void {
  if (!inView || reducedMotion || state !== 'idle') return;
  clearTimers();
  setState('countdown');
  autoTimer = window.setTimeout(() => {
    autoTimer = null;
    if (state === 'countdown' && inView) startSend();
  }, AUTO_DELAY_MS);
}

function startSend(): void {
  if (state === 'sending' || state === 'complete') return;
  clearTimers();
  setState('sending');
  sendStartMs = performance.now();
  updateProgress(0, totalUnits());

  const tick = (now: number): void => {
    if (state !== 'sending' || !rootEl) return;

    const elapsed = now - sendStartMs;
    const progress = Math.min(1, elapsed / SEND_DURATION_MS);
    const completed = Math.floor(progress * totalUnits());

    updateProgress(completed, totalUnits());

    if (progress >= 1) {
      rafId = null;
      setState('complete');
      const live = q<HTMLElement>('[data-km-compose-live]');
      if (live) live.textContent = 'Send complete';
      updateProgress(totalUnits(), totalUnits());

      completeTimer = window.setTimeout(() => {
        completeTimer = null;
        if (!inView) {
          resetToIdle();
          return;
        }
        resetToIdle();
        scheduleAutoStart();
      }, COMPLETE_HOLD_MS);
      return;
    }

    rafId = window.requestAnimationFrame(tick);
  };

  rafId = window.requestAnimationFrame(tick);
}

function onSendClick(): void {
  if (reducedMotion) return;
  if (state === 'idle' || state === 'countdown') {
    clearTimers();
    startSend();
  }
}

function bindRoot(root: HTMLElement): void {
  if (rootEl === root) return;
  unbindRoot();

  rootEl = root;
  reducedMotion = prefersReducedMotion();
  demoText = q<HTMLElement>('[data-km-compose-editor-text]')?.textContent?.trim() ?? root.dataset.demoText ?? '';
  progressSuffix = root.dataset.progressSuffix ?? 'left';

  if (reducedMotion) {
    root.classList.add('km-compose-flow--reduced-motion');
    showStaticComplete();
    return;
  }

  const sendBtn = q<HTMLButtonElement>('[data-km-compose-send]');
  sendBtn?.addEventListener('click', onSendClick);

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      inView = Boolean(entry?.isIntersecting);
      if (inView) {
        if (state === 'idle') scheduleAutoStart();
      } else {
        resetToIdle();
      }
    },
    { threshold: INTERSECTION_THRESHOLD },
  );
  observer.observe(root);

  resetToIdle();
}

function unbindRoot(): void {
  clearTimers();
  observer?.disconnect();
  observer = null;

  const sendBtn = rootEl?.querySelector<HTMLButtonElement>('[data-km-compose-send]');
  sendBtn?.removeEventListener('click', onSendClick);

  rootEl = null;
  state = 'idle';
  inView = false;
}

export function initKeymodComposeSendFlow(): void {
  const root = document.querySelector<HTMLElement>('[data-km-compose-flow]');
  if (!root) {
    unbindRoot();
    return;
  }
  bindRoot(root);
}

function boot(): void {
  initKeymodComposeSendFlow();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodComposeSendFlow);
