import type { EcosystemNavLabels } from '../lib/ecosystem-nav';

export const enNavLabels: EcosystemNavLabels = {
  products: 'Products',
  allProducts: 'All Products',
  keymodSeries: 'KeyMod Series',
  kvmGoSeries: 'KVM-GO Series',
  miniKvm: 'Mini-KVM',
  kvmExt: 'uConsole KVM Extension',
  accessories: 'Accessories',
  apps: 'Apps',
  allApps: 'All Apps',
  kvmControl: 'Openterface KVM',
  keycmd: 'KeyCmd',
  docs: 'Docs',
  productDocs: 'Docs →',
  productFaqs: 'FAQs',
  allDocumentation: 'All documentation →',
  media: 'Media',
  news: 'News',
  forum: 'Forum',
  forumNewBadge: 'New',
};

/** Alias so shared mega-menu code can import one symbol across EN + locale sites. */
export const localeNavLabels = enNavLabels;

export const enNavMobile = {
  ecosystem: 'Ecosystem',
};
