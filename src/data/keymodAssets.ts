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
    txaId: '4f6c94b6915656f6',
    src: '/keymod/rebirth/props/cutout-a.webp',
    alt: '',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-tr',
    txaId: 'daccacbc4bb4b3da',
    src: '/keymod/rebirth/props/cutout-b.webp',
    alt: '',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-bl',
    txaId: '2be55cda9ace4e84',
    src: '/keymod/rebirth/props/usb-back.webp',
    alt: '',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'hero',
    slot: 'prop-br',
    txaId: 'cf336cb298c03008',
    src: '/keymod/rebirth/props/cutout-c.webp',
    alt: '',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'sku',
    slot: 'mini',
    txaId: 'f2c022257918f5ba',
    alt: 'KeyMod Mini — USB-C',
    kind: 'image',
    status: 'placeholder',
  },
  {
    section: 'sku',
    slot: 'plus',
    txaId: 'f48ad9aa58ca6efd',
    alt: 'KeyMod Plus — USB-A',
    kind: 'image',
    status: 'placeholder',
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

/** Flipper-style scatter positions for hero props */
export const heroPropPositions = ['prop-tl', 'prop-tr', 'prop-bl', 'prop-br'] as const;
