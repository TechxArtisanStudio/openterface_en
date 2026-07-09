// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://openterface.com',
  trailingSlash: 'always',
  // site-refactor-redirects:start (Phase 1B: full slug-map redirects)
  redirects: {
    '/preview/keymod-rebirth/': '/keymod/',
    '/products/keymod/': '/keymod/',
    '/products/kvm-go/': '/kvmgo/',
    '/products/minikvm/': '/minikvm/',
    '/products/uconsole-kvm-extension/': '/kvmext/',
    '/products/accessories/': '/accessories/',
    '/use-cases/': '/products/',
    '/product/': '/products/',
    '/app/': '/apps/',
    '/videos/': '/media/',
    '/appointment/': 'https://calendar.app.google/9nyjjpA9m3TUpzsaA',
    '/support/appointment/': 'https://calendar.app.google/9nyjjpA9m3TUpzsaA',
  },
  // site-refactor-redirects:end
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/preview/'),
      namespaces: { news: false, video: false, xhtml: false },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['of.youyoubilly.com', 'nova.youyoubilly.com', '45.40.228.92'],
    },
  },
});
