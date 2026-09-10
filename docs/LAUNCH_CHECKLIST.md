# Before you go live

Everything below is a deliberate placeholder or an unconfirmed commitment. None of it is a bug;
they are decisions only the owner can make.

`npm run check:copy` tracks most of this automatically. While `site` is unset in
`astro.config.mjs` these appear as **launch blockers** (warnings). The moment you set your real
domain they become build errors, so none of them can reach a buyer by accident.

## 1. Set the checkout URL

`src/config/site.ts`, field `checkoutUrl`. Paste the link from your payment provider (Gumroad,
Paddle, Lemon Squeezy, Polar, a Stripe Payment Link). Every buy button picks it up. While it is
empty the buttons scroll to the pricing section, so the site is safe to publish before the store
exists.

For the US market prefer a provider that acts as **merchant of record** (Paddle, Lemon Squeezy,
Gumroad). They handle US sales tax and EU VAT. Stripe alone does not.

## 2. Confirm the two binding promises

These are commitments to every buyer, not facts about the code. Both are stated plainly on the
page, so they need to be true. Both live in `src/config/site.ts`.

| Promise | Field | Decide |
|---|---|---|
| macOS at no extra cost when it ships | `license.macOsIncluded` | Are you really giving Windows buyers the Mac build free? If macOS slips two years or is cancelled, this is the line people will quote back at you. The page repeats "no release date" next to it, which is your protection. |
| Up to N personal devices | `license.devices` | Whatever number you pick must match what your licence server actually enforces. |

Also confirm `license.updatesScope`. Changing any of these updates the pricing list, the FAQ,
the comparison table and the closing section at once.

**There is no refund window.** The site does not advertise one, and the FAQ no longer answers a
refund question. `src/content/legal/terms.md` states the position: no advertised period,
statutory rights unaffected, and the merchant of record's own policy still applies. Two things
follow. Most payment providers require a refund policy before they approve an account, so check
your provider's rules against that page. And in the EU and UK a consumer normally has a 14-day
right to withdraw from a digital purchase unless they expressly consent to immediate delivery
and acknowledge losing it; the terms page relies on that consent, so your checkout has to
actually collect it. Confirm your provider does.

## 3. Replace the support email

`src/config/site.ts`, field `support.email`. It is `hello@example.com` today, and the check
reports it as a launch blocker.

## 4. Fill in the legal pages, then have them reviewed

`src/content/legal/privacy.md`, `terms.md` and `license.md` are written and no longer drafts.
They describe how Folio actually behaves and what this site actually promises. **They are not
legal advice and have not been reviewed by a lawyer.**

Four facts in them are yours, and no one else can supply them. They are written as `[[TOKEN]]`
placeholders, and `npm run check:copy` reports every one as a launch blocker, so a
finished-looking Terms page with a blank in it cannot reach a buyer:

| Token | What it is |
|---|---|
| `[[SELLER]]` | The legal entity or trading name behind Folio, and its contact address. |
| `[[JURISDICTION]]` | The governing law and courts. Normally where the seller is established. |
| `[[PROVIDER]]` | The payment provider acting as merchant of record. Decided in step 1. |
| `[[SUPPORT_EMAIL]]` | The same address as `support.email` in `src/config/site.ts`, step 3. |

Replace every token, then have a lawyer read all three. A product sold on being checkable cannot
afford terms nobody checked.

## 5. Set the domain

`astro.config.mjs`, field `site`. This makes `og:image` and `twitter:image` absolute, which most
social networks require, and turns every launch blocker into a build error.

The 1200x630 card is at `public/og-card.png`. It is generated from the site palette; its
headline is set in Georgia because it was composed on Windows. If you re-cut it, Spectral
Semibold is the correct face.

## 6. Add analytics, if you want any

There is none. A privacy-respecting, cookie-free option (Plausible, Fathom, Umami) fits a
product whose whole pitch is "nothing is uploaded" far better than Google Analytics does.

## 7. Decide on the spelling

The site uses American spelling (organize, catalog) including inside the UI mockups, because the
target market is the US. The application currently ships British spelling (Organise). Align one
way or the other, so a buyer's first screen matches the page that sold it to them.

## 8. Retire the legacy folder

`legacy/` holds the pre-Astro site: `index.html`, its stylesheet, its script and the full
original asset set, including nine images the new build does not use. Keep it until you have
signed off the new site, then delete it. Nothing references it.
