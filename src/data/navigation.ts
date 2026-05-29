import { siteConfig } from '../config/site';
import { buildEcosystemNav, type NavItem } from '../lib/ecosystem-nav';
import { enNavLabels } from '../i18n/nav';

export type { NavItem };

export const mainNav: NavItem[] = buildEcosystemNav('marketing', siteConfig.locale, enNavLabels);
