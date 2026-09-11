# Site map, the task index

Read [AGENTS](../AGENTS.md) first, then find your row and open only what it names. Paths are
repository-relative. The point of this table is that changing one sentence should cost one
small file, not the whole page.

Commercial facts never live in a component. They come from `src/config/site.ts` through `site`
(raw values) or `display` (formatted strings), and `npm run check:copy` fails on a literal.

## Landing page

| Task | Component | Content source |
|---|---|---|
| Price, device count, checkout URL, support email | any | **src/config/site.ts** |
| Hero copy, the scattered-to-ordered prints | src/components/sections/Hero.astro | src/data/gallery.ts (`prints`) |
| Hub window, four figures, three doors | src/components/mockup/HubScreen.astro | src/data/mockup.ts (`doors`, `hubStats`) |
| The problem section, three figures | src/components/sections/Problem.astro | src/data/problem.ts |
| How it works, three steps | src/components/sections/HowItWorks.astro | src/data/steps.ts |
| Gallery wall and its tiles | src/components/mockup/GalleryScreen.astro | src/data/gallery.ts (`tiles`) |
| Gallery scale and kind controls | src/components/mockup/GalleryScreen.astro | behaviour in src/scripts/interactions.ts |
| Photograph viewer | src/components/Viewer.astro | behaviour in src/scripts/viewer.ts |
| Organize / duplicates / rename cards | src/components/sections/Jobs.astro, mockup/DuplicateCard.astro, mockup/RenameCard.astro | src/data/mockup.ts |
| The plan window, Plan to Done | src/components/mockup/PlanScreen.astro | src/data/mockup.ts (`planRows`, `planFlow`) |
| Six safety cards | src/components/sections/Safety.astro | src/data/safety.ts |
| Local-first section | src/components/sections/Private.astro | inline, one section |
| Comparison table | src/components/sections/Compare.astro | src/data/compare.ts |
| Roadmap, the two in-development items | src/components/sections/Roadmap.astro | src/data/roadmap.ts |
| Pricing card and the included list | src/components/sections/Pricing.astro | src/config/site.ts |
| FAQ | src/components/sections/Faq.astro | **src/data/faq.ts** |
| Feedback and feature requests | src/components/sections/Feedback.astro, src/components/FeedbackForm.astro | src/data/feedback.ts, behaviour in src/scripts/feedback.ts, Web3Forms key in src/config/site.ts |
| Final call to action | src/components/sections/FinalCta.astro | inline |
| Live-surface cue on a mockup | src/components/mockup/Window.astro (`cue`, `cueHint`) | inline, per section |
| Section order on the page | src/pages/index.astro | — |

## Other pages

| Task | Route | Source |
|---|---|---|
| Privacy, Terms, License | /privacy /terms /license | src/content/legal/*.md, rendered by src/pages/[legal].astro |
| Release notes | /changelog | src/content/changelog/*.md |
| Download page | /download | src/pages/download.astro |
| Documentation | /docs, /docs/... | src/content/docs/*.md, src/pages/docs/ |

Legal pages carry `draft: true` until a human has written and approved them. While a page is a
draft it renders a visible notice, and once `site` is set in `astro.config.mjs` the draft flag
fails the build. See [the launch checklist](LAUNCH_CHECKLIST.md).

## Chrome, layout and system

| Task | File |
|---|---|
| Head, meta, Open Graph, page shell | src/layouts/BaseLayout.astro |
| Long-form page shell | src/layouts/ProseLayout.astro |
| Nav, links, mobile menu | src/components/chrome/Nav.astro, src/data/navigation.ts |
| Footer and its columns | src/components/chrome/Footer.astro, src/data/navigation.ts |
| Sticky mobile buy bar | src/components/chrome/BuyBar.astro |
| Buy buttons, checkout fallback | src/components/primitives/BuyButton.astro |
| Icons | src/icons/*.svg, src/components/primitives/Icon.astro |
| Palette and theme tokens | src/styles/tokens.css |
| Type roles, sections, grids | src/styles/base.css |
| Buttons, cards, trust rows, reveal | src/styles/components.css |
| App-window chrome and file rows | src/styles/mockup.css |
| Reduced-motion second design | src/styles/reduced-motion.css |

## Motion

One module per claim, in `src/scripts/motion/`. All are registered through `gsap.matchMedia()`
in `motion/index.ts` and receive a `reduced` flag.

| Module | Claim |
|---|---|
| heroPrints.ts | scattered photographs become an ordered archive |
| counters.ts | these are figures Folio actually holds |
| scanSweep.ts | this is the scan populating the wall |
| planRunner.ts | you approve, then Folio does it and verifies it |
| dupeCollapse.ts | quarantine frees nothing until you reclaim |
| renameType.ts | the preview updates before you commit |
| reveal.ts, navProgress.ts, tilt.ts | infrastructure, no claim |
| loop.ts | infrastructure: a demo repeats while on screen, and only while on screen |

Interaction that must survive a preference change (menu, FAQ, viewer) is registered outside
matchMedia, in `src/scripts/interactions.ts` and `src/scripts/viewer.ts`.

## Not in the read path

`legacy/` is the pre-Astro site, kept only until this build is signed off. `node_modules/`,
`dist/` and `.astro/` are denied in `.claude/settings.json` so searches never walk them.
