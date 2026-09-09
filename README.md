# Folio, landing page

The marketing site for Folio, a personal photo archive manager, sold at a one-time price to an
English-speaking (primarily US) audience.

Astro 7, TypeScript and GSAP. Static output: the build is a folder of files you can drop on any
static host.

## Run it

```bash
npm install
npm run dev
```

Then open <http://localhost:4321>.

## Verify it

```bash
npm run verify
```

Runs `astro check` (types and templates), `astro build`, then `scripts/check-copy.mjs`, which
enforces the copy rules and reports what still has to happen before launch.

## Build and deploy

```bash
npm run build
```

Output lands in `dist/`. Any static host works with no configuration: Netlify, Vercel,
Cloudflare Pages, or GitHub Pages.

Set `site` in `astro.config.mjs` to your real domain first. It makes the social share image
absolute, which most networks require, and turns every remaining placeholder into a build error.

## Layout

```
src/config/site.ts     every commercial fact, in one typed file
src/data/              structured content: FAQ, comparison, cards, tiles
src/content/           long-form prose: legal, changelog, docs
src/components/        primitives, app mockups, page sections
src/scripts/           motion modules and the viewer
src/styles/            design system; section styles live with their component
docs/                  see below
legacy/                the pre-Astro site, kept until this one is signed off
```

## Read

- [Site map](docs/SITE_MAP.md), the task index. Start here to find the one file you need.
- [Launch checklist](docs/LAUNCH_CHECKLIST.md), the decisions still owned by a human.
- [Copy and motion](docs/COPY_AND_MOTION.md), the voice rules and what each animation claims.
- [Vision trace](docs/VISION_TRACE.md), which part of the page carries which promise.
- [Contributor rules](AGENTS.md).

## Before you publish

The site is safe to build and preview today, but it is not ready to sell: the checkout URL and
support email are placeholders and the legal pages are drafts. Work through
[the launch checklist](docs/LAUNCH_CHECKLIST.md). `npm run verify` lists what is outstanding.
