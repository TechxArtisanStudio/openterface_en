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
  }
};
