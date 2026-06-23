export interface MarketingUi {
  docLinkBanner: {
    aboutMessage: string;
    homeMessage: string;
    productMessage: string;
    linkLabel: string;
  };
  homeSubscribe: {
    kicker: string;
    heading: string;
    description: string;
    benefitCrowdfunding: string;
    benefitGuides: string;
    benefitUnsubscribe: string;
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    footnote: string;
  };
  productSubscribe: {
    kicker: string;
    heading: string;
    description: string;
    benefitCrowdfunding: string;
    benefitGuides: string;
    benefitUnsubscribe: string;
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    footnote: string;
  };
  siteFooter: {
    tagline: string;
    productsHeading: string;
    keymodSeries: string;
    kvmGoSeries: string;
    miniKvm: string;
    accessories: string;
    resourcesHeading: string;
    videos: string;
    faqs: string;
    apps: string;
    support: string;
    newsletterLink: string;
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterSubmit: string;
    newsletterNamePlaceholder: string;
    newsletterEmailPlaceholder: string;
    newsletterFootnote: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  productLanding: {
    downloadApp: string;
    backers: string;
    theProblem: string;
    theSolution: string;
    hwSoftwareTitle: string;
    hwSoftwareSubtitle: string;
    hardware: string;
    software: string;
    swFallback: string;
    keySpecs: string;
    useCases: string;
    documentation: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
}

export const ui: MarketingUi = {
  "docLinkBanner": {
    "aboutMessage": "Product guides, FAQs, tutorials, and app downloads live on docs.openterface.com.",
    "homeMessage": "Tutorials, FAQs, app downloads, and product guides are on docs.openterface.com.",
    "productMessage": "Detailed specs, setup guides, and FAQs are on docs.openterface.com.",
    "linkLabel": "Open documentation ↗"
  },
  "homeSubscribe": {
    "kicker": "Stay in the loop",
    "heading": "Get KVM-GO, KeyMod & Mini-KVM updates first",
    "description": "Product launches, firmware releases, and practical IT tips — delivered at most once a month. No spam, just useful news from the Openterface team.",
    "benefitCrowdfunding": "Early access to crowdfunding and pre-order windows",
    "benefitGuides": "Setup guides and app release notes",
    "benefitUnsubscribe": "Unsubscribe anytime with one click",
    "submitLabel": "Subscribe for updates",
    "namePlaceholder": "Name (optional)",
    "emailPlaceholder": "Email address *",
    "footnote": "At most one email per month. Unsubscribe anytime. For inquiries: info@openterface.com"
  },
  "siteFooter": {
    "tagline": "Ultra-compact KVM-over-USB solutions for IT professionals.",
    "productsHeading": "Products",
    "keymodSeries": "KeyMod Series",
    "kvmGoSeries": "KVM-GO Series",
    "miniKvm": "Mini-KVM",
    "accessories": "Accessories",
    "resourcesHeading": "Resources",
    "videos": "Videos",
    "faqs": "FAQs",
    "apps": "Apps",
    "support": "Support",
    "newsletterLink": "Newsletter",
    "newsletterTitle": "Newsletter",
    "newsletterDescription": "Early access to launches, monthly product & firmware updates, and KVM tips — at most one email per month.",
    "newsletterSubmit": "Subscribe",
    "newsletterNamePlaceholder": "Name",
    "newsletterEmailPlaceholder": "Email *",
    "newsletterFootnote": "Unsubscribe anytime.",
    "copyright": "Openterface. Open-source KVM-over-USB.",
    "privacy": "Privacy",
    "terms": "Terms"
  },
  "productLanding": {
    "downloadApp": "Download App",
    "backers": "Backers",
    "theProblem": "The Problem",
    "theSolution": "The Solution",
    "hwSoftwareTitle": "Hardware + Software",
    "hwSoftwareSubtitle": "Openterface products work best with our open-source host apps.",
    "hardware": "Hardware",
    "software": "Software",
    "swFallback": "See TxA Shop for accessory compatibility details.",
    "keySpecs": "Key Specs",
    "useCases": "Use Cases",
    "documentation": "Documentation",
    "ctaTitle": "Ready to get started?",
    "ctaSubtitle": "Order hardware and download the Openterface app for your platform."
  },
  "productSubscribe": {
    "kicker": "Stay in the loop",
    "heading": "Get {product} launch & firmware updates",
    "description": "Be first to know about pre-orders, firmware releases, and setup tips for this product — at most one email per month.",
    "benefitCrowdfunding": "Early access to crowdfunding and pre-order windows",
    "benefitGuides": "Setup guides and app release notes",
    "benefitUnsubscribe": "Unsubscribe anytime with one click",
    "submitLabel": "Subscribe for updates",
    "namePlaceholder": "Name (optional)",
    "emailPlaceholder": "Email address *",
    "footnote": "At most one email per month. Unsubscribe anytime."
  }
};
