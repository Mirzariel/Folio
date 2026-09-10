# How the site tracks FOLIO_VISION.md

The page was audited line by line against the vision. This records which part carries which
promise, so a future edit can tell what it would be dropping.

Source: `../Folio-WinUI/docs/product/FOLIO_VISION.md`.

| Vision | On the site |
|---|---|
| S1 the core value is *rasa tenang*, peace of mind backed by evidence and user control | the hero sub-line, and the closing section |
| S1, S3 photos hold *kenangan*, memories | the headline motif |
| S2 identity: personal photo archive manager, and the four things it is not | hero lede, and the comparison section |
| S3 the five user outcomes | the problem, how it works, and safety sections |
| S4 four pillars: organize, duplicate, rename, transfer from phone | three doors ship today; the fourth pillar has its own roadmap card rather than a footnote |
| S5 Maintain, the collection keeps growing | the closing section |
| S6 understand before you move, verify before you remove | the promise section, wording unchanged |
| S6 say what you know and what you do not | *likely* vs *verified*, and quarantine "frees 0 B now" |
| S6 the catalogue is not a backup | the local-first section says so outright |
| S6 no invented health score, no storage visualisation | the site has none, and the caption under the hub says so |
| S6 no "risk free" promise | the safety section opens by refusing to make one |
| S6 calm and minimal | the reason the hero-to-window junction was rebuilt, see below |

## Where the page originally broke the vision

The trust checklist sat with **zero pixels** between it and the app window, wrapping into two
ragged rows, and the window itself was squeezed to a 2.24 aspect against the application's real
1.6, which compressed every internal element. That is exactly the "chrome announcing the absence
of chrome" that S6 warns about. The window now has its own section with room around it, and the
trust row is one line with its own space.

## What is claimed as shipping, and what is not

| Claimed as shipping | Claimed as in development |
|---|---|
| Catalogue and gallery, metadata, exact duplicates | Import from a connected phone or camera |
| Recoverable cleanup via the Recycle Bin | Folio for macOS |
| Quarantine to the `.Folio` folder, with restore | |
| Rename in bulk with preview | |
| Organize by capture date within one source | |
| Plan, approve, verify on every mutation | |

Three places state the roadmap explicitly rather than blurring it: the roadmap section tags both
items *In development*, the pricing footnote repeats that Windows is what ships today, and the
FAQ answers the iPhone and Mac questions with a plain no plus "no release date".

**Keep all three.** A buyer who thought they were paying for phone import
costs more than the sale.

## The numbers

The figures in the mockups (128,432 photographs, 84.2 GB reclaimable, 3,208 single copies,
12,480 files) come from Folio's own design canvas. The page says so in small print under the
figures. They live in `site.canvas` and are not measured averages or marketing estimates.

## Accessibility and performance

- Landmarks, one `h1` per page, real `<table>` markup for the comparison, `<details>` for the FAQ.
- Gallery tiles are real buttons with accessible names. The viewer keeps focus inside itself and
  returns it to the tile you opened. Escape closes, arrow keys move between photographs.
- The plan flow is `aria-live="polite"`, so its state changes are announced.
- Everything per-frame animates `transform` and `opacity` only.
- The reveal is gated on `.js`, so with scripting disabled the page is static and complete.
- Colour pairs come from Folio's palette, which its own canvas guards at 4.5:1 for text and 3:1
  for control edges.
- Photographs are converted to WebP at build time by `astro:assets`.
