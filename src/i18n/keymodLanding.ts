import { siteConfig } from '../config/site';

/** UTM-appended outbound URLs — never hand-build in components. */
export const keymodLinks = {
  crowdSupply:
    'https://www.crowdsupply.com/techxartisan/keymod?utm_source=openterface&utm_medium=landing&utm_campaign=keymod-landing-v2',
  crowdSupplyIcon: '/keymod/badges/crowd-supply-icon.svg',
  openSourceInitiative: '/keymod/badges/open-source-initiative.svg',
  openSourceHardware: '/keymod/badges/open-source-hardware.svg',
  keycmd:
    'https://openterface.com/keycmd/?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-to-keycmd',
  docs:
    'https://docs.openterface.com/products/keymod/?utm_source=openterface&utm_medium=landing&utm_campaign=keymod-landing-v2',
  discord: 'https://discord.gg/sFTU7O8Xe3',
  minikvm: '/minikvm/',
  kvmgo: '/kvmgo/',
  gamepadTutorial:
    'https://docs.openterface.com/tutorial/keymod/08-gamepad/?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-game-zone',
  gamepadDemo: 'https://www.instagram.com/p/DY7XsRIBQi6/',
  /** Temporary POV demos — @techxartisan / curated IG until final video assets ship. */
  keymodIntroReel: 'https://www.instagram.com/reel/DUH77BoiarV/',
  homelabKeyboardDemo: 'https://www.instagram.com/p/DZGUTGAM45Z/',
  composeSendDemo: 'https://www.instagram.com/p/DZNZVbUBBxD/',
  presentationTutorial:
    'https://docs.openterface.com/tutorial/keymod/10-presentation/?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-pov-demo',
} as const;

export type KeymodDemoLink = { label: string; href: string };

export type KeymodLandingStrings = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    docs: string;
    preLaunchCta: string;
  };
  hero: {
    productName: string;
    tagline: string;
    equationPlus: string;
    equationEquals: string;
    headline?: string;
    lead: string;
    docsCta: string;
    preLaunchCta: string;
  };
  whatItIs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; body: string }[];
  };
  skuCompare: {
    eyebrow: string;
    title: string;
    stackLine: string;
    contrastLine: string;
    connectivityTitle: string;
    bleRange: string;
    mini: { name: string; port: string; audience: string; connect: string; tagline: string };
    plus: { name: string; port: string; audience: string; connect: string; tagline: string };
  };
  scenarios: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string; imageLabel: string }[];
  };
  modesTheater: {
    eyebrow: string;
    title: string;
    subtitleLines: [string, string];
    basic: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    touchpad: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    kmPro: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
    proTerminal: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
    composeSend: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    terminalBle: { badge: string; title: string; body: string; mediaLabel: string; notice: string };
    opsZone: { eyebrow: string };
    gameZone: {
      eyebrow: string;
      kvmGoNote: string;
      kvmGoCta: string;
      presets: { title: string; body: string; imageSrc: string; imageAlt: string };
      editor: {
        title: string;
        body: string;
        panels: { imageSrc: string; imageAlt: string; caption: string }[];
      };
      share: { title: string; body: string };
    };
    gamepad: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks: KeymodDemoLink[];
    };
    presentation: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    aiChat: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
    future: { title: string; chips: string[] };
  };
  socialProof: {
    eyebrow: string;
    title: string;
    followIg: string;
    viewAllMedia: string;
  };
  keycmdBridge: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    mediaLabel: string;
  };
  crowdSupplyCampaign: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  crowdSupplyOpensource: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    badgesLabel: string;
    osiAlt: string;
    oshAlt: string;
  };
  productLine: {
    eyebrow: string;
    title: string;
    body: string;
    minikvmCta: string;
    kvmgoCta: string;
  };
  subscribe: {
    eyebrow: string;
    title: string;
    description: string;
    benefits: string[];
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    footnote: string;
    crowdSupplyPrompt: string;
    crowdSupplyLink: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    ctaPrimary: string;
    ctaKeycmd: string;
    legal: string;
  };
  previewBanner: string;
};

const en: KeymodLandingStrings = {
  meta: {
    title: 'KeyMod — Wireless USB Multi-tool | Openterface',
    description:
      'Pocket USB multi-tool bridge. Plug into the target device, control from KeyCmd on your phone. BIOS-capable HID. Mini for Type-C. Plus for USB-A servers.',
    keywords:
      'KeyMod, Wireless USB Multi-tool, KeyCmd, wireless HID, BIOS keyboard, homelab, sysadmin, USB-C, USB-A',
  },
  nav: {
    docs: 'Docs',
    preLaunchCta: 'Pre-launch',
  },
  hero: {
    productName: 'KeyMod',
    tagline: 'Pocket USB multi-tool bridge.',
    equationPlus: '+ your phone',
    equationEquals: '=',
    lead:
      'Plug into the target device. BLE control, zero driver, BIOS-ready. Server, PC, or console. Any USB port.',
    docsCta: 'Docs',
    preLaunchCta: 'Pre-launch',
  },
  whatItIs: {
    eyebrow: 'What it is',
    title: 'Hardware plugs in. Software takes control.',
    subtitle: 'Target → KeyMod → Phone → KeyCmd',
    cards: [
      {
        title: 'Plug in KeyMod (Mini / Plus)',
        body: 'Into the target device. Zero driver. BIOS-ready.',
      },
      {
        title: 'Open KeyCmd on your phone (Andorid / iOS)',
        body: 'Pick a mode: KM Basic, KM Pro, gamepad, macros, and more.',
      },
    ],
  },
  skuCompare: {
    eyebrow: 'Choose your port',
    title: 'Mini vs Plus',
    stackLine: 'Same KeyCmd app. Different dongle for the port on your machine.',
    contrastLine: 'Mini for the C port in your pocket. Plus for the A port on the machine.',
    connectivityTitle: 'How your phone connects',
    bleRange: 'BLE range (both SKUs): best within ~5 m, up to ~10 m in open space.',
    mini: {
      name: 'KeyMod Mini',
      port: 'USB-C male → target',
      audience: 'Type-C-first · ultra-compact EDC',
      connect: 'Phone link: BLE wireless only.',
      tagline: 'The Type-C-first pocket bridge',
    },
    plus: {
      name: 'KeyMod Plus',
      port: 'USB-A male → target',
      audience: 'Servers · legacy · rack ops',
      connect: 'Phone link: BLE or USB wired to the dongle — USB is steadier and higher bandwidth (great for KM Pro).',
      tagline: 'The A port on the machine',
    },
  },
  scenarios: {
    eyebrow: 'Built for your workflow',
    title: 'Scenario-first — not a mode checklist',
    items: [
      {
        title: 'Rack / server',
        body: 'Bad posture at the rack. Machine has a display. Plug KeyMod Plus or Mini. Wireless input from KeyCmd — not video capture.',
        imageLabel: 'Rack shot — monitor visible (reshoot)',
      },
      {
        title: 'IT walk-up',
        body: 'Kiosk or mini PC with its own screen. Pocket dongle. Control wirelessly from your phone — see range in Mini vs Plus.',
        imageLabel: 'Kiosk / walk-up scene',
      },
      {
        title: 'EDC pocket control',
        body: 'The dongle stays in your bag. Your phone is the console when you reach the machine.',
        imageLabel: 'EDC / pocket scene',
      },
    ],
  },
  modesTheater: {
    eyebrow: 'In action',
    title: 'Modes that change the job',
    subtitleLines: [
      'KeyMod stays on the USB port.',
      'KeyCmd mode changes what you can do from your phone.',
    ],
    basic: {
      badge: 'KM Basic · Launch',
      title: 'Wireless keyboard',
      lead: 'Type on your phone — characters appear on the target screen. BIOS-capable HID.',
      body: 'First-person POV — hands on phone, characters appear on the target screen. BIOS-capable HID.',
      mediaLabel: 'POV video loop — KM Basic (reshoot: 主页9)',
      demoLinks: [{ label: 'KeyMod intro (IG)', href: keymodLinks.keymodIntroReel }],
    },
    touchpad: {
      badge: 'KM Basic · Launch',
      title: 'Wireless touchpad',
      lead: 'Point, click, and scroll on the target from your phone.',
      body: 'Use your phone as a wireless trackpad — cursor control without a physical mouse at the machine.',
      mediaLabel: 'POV — touchpad mode (placeholder)',
      demoLinks: [{ label: 'Keyboard + touchpad demo (IG)', href: keymodLinks.homelabKeyboardDemo }],
    },
    kmPro: {
      badge: 'KM Pro · Keyboard & Mouse',
      title: 'Hybrid keyboard + mouse layout',
      lead: 'KeyCmd Pro mode — type and point from one phone screen. Hybrid HID layout for power users.',
      body: 'Keyboard and Mouse Pro in KeyCmd: combined keyboard, trackpad, and shortcuts on one layout — richer than Basic, still BIOS-capable HID on the target.',
      mediaLabel: 'POV — KM Pro hybrid layout (placeholder)',
    },
    proTerminal: {
      badge: 'KM Pro · Maturing',
      title: 'Terminal control',
      lead: 'SSH and shell workflows from your phone. Target monitor shows the terminal.',
      body: 'SSH and shell workflows from your phone. Target monitor shows the terminal — not a text editor.',
      mediaLabel: 'Matrix zone — terminal on monitor (reshoot)',
    },
    composeSend: {
      badge: 'KM Pro · Compose & Send',
      title: 'Paste on phone. Tap Send. Target types.',
      lead: 'Compose long strings on your phone, then send them to the target in one tap.',
      body: 'License keys, long strings, compose buffers — send once, typed on the target automatically.',
      mediaLabel: 'Compose & Send demo (IG DZNZVbUBBxD)',
      demoLinks: [{ label: 'Compose & Send demo (IG)', href: keymodLinks.composeSendDemo }],
    },
    terminalBle: {
      badge: 'Coming later',
      title: 'Terminal over Bluetooth',
      body: 'Wireless serial terminal without a laptop at the rack. On the roadmap — honest depth, no dates yet.',
      mediaLabel: 'Terminal over BLE — concept',
      notice:
        'BLE serial is not in the launch build. KM Pro terminal over USB HID is maturing now; wireless serial is a future firmware target.',
    },
    opsZone: {
      eyebrow: 'Ops Zone',
    },
    gameZone: {
      eyebrow: 'Game Zone',
      kvmGoNote:
        'Same KeyCmd gamepad mode powers our KVM-GO Minecraft demos — swap the USB bridge for KeyMod when the target already has a screen.',
      kvmGoCta: 'See KVM-GO gamepad demos',
      presets: {
        title: 'Preset layouts',
        body: 'Tap the Preset chip to cycle saved controller layouts — bundled emu-6 starter, import/export JSON presets (schema v7).',
        imageSrc: '/keymod/rebirth/gamepad/gamepad-preset-layout.webp',
        imageAlt: 'KeyCmd gamepad preset picker — cycle layouts from the toolbar chip',
      },
      editor: {
        title: 'Build your layout',
        body: 'Add D-pad, sticks, touchpads, and face buttons. Tap any module to tune behavior, size, and WASD mapping.',
        panels: [
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-edit-mode.webp',
            imageAlt: 'Gamepad module editor — configure stick, button, and touchpad modules',
            caption: 'Configure modules',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-add-mode.webp',
            imageAlt: 'Add modules to a gamepad preset — D-pad, stick, touchpad, buttons',
            caption: 'Add modules',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-hold-lock-turbo.webp',
            imageAlt: 'Diagonal swipe actions — hold lock and turbo per direction on mouse buttons',
            caption: 'Hold lock & turbo',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-dpad-keys.webp',
            imageAlt: 'Map direction keys — D-pad cross vs split segments',
            caption: 'Map direction keys',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-mouse-button.webp',
            imageAlt: 'Fine-tune mouse buttons — press timing and turbo interval',
            caption: 'Mouse button timing',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-scroll-strip.webp',
            imageAlt: 'Tune scroll strip — height and wheel sensitivity',
            caption: 'Scroll strip settings',
          },
        ],
      },
      share: {
        title: 'Share presets',
        body: 'Export layouts as JSON and share with your team — background art embeds in the file. Same gamepad mode on KeyMod and KVM-GO.',
      },
    },
    gamepad: {
      badge: 'Gamepad mode · Preview',
      title: 'Phone as game controller',
      lead: 'KeyCmd gamepad mode — immersive, high-motion control from your phone.',
      body: 'KeyCmd gamepad mode — immersive, high-motion demos. Same stack works with KeyMod hardware.',
      mediaLabel: 'Gamepad video — Minecraft (8d72edeb / IG)',
      demoLinks: [
        { label: 'Gamepad tutorial', href: keymodLinks.gamepadTutorial },
        { label: 'Minecraft demo (IG)', href: keymodLinks.gamepadDemo },
        { label: 'KVM-GO gamepad demos', href: keymodLinks.kvmgo },
      ],
    },
    presentation: {
      badge: 'Presentation',
      title: 'Slide remote',
      lead: 'Control Keynote, Google Slides, and decks from your phone.',
      body: 'Keynote, Google Slides, and deck control from your phone — secondary scenario.',
      mediaLabel: 'Presentation remote scene',
      demoLinks: [{ label: 'Presentation tutorial', href: keymodLinks.presentationTutorial }],
    },
    aiChat: {
      badge: 'AI Chat · Preview',
      title: 'Gibby on your phone',
      lead: 'Chat with Gibby on KeyCmd — agent actions on the target are on the roadmap.',
      body: 'Gibby AI Chat pairs with KeyMod for conversational control — preview on the KeyCmd roadmap.',
      mediaLabel: 'Gibby AI Chat — mascot + phone UI',
    },
    future: {
      title: 'On the firmware roadmap',
      chips: ['Network bridge', 'Audio bridge', 'MIDI', 'CLI + MCP automation', 'Remote relay'],
    },
  },
  socialProof: {
    eyebrow: 'Real users',
    title: 'Real users, real setups',
    followIg: 'More demos on @techxartisan',
    viewAllMedia: 'All KeyMod media',
  },
  keycmdBridge: {
    eyebrow: 'Software companion',
    title: 'Controlled from KeyCmd on your phone',
    body:
      'KeyCmd is the multi-mode console that powers KeyMod, a pocket USB bridge on the machine. Tiny dongle, full control. Built for rack ops, walk-ups, and everyday IT work.',
    cta: 'Meet KeyCmd',
    mediaLabel: 'KeyCmd welcome screen — pick a control mode',
  },
  crowdSupplyCampaign: {
    eyebrow: 'Crowd Supply',
    title: 'Pre-launch on Crowd Supply',
    body:
      'Back KeyMod Mini and Plus on Crowd Supply — pocket USB bridges that turn your phone into a wireless console. BIOS-capable HID, zero driver on the target.',
    cta: 'Pre-launch',
  },
  crowdSupplyOpensource: {
    eyebrow: 'Open by design',
    title: 'Open-source hardware & software',
    body:
      'KeyCmd, firmware, and hardware docs publish as the project matures — the same open stack philosophy as Openterface Mini-KVM and KVM-GO.',
    cta: 'Pre-launch',
    badgesLabel: 'Open-source hardware and software',
    osiAlt: 'Open Source Initiative — approved open-source license',
    oshAlt: 'Open Source Hardware Association',
  },
  productLine: {
    eyebrow: 'Openterface family',
    title: 'Also need video on your laptop?',
    body: 'Mini-KVM and KVM-GO: video + keyboard and mouse control.',
    minikvmCta: 'Mini-KVM →',
    kvmgoCta: 'KVM-GO →',
  },
  subscribe: {
    eyebrow: 'Stay in the loop',
    title: 'Get KeyMod launch updates',
    description:
      'Product launches, firmware releases, and setup guides — at most one email per month. No spam.',
    benefits: [
      'Early access to crowdfunding and pre-order windows',
      'Setup guides and KeyCmd release notes',
      'Unsubscribe anytime with one click',
    ],
    submitLabel: 'Subscribe for updates',
    namePlaceholder: 'Name (optional)',
    emailPlaceholder: 'Email address *',
    footnote: 'At most one email per month. Unsubscribe anytime. Questions? info@openterface.com',
    crowdSupplyPrompt: 'Already on Crowd Supply?',
    crowdSupplyLink: 'View the campaign ↗',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions',
    items: [
      {
        q: 'Is this a Bluetooth keyboard app?',
        a: 'No. KeyMod is USB HID on the target. BLE (or Plus USB) is phone ↔ KeyMod only — not a Bluetooth keyboard emulating into the host OS.',
      },
      {
        q: 'KeyMod Mini vs Plus?',
        a: 'Mini plugs into USB-C on the target and links to your phone over BLE. Plus plugs into USB-A and adds a USB wired path to your phone — steadier and higher bandwidth than BLE alone.',
      },
      {
        q: 'KM Basic vs KM Pro?',
        a: 'Both are Keyboard & Mouse modes inside KeyCmd — not separate products. KM Basic covers everyday typing and trackpad. KM Pro adds richer layouts and power-user workflows (terminal-style control, Compose & Send, and more).',
      },
      {
        q: 'Does KeyMod capture video?',
        a: 'No. Use Mini-KVM or KVM-GO when you need the screen on your laptop.',
      },
      {
        q: 'Why did the story change?',
        a: 'CH32 platform evolved KeyMod into a Wireless USB Multi-tool — scenario-first at launch.',
      },
    ],
  },
  footer: {
    ctaPrimary: 'Subscribe',
    ctaKeycmd: 'KeyCmd app',
    legal: `© ${new Date().getFullYear()} TechxArtisan · Openterface KeyMod Rebirth preview`,
  },
  previewBanner: 'PREVIEW — /preview/keymod-rebirth/ · Phase 1 structure · not indexed',
};

const translations: Record<string, KeymodLandingStrings> = { en };

export function getKeymodLanding(locale = siteConfig.locale): KeymodLandingStrings {
  return translations[locale] ?? en;
}

export const keymodLanding = getKeymodLanding();
