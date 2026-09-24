/**
 * The single source of truth for every commercial fact on this site.
 *
 * Before this file existed, `$20` appeared 11 times in the markup and `84.2`
 * 8 times, and changing the price meant grepping.
 * Nothing in `src/components/` or `src/scripts/` may hard-code these values.
 * `npm run check:copy` fails the build if it finds one.
 *
 * Every claim here is a promise to a buyer. See docs/LAUNCH_CHECKLIST.md before
 * changing `price`, `license` or `platforms`.
 */
import { z } from 'zod';

const schema = z.object({
  name: z.literal('Folio'),
  tagline: z.string(),
  /** The vision's own tagline. FOLIO_VISION.md keeps this wording. */
  visionTagline: z.string(),
  description: z.string(),

  price: z.object({
    amount: z.number().int().positive(),
    currency: z.literal('USD'),
  }),

  /**
   * Paste the link from your payment provider (Gumroad, Paddle, Lemon Squeezy,
   * Polar, a Stripe Payment Link). While it is empty every buy button scrolls
   * to the pricing section, so the site is safe to publish before the store
   * exists. Prefer a merchant of record: they handle US sales tax and EU VAT.
   */
  checkoutUrl: z.url().or(z.literal('')),

  support: z.object({
    /** Buyer-facing contact, and the fallback when the feedback form cannot send. */
    email: z.email(),
  }),

  /**
   * Web3Forms access key for the feedback section. Generate it at web3forms.com
   * with the inbox that should receive messages; the key is public by design.
   * While it is empty the section shows a plain email link instead of a form,
   * and check-copy.mjs reports it as a launch blocker.
   */
  feedback: z.object({
    accessKey: z.string(),
  }),

  license: z.object({
    /** Must match what the license server actually enforces. */
    devices: z.number().int().positive(),
    updatesScope: z.string(),
    /** A binding promise to every Windows buyer. */
    macOsIncluded: z.boolean(),
    /** Stays null until a date is genuinely committed. The page says so. */
    macOsReleaseDate: z.string().nullable(),
  }),

  platforms: z.object({
    shipping: z.array(z.string()).nonempty(),
    inDevelopment: z.array(z.string()).nonempty(),
  }),

  /**
   * Figures from Folio's own design canvas, standing in for a real library.
   * The page says so in small print. They are not measured averages.
   */
  canvas: z.object({
    photographs: z.number().int(),
    reclaimableGb: z.number(),
    singleCopy: z.number().int(),
    planFiles: z.number().int(),
    monthFolders: z.number().int(),
    lastScan: z.string(),
    sourceName: z.string(),
    sourcePath: z.string(),
    galleryMonth: z.string(),
    galleryItems: z.number().int(),
  }),

  unsplashUrl: z.url(),
});

const config = schema.parse({
  name: 'Folio',
  tagline: 'You capture the moments. Folio organizes the memories.',
  visionTagline: 'You take the photographs. Folio looks after the archive.',
  description:
    'Folio turns scattered photos on your PC and drives into an archive you can trust. ' +
    'Find exact duplicates, organize by date, rename in bulk, and see the whole plan ' +
    'before anything changes.',

  price: { amount: 20, currency: 'USD' },
  checkoutUrl: '',
  support: { email: 'folioarchive@gmail.com' },
  feedback: { accessKey: '' },

  license: {
    devices: 3,
    updatesScope: 'version 1',
    macOsIncluded: true,
    macOsReleaseDate: null,
  },

  platforms: {
    shipping: ['Windows 11', 'Windows 10'],
    inDevelopment: ['macOS', 'Import from phone and camera'],
  },

  canvas: {
    photographs: 128432,
    reclaimableGb: 84.2,
    singleCopy: 3208,
    planFiles: 12480,
    monthFolders: 31,
    lastScan: 'Today 14:22',
    sourceName: 'Family Archive (D:)',
    sourcePath: 'D:\\Family Archive',
    galleryMonth: 'August 2019',
    galleryItems: 1204,
  },

  unsplashUrl: 'https://unsplash.com',
});

export const site = Object.freeze(config);
export type Site = typeof site;

/* ---- derived display strings ------------------------------------------- */
/* Components read these rather than formatting money or figures themselves,
   so a currency or precision change lands in exactly one place. */

const int = new Intl.NumberFormat('en-US');

export const display = Object.freeze({
  /** "$20" */
  price: `$${site.price.amount}`,
  /** "$20 once" */
  priceOnce: `$${site.price.amount} once`,
  /** "USD, once." */
  priceCurrency: `${site.price.currency}, once.`,
  /** "128,432" */
  photographs: int.format(site.canvas.photographs),
  /** "84.2 GB" */
  reclaimable: `${site.canvas.reclaimableGb} GB`,
  /** "3,208" */
  singleCopy: int.format(site.canvas.singleCopy),
  /** "12,480" */
  planFiles: int.format(site.canvas.planFiles),
  /** "1,204 items" */
  galleryItems: `${int.format(site.canvas.galleryItems)} items`,
});
