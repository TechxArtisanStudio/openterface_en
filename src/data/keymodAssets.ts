/** Curated media slots — txa-media IDs map to CDN URLs at publish time. */

export type KeymodAssetSlot = {
  section: string;
  slot: string;
  /** txa-media asset id (dev reference) */
  txaId?: string;
  /** Local Phase 0 path or CDN URL */
  src?: string;
  alt: string;
  kind: 'image' | 'video' | 'poster';
  status: 'ready' | 'placeholder' | 'reshoot';
};

export const keymodAssets: KeymodAssetSlot[] = [
  {
    section: 'brand',
    slot: 'keymod-wordmark',
    src: '/keymod/logo/keymod-wordmark.svg',
    alt: 'KeyMod',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'brand',
    slot: 'keycmd-wordmark',
    src: '/keymod/logo/keycmd-wordmark.svg',
    alt: 'KeyCmd',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'whatItIs',
    slot: 'welcome-screen',
    src: '/keymod/rebirth/keycmd-welcome-headless.webp',
    alt: 'KeyCmd Welcome screen — pick a control mode on your phone',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'center',
    txaId: 'ccb718e87639a6cf',
    src: '/keymod/rebirth/hero-center.webp',
    alt: 'KeyMod dongle on a light surface — hero product',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-tl',
    src: '/keymod/rebirth/props/prop-tl.webp',
    alt: 'Wireless mouse — Keyboard & Mouse mode',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-tr',
    src: '/keymod/rebirth/props/prop-tr.webp',
    alt: 'Wireless game controller — Gamepad mode',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-tr-arcade',
    src: '/keymod/rebirth/props/prop-tr-arcade.webp',
    alt: 'Arcade fight stick — Gamepad mode',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-bl',
    src: '/keymod/rebirth/props/prop-bl.webp',
    alt: 'Macro keypad — Shortcut Hub & Macros',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-br',
    src: '/keymod/rebirth/props/prop-br.webp',
    alt: 'USB console cable — terminal & homelab',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-terminal',
    src: '/keymod/rebirth/props/prop-terminal.webp',
    alt: 'Monitor with terminal — headless control',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-l',
    src: '/keymod/rebirth/props/prop-l.webp',
    alt: 'Numeric keypad — Pro mode',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-r',
    src: '/keymod/rebirth/props/prop-r.webp',
    alt: 'Presentation remote',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-t',
    src: '/keymod/rebirth/props/prop-t.webp',
    alt: 'Lavalier microphone — Voice input mode',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-b',
    src: '/keymod/rebirth/props/prop-b.webp',
    alt: 'Raspberry Pi board — headless bench',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'sku',
    slot: 'mini',
    txaId: 'a5fcd6620d9ed8d3',
    src: '/keymod/rebirth/sku-mini.webp',
    alt: 'KeyMod Mini — USB-C dongle, transparent product shot',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'sku',
    slot: 'plus',
    txaId: 'f2c022257918f5ba',
    src: '/keymod/rebirth/sku-plus.webp',
    alt: 'KeyMod Plus — USB-A dongle, transparent product shot',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'modes',
    slot: 'basic-video',
    txaId: 'ba217e41cf0a828f',
    alt: 'KM Basic — POV typing demo',
    kind: 'video',
    status: 'reshoot',
  },
  {
    section: 'modes',
    slot: 'pro-terminal',
    txaId: '583ef248d6aba102',
    alt: 'KM Pro — terminal on target',
    kind: 'image',
    status: 'reshoot',
  },
  {
    section: 'modes',
    slot: 'terminal-monitor',
    src: '/keymod/rebirth/props/prop-terminal.webp',
    alt: 'Monitor corner with green terminal text',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'modes',
    slot: 'compose-send',
    txaId: '3bde5f31f0315fec',
    alt: 'Compose & Send — paste and type',
    kind: 'video',
    status: 'reshoot',
  },
  {
    section: 'modes',
    slot: 'gamepad',
    txaId: '8d72edeb1c0df147',
    alt: 'Gamepad — Minecraft demo',
    kind: 'video',
    status: 'placeholder',
  },
];

export function getKeymodAsset(section: string, slot: string): KeymodAssetSlot | undefined {
  return keymodAssets.find((a) => a.section === section && a.slot === slot);
}

export function getKeymodAssets(section: string, slotPrefix?: string): KeymodAssetSlot[] {
  return keymodAssets.filter(
    (a) => a.section === section && (!slotPrefix || a.slot.startsWith(slotPrefix)),
  );
}

/** Flipper-style scatter positions — tier 1 corners + tier 2 mid-edge */
export const heroPropPositions = [
  'prop-tl',
  'prop-tr',
  'prop-tr-arcade',
  'prop-bl',
  'prop-br',
  'prop-terminal',
  'prop-l',
  'prop-r',
  'prop-t',
  'prop-b',
] as const;

export type HeroPropSlot = (typeof heroPropPositions)[number];

export const heroPropTiers: Record<HeroPropSlot, 1 | 2> = {
  'prop-tl': 1,
  'prop-tr': 1,
  'prop-tr-arcade': 1,
  'prop-bl': 1,
  'prop-br': 1,
  'prop-terminal': 2,
  'prop-l': 2,
  'prop-r': 2,
  'prop-t': 2,
  'prop-b': 2,
};

/**
 * Per-sticker tuning from manual cutout QA (1024² sources, centered subjects).
 * scale multiplies tier base width; opacity keeps center dongle as focal point.
 */
export const heroPropLayout: Record<
  HeroPropSlot,
  { scale: number; opacity: number }
> = {
  'prop-tl': { scale: 1.04, opacity: 0.36 },
  'prop-tr': { scale: 0.96, opacity: 0.32 },
  'prop-tr-arcade': { scale: 0.9, opacity: 0.24 },
  'prop-bl': { scale: 0.98, opacity: 0.34 },
  'prop-br': { scale: 0.96, opacity: 0.3 },
  'prop-terminal': { scale: 0.92, opacity: 0.22 },
  'prop-l': { scale: 0.82, opacity: 0.22 },
  'prop-r': { scale: 0.76, opacity: 0.2 },
  'prop-t': { scale: 0.94, opacity: 0.22 },
  'prop-b': { scale: 0.86, opacity: 0.22 },
};
