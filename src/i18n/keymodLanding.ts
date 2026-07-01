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
    composeSend: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    proTerminal: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
    opsZone: {
      eyebrow: string;
      intro: { title: string; body: string };
      compose: {
        badge: string;
        title: string;
        body: string;
        demoLinks?: KeymodDemoLink[];
        demoText: string;
        terminalPrompt: string;
        sendLabel: string;
        stopLabel: string;
        autoSendHint: string;
        interactiveDemoLabel: string;
        progressRemainingLabel: string;
      };
      savedTexts: {
        title: string;
        body: string;
        imageSrc: string;
        imageAlt: string;
        mediaLabel: string;
      };
      terminal: {
        badge: string;
        title: string;
        body: string;
        usb: { label: string; body: string; imageSrc: string; imageAlt: string; mediaLabel: string };
        ble: { label: string; body: string; imageSrc: string; imageAlt: string; mediaLabel: string };
        notice: string;
      };
    };
    gameZone: {
      eyebrow: string;
      presets: { title: string; body: string; layouts: { label: string; imageSrc: string; imageAlt: string }[] };
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
    fallbackNote: string;
    viewOnInstagram: string;
    viewProfile: string;
    viewPostOnInstagram: string;
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
    title: 'KeyMod | Wireless USB Multi-tool | Openterface',
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
      connect: 'Phone link: BLE or USB wired to the dongle. USB wired is steadier and has more bandwidth (ideal for KM Pro).',
      tagline: 'The A port on the machine',
    },
  },
  scenarios: {
    eyebrow: 'Built for your workflow',
    title: 'Scenario-first, not a mode checklist',
    items: [
      {
        title: 'Rack / server',
        body: 'Bad posture at the rack. Machine has a display. Plug KeyMod Plus or Mini. Wireless input from KeyCmd, not video capture.',
        imageLabel: 'Rack shot, monitor visible (reshoot)',
      },
      {
        title: 'IT walk-up',
        body: 'Kiosk or mini PC with its own screen. Pocket dongle. Control wirelessly from your phone. See range in Mini vs Plus.',
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
      lead: 'Type on your phone; characters appear on the target screen. BIOS-capable HID.',
      body: 'First-person POV: hands on phone, characters on the target screen. BIOS-capable HID.',
      mediaLabel: 'POV video loop, KM Basic (reshoot)',
      demoLinks: [{ label: 'KeyMod intro (IG)', href: keymodLinks.keymodIntroReel }],
    },
    touchpad: {
      badge: 'KM Basic · Launch',
      title: 'Wireless touchpad',
      lead: 'Point, click, and scroll on the target from your phone.',
      body: 'Use your phone as a wireless trackpad for cursor control without a mouse at the machine.',
      mediaLabel: 'POV touchpad mode (placeholder)',
      demoLinks: [{ label: 'Keyboard + touchpad demo (IG)', href: keymodLinks.homelabKeyboardDemo }],
    },
    kmPro: {
      badge: 'KM Pro · Keyboard & Mouse',
      title: 'Hybrid keyboard + mouse layout',
      lead: 'KeyCmd Pro mode: type and point from one phone screen. Hybrid HID layout for power users.',
      body: 'Keyboard and Mouse Pro in KeyCmd puts keyboard, trackpad, and shortcuts on one layout. Richer than Basic, still BIOS-capable HID on the target.',
      mediaLabel: 'POV KM Pro hybrid layout (placeholder)',
    },
    proTerminal: {
      badge: 'Terminal · Preview',
      title: 'SSH from your phone',
      lead: 'USB when wired. Bluetooth at the rack. Preview demos ship in KeyCmd today.',
      body: 'Dedicated Terminal mode in KeyCmd: SSH over USB ECM (Plus) or BLE-Eth (Mini). Full production link-up follows KeyMod firmware Phase 2.',
      mediaLabel: 'Terminal SSH session (USB transport, reshoot)',
    },
    composeSend: {
      badge: 'KM Pro · Compose & Send',
      title: 'Paste on phone. Tap Send. Target types.',
      lead: 'Compose long strings on your phone, then send them to the target in one tap.',
      body: 'Multi-line HID paste for license keys, deploy scripts, and login prompts. Works in BIOS and locked-down hosts where clipboard paste fails.',
      mediaLabel: 'Compose & Send demo (IG DZNZVbUBBxD)',
      demoLinks: [{ label: 'Compose & Send demo (IG)', href: keymodLinks.composeSendDemo }],
    },
    opsZone: {
      eyebrow: 'Ops Zone',
      intro: {
        title: 'Phone-side ops console',
        body: 'Paste long commands to the target, keep a personal runbook, or SSH from your pocket. No laptop at the rack.',
      },
      compose: {
        badge: 'KM Pro · Compose & Send',
        title: 'Paste on phone. Tap Send. Target types.',
        body: 'Write multi-line commands on your phone, preview, then Send. KeyCmd types on the target over USB or Bluetooth HID. Cancel mid-send on long pastes.',
        demoLinks: [{ label: 'Compose & Send demo (IG)', href: keymodLinks.composeSendDemo }],
        demoText: `ssh deploy@192.168.11.10 'cd /opt/stacks/monitoring && \\
docker compose pull prometheus grafana node-exporter && \\
docker compose up -d && \\
docker compose ps && \\
curl -sf http://127.0.0.1:9090/-/ready'`,
        terminalPrompt: 'deploy@homelab:~$',
        sendLabel: 'Send',
        stopLabel: 'Stop',
        autoSendHint: 'Tap Send',
        interactiveDemoLabel: 'Interactive demo',
        progressRemainingLabel: 'left',
      },
      savedTexts: {
        title: 'Saved texts',
        body: 'Your personal runbook: pin, rename, load, or send snippets in one tap. Store deploy scripts, long passwords, and repeat one-liners (up to 60 items).',
        imageSrc: '/keymod/rebirth/ops/ops-compose-saved-texts.webp',
        imageAlt: 'KeyCmd Saved texts library with pinned deploy script and password templates',
        mediaLabel: 'Saved texts sheet: pin prod-deploy, rotate-root-pass, docker compose (P0 reshoot)',
      },
      terminal: {
        badge: 'Terminal · Preview',
        title: 'SSH from your phone',
        body: 'Dedicated Terminal mode runs SSH through the KeyMod bridge. Pick USB for speed at the machine or Bluetooth when you are across the room.',
        usb: {
          label: 'USB ECM · KeyMod Plus',
          body: 'Wired path when Plus is tethered to your phone. Low latency and high throughput for full-size sessions at the rack.',
          imageSrc: '/keymod/rebirth/ops/ops-terminal-usb.webp',
          imageAlt: 'KeyCmd Terminal connected over USB ECM with htop on screen',
          mediaLabel: 'Terminal Preview demo (USB transport badge, P0 reshoot)',
        },
        ble: {
          label: 'BLE-Eth · KeyMod Mini',
          body: 'Wireless SSH when Mini is on the target. Compact terminal geometry recommended. Preview demo available in KeyCmd today.',
          imageSrc: '/keymod/rebirth/ops/ops-terminal-ble.webp',
          imageAlt: 'KeyCmd Terminal connected over Bluetooth transport',
          mediaLabel: 'Terminal Preview demo (Bluetooth transport badge, P0 reshoot)',
        },
        notice:
          'KeyCmd ships Terminal UI and transport stack today with Preview demos (USB and Bluetooth). Live SSH through KeyMod hardware follows firmware Phase 2 sign-off.',
      },
    },
    gameZone: {
      eyebrow: 'Game Zone',
      presets: {
        title: 'Preset layouts',
        body: 'Tap the Preset chip to cycle saved controller layouts: bundled emu-6 starter, import/export JSON presets (schema v7).',
        layouts: [
          {
            label: 'Default',
            imageSrc: '/keymod/rebirth/gamepad/gamepad-preset-default.webp',
            imageAlt: 'KeyCmd gamepad Default preset, WASD D-pad with A and B face buttons',
          },
          {
            label: 'Emu 6',
            imageSrc: '/keymod/rebirth/gamepad/gamepad-preset-emu6.webp',
            imageAlt: 'KeyCmd Emu 6 preset, six-button arcade-style layout on dark grid',
          },
          {
            label: 'Minecraft Java',
            imageSrc: '/keymod/rebirth/gamepad/gamepad-preset-minecraft.webp',
            imageAlt: 'KeyCmd Minecraft Java preset, hotbar, look zone, and movement controls',
          },
          {
            label: 'XYAB',
            imageSrc: '/keymod/rebirth/gamepad/gamepad-preset-xyab.webp',
            imageAlt: 'KeyCmd XYAB preset, Nintendo-style face buttons with WASD D-pad',
          },
          {
            label: 'Preset chip',
            imageSrc: '/keymod/rebirth/gamepad/gamepad-preset-layout.webp',
            imageAlt: 'KeyCmd gamepad preset picker, cycle layouts from the toolbar chip',
          },
        ],
      },
      editor: {
        title: 'Build your layout',
        body: 'Add D-pad, sticks, touchpads, and face buttons. Tap any module to tune behavior, size, and WASD mapping.',
        panels: [
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-edit-mode.webp',
            imageAlt: 'Gamepad module editor, configure stick, button, and touchpad modules',
            caption: 'Configure modules',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-add-mode.webp',
            imageAlt: 'Add modules to a gamepad preset: D-pad, stick, touchpad, buttons',
            caption: 'Add modules',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-hold-lock-turbo.webp',
            imageAlt: 'Diagonal swipe actions: hold lock and turbo per direction on mouse buttons',
            caption: 'Hold lock & turbo',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-mouse-button.webp',
            imageAlt: 'Fine-tune mouse buttons: press timing and turbo interval',
            caption: 'Mouse button timing',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-dpad-keys.webp',
            imageAlt: 'Map direction keys: D-pad cross vs split segments',
            caption: 'Map direction keys',
          },
          {
            imageSrc: '/keymod/rebirth/gamepad/gamepad-editor-scroll-strip.webp',
            imageAlt: 'Tune scroll strip: height and wheel sensitivity',
            caption: 'Scroll strip settings',
          },
        ],
      },
      share: {
        title: 'Share presets',
        body: 'Export layouts as JSON and share with your team. Background art embeds in the file. Same gamepad mode on KeyMod and KVM-GO.',
      },
    },
    gamepad: {
      badge: 'Gamepad mode · Preview',
      title: 'Phone as game controller',
      lead: 'KeyCmd gamepad mode: immersive, high-motion control from your phone.',
      body: 'High-motion gamepad demos from KeyCmd. Same stack works with KeyMod hardware.',
      mediaLabel: 'Gamepad video, Minecraft (IG)',
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
      body: 'Keynote, Google Slides, and deck control from your phone. Handy when you already have the dongle in your bag.',
      mediaLabel: 'Presentation remote scene',
      demoLinks: [{ label: 'Presentation tutorial', href: keymodLinks.presentationTutorial }],
    },
    aiChat: {
      badge: 'AI Chat · Preview',
      title: 'Gibby on your phone',
      lead: 'Chat with Gibby on KeyCmd. Agent actions on the target are still on the roadmap.',
      body: 'Gibby AI Chat pairs with KeyMod for conversational control. Preview builds are on the KeyCmd roadmap.',
      mediaLabel: 'Gibby AI Chat mascot and phone UI',
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
    fallbackNote: 'Instagram previews unavailable. Open posts directly:',
    viewOnInstagram: 'View on Instagram ↗',
    viewProfile: 'View profile',
    viewPostOnInstagram: 'View on Instagram',
  },
  keycmdBridge: {
    eyebrow: 'Software companion',
    title: 'Controlled from KeyCmd on your phone',
    body:
      'KeyCmd is the multi-mode console that powers KeyMod, a pocket USB bridge on the machine. Tiny dongle, full control. Built for rack ops, walk-ups, and everyday IT work.',
    cta: 'Meet KeyCmd',
    mediaLabel: 'KeyCmd welcome screen, pick a control mode',
  },
  crowdSupplyCampaign: {
    eyebrow: 'Crowd Supply',
    title: 'Pre-launch on Crowd Supply',
    body:
      'Back KeyMod Mini and Plus on Crowd Supply: pocket USB bridges that turn your phone into a wireless console. BIOS-capable HID, zero driver on the target.',
    cta: 'Pre-launch',
  },
  crowdSupplyOpensource: {
    eyebrow: 'Open by design',
    title: 'Open-source hardware & software',
    body:
      'KeyCmd, firmware, and hardware docs publish as the project matures, following the same open stack approach as Openterface Mini-KVM and KVM-GO.',
    cta: 'Pre-launch',
    badgesLabel: 'Open-source hardware and software',
    osiAlt: 'Open Source Initiative approved open-source license',
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
      'Product launches, firmware releases, and setup guides. At most one email per month. No spam.',
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
        a: 'No. KeyMod is USB HID on the target. BLE (or Plus USB) is phone ↔ KeyMod only—not a Bluetooth keyboard emulating into the host OS. Your PC never pairs with your phone over Bluetooth.',
      },
      {
        q: 'KeyMod Mini vs Plus?',
        a: 'Mini plugs into USB-C on the target and links to your phone over BLE. Plus plugs into USB-A and adds a USB wired path to your phone, which is steadier and has more bandwidth than BLE alone.',
      },
      {
        q: 'KM Basic vs KM Pro?',
        a: 'Both are Keyboard & Mouse modes inside KeyCmd—not separate products. KM Basic is keyboard, numpad, and touchpad only: simple, physical-style controls with nothing to learn. KM Pro adds strip shortcuts, Compose & Send, Saved texts, and Shortcut Hub for power-user workflows. Terminal is a separate KeyCmd mode (Preview today).',
      },
      {
        q: 'Does the target need software or drivers?',
        a: 'No. KeyMod emulates a standard USB keyboard and mouse. The target sees plug-and-play HID hardware—BIOS-capable, zero install on the host.',
      },
      {
        q: 'Does KeyMod capture video?',
        a: 'No. Use Mini-KVM or KVM-GO when you need the screen on your laptop.',
      },
      {
        q: 'Does Gamepad mode make the PC see an Xbox or PlayStation controller?',
        a: 'No. KeyCmd maps sticks and buttons to keyboard and mouse actions—the target sees standard keyboard + mouse HID, not native gamepad HID.',
      },
      {
        q: 'Why did the story change?',
        a: 'CH32 platform work pushed KeyMod toward a Wireless USB Multi-tool with a scenario-first launch story.',
      },
    ],
  },
  footer: {
    ctaPrimary: 'Subscribe',
    ctaKeycmd: 'KeyCmd app',
    legal: `© ${new Date().getFullYear()} TechxArtisan · Openterface KeyMod Rebirth preview`,
  },
  previewBanner: 'PREVIEW · /preview/keymod-rebirth/ · Phase 1 structure · not indexed',
};

const translations: Record<string, KeymodLandingStrings> = { en };

export function getKeymodLanding(locale = siteConfig.locale): KeymodLandingStrings {
  return translations[locale] ?? en;
}

export const keymodLanding = getKeymodLanding();
