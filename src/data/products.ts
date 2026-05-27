import { docsPath, siteConfig } from '../config/site';
import { minikvmProduct } from './products/minikvm';
import { kvmgoProduct } from './products/kvmgo';

export interface ProductDocLink {
  label: string;
  href: string;
}

export interface ProductUseCaseCard {
  title: string;
  description?: string;
  href?: string;
}

export interface ProductSocialQuote {
  quote: string;
  author: string;
  href?: string;
}

export type ProductStatus = 'shipping' | 'pre-order' | 'pre-launch' | 'oshwa';

export interface Product {
  slug: string;
  title: string;
  slogan: string;
  subtitle: string;
  description: string;
  seoDescription: string;
  keywords: string;
  heroImage: string;
  heroImages: string[];
  /** Optional hero video embed (YouTube nocookie URL). */
  heroVideoEmbedUrl?: string;
  buyLabel: string;
  buyHref: string;
  /** Shipping / pre-order badge shown in ProductLandingV2 hero. */
  status?: ProductStatus;
  painPoints: string[];
  solutions: string[];
  hwFeatures: { title: string; description: string }[];
  swFeatures: { title: string; description: string }[];
  specs: { label: string; value: string }[];
  useCases: string[];
  /** Rich use-case cards for ProductLandingV2 strip. Falls back to useCases strings. */
  useCaseCards?: ProductUseCaseCard[];
  useCasesDocsHref?: string;
  specsDocsHref?: string;
  docsOverviewHref?: string;
  funding?: { amount: string; date: string; backers: string };
  socialProof?: ProductSocialQuote[];
  socialProofTitle?: string;
  /** catalogVideos.ts product key (may differ from marketing slug, e.g. kvm-go). */
  videoProductSlug?: string;
  videoSectionTitle?: string;
  latestNewsHref?: string;
  latestNewsTitle?: string;
  latestNewsSubtitle?: string;
  latestNewsLabel?: string;
  docLinks: ProductDocLink[];
  legacyBase: string;
}

export const products: Record<string, Product> = {
  keymod: {
    slug: 'keymod',
    title: 'Openterface KeyMod Series',
    slogan: 'Turn Your Phone into a Smart Keyboard',
    subtitle: 'Programmable keyboard and mouse control for tech, professionals, and gaming.',
    description:
      'A compact, programmable USB + Bluetooth HID emulator that turns your phone into a portable keyboard and trackpad console. Built on the proven HID core from Openterface Mini-KVM — plug and play, 100% open source.',
    seoDescription:
      'KeyMod Series turns your phone into a portable keyboard and trackpad. USB + Bluetooth HID emulator, open source, perfect for kiosks and workflow shortcuts.',
    keywords: 'KeyMod, HID emulator, phone keyboard, Bluetooth keyboard, USB keyboard, open source',
    heroImage: 'https://assets2.openterface.com/images/keymod/2in1.webp',
    heroImages: [
      'https://assets2.openterface.com/images/keymod/2in1.webp',
      'https://assets2.openterface.com/images/keymod/keymod.webp',
      'https://assets2.openterface.com/images/keymod/feature.webp',
    ],
    buyLabel: 'Support NOW',
    buyHref: siteConfig.links.keymodCrowdsupply,
    painPoints: [
      'Carrying a full keyboard for kiosk or TV setup is impractical',
      'Workflow shortcuts need programmable macros on the go',
      'Many HID tools are closed-source with limited customization',
    ],
    solutions: [
      'Use your phone as a portable keyboard and trackpad',
      'USB and Bluetooth HID in one compact device',
      '100% open source with Openterface app support',
    ],
    hwFeatures: [
      { title: 'Compact form factor', description: 'Fits in your pocket for field work and travel.' },
      { title: 'USB + Bluetooth', description: 'Dual connectivity for maximum device compatibility.' },
      { title: 'Open hardware', description: 'Transparent design built on proven Openterface HID core.' },
    ],
    swFeatures: [
      { title: 'KeyMod App', description: 'Configure macros, layouts, and gamepad profiles from your phone.' },
      { title: 'Cross-platform', description: 'Works with Android, iPadOS, and desktop hosts via Openterface apps.' },
      { title: 'Open source', description: 'Full stack available on GitHub for community contributions.' },
    ],
    specs: [
      { label: 'Connectivity', value: 'USB-C + Bluetooth LE' },
      { label: 'HID modes', value: 'Keyboard, mouse, gamepad' },
      { label: 'License', value: 'Open source hardware & software' },
    ],
    useCases: ['Smart TV & kiosk input', 'Mobile workflow macros', 'Gaming & accessibility setups'],
    docLinks: [
      { label: 'Features', href: docsPath('/product/keymod/features/') },
      { label: "What's in the Box", href: docsPath('/product/keymod/whats-in-the-box/') },
      { label: 'How to Connect', href: docsPath('/product/keymod/how-to-connect/') },
      { label: 'FAQs', href: docsPath('/product/keymod/faq/') },
      { label: 'Download KeyMod App', href: docsPath('/app/overview/') },
    ],
    legacyBase: '/product/keymod/',
  },
  'kvm-go': kvmgoProduct,
  minikvm: minikvmProduct,
  'uconsole-kvm-extension': {
    slug: 'uconsole-kvm-extension',
    title: 'uConsole KVM Extension',
    slogan: 'KVM Power for Your uConsole',
    subtitle: 'Turn the portable uConsole into a full KVM terminal.',
    description:
      'A hardware extension that adds KVM-over-USB capability to the Clockwork uConsole. Perfect for portable IT work with a built-in keyboard and display.',
    seoDescription:
      'uConsole KVM Extension adds KVM-over-USB to the Clockwork uConsole portable computer.',
    keywords: 'uConsole, KVM extension, portable KVM, Clockwork uConsole',
    heroImage: 'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    heroImages: [
      'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    ],
    buyLabel: 'Learn More',
    buyHref: docsPath('/product/uconsole-kvm-extension/'),
    painPoints: [
      'Portable consoles lack integrated KVM for headless targets',
      'Field technicians want one device for everything',
    ],
    solutions: [
      'Native uConsole form-factor extension board',
      'Full Openterface KVM stack on a pocketable device',
    ],
    hwFeatures: [
      { title: 'uConsole native', description: 'Designed specifically for Clockwork uConsole.' },
      { title: 'Compact PCB', description: 'Installs inside the uConsole chassis.' },
    ],
    swFeatures: [
      { title: 'Openterface apps', description: 'Same trusted software as Mini-KVM and KVM-GO.' },
      { title: 'Setup guides', description: 'Step-by-step hardware and software installation docs.' },
    ],
    specs: [
      { label: 'Compatibility', value: 'Clockwork uConsole' },
      { label: 'Certification', value: 'OSHWA certified' },
    ],
    useCases: ['Portable datacenter tool', 'Maker & homelab on the go'],
    docLinks: [
      { label: 'Hardware Installation', href: docsPath('/product/uconsole-kvm-extension/hardware-installation/') },
      { label: 'Software Setup', href: docsPath('/product/uconsole-kvm-extension/software-setup/') },
      { label: 'How to Connect', href: docsPath('/product/uconsole-kvm-extension/connect-to-target/') },
      { label: 'FAQs', href: docsPath('/product/uconsole-kvm-extension/faq/') },
    ],
    legacyBase: '/product/uconsole-kvm-extension/',
  },
  accessories: {
    slug: 'accessories',
    title: 'Openterface Accessories',
    slogan: 'Complete Your Setup',
    subtitle: 'Premium cables, adapters, and toolkit bags for professionals.',
    description:
      'Essential accessories including video adapters, high-speed cables, and storage solutions. Enhance your Openterface experience with quality gear from TxA Shop.',
    seoDescription: 'Openterface accessories — cables, adapters, toolkit bags, and video connectors.',
    keywords: 'KVM accessories, HDMI cable, USB-C cable, toolkit bag',
    heroImage: 'https://assets.openterface.com/images/cover.webp',
    heroImages: ['https://assets.openterface.com/images/cover.webp'],
    buyLabel: 'Shop NOW',
    buyHref: siteConfig.links.shop,
    painPoints: ['Missing the right cable in the field delays every fix'],
    solutions: ['Curated accessories tested with Openterface products'],
    hwFeatures: [
      { title: 'Video adapters', description: 'HDMI, VGA, and specialty connectors.' },
      { title: 'High-speed cables', description: 'USB-C and Type-A cables built for KVM workloads.' },
      { title: 'Toolkit bag', description: 'Organize your full Openterface kit.' },
    ],
    swFeatures: [],
    specs: [],
    useCases: ['Field kit organization', 'Video format conversion', 'Backup cables for IT go-bags'],
    docLinks: [
      { label: 'All SKUs', href: docsPath('/product/accessories/') },
      { label: 'TxA Shop', href: siteConfig.links.shop },
    ],
    legacyBase: '/product/accessories/',
  },
};

export const productSlugs = Object.keys(products);
