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

Also confirm `license.updatesScope` and `license.refundDays`. Changing any of these updates the
pricing list, the FAQ, the comparison table and the closing section at once.

## 3. Replace the support email

`src/config/site.ts`, field `support.email`. It is `hello@example.com` today, and the check
reports it as a launch blocker.

## 4. Write the legal pages

`src/content/legal/privacy.md`, `terms.md` and `license.md` are structured drafts with TODO
markers, not legal advice. Each carries `draft: true`, which renders a visible notice on the
page and blocks the build once your domain is set. Have them written and reviewed, then set
`draft: false`.

Most payment providers require a real privacy policy and refund policy before they approve an
account.

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
