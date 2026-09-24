# AGENTS.md

Work as a senior front-end engineer. Prioritize correctness, honesty of claims, accessibility
and simplicity. This is a marketing site for a product whose whole pitch is trustworthiness,
so a false or stale claim on this page is a product defect, not a copy nit.

## Read by task

Start with [the site map](docs/SITE_MAP.md) and open only the row you need. It maps every task
to one component and one content source. Do not read the whole tree to change one sentence.

[Vision](../Folio-WinUI/docs/product/FOLIO_VISION.md) explains why Folio exists;
[copy and motion](docs/COPY_AND_MOTION.md) defines the voice and what each animation claims;
[vision trace](docs/VISION_TRACE.md) records which part of the page carries which promise;
[launch checklist](docs/LAUNCH_CHECKLIST.md) lists the decisions still owned by a human.

## Content boundary

- **Commercial facts live in `src/config/site.ts` and nowhere else.** Price, device count,
  update scope, platform status, the design-canvas figures. Import `site` or
  `display`; never retype a number. `npm run check:copy` fails the build on a hard-coded one.
- **Structured lists live in `src/data/`.** FAQ answers, comparison rows, safety cards, gallery
  tiles, mockup rows. FAQ is data rather than Markdown because its answers state commercial
  facts and must interpolate from `site.ts`.
- **Long-form prose lives in `src/content/`** as Markdown: legal, changelog, docs.
- **Presentation lives in components.** A section file should read as structure plus a scoped
  `<style>`, not as a wall of copy.

## Claims

- Never state a release date for anything in development. macOS and phone import are direction,
  not delivery, and the page says so in three places: the roadmap tags, the pricing footnote,
  and the Mac and iPhone FAQ answers. Keep all three.
- Never add a testimonial, review, user count or logo that is not real. The social-proof slot in
  `src/pages/index.astro` is deliberately empty and commented; leave it empty until there are
  real users who gave permission in writing.
- Never soften a safety guarantee: recoverable removal through the Recycle Bin, one copy always
  remains, content-based duplicate proof, protected backups, honest interrupted-job reporting.
  These mirror the application's own ADRs (0014 and 0015). The old `.Folio` quarantine folder
  is a legacy path the new engine does not use; do not advertise it.
- Do not promise "risk free". The page refuses to, on purpose.

## Copy rules

- **No em dashes.** Split with periods, colons and commas. Hyphenated compounds stay, because
  they are spelling rather than punctuation. The check enforces zero.
- American spelling (organize, catalog), because the market is the US.
- Headings follow the motif `You X. Folio Y.`, except the promise section, which keeps the
  vision's own line: "Understand before you move. Verify before you remove."
- Line breaks in `SplitHeading` are authorial. One sentence per line.

## Implementation

- Astro 7, TypeScript strict, GSAP. Static output. No new dependency without a reason.
- Every `.astro` file stays under 150 lines. The check enforces it. Split rather than sprawl.
- Global CSS is the design system only: `tokens`, `reset`, `base`, `components`, `mockup`,
  `reduced-motion`. Section-specific rules belong in that component's scoped `<style>`.
- Mockup windows size themselves with **container queries**, never viewport media queries.
- Motion belongs in `src/scripts/motion/`, one module per claim, registered through
  `gsap.matchMedia()`. Interaction belongs outside it, so a preference change cannot kill a
  control. Reduced motion is a complete second design in which every interaction still works.
- Do not depend on `requestAnimationFrame` for a state a user needs. A tab that never paints
  must still be able to close the viewer.
- Images go through `astro:assets`. Icons are files in `src/icons/`, inlined by `Icon.astro`.

## Validation

```bash
npm run verify
```

Runs `astro check`, `astro build`, then `scripts/check-copy.mjs`. The copy check reports two
kinds of finding: **errors** always fail; **launch blockers** (placeholder email, relative
og:image, dead links, draft legal pages) become errors the moment `site` is set in
`astro.config.mjs`, so placeholders cannot reach a buyer.

Report changed behavior, what you verified, and what you could not.
