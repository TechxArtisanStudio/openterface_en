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
    alt: 'AI Chat mode — maturing',
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
    src: '/keymod/rebirth/modes/km-basic-keyboard.webp',
    alt: 'KM Basic — wireless keyboard and trackpad on phone',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'modes',
    slot: 'pro-terminal',
    txaId: '583ef248d6aba102',
    src: '/keymod/rebirth/modes/km-pro-terminal.webp',
    alt: 'KM Pro — terminal session on target monitor',
    kind: 'image',
    status: 'ready',
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
    src: '/keymod/rebirth/modes/km-compose-send.webp',
    alt: 'Compose & Send — paste on phone, typed on target',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'modes',
    slot: 'gamepad',
    txaId: '8d72edeb1c0df147',
    src: '/keymod/rebirth/modes/gamepad-minecraft.webp',
    alt: 'Gamepad mode — Minecraft controller layout',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'modes',
    slot: 'presentation',
    src: '/keymod/rebirth/props/prop-r.webp',
    alt: 'Presentation remote — slide control from phone',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'scenarios',
    slot: 'rack',
    src: '/keymod/rebirth/modes/scenario-rack.webp',
    alt: 'Server rack with monitor — wireless input from phone',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'scenarios',
    slot: 'kiosk',
    src: '/keymod/rebirth/modes/scenario-kiosk.webp',
    alt: 'Tablet kiosk — walk-up control with KeyMod',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'scenarios',
    slot: 'edc',
    src: '/keymod/rebirth/modes/scenario-edc.webp',
    alt: 'KeyMod in pocket — everyday carry setup',
    kind: 'image',
    status: 'ready',
  },
  {
    section: 'keycmdBridge',
    slot: 'ui',
    src: '/keymod/rebirth/modes/keycmd-bridge.webp',
    alt: 'KeyCmd keyboard and touchpad UI on phone',
    kind: 'image',
    status: 'ready',
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
