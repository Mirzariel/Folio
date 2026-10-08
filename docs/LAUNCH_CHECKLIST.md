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

## 2. The price, the launch offer, and the binding promises

All of these live in `src/config/site.ts` and update the whole site at once.

**Price** `price.amount` is 10 (USD), once. The launch offer (USD 10 through October 2, 2026, then 20) is over:
`launchOffer` is `null`, so the page shows $10 as the regular price with no crossed-out figure, banner or
countdown. The Lemon Squeezy product "Folio - Personal License" is priced at $10 and has no discount code.
Two things only you can do:

- **Keep the checkout and the page in agreement.** If you ever change the price in Lemon Squeezy, change
  `price.amount` in the same commit.
- **Do not bring back a crossed-out higher price** unless it genuinely applies afterwards. A new launch offer
  must be a new, dated `launchOffer` with a matching discount that expires at the same moment.

**Installer facts** `installer` holds the file name and SHA-256 shown on /download. Update both whenever a new
build is uploaded to the store, and set `signed: true` only once the installer carries a valid Authenticode signature.

| Promise | Field | Note |
|---|---|---|
| macOS at no extra cost when it ships | `license.macOsIncluded` | The page repeats "no release date" next to it, which is your protection. |
| Activations per license | `license.devices` | 3, matching the activation limit the app requires from Lemon Squeezy. Set the product's activation limit to 3. |
| Free updates for life, major versions included | `license.updatesForLife` | Chosen on 2026-09-26, matching FOLIO_LICENSING_SPEC.md. You cannot later sell a major version separately to existing buyers. |

**Refunds.** The site no longer mentions refunds (removed on 2026-10-03 at the owner's request),
including the Refunds section of `terms.md`. Indonesian consumer law bans "no refund" standard
clauses (UU 8/1999, article 18), and Lemon Squeezy applies its own refund policy at checkout, so
decide deliberately before launch whether the terms should say something.

## 3. Confirm the support email, and connect the feedback form

`src/config/site.ts`, field `support.email`. It is `folio@foliolibrary.app`, which is also where
feedback arrives. Confirm that is the address you want buyers to see.

The feedback section on the home page sends through Web3Forms. Go to web3forms.com, enter the
inbox that should receive messages, and paste the access key it emails you into
`feedback.accessKey`. The key is public by design. While it is empty the section shows a plain
email link instead of a form, and the check reports it as a launch blocker. Once it is set, send
one real test message and confirm it arrives.

## 4. The legal pages

`src/content/legal/privacy.md`, `terms.md` and `license.md` are complete, with no placeholders,
as of 2026-09-26. The choices behind them:

- The licensor is named as **"the Folio developer"**, contact `folio@foliolibrary.app`. Lemon
  Squeezy, LLC is the merchant of record and seller of record for payments.
- Governing law: **the Republic of Indonesia**. Consumers keep their own country's mandatory
  protections.
- The privacy policy describes every network request the app makes (license activation and
  weekly checks to Lemon Squeezy, daily update checks to GitHub) and follows the rights in
  Indonesia's personal data protection law (UU 27/2022).

**Not legal advice.** They were written to match the product exactly, not reviewed by a lawyer.
Three things are worth a lawyer's hour when you can afford one: whether an unnamed licensor is
enough for you (a real name or registered business is stronger if there is ever a dispute),
whether you need an Indonesian-language version for Indonesian buyers (UU 24/2009, article 31),
and whether your income needs registering for tax in Indonesia.

If the app's behavior changes (a new network request, a different update policy), change the
privacy policy before that build ships. The privacy policy promises exactly that.

## 5. Set the domain

`astro.config.mjs`, field `site`. This makes `og:image` and `twitter:image` absolute, which most
social networks require, and turns every launch blocker into a build error.

The 1200x630 card is at `public/og-card.png`. It is generated from the site palette; its
headline is set in Georgia because it was composed on Windows. If you re-cut it, Spectral
Semibold is the correct face.

## 6. Analytics

The site runs Vercel Web Analytics (`<Analytics />` in `src/layouts/BaseLayout.astro`). It is
cookieless and its script is served from this site's own `/_vercel` path. It only reports once
Web Analytics is enabled for the project in the Vercel dashboard. A privacy-respecting,
cookie-free option fits a product whose whole pitch is "nothing is uploaded" far better than
Google Analytics does.

There is no cookie banner, on purpose: the site sets no cookies and loads nothing from a third
party, so a banner would ask consent for nothing and contradict the privacy page. If you ever add
something that does set a cookie or track, a consent banner becomes necessary, and
`src/content/legal/privacy.md` has to change the same day.

## 7. Decide on the spelling

The site uses American spelling (organize, catalog) including inside the UI mockups, because the
target market is the US. The application currently ships British spelling (Organise). Align one
way or the other, so a buyer's first screen matches the page that sold it to them.

## 8. Retire the legacy folder

`legacy/` holds the pre-Astro site: `index.html`, its stylesheet, its script and the full
original asset set, including nine images the new build does not use. Keep it until you have
signed off the new site, then delete it. Nothing references it.
