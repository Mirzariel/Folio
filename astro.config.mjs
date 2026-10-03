// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` makes og:image and twitter:image absolute; X and most social networks
// will not resolve a relative one. It is also the canonical origin, so it must
// be the primary domain in Vercel (apex redirects to www), not the Vercel one.
// See docs/LAUNCH_CHECKLIST.md.
export default defineConfig({
  site: 'https://www.foliolibrary.app',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'ignore',
  /* Astro 7 defaults this to 'jsx', which collapses the whitespace around a
     newline and welds words onto inline tags: "asks you to<em>check</em>".
     HTML whitespace rules are what prose needs. Do not change this back. */
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
