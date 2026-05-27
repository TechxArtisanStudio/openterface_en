import { docsPath, siteConfig } from '../config/site';
import { minikvmProduct } from './products/minikvm';
import { kvmgoProduct } from './products/kvmgo';
import { keymodProduct } from './products/keymod';
import { kvmextProduct } from './products/kvmext';

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
  keymod: keymodProduct,
  'kvm-go': kvmgoProduct,
  minikvm: minikvmProduct,
  'uconsole-kvm-extension': kvmextProduct,
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
