/**
 * The comparison table. Describes categories of product, never a named vendor.
 * The page carries that disclaimer in small print; keep both.
 */
import { display } from '@/config/site';

export interface CompareRow {
  readonly feature: string;
  readonly folio: string;
  readonly cloud: string;
  readonly cleaner: string;
}

export const compareColumns = [
  'Folio',
  'Cloud photo subscription',
  'Generic duplicate cleaner',
] as const;

export const compareRows: readonly CompareRow[] = [
  {
    feature: 'What it costs',
    folio: `${display.price}, once`,
    cloud: 'Roughly $2 to $10 a month, for as long as you want your photos',
    cleaner: 'Often free, or a yearly \u201cPC utilities\u201d bundle',
  },
  {
    feature: 'Where your photos live',
    folio: 'On your own drives, in your own folders',
    cloud: 'On someone else\u2019s servers, in their format',
    cleaner: 'Wherever they already are',
  },
  {
    feature: 'How duplicates are judged',
    folio: 'Byte-for-byte identical content, verified',
    cloud: 'Usually not its job',
    cleaner: 'Frequently name, size and date, which is a guess',
  },
  {
    feature: 'Before anything changes',
    folio: 'The complete plan, every file and destination, then your approval',
    cloud: 'Sync happens continuously, by design',
    cleaner: 'A checkbox list and a Clean button',
  },
  {
    feature: 'Backup copies on another drive',
    folio: 'Yours to protect: a copy marked Keep as backup is never offered for removal',
    cloud: 'Not modelled',
    cleaner: 'Usually counted as waste to be deleted',
  },
  {
    feature: 'If you stop paying',
    folio: 'Nothing happens. You already own it.',
    cloud: 'Storage is reduced, and you have to move everything',
    cleaner: 'Varies',
  },
  {
    feature: 'Works offline',
    folio: 'Yes, after a one-time activation',
    cloud: 'No',
    cleaner: 'Usually',
  },
] as const;
