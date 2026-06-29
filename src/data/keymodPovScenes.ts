/** POV Stage — scene templates + tab scenes (SSOT for artboard geometry). */

export type PovRect = { x: number; y: number; w: number; h: number };

export type KeymodPovFrameLayer = {
  kind: 'frame';
  src: string;
  rect: PovRect;
};

export type KeymodPovSlotLayer = {
  kind: 'slot';
  id: 'monitor' | 'phone';
  rect: PovRect;
};

export type KeymodPovLayer = KeymodPovFrameLayer | KeymodPovSlotLayer;

export type KeymodPovTemplate = {
  id: string;
  artboard: { w: number; h: number };
  /** Bottom-to-top paint order */
  layers: KeymodPovLayer[];
};

export type KeymodPovSceneId =
  | 'keyboard'
  | 'touchpad'
  | 'compose-send'
  | 'gamepad'
  | 'presentation'
  | 'terminal'
  | 'ai-chat';

export type KeymodPovScene = {
  id: KeymodPovSceneId;
  tabLabel: string;
  /** When true, tab is omitted from POV stage (scroll-spy / slots may still use the scene). */
  povTabHidden?: boolean;
  templateId: 'desk-monitor-landscape';
  monitorSrc: string;
  phoneSrc: string;
};

export const KEYMOD_POV_TEMPLATE_DESK: KeymodPovTemplate = {
  id: 'desk-monitor-landscape',
  artboard: { w: 1938, h: 1695 },
  layers: [
    { kind: 'slot', id: 'monitor', rect: { x: 4, y: 4, w: 947, h: 534 } },
    {
      kind: 'frame',
      src: '/keymod/rebirth/pov/screen.webp',
      rect: { x: 0, y: 0, w: 955, h: 748 },
    },
    {
      kind: 'frame',
      src: '/keymod/rebirth/pov/pc-with-keymod.webp',
      rect: { x: 472, y: 1345, w: 578, h: 298 },
    },
    { kind: 'slot', id: 'phone', rect: { x: 1212, y: 1343, w: 452, h: 209 } },
    {
      kind: 'frame',
      src: '/keymod/rebirth/pov/hands-phone-keycmd.webp',
      rect: { x: 969, y: 1296, w: 969, h: 399 },
    },
  ],
};

export const KEYMOD_POV_HANDS_DEFAULT_SRC = '/keymod/rebirth/pov/hands-phone-keycmd.webp';
export const KEYMOD_POV_HANDS_PORTRAIT_SRC = '/keymod/rebirth/pov/hands-portrait-girl.webp';

/** Scenes that use the portrait hands frame instead of the default. */
export const KEYMOD_POV_PORTRAIT_HANDS_SCENE_IDS: KeymodPovSceneId[] = [
  'touchpad',
  'compose-send',
  'presentation',
];

/**
 * Portrait girl + phone — full portrait-girl-hand.png (1000×1258).
 * Phone slot maps to the transparent screen hole (alpha=0) inside the asset.
 */
export const KEYMOD_POV_PORTRAIT = {
  handsSrcSize: { w: 1000, h: 1258 },
  /** Phone screen hole in handsSrcSize pixels (bezel-inner transparent region). */
  phoneInCrop: { x: 120, y: 80, w: 508, h: 1098 },
  /** Hands frame on desk artboard — full asset aspect, phone center ≈ landscape phone. */
  handsRect: { x: 1156, y: 697, w: 755, h: 950 },
};

/** Phone slot 2× pixel size for portrait scene webp exports. */
export const KEYMOD_POV_PORTRAIT_PHONE_EXPORT = {
  w: 767,
  h: 1658,
};

export function derivePortraitPhoneRect(handsRect: PovRect): PovRect {
  const { handsSrcSize, phoneInCrop } = KEYMOD_POV_PORTRAIT;
  return {
    x: handsRect.x + (phoneInCrop.x / handsSrcSize.w) * handsRect.w,
    y: handsRect.y + (phoneInCrop.y / handsSrcSize.h) * handsRect.h,
    w: (phoneInCrop.w / handsSrcSize.w) * handsRect.w,
    h: (phoneInCrop.h / handsSrcSize.h) * handsRect.h,
  };
}

export const KEYMOD_POV_TEMPLATES: Record<string, KeymodPovTemplate> = {
  'desk-monitor-landscape': KEYMOD_POV_TEMPLATE_DESK,
};

export const keymodPovScenes: KeymodPovScene[] = [
  {
    id: 'keyboard',
    tabLabel: 'Keyboard',
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/keyboard-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/keyboard-phone.webp',
  },
  {
    id: 'touchpad',
    tabLabel: 'Touchpad',
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/touchpad-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/touchpad-phone.webp',
  },
  {
    id: 'compose-send',
    tabLabel: 'Compose & Send',
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/compose-send-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/compose-send-phone.webp',
  },
  {
    id: 'gamepad',
    tabLabel: 'Gamepad',
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/gamepad-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/gamepad-phone.webp',
  },
  {
    id: 'presentation',
    tabLabel: 'Presentation',
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/presentation-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/presentation-phone.webp',
  },
  {
    id: 'terminal',
    tabLabel: 'Terminal',
    povTabHidden: true,
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/terminal-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/terminal-phone.webp',
  },
  {
    id: 'ai-chat',
    tabLabel: 'Ai Chat',
    povTabHidden: true,
    templateId: 'desk-monitor-landscape',
    monitorSrc: '/keymod/rebirth/modes/pov/ai-chat-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/ai-chat-phone.webp',
  },
];

export const keymodPovVisibleTabScenes = keymodPovScenes.filter((s) => !s.povTabHidden);

/** Source artboard → browser display (center monitor, tighten vertical rhythm). */
export const KEYMOD_POV_VIEW = {
  w: 2921,
  h: 1175,
  /** Left inset so monitor frame sits at horizontal center of the view. */
  contentOffsetX: 983,
  /** Extra shift for PC + hands group (negative = left). */
  interactiveOffsetX: -700,
  /** Lift layers below the monitor without changing their aspect ratio. */
  yPivot: 752,
  yLiftBelowPivot: 530,
};

function mapPovDisplayY(y: number): number {
  if (y <= KEYMOD_POV_VIEW.yPivot) return y;
  return y - KEYMOD_POV_VIEW.yLiftBelowPivot;
}

function mapPovDisplayX(rect: PovRect): number {
  const base = rect.x + KEYMOD_POV_VIEW.contentOffsetX;
  if (rect.y > KEYMOD_POV_VIEW.yPivot) {
    return base + KEYMOD_POV_VIEW.interactiveOffsetX;
  }
  return base;
}

export function povRectToPercent(rect: PovRect, artboard: { w: number; h: number }) {
  return {
    left: `${(rect.x / artboard.w) * 100}%`,
    top: `${(rect.y / artboard.h) * 100}%`,
    width: `${(rect.w / artboard.w) * 100}%`,
    height: `${(rect.h / artboard.h) * 100}%`,
  };
}

export function povRectToDisplayPercent(rect: PovRect) {
  const y = mapPovDisplayY(rect.y);
  const x = mapPovDisplayX(rect);
  const { w, h } = KEYMOD_POV_VIEW;

  return {
    left: `${(x / w) * 100}%`,
    top: `${(y / h) * 100}%`,
    width: `${(rect.w / w) * 100}%`,
    height: `${(rect.h / h) * 100}%`,
  };
}

export function povPhoneRectForScene(sceneId: KeymodPovSceneId): PovRect {
  if (KEYMOD_POV_PORTRAIT_HANDS_SCENE_IDS.includes(sceneId)) {
    return derivePortraitPhoneRect(KEYMOD_POV_PORTRAIT.handsRect);
  }
  const phone = KEYMOD_POV_TEMPLATE_DESK.layers.find((l) => l.kind === 'slot' && l.id === 'phone');
  return phone!.rect;
}
