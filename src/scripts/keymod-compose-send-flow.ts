const AUTO_DELAY_MS = 3500;
const SEND_DURATION_MAX_MS = 10000;
const SEND_DURATION_MIN_MS = 3000;
const COMPLETE_HOLD_MS = 2500;
const PROGRESS_MIN_UNITS = 56;
const INTERSECTION_THRESHOLD = 0.35;
const LOAD_FLASH_MS = 600;

type FlowState = 'idle' | 'countdown' | 'sending' | 'complete';
type PhoneView = 'compose' | 'library';

interface SavedTemplate {
  id: string;
  title: string;
  pinned: boolean;
  meta: string;
  content: string;
}

let rootEl: HTMLElement | null = null;
let activeText = '';
let progressSuffix = 'left';
let autoTimer: number | null = null;
let completeTimer: number | null = null;
let loadFlashTimer: number | null = null;
let sendStartMs = 0;
let sendDurationMs = SEND_DURATION_MAX_MS;
let rafId: number | null = null;
let observer: IntersectionObserver | null = null;
let inView = false;
let state: FlowState = 'idle';
let view: PhoneView = 'compose';
let selectedTemplateId: string | null = null;
let userOpenedLibrary = false;
let reducedMotion = false;
let templates: SavedTemplate[] = [];
let clickAbort: AbortController | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function q<T extends Element>(sel: string): T | null {
  return rootEl?.querySelector<T>(sel) ?? null;
}

function qa<T extends Element>(sel: string): T[] {
  return rootEl ? Array.from(rootEl.querySelectorAll<T>(sel)) : [];
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
  if (loadFlashTimer !== null) {
    window.clearTimeout(loadFlashTimer);
    loadFlashTimer = null;
  }
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function totalUnits(): number {
  return activeText.length;
}

function sendDurationFor(text: string): number {
  return Math.min(SEND_DURATION_MAX_MS, Math.max(SEND_DURATION_MIN_MS, text.length * 80));
}

function progressMinUnits(): number {
  return Math.min(PROGRESS_MIN_UNITS, totalUnits());
}

function setView(next: PhoneView): void {
  view = next;
  if (!rootEl) return;

  rootEl.classList.toggle('km-compose-flow--library', next === 'library');

  const composePanel = q<HTMLElement>('[data-km-compose-panel="compose"]');
  const libraryPanel = q<HTMLElement>('[data-km-compose-panel="library"]');

  if (composePanel) {
    composePanel.setAttribute('aria-hidden', next === 'library' ? 'true' : 'false');
  }
  if (libraryPanel) {
    libraryPanel.hidden = next !== 'library';
  }
}

function updateSelectionUi(): void {
  if (!rootEl) return;

  const hasSelection = selectedTemplateId !== null;
  rootEl.classList.toggle('km-compose-flow--has-selection', hasSelection);

  const actions = q<HTMLElement>('[data-km-compose-library-actions]');
  if (actions) actions.hidden = !hasSelection;

  qa<HTMLElement>('[data-km-saved-row]').forEach((row) => {
    const id = row.dataset.templateId ?? '';
    row.classList.toggle('km-compose-flow__saved-row--selected', id === selectedTemplateId);
    row.setAttribute('aria-pressed', id === selectedTemplateId ? 'true' : 'false');
  });
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
  const librarySendBtn = q<HTMLButtonElement>('[data-km-compose-library-send]');
  const progressWrap = q<HTMLElement>('[data-km-compose-progress-wrap]');
  const sendHint = q<HTMLElement>('[data-km-compose-send-hint]');
  const iconSend = q<HTMLElement>('.km-compose-flow__icon-send');
  const iconStop = q<HTMLElement>('.km-compose-flow__icon-stop');

  if (editor) {
    editor.classList.toggle('km-compose-flow__editor--disabled', next === 'sending');
  }

  const stopLabel = rootEl.dataset.stopLabel ?? 'Stop';
  const sendLabel = rootEl.dataset.sendLabel ?? 'Send';

  if (sendBtn) {
    sendBtn.setAttribute('aria-label', next === 'sending' ? stopLabel : sendLabel);
    sendBtn.disabled = next === 'complete';
  }

  if (librarySendBtn) {
    librarySendBtn.disabled = next === 'sending' || next === 'complete' || !selectedTemplateId;
  }

  if (sendHint) {
    sendHint.hidden = next === 'sending' || next === 'complete' || view !== 'compose';
  }

  if (iconSend && iconStop) {
    iconSend.hidden = next === 'sending';
    iconStop.hidden = next !== 'sending';
  }

  if (progressWrap) {
    const showProgress = next === 'sending' && totalUnits() >= progressMinUnits();
    progressWrap.hidden = !showProgress;
  }
}

function writeEditorText(text: string): void {
  activeText = text;
  const editorText = q<HTMLElement>('[data-km-compose-editor-text]');
  if (editorText) editorText.textContent = text;
}

function flashEditorLoaded(): void {
  const editor = q<HTMLElement>('[data-km-compose-editor]');
  if (!editor) return;
  editor.classList.add('km-compose-flow__editor--loaded');
  if (loadFlashTimer !== null) window.clearTimeout(loadFlashTimer);
  loadFlashTimer = window.setTimeout(() => {
    loadFlashTimer = null;
    editor.classList.remove('km-compose-flow__editor--loaded');
  }, LOAD_FLASH_MS);
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
  if (terminalOut) terminalOut.textContent = activeText.slice(0, completed);
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
  if (!inView || reducedMotion || state !== 'idle' || view !== 'compose' || userOpenedLibrary) return;
  clearTimers();
  setState('countdown');
  autoTimer = window.setTimeout(() => {
    autoTimer = null;
    if (state === 'countdown' && inView && view === 'compose') startSend();
  }, AUTO_DELAY_MS);
}

function getSelectedContent(): string | null {
  if (!selectedTemplateId) return null;
  const row = q<HTMLElement>(`[data-template-id="${selectedTemplateId}"]`);
  return row?.dataset.templateContent ?? templates.find((t) => t.id === selectedTemplateId)?.content ?? null;
}

function openLibrary(): void {
  if (reducedMotion || state === 'sending') return;
  clearTimers();
  userOpenedLibrary = true;
  setState('idle');
  setView('library');
}

function closeLibrary(): void {
  selectedTemplateId = null;
  updateSelectionUi();
  setView('compose');
}

function selectTemplate(id: string): void {
  if (state === 'sending') return;
  selectedTemplateId = selectedTemplateId === id ? null : id;
  updateSelectionUi();
}

function loadSelected(): void {
  const content = getSelectedContent();
  if (!content) {
    const hint = rootEl?.dataset.selectFirstHint ?? 'Select a saved text first';
    const live = q<HTMLElement>('[data-km-compose-live]');
    if (live) live.textContent = hint;
    return;
  }
  writeEditorText(content);
  closeLibrary();
  flashEditorLoaded();
  const live = q<HTMLElement>('[data-km-compose-live]');
  if (live) live.textContent = 'Loaded into compose editor';
}

function startSend(): void {
  if (state === 'sending' || state === 'complete') return;
  clearTimers();
  sendDurationMs = sendDurationFor(activeText);
  setState('sending');
  sendStartMs = performance.now();
  updateProgress(0, totalUnits());

  const tick = (now: number): void => {
    if (state !== 'sending' || !rootEl) return;

    const elapsed = now - sendStartMs;
    const progress = Math.min(1, elapsed / sendDurationMs);
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

function sendSelectedFromLibrary(): void {
  const content = getSelectedContent();
  if (!content) {
    const hint = rootEl?.dataset.selectFirstHint ?? 'Select a saved text first';
    const live = q<HTMLElement>('[data-km-compose-live]');
    if (live) live.textContent = hint;
    return;
  }
  writeEditorText(content);
  clearTimers();
  setState('idle');
  startSend();
}

function onRootClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target || !rootEl) return;

  if (target.closest('[data-km-compose-open-library]')) {
    openLibrary();
    return;
  }

  if (target.closest('[data-km-compose-library-back]')) {
    closeLibrary();
    return;
  }

  if (target.closest('[data-km-compose-library-load]')) {
    loadSelected();
    return;
  }

  if (target.closest('[data-km-compose-library-send]')) {
    sendSelectedFromLibrary();
    return;
  }

  if (target.closest('[data-km-compose-send]')) {
    if (reducedMotion) return;
    if (state === 'idle' || state === 'countdown') {
      clearTimers();
      startSend();
    }
    return;
  }

  const row = target.closest<HTMLElement>('[data-km-saved-row]');
  if (row?.dataset.templateId) {
    selectTemplate(row.dataset.templateId);
  }
}

function bindRoot(root: HTMLElement): void {
  if (rootEl === root) return;
  unbindRoot();

  rootEl = root;
  reducedMotion = prefersReducedMotion();
  activeText = q<HTMLElement>('[data-km-compose-editor-text]')?.textContent?.trim() ?? root.dataset.demoText ?? '';
  progressSuffix = root.dataset.progressSuffix ?? 'left';

  try {
    templates = JSON.parse(root.dataset.templates ?? '[]') as SavedTemplate[];
  } catch {
    templates = [];
  }

  if (reducedMotion) {
    root.classList.add('km-compose-flow--reduced-motion');
    showStaticComplete();
    return;
  }

  clickAbort = new AbortController();
  root.addEventListener('click', onRootClick, { signal: clickAbort.signal });

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      inView = Boolean(entry?.isIntersecting);
      if (inView) {
        if (state === 'idle' && view === 'compose') scheduleAutoStart();
      } else {
        userOpenedLibrary = false;
        closeLibrary();
        resetToIdle();
      }
    },
    { threshold: INTERSECTION_THRESHOLD },
  );
  observer.observe(root);

  setView('compose');
  updateSelectionUi();
  resetToIdle();
}

function unbindRoot(): void {
  clearTimers();
  observer?.disconnect();
  observer = null;
  clickAbort?.abort();
  clickAbort = null;
  rootEl = null;
  state = 'idle';
  view = 'compose';
  selectedTemplateId = null;
  userOpenedLibrary = false;
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
