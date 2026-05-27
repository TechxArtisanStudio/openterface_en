// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://openterface.com',
  trailingSlash: 'always',
  // site-refactor-redirects:start (Phase 1B: full slug-map redirects)
  redirects: {
    '/products/keymod/': '/keymod/',
    '/products/kvm-go/': '/kvmgo/',
    '/products/minikvm/': '/minikvm/',
    '/products/uconsole-kvm-extension/': '/kvmext/',
    '/products/accessories/': '/accessories/',
    '/use-cases/': '/products/',
  },
  // site-refactor-redirects:end
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      namespaces: { news: false, video: false, xhtml: false },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
