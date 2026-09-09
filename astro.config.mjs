// @ts-check
import { defineConfig } from 'astro/config';

// TODO before launch: set `site` to the real domain. The absolute og:image and
// twitter:image URLs derive from it, and most social networks will not resolve
// a relative one. See docs/LAUNCH_CHECKLIST.md.
export default defineConfig({
  site: undefined,
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
