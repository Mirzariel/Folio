/**
 * The comparison table. Describes categories of product, never a named vendor.
 * The page carries that disclaimer in small print; keep both.
 *
 * Each cell carries a verdict drawn as an icon: `yes` (good for you), `no` (a
 * cost or a risk to you), `some` (it depends). A verdict must follow from the
 * cell's own words; if the words do not justify a check, it is not a check.
 * `folio` may carry markup (the price), and is rendered as HTML.
 */
import { site, display } from '@/config/site';

/* During the launch offer the cell says both prices and why; afterwards (or
   once html.offer-ended is set on the visitor's clock) only the regular one. */
const cost = display.offer
  ? `<span class="offer-only"><s>${display.regularPrice}</s> <b>$${display.offer.amount}</b>, once. ` +
    `Launch price through ${display.offer.lastDay}, then ${display.regularPrice}.</span>` +
    `<span class="regular-only">$${site.price.amount}, once</span>`
  : `$${site.price.amount}, once`;

export type Verdict = 'yes' | 'no' | 'some';

export interface Cell {
  readonly text: string;
  readonly v: Verdict;
}

export interface CompareRow {
  readonly feature: string;
  readonly folio: Cell;
  readonly cloud: Cell;
  readonly cleaner: Cell;
}

export const compareColumns = [
  { key: 'folio', name: 'Folio', note: 'Pay once, keep your folders' },
  { key: 'cloud', name: 'Cloud photo subscription', note: 'Rent storage, monthly' },
  { key: 'cleaner', name: 'Generic duplicate cleaner', note: 'A list and a Clean button' },
] as const;

export const compareRows: readonly CompareRow[] = [
  {
    feature: 'What it costs',
    folio: { text: cost, v: 'yes' },
    cloud: { text: 'Roughly $2 to $10 a month, for as long as you want your photos', v: 'no' },
    cleaner: { text: 'Often free, or a yearly “PC utilities” bundle', v: 'some' },
  },
  {
    feature: 'Where your photos live',
    folio: { text: 'On your own drives, in your own folders', v: 'yes' },
    cloud: { text: 'On someone else’s servers, in their format', v: 'no' },
    cleaner: { text: 'Wherever they already are', v: 'yes' },
  },
  {
    feature: 'How duplicates are judged',
    folio: { text: 'Byte-for-byte identical content, verified', v: 'yes' },
    cloud: { text: 'Usually not its job', v: 'some' },
    cleaner: { text: 'Frequently name, size and date, which is a guess', v: 'no' },
  },
  {
    feature: 'Before anything changes',
    folio: { text: 'The complete plan, every file and destination, then your approval', v: 'yes' },
    cloud: { text: 'Sync happens continuously, by design', v: 'no' },
    cleaner: { text: 'A checkbox list and a Clean button', v: 'no' },
  },
  {
    feature: 'Backup copies on another drive',
    folio: { text: 'Mark one Keep as backup and it is never offered for removal', v: 'yes' },
    cloud: { text: 'Not modeled', v: 'some' },
    cleaner: { text: 'Usually counted as waste to be deleted', v: 'no' },
  },
  {
    feature: 'If you stop paying',
    folio: { text: 'Nothing happens. You already own it.', v: 'yes' },
    cloud: { text: 'Storage is reduced, and you have to move everything', v: 'no' },
    cleaner: { text: 'Varies', v: 'some' },
  },
  {
    feature: 'Works offline',
    folio: { text: 'Yes, after a one-time activation', v: 'yes' },
    cloud: { text: 'No', v: 'no' },
    cleaner: { text: 'Usually', v: 'some' },
  },
] as const;
