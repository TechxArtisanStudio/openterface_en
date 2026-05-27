// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://openterface.com',
  trailingSlash: 'always',
  // site-refactor-redirects:start (Phase 1C: minikvm only; expand in 1D–1G)
  redirects: {
    '/products/minikvm/': '/minikvm/',
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
