# Voice, copy rules, and what each motion claims

## The motif

Headings follow `You X. Folio Y.`, taken from the tagline the owner chose:

> You capture the moments. Folio organizes the memories.

It runs through the page: *You choose the source, Folio reads it* &middot; *You see photographs,
Folio handles the filenames* &middot; *You keep the memories, Folio keeps the proof* &middot;
*You already took the photographs, let Folio do the rest*.

The one heading that does **not** follow it is the promise section, because "Understand before
you move. Verify before you remove." is the vision's own line and outranks the pattern.

The hero sub-line carries the official `FOLIO_VISION.md` tagline ("You take the photographs.
Folio looks after the archive") so the documented promise survives on the page. It is stored
once, as `site.visionTagline`.

## No em dashes

There are zero em dash characters in `src/`, by request. Sentences are split with periods,
colons and commas instead. Hyphenated compounds stay, because they are spelling rather than
punctuation: byte-for-byte, one-time, local-first, 14-day.

`npm run check:copy` enforces this. It is not a style preference you can quietly drop.

## Line breaks are authorial

`SplitHeading` takes a `lines` array and emits one wrapper per line. The breaks are content, not
layout: the motif needs one sentence per line at every width. This is why the site does not
split rendered text at runtime, which would merge or re-break the lines as the viewport changes.

## Social proof, deliberately empty

There is a commented placeholder in `src/pages/index.astro` where testimonials would go. It is
empty on purpose: invented customer quotes convert well right up until the first person checks
one, and a product selling *trust* cannot afford to be caught inventing trust.

When there are real early users, ask permission in writing, use a real first name, name the
situation (how many photos, how many drives, what they were afraid of), and do not tidy their
grammar.

## Every motion carries a claim

The vision asks the **application** to be calm, because there motion competes with someone
trying to work. A landing page has the opposite duty. The rule kept here is not *less motion*,
it is **every motion carries a claim**. A motion with no claim does not belong on this page.

| Motion | Claim | Module |
|---|---|---|
| Hero prints develop from blank paper to the picture | a photograph arrives as itself | Hero.astro (CSS) |
| In the pinned film, prints resolve from a pile into a grid across three beats | scattered photographs become an ordered archive, and the reading changes nothing | motion/film.ts |
| A cursor drags the folder, the scan counts, photos fly into date folders and are checked | nothing changes until you approve, and what changes is verified | demos/tour.ts, motion/tourAutoplay.ts |
| The rules paragraph lights word by word | these are rules, read at your pace | motion/wordLight.ts |
| The four hub statistics count up | these are figures Folio actually holds | motion/counters.ts |
| A light bar sweeps the gallery and tiles resolve behind it | this is the scan populating the wall | motion/scanSweep.ts |
| Clicking a tile grows it into the viewer; Escape puts it back | the spec's connected enlargement. Escape reads as putting a print down. The mat is neutral `#0E0E0E`, because a photograph judged against warm archival paper is judged wrongly | scripts/viewer.ts |
| The plan runs itself: rows tick, the counter races, Plan to Done | you approve, then Folio does it and verifies it | motion/planRunner.ts |
| Marked copies fly into the Recycle Bin and can be flown back out; marking every copy is refused | removal is recoverable and one copy always remains | demos/dupes.ts |
| The rename pattern types itself and the preview rewrites live | the preview updates before you commit | motion/renameType.ts |

## The demos repeat

A claim you can only watch once is a claim most visitors miss: they arrive mid-animation, or
they scroll back to look properly and find a frozen last frame. So the four demos replay while
they are on screen, through `loopWhileVisible` in `src/scripts/motion/loop.ts`.

| Demo | Repeats every |
|---|---|
| The scan sweeping the gallery wall | 6s |
| The rename pattern typing itself | 5s |
| The plan running to Done | 8s |

The four hub figures are not on a timer; they count again whenever you scroll back to them.

Three rules the helper enforces, and any new loop must keep:

- **Off screen means stopped.** The interval is cleared on leave and started again on re-entry.
  A timer running behind the fold costs battery for something nobody is looking at.
- **A hidden tab means stopped.** A background tab throttles `requestAnimationFrame` to about
  one frame a second, so a pass started there cannot finish and the timer would only restart an
  animation nobody can see.
- **A click wins.** The moment the visitor approves the plan themselves, the plan runner's loop
  is killed for good. Nothing may replay underneath someone who has taken control.

Under reduced motion nothing loops at all: every module still delivers its finished state, and
the plan still runs to Done on click. The hero glow is the one loop that is purely decorative,
and it is nearly imperceptible.

## Reduced motion is a complete second design

Under `prefers-reduced-motion: reduce` the prints arrive already in the grid, the wall arrives
already scanned, the counters show their real values, the rename preview shows its finished
pattern, and **every interaction still works**, without transitions.

This is implemented in two halves that must agree:

- `src/styles/reduced-motion.css` for the CSS-driven motion. Loaded last so it wins.
- `gsap.matchMedia()` in `src/scripts/motion/index.ts` for the scripted motion. Every module
  receives a `reduced` flag and is expected to deliver its **finished state**, not to do nothing.

The plan runner still runs to Done when approved; it simply arrives without the choreography.

## Editing the hero animation

Each print carries its scattered offset in `src/data/gallery.ts`:

```ts
{ file: 't09.jpg', dx: '37%', dy: '32%', dr: '-9deg', ds: 0.34, z: 3 }
```

The element is positioned at its **final grid slot** in CSS; the offsets are the distance from
there back to the pile, multiplied by `(1 - var(--p))`. `dx` and `dy` are percentages of the
print's own size, `dr` a rotation, `ds` an extra scale. Set `--p` to 1 in devtools to see the
ordered state on its own.

The scrub is anchored to the top of the hero, not to the prints entering the viewport, so the
pile is still a pile at scroll position 0 where the visitor starts.

## Photographs

All photographs are from [Unsplash](https://unsplash.com) under the Unsplash License, which
permits commercial use without attribution. They are stored in `src/assets/` rather than
hotlinked, so the site has no third-party image dependency, and `astro:assets` converts them to
WebP at build time.

They stand in for a real user's archive, and the footer says so. If you ever ship screenshots of
a real library, swap them in. Nothing beats the real thing.

## Fonts

Spectral (display) and Inter (UI) match the application's Spectral plus Segoe UI Variable
pairing. They are self-hosted through Fontsource (`@fontsource/spectral` at 500 and 600,
`@fontsource-variable/inter`), imported in `src/layouts/BaseLayout.astro`, so opening a page
makes no request to a font service. That is what lets the privacy page say a page load contacts
no third party, and `npm run check:copy` fails if a Google Fonts URL comes back. Every stack keeps
real fallbacks.

Note that the motion layer waits for `document.fonts.ready` before measuring scroll positions,
because Spectral reflows every heading on the page.

## Live surface, or photograph

Visitors could not tell an app window they can actually operate from a stock photograph in a
frame. The page answers that once, in one grammar, and nowhere else:

| Reads as | Drawn as | Where |
|---|---|---|
| software, and this one runs | window chrome plus a `.cue` above it | `Window.astro` (`cue`, `cueHint`), the jobs section |
| scenery | `.shot`: no border, no hover zoom, no cue | Problem, Local-first |

`.cue` is an accent dot, a two-word label, and a plain-language hint that says what the visitor
can do or why the surface exists. The four on the page today:

- **The interface**, rebuilt on this page, not a screenshot (hub)
- **Try it**, click any photograph below, then press Escape (gallery)
- **Live panels**, the framed area in each card runs its own job (jobs)
- **Watch it run**, the plan below approves itself, then verifies every change (promise)

Do not put a cue on anything that neither runs nor responds, and do not give a photograph a
border or a hover transform. Both halves of the grammar have to stay honest or neither works.

## The type scale

Four body sizes, defined in `tokens.css` as `--fs-micro`, `--fs-small`, `--fs-body`, `--fs-lede`.
Before this, seven near-identical sizes were scattered across component styles (14px, 14.5px,
15px, 15.5px, 13.5px, 12.5px, 12px), which reads as sloppiness rather than hierarchy. A bare px
font-size in a section's `<style>` is a hole in the design system. The app-window mockups are the
one exception: they reproduce the application's own denser UI scale on purpose.
