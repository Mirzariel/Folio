# Promo video kit, 9:16, 30 seconds

Production material for Folio's launch film. Vertical, 30 seconds, US English, cut to the
grammar of a hardware reveal: black, one object, one line of type, silence, then relief.

Generated shots are made in Dreamina / Seedance 2.5, at 9:16, 720P, Omni reference on.
Everything else is captured, not generated. Read [the rules](#the-two-rules) before you paste
a single prompt.

---

## The one idea

> A spreadsheet you delete twice can be rebuilt. Your daughter's first birthday cannot.

That is the film. Three beats of fear, one beat of silence, then relief in the shape of a plan
you approve before anything moves. The payoff line is the vision's own, and it does not change:

> Understand before you move. Verify before you remove.

## The two rules

**1. No generated user interface. Ever.**
Seedance will happily invent a Folio window with invented numbers in it. A product whose entire
pitch is trustworthiness cannot ship a film containing a screen that never existed. So every
shot belongs to exactly one class:

| Class | What it may contain | How it is made |
|---|---|---|
| **AI** | Hands, drives, prints, paper, dust, desks, light, texture | Seedance, prompts below |
| **CAP** | The real application, or the real landing page | Screen recording |

No AI shot may contain a screen, a monitor, a cursor, a filename, a number or a logo. That is
enforced by the [negative prompt](#negative-prompt), which goes on every generation.

**2. Every number traces to `src/config/site.ts`.**
Nothing in this film is rounded up, and the design-canvas figures carry the same small print the
page gives them. See [the claims audit](#claims-audit). If a value in `site.ts` changes, the
audit table tells you which frame has to be recut.

Also, from `AGENTS.md`, and they are not negotiable:

- No release date for macOS or phone import. They are direction, not delivery.
- No testimonial, review, user count or third-party logo. There are no real users yet.
- Never "risk free". The page refuses to say it and so does the film.
- No em dashes in any on-screen text. Periods, colons, commas.

---

## Beat sheet

Nine shots, 30.0 seconds. `TC` is the in-point.

| # | TC | Len | Class | Picture | On-screen text | Voiceover |
|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | AI | A single external drive in a half open drawer, dust in one shaft of light. Slow push in. | `Four drives.` | Four drives. |
| 2 | 0:03 | 3.0 | AI | Overhead. Printed photographs scattered across a table, edges overlapping, hands hovering without touching. | `One collection.` | One collection. |
| 3 | 0:06 | 3.0 | AI | Two identical looking drives side by side on a desk, one cable connected. Slow lateral drift. | `Same name. Same size.` | Same name, same size. One is wasted space. |
| 4 | 0:09 | 3.0 | AI | Older hands holding a small black and white photograph, very shallow focus, the face never resolved. | `The cost of being wrong is permanent.` | One is the only copy of 2014. |
| 5 | 0:12 | 1.0 | none | Hard cut to true black. Nothing moves. | none | (silence) |
| 6 | 0:13 | 4.0 | CAP | Landing page hero: the scattered pile of prints flies into an ordered grid as the scrub runs. | `You capture the moments.` then `Folio organizes the memories.` | Folio reads your drives and tells you what is actually there. |
| 7 | 0:17 | 6.0 | CAP | The application hub, four statistics counting up. Cut to the plan window: rows fill, then Plan, Confirm, Move, Verify, Done. Status bar visible throughout. | `See the whole plan.` then `Nothing changes until you approve it.` | It writes the whole plan first. Every file. Every destination. Then it waits. |
| 8 | 0:23 | 4.0 | CAP | Duplicate card: three copies slide into the quarantine folder, one stays. | `Quarantine before removal.` | Copies are set aside, not destroyed. |
| 9 | 0:27 | 3.0 | AI | Warm desk at dusk, a closed laptop and a camera, light falling off. Fade to black, then the title card. | `Understand before you move.` `Verify before you remove.` then the end card | Folio. Twenty dollars, once. |

Voiceover total: 62 words. Read at a deliberate pace with real gaps. If it feels rushed, cut
words, never shorten the silence at shot 5.

### End card, shot 9, last 1.2 seconds

```
Folio
$20 once. No subscription.
Windows 11 and Windows 10.
```

That is the whole end card. No badges, no stars, no "trusted by". The price, the platform, and
the word once.

---

## Shot list

| ID | Shot | Len | Class | Aspect | Source |
|---|---|---|---|---|---|
| A1 | 1 | 4s generated, 3s used | AI | 9:16 | Seedance, reference `drive.jpg` |
| A2 | 2 | 4s generated, 3s used | AI | 9:16 | Seedance, reference `scatter.jpg` |
| A3 | 3 | 4s generated, 3s used | AI | 9:16 | Seedance, reference `drive.jpg` |
| A4 | 4 | 4s generated, 3s used | AI | 9:16 | Seedance, reference `elder-photos.jpg` |
| A5 | 9 | 5s generated, 3s used | AI | 9:16 | Seedance, reference `desk.jpg` |
| C1 | 6 | 4s | CAP | screen | Landing page hero, `#hero` |
| C2 | 7a | 2.5s | CAP | screen | Application, hub screen |
| C3 | 7b | 3.5s | CAP | screen | Application, plan window, run to Done |
| C4 | 8 | 4s | CAP | screen | Application, duplicates, quarantine move |

Generate each AI shot at 4 to 5 seconds and trim into the cut. Longer generations drift, and
drift is exactly what a trust product cannot afford on screen.

---

## Seedance prompts

Settings for every shot below: **9:16, 720P, 4s** (A5: 5s), Omni reference **on** with the
reference image named in the block. Paste the prompt, attach the reference, generate three
variants, keep the one with the least object morphing.

### Negative prompt

Put this in every generation.

```
text, captions, subtitles, watermark, signature, logo, brand marks, user interface, computer
screen, monitor, television, phone screen, tablet, cursor, filenames, numbers, letters, charts,
extra fingers, deformed hands, warped photograph edges, melting objects, morphing shapes,
flicker, strobing, modern smartphone, plastic sheen, HDR glow, oversaturated color, teal and
orange grade, fisheye, heavy vignette, fast camera shake, zoom punch, people looking at camera,
recognizable faces
```

### A1, the drawer

Reference: `src/assets/img/drive.jpg`

```
Cinematic macro shot, vertical. A single matte black external hard drive resting in a half open
wooden desk drawer, its cable coiled loosely beside it. A thin shaft of late afternoon window
light crosses the drive and lights suspended dust. Everything else falls into deep shadow. The
camera pushes in very slowly, about ten centimeters over four seconds, on a 50mm lens at f/2.0,
locked off with almost no movement. Warm archival grade: deep brown blacks, soft amber
highlights, film grain, no color cast in the shadows. Quiet, patient, slightly melancholy. No
text of any kind, no screens, no labels, no logos.
```

### A2, the table

Reference: `src/assets/img/scatter.jpg`

```
Cinematic overhead shot, vertical, looking straight down at a wooden table covered in dozens of
printed photographs, edges overlapping in a disordered pile, some face down, some curled at the
corners. A pair of hands enters the frame from the bottom and hovers above the pile without
touching it, then withdraws. The camera holds still and drifts up two centimeters over four
seconds. Soft diffused daylight from the left, warm archival grade, visible paper texture and
film grain. Calm, unresolved, a decision not made. The photographs show blurred landscapes and
gatherings, no readable faces, no text, no writing on the prints, no screens.
```

### A3, the two drives

Reference: `src/assets/img/drive.jpg`

```
Cinematic product shot, vertical, shallow depth of field. Two visually identical external hard
drives sitting side by side on a dark wooden desk, one with a cable connected and one without.
The camera drifts slowly sideways from the left drive to the right drive over four seconds, so
focus passes from one to the other. 85mm lens at f/1.8, dim room, one warm practical light off
frame right, deep shadow. Warm archival grade, gentle film grain, no reflections showing a room.
No text, no labels, no brand marks, no screens, no numbers.
```

### A4, the photograph

Reference: `src/assets/img/elder-photos.jpg`

```
Cinematic close up, vertical, very shallow depth of field. Weathered older hands holding a small
square black and white photograph with a white border, held near the chest, turning it a few
degrees toward the light. The image on the print stays soft and never resolves into a
recognizable face. The camera holds almost still, breathing in slightly over four seconds. 85mm
lens at f/1.4, single soft window light from the left, background dissolved into warm brown
darkness. Archival grade, fine grain, tender and quiet, not sentimental. No text, no writing on
the print, no screens, no other objects.
```

### A5, the desk at dusk

Reference: `src/assets/img/desk.jpg`

```
Cinematic wide shot, vertical, a wooden desk at dusk. A closed laptop and an old film camera sit
side by side, a mug at the edge of frame. Warm low light from a window behind falls off quickly
toward the corners, dust drifting through it. The camera pulls back very slowly over five
seconds while the light dims, ending near darkness. 35mm lens at f/2.8, warm archival grade,
deep brown blacks, soft amber highlights, film grain. Resolved, calm, finished. No text, no
screen glow, no open laptop, no logos, no people.
```

### Optional, an alternate opener

If A1 does not land, this is the other opening worth trying. Reference: `drive.jpg`.

```
Cinematic vertical shot of a stack of four unlabeled external hard drives on a dark surface,
stacked slightly out of alignment. A single overhead light source picks out the top edges and
leaves the rest in shadow. The camera tilts down the stack very slowly over four seconds. 50mm
lens at f/2.0, warm archival grade, heavy shadow, film grain. Still, weighty, unresolved. No
text, no labels, no logos, no screens, no lit cables.
```

---

## Reference image plan

All four references already live in the repository, are Unsplash licensed, and are the exact
images the landing page uses. Using them as Omni references is what makes the generated b-roll
sit in the same world as the site rather than looking like stock.

| Reference | File | Used by | What it carries |
|---|---|---|---|
| Scatter | `src/assets/img/scatter.jpg` | A2 | The pile, the paper texture, the overhead angle |
| Drive | `src/assets/img/drive.jpg` | A1, A3 | The object, the desk, the fall-off |
| Elder photos | `src/assets/img/elder-photos.jpg` | A4 | Hands, print border, the grade |
| Desk | `src/assets/img/desk.jpg` | A5 | The resolved end state, dusk light |

Upload the reference before typing the prompt, and set Omni reference to match style and subject
rather than composition, so the camera move in the prompt survives.

---

## Capture checklist

Four shots are real. Record them at **1080 x 1920**, or record at 1920 x 1080 and reframe, but
prefer native vertical for C2 to C4 so the app window is not cropped through its own chrome.

### C1, landing page hero

1. Run `npm run dev`.
2. Chrome, device toolbar, custom size 1080 x 1920, DPR 2.
3. Confirm reduced motion is **off** at the OS level, or the prints arrive already in the grid.
   That is the correct reduced-motion design and the wrong film.
4. Load `/`, wait for fonts. The motion layer waits on `document.fonts.ready` before it measures,
   because Spectral reflows every heading.
5. Record while scrolling the hero slowly, one continuous motion, 4 seconds from pile to grid.
   Do not use a scripted scroll with easing, it reads as fake.
6. To check the target state first, set `--p` to 1 in devtools, then reload before recording.

### C2, the hub

Real application. The window must show:

- the four statistics counting to their real values,
- the status bar reading `Changes require approval`, which is permanent, not a warning that
  appears late.

Do not stage a library you do not have. If what you record is the design canvas, the film says
so, see the on-screen text sheet.

### C3, the plan

The most important four seconds in the film. Record:

1. The plan window listing rows, six visible of the total.
2. The approve action.
3. The flow running: **Plan, Confirm, Move, Verify, Done**. This order is the safety contract,
   from `src/data/mockup.ts`. Never cut a stage to save time. Verify is the one that matters, and
   dropping it would be the single most dishonest edit available in this film.

### C4, the duplicates

Three copies move into the `.Folio` quarantine folder and one stays. Let the counter show that
quarantine frees nothing until you reclaim. If this is taken from the landing page's duplicate
card rather than the application, that is acceptable, it animates the same claim.

### Fallback

If the application is not ready to record, the landing page carries all four beats: the hero
prints, the hub window with its counters, the plan window running to Done, and the duplicate
collapse. A film cut entirely from the site is honest, because the site's mockups are labelled.
A film cut from a generated screen is not.

---

## On-screen text sheet

Every word that appears, verbatim, with where it comes from. Spectral for display lines, Inter
for small print, matching the site.

| Shot | Text | Source |
|---|---|---|
| 1 | Four drives. | `src/data/problem.ts`, card 1 title |
| 2 | One collection. | `src/data/problem.ts`, card 1 title |
| 3 | Same name. Same size. | `src/data/problem.ts`, card 2 body |
| 4 | The cost of being wrong is permanent. | `src/data/problem.ts`, card 3 title |
| 6 | You capture the moments. | `site.tagline` |
| 6 | Folio organizes the memories. | `site.tagline` |
| 7 | See the whole plan. | `src/data/steps.ts`, step 3 |
| 7 | Nothing changes until you approve it. | `planFlow`, Confirm |
| 7 | Design-canvas figures, not measured averages. | small print, if any figure is legible |
| 8 | Quarantine before removal. | `src/data/safety.ts`, card 2 |
| 9 | Understand before you move. | promise section |
| 9 | Verify before you remove. | promise section |
| 9 | Folio | `site.name` |
| 9 | $20 once. No subscription. | `site.price` |
| 9 | Windows 11 and Windows 10. | `site.platforms.shipping` |

The two hero lines keep the `You X. Folio Y.` motif and break exactly where the page breaks
them. One sentence per line. The line breaks are authorial, not layout.

If a figure from the hub is legible in C2, the design-canvas small print is **required** in the
same frame, at a size a viewer can actually read at arm's length on a phone. The page carries
that caveat and the film inherits it.

---

## Voiceover script

US English. Warm, low, unhurried, closer to a documentary narrator than an ad read. Never
enthusiastic. The product's argument is that you should be allowed to be careful.

```
0:00  Four drives.
0:03  One collection.
0:06  Same name, same size. One is wasted space.
0:09  One is the only copy of 2014.
0:12  [silence, one full second]
0:14  Folio reads your drives and tells you what is actually there.
0:18  It writes the whole plan first. Every file. Every destination.
0:22  Then it waits.
0:24  Copies are set aside, not destroyed.
0:27  Understand before you move. Verify before you remove.
0:29  Folio. Twenty dollars, once.
```

62 words. Two lines must not be paraphrased in a re-record: the promise line at 0:27, and
"Then it waits" at 0:22, which is the entire safety argument in three words.

---

## Sound

- **0:00 to 0:12** Room tone and one low sustained note. A drawer, a cable settling, paper. No
  music bed yet. The fear beats are almost silent, which is why they work.
- **0:12 to 0:13** Absolute silence. Cut the room tone too. This is the pivot and it should feel
  like the film stopped.
- **0:13** Music enters on the first frame of the prints moving. Warm piano or felt keys, one
  chord, no percussion for two seconds.
- **0:21** One soft click on the approve action. It is the only interface sound in the film. Do
  not add clicks anywhere else, or that one stops meaning anything.
- **0:27 to 0:30** Music resolves and falls away under the end card. End on room tone, not on a
  music sting.

No whooshes. No riser. No trailer hit. A product that promises not to surprise you should not
have a sound design that surprises you.

---

## Grade and type

Pull the palette straight from `src/styles/tokens.css`, ink theme:

| Role | Token | Value |
|---|---|---|
| Background | `--ink` | `#0C0705` |
| Primary text | `--ink-t1` | `#F5EADF` |
| Secondary text | `--ink-t2` | `#B8A493` |
| Accent | `--ink-accent` | `#E0803A` |
| Accent light | `--ink-accent-t` | `#F0A468` |
| Good | `--ink-good` | `#9BBF7E` |
| Border | `--ink-border` | `#33241B` |

- Black point is `#0C0705`, not pure black. The page never uses pure black and neither should the
  film, except the one-second cut at shot 5, which is true black on purpose.
- Accent orange appears exactly three times: the approve action, the Verify stage, and the price
  on the end card. Three times is a rhythm. Everywhere is decoration.
- Type: Spectral for display lines, Inter for small print, matching the site and the application.
- Text animates in as a fade plus two pixels of rise, 400ms. No slide, no scale, no character
  stagger. The page's own reveal, not an ad's.
- Grain runs over the whole film at a low constant level, so the generated and captured shots
  share a surface.

---

## Claims audit

Recheck this table before every export. Left column is what the film asserts, right column is
what would make it false.

| Claim in the film | Source | Goes stale when |
|---|---|---|
| $20 once, no subscription | `site.price` | The price changes in `site.ts` |
| Windows 11 and Windows 10 | `site.platforms.shipping` | A platform is added or dropped |
| No macOS date shown or implied | `site.license.macOsReleaseDate` is null | A date is genuinely committed |
| Nothing changes until you approve | `approvalPromise`, `planFlow` | Never. This one is architectural |
| Plan, Confirm, Move, Verify, Done | `src/data/mockup.ts` | The flow changes in the application |
| Quarantine before removal, `.Folio` | `src/data/safety.ts`, card 2 | The folder name changes |
| Copies set aside, not destroyed | safety cards 1 and 2 | Never soften this wording |
| Hub figures are design-canvas | `site.canvas`, page small print | A real library is recorded instead, in which case drop the caveat and say so |

Not in the film, deliberately:

- No refund promise on screen. The site does not advertise one, so a video must not invent one inside a 30
  second film reads as an anxiety about the product.
- No "risk free", in any phrasing.
- No testimonial, no user count, no review score, no press logo.
- No "AI" claim. Folio compares content. That is arithmetic, and calling it intelligence would be
  the first small lie.
- No suggestion that the catalog is a backup. If a viewer asks, the answer is in the description.

---

## Cutdowns

**15 seconds.** Shots 3, 4, 5, 6, 7, 9. Drop the two opening b-roll shots and open on the two
drives. VO: "Same name, same size. One is the only copy of 2014." then silence, then "Folio
writes the whole plan first. Then it waits." then the promise line and the end card.

**6 seconds, feed autoplay, no sound.** C1 alone with two text cards: `You capture the moments.`
then `Folio organizes the memories.` then the end card. Nothing else fits in six seconds without
lying by compression.

**Thumbnail and cover frame.** The last frame of A4, the hands and the print, with no text. It is
the only frame in the film that carries the stakes without a word.

---

## Description text, for wherever it is posted

```
Folio turns scattered photos on your PC and drives into an archive you can trust. Find exact
duplicates by content, organize by date, rename in bulk, and see the whole plan before anything
changes. Local only. Nothing is uploaded. $20 once, three devices, Windows 11 and Windows 10.

Folio's catalog is not a backup. It helps you understand your archive. Keeping a real second
copy is still your job.
```

The second paragraph is not optional. It is the thing most tools will not tell you, and saying
it is a large part of why anyone should believe the first paragraph.
