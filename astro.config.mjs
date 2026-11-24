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
    '/community/': 'https://forum.openterface.com/',
    '/appointment/': 'https://calendar.app.google/9nyjjpA9m3TUpzsaA',
    '/support/appointment/': 'https://calendar.app.google/9nyjjpA9m3TUpzsaA',
    // Apex CF rules only match the trailing-slash form; these origin stubs
    // let GitHub Pages 301 the bare /qt form to /qt/ so the rule can fire.
    '/qt/': 'https://github.com/TechxArtisanStudio/Openterface_QT',
    '/window/': 'https://github.com/TechxArtisanStudio/Openterface_QT',
    '/linux/': 'https://github.com/TechxArtisanStudio/Openterface_QT',
    '/macos/': 'https://github.com/TechxArtisanStudio/Openterface_MacOS',
    '/android/': 'https://github.com/TechxArtisanStudio/Openterface_Android',
    '/playstore/': 'https://play.google.com/store/apps/details?id=com.openterface.AOS',
    '/flathub/': 'https://flathub.org/apps/com.openterface.openterfaceQT',
    '/webapp/': 'https://openterface-viewer.pages.dev/',
    '/hardware/': 'https://github.com/TechxArtisanStudio/Openterface_Mini-KVM_Hardware',
    '/open-hardware/': 'https://github.com/TechxArtisanStudio/Openterface_Mini-KVM_Hardware',
    '/oshw/': 'https://certification.oshwa.org/cn000015.html',
    '/order/': 'https://www.crowdsupply.com/techxartisan/openterface-mini-kvm',
    '/buy-mini-kvm/': 'https://www.crowdsupply.com/techxartisan/openterface-mini-kvm',
    '/appstore/': 'https://apps.apple.com/us/app/openterface-mini-kvm/id6478481082',
    '/shop/': 'https://shop.techxartisan.com/',
    '/feedback/': 'https://forms.gle/YJLrCKwro8tbi6ar7',
    // KeyMod declarations of conformity.
    // Canonical routes live under /keymod/compliance/; the shorter
    // /keymod/<sku>/<eu|uk>-doc/ form is printed on packaging. Both forms point
    // straight at the PDF and never at another route, because these are static
    // meta-refresh stubs rather than HTTP redirects: chaining them fails silently.
    '/keymod/compliance/plus/eu-doc/': 'https://assets.openterface.com/keymod/keymod-plus-eu-declaration.pdf',
    '/keymod/compliance/plus/uk-doc/': 'https://assets.openterface.com/keymod/keymod-plus-uk-declaration.pdf',
    '/keymod/compliance/mini/uk-doc/': 'https://assets.openterface.com/keymod/keymod-mini-uk-declaration.pdf',
    '/keymod/plus/eu-doc/': 'https://assets.openterface.com/keymod/keymod-plus-eu-declaration.pdf',
    '/keymod/plus/uk-doc/': 'https://assets.openterface.com/keymod/keymod-plus-uk-declaration.pdf',
    '/keymod/mini/uk-doc/': 'https://assets.openterface.com/keymod/keymod-mini-uk-declaration.pdf',
    // KeyMod Mini EU DoC is still in certification, so this route resolves to the
    // status page instead of a PDF. When keymod-mini-eu-declaration.pdf is
    // published, point this and /keymod/compliance/mini/eu-doc/ straight at it.
    '/keymod/mini/eu-doc/': '/keymod/compliance/mini/eu-doc/',
  },
  // site-refactor-redirects:end
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/preview/') &&
        // Holding page for the pending KeyMod Mini EU DoC (noindex) — drop once the PDF lands.
        !page.includes('/keymod/compliance/mini/eu-doc'),
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
