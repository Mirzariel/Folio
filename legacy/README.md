# Folio, landing page

A static marketing site for Folio at **$20 USD, one-time**, aimed at an English-speaking
(primarily US) audience.

Plain HTML, CSS and one small JavaScript file. No build step, no framework, no dependencies.
Drop the folder on any static host and it works.

```
index.html            the whole page
assets/styles.css     design system, components, and the reduced-motion second design
assets/main.js        every interaction, plus CHECKOUT_URL at the top
assets/brand/         Folio mark and logo, copied from src/Folio/Assets
assets/img/           editorial photographs (Unsplash) + og-card.png, the 1200x630 share card
assets/tiles/         square photographs used in the gallery mockup (Unsplash)
serve.mjs             a 40-line local preview server (optional)
```

## Preview it

```bash
node serve.mjs
```

Then open <http://localhost:4321>. Opening `index.html` directly from disk also works.

---

## Before you go live: do these seven things

Everything below is a deliberate placeholder or an unconfirmed commitment. Nothing here is a
bug; they are decisions only you can make.

### 1. Set the checkout URL

Top of `assets/main.js`:

```js
var CHECKOUT_URL = '';
```

Paste the link from your payment provider (Gumroad, Lemon Squeezy, Paddle, Polar, a Stripe
Payment Link). Every "Get Folio" button picks it up automatically. While it is empty, the
buttons scroll to the pricing section, so the page is safe to publish before the store exists.

> For the US market, prefer a provider that acts as **merchant of record** (Paddle, Lemon
> Squeezy, Gumroad). They handle US sales tax and EU VAT for you. Stripe alone does not.

### 2. Confirm the two binding promises

These are commitments to every buyer, not facts about the code. Both are stated plainly on the
page, so they need to be true.

| Promise | Where it appears | Decide |
|---|---|---|
| **macOS at no extra cost when it ships** | pricing list, `price__foot`, the roadmap card, the Mac FAQ answer | Are you really giving Windows buyers the Mac build free? If macOS slips two years or gets cancelled, this is the line people will quote back at you. The page deliberately repeats "no release date" next to it, which is your protection. |
| **Up to 3 personal devices** | pricing list, and the "How many computers" FAQ | `3` is the number currently written. Search `index.html` for `3 of your personal devices` and `Up to 3 devices`. Whatever you pick must match what your licence server actually enforces. |

Also confirm: all version 1 updates free, and refund within 14 days.

### 3. Replace the email address

`hello@example.com` appears twice: in the pricing section and in the footer.

### 4. Write the legal pages

The footer links to `#` for Privacy, Terms and License. Most payment providers require a real
privacy policy and refund policy before they approve an account.

### 5. Absolute URL for the social share image

A 1200x630 card is included at `assets/img/og-card.png`. It is referenced by a **relative**
path, which most social networks will not resolve. Once you have a domain:

```html
<meta property="og:image" content="https://yourdomain.com/assets/img/og-card.png">
<meta name="twitter:image" content="https://yourdomain.com/assets/img/og-card.png">
```

The card is generated from the site's palette; its headline is set in Georgia because it was
composed on Windows. If you re-cut it in a design tool, Spectral Semibold is the correct face.

### 6. Add analytics, if you want any

There is none. A privacy-respecting, cookie-free option (Plausible, Fathom, Umami) fits a
product whose whole pitch is "nothing is uploaded" far better than Google Analytics does.

### 7. Decide on the spelling

The page uses American spelling (*organize*, *catalog*) including inside the UI mockups, because
the target market is the US. The application currently ships British spelling (*Organise*).
Align one way or the other so a buyer's first screen matches the page that sold it to them.

---

## Voice and copy rules

**The motif.** Headings follow `You X. Folio Y.`, taken from the tagline the owner chose:

> You capture the moments. Folio organizes the memories.

It runs through the page: *You choose the source, Folio reads it* · *You see photographs, Folio
handles the filenames* · *You keep the memories, Folio keeps the proof* · *You already took the
photographs, let Folio do the rest*. The one heading that does **not** follow it is the promise
section, because "Understand before you move. Verify before you remove." is the vision's own
line and outranks the pattern.

The hero sub-line still carries the official `FOLIO_VISION.md` tagline ("You take the
photographs. Folio looks after the archive") so the documented promise survives on the page.

**No em dashes.** There are zero `—` characters in `index.html`, by request. Sentences are split
with periods, colons and commas instead. Hyphenated compounds stay, because they are spelling
rather than punctuation: `byte-for-byte`, `one-time`, `local-first`, `14-day`. If you edit the
page, keep it that way:

```bash
grep -c '&mdash;\|—' index.html   # must print 0
```

---

## How the page tracks FOLIO_VISION.md

The page was audited line by line against the vision. What each part is carrying:

| Vision | On the page |
|---|---|
| §1 the core value is *rasa tenang*, peace of mind backed by evidence and user control | the hero sub-line, and the closing section |
| §1, §3 photos hold *kenangan*, memories | the headline motif |
| §2 identity: personal photo archive manager, and the four things it is not | hero lede |
| §3 the five user outcomes | problem, how it works, safety |
| §4 four pillars: organize, duplicate, rename, transfer from phone | three doors ship today; the fourth pillar has its own roadmap card rather than a footnote |
| §5 Maintain, the collection keeps growing | the closing section |
| §6 understand before you move, verify before you remove | the promise section, unchanged wording |
| §6 say what you know and what you do not | *likely* vs *verified*, quarantine "frees 0 B now" |
| §6 the catalogue is not a backup | the local-first section says so outright |
| §6 no invented health score, no storage visualisation | the page has none and says so under the hub |
| §6 no "risk free" promise | the safety section opens by refusing to make one |
| §6 calm and minimal | the reason the hero-to-window junction was rebuilt, see below |

**Where the page originally broke the vision.** The trust checklist sat with **zero pixels**
between it and the app window, wrapping into two ragged rows, and the window itself was squeezed
to a 2.24 aspect against the app's real 1.6, which compressed every internal element. That is
exactly the "chrome announcing the absence of chrome" §6 warns about. The window is now 1.84 and
has its own section with room around it.

### What is claimed as shipping, and what is not

| Claimed as shipping | Claimed as in development |
|---|---|
| Catalogue and gallery, metadata, exact duplicates | Import from a connected phone or camera |
| Recoverable cleanup via the Recycle Bin | Folio for macOS |
| Quarantine to `.Folio`, with restore | |
| Rename in bulk with preview | |
| Organize by capture date within one source | |
| Plan, approve, verify on every mutation | |

Three places state the roadmap explicitly rather than blurring it: the `#next` section tags both
items *In development*, the pricing footnote repeats that Windows is what ships today, and the
FAQ answers the iPhone and Mac questions with a plain no plus "no release date". Keep all three.
A refund request from someone who thought they were buying phone import costs more than the sale.

**The numbers** in the mockups (128,432 photographs, 84.2 GB reclaimable, 12,480 files) come
from Folio's own design canvas. The page says so in small print under the figures.

---

## The motion, and what each piece claims

The vision asks the **application** to be calm, because there motion competes with someone
trying to work. A landing page has the opposite duty. The rule kept here is not *less motion*,
it is **every motion carries a claim**:

| Motion | Claim |
|---|---|
| The hero prints fly from a scattered pile into an ordered grid as you scroll | scattered photographs become an ordered archive. This is the whole pitch, before a word is read |
| The four hub statistics count up | these are figures Folio actually holds |
| A light bar sweeps the gallery and tiles resolve behind it | this is the scan populating the wall |
| Clicking a tile grows it into the viewer; Escape puts it back | the spec's own connected enlargement, including "Escape reads as putting a print down". The mat is neutral `#0E0E0E`, because a photograph judged against warm archival paper is judged wrongly |
| The plan runs itself: rows tick, the counter races, Plan to Done | you approve, then Folio does it and verifies it |
| Three duplicates slide into `.Folio` and one stays | quarantine frees nothing until you reclaim, and the figure says so |
| The rename pattern types itself and the preview rewrites live | the preview updates before you commit |

The hero glow is the only thing that loops, and it is nearly imperceptible.

**Reduced motion is a complete second design, not a switch that breaks things.** Under
`prefers-reduced-motion: reduce` the prints arrive already in the grid, the wall arrives already
scanned, the counters show their real values, and **every interaction still works**, without
transitions. Verified by injecting the media block's rules and confirming `--p` resolves to 1
with an identity transform.

### Editing the hero animation

Each print carries its scattered offset as inline custom properties in `index.html`:

```html
<div class="prints__p" style="--dx:37%; --dy:32%; --dr:-9deg; --ds:.34; --z:3">
```

The element is positioned at its **final grid slot** in CSS; `--dx/--dy/--dr/--ds` are the offset
from there to the pile, multiplied by `(1 - var(--p))`. `--dx` and `--dy` are percentages of the
print's own size, `--dr` a rotation, `--ds` an extra scale. Set `--p` to 1 in devtools to see the
ordered state on its own.

---

## Social proof, deliberately empty

There is a commented-out placeholder in `index.html` where testimonials would go. It is empty on
purpose: invented customer quotes convert well right up until the first person checks one, and a
product selling *trust* cannot afford to be caught inventing trust.

When you have real early users, this markup drops in just before the `<!-- faq -->` section:

```html
<section class="sect t-dark sect--tight" id="voices">
  <div class="wrap">
    <div class="head head--center rv">
      <p class="eyebrow eyebrow--center">Early users</p>
      <h2 class="h2">What people did with it.</h2>
    </div>
    <div class="grid g-3" style="margin-top:clamp(32px,4vw,48px)">

      <figure class="card rv">
        <blockquote style="font-size:16px;line-height:1.6;color:var(--t2)">
          &ldquo;Real quote, in their own words. The best ones name the situation:
          how many photos, how many drives, what they were afraid of.&rdquo;
        </blockquote>
        <figcaption class="small" style="margin-top:auto;padding-top:10px">
          <b style="color:var(--t1)">Name</b> &middot; what they shoot or why they cared
        </figcaption>
      </figure>

      <!-- two more of the same -->

    </div>
  </div>
</section>
```

Ask for permission in writing, use a real first name, and do not tidy their grammar.

---

## Photographs

All photographs are from [Unsplash](https://unsplash.com) under the Unsplash License, which
permits commercial use without attribution. They are downloaded into `assets/` rather than
hotlinked, so the page has no third-party image dependency and works offline.

They stand in for a real user's archive, and the footer says so. If you ever ship screenshots of
a real library, swap them in. Nothing beats the real thing.

Unused spares in `assets/img/`: `hero-prints.jpg`, `album-open.jpg`, `album-seniors.jpg`,
`map-camera.jpg`, `sdcard.jpg`, `phone-laptop.jpg`. Also `assets/tiles/t17.jpg`.

## Fonts

Spectral (display) and Inter (UI) load from Google Fonts, matching the application's Spectral
plus Segoe UI Variable pairing. If you would rather have no third-party requests at all,
download both families into `assets/fonts/` and replace the `<link>` in `<head>` with
`@font-face` rules. Every stack already has real fallbacks, so the page survives the swap.

## Deploying

Any static host. No configuration needed.

- **Netlify / Vercel / Cloudflare Pages**: drag the folder in, or point it at a repo.
- **GitHub Pages**: push to a repo, enable Pages on the branch root.

Delete `serve.mjs` and `.claude/` first if you would rather not ship them. Neither is used by
the page.

## Accessibility and performance

- Landmarks, one `h1`, real `<table>` markup for the comparison, `<details>` for the FAQ.
- Gallery tiles are real `<button>`s with accessible names. The viewer keeps focus inside itself
  and returns it to the tile you opened. Escape closes, arrow keys move between photographs.
- The plan flow is `aria-live="polite"`, so its state changes are announced.
- Everything per-frame animates `transform` and `opacity` only. One shared IntersectionObserver
  and one rAF loop drive the whole page.
- The reveal is gated on `.js`, so with scripting disabled the page is static and complete.
- Colour pairs come from Folio's palette, which its own canvas guards at 4.5:1 for text and 3:1
  for control edges.
- Roughly 3 MB of photographs. To make it lighter, re-export the tiles as WebP; they are the bulk.
