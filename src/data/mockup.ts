/**
 * Fixed strings and row data for the three app mockups. These reproduce real
 * Folio screens, so wording that appears in the application (the status-bar
 * promise, the hub doors) must match the application rather than be improved
 * here.
 */
import { site, display } from '@/config/site';

/** Sits in the status bar permanently, not as a warning that appears late. */
export const approvalPromise = 'Changes require approval';

export interface Door {
  readonly n: string;
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}

export const doors: readonly Door[] = [
  {
    n: '01',
    icon: 'calendar',
    title: 'Organize by date',
    body: 'Into year and month folders, in a destination you choose.',
  },
  {
    n: '02',
    icon: 'dupes',
    title: 'Find duplicates',
    body: 'Files that are byte-for-byte identical. You decide what to keep.',
  },
  {
    n: '03',
    icon: 'rename',
    title: 'Rename in bulk',
    body: 'Consistent names for many files at once, with a preview first.',
  },
] as const;

export const hubStats = [
  { label: 'Photographs', value: display.photographs, count: site.canvas.photographs },
  {
    label: 'Reclaimable',
    value: display.reclaimable,
    count: site.canvas.reclaimableGb,
    decimals: 1,
    suffix: ' GB',
    link: true,
  },
  { label: 'Single copy', value: display.singleCopy, count: site.canvas.singleCopy },
  { label: 'Last scan', value: site.canvas.lastScan },
] as const;

/** Rows in the organize-by-date plan. Six of 12,480 shown, as the page says. */
export const planRows = [
  { from: 'IMG_4821.CR2', to: '2019_08\\' },
  { from: 'IMG_4822.CR2', to: '2019_08\\' },
  { from: 'DSC_0043.JPG', to: '2019_08\\' },
  { from: 'IMG_4830.CR2', to: '2019_08\\' },
  { from: 'neg_0112.tif', to: '2004_06\\' },
  { from: 'neg_0113.tif', to: '2004_06\\' },
] as const;

/** The five beats of the plan flow. Order is the safety contract. */
export const planFlow = [
  { title: 'Plan', note: 'See exactly what will change, before it changes.' },
  { title: 'Confirm', note: 'You approve. Nothing changes until you do.' },
  { title: 'Move', note: 'Same drive, one file at a time.' },
  { title: 'Verify', note: 'Every completed change checked against the plan.' },
  { title: 'Done', note: 'What changed, and what did not.' },
] as const;

/** Rows in the organize-by-date card. */
export const arrangeRows = [
  { from: 'IMG_4821.CR2', to: '2019_08\\' },
  { from: 'IMG_4822.CR2', to: '2019_08\\' },
  { from: 'DSC_0043.JPG', to: '2019_08\\' },
  { from: 'IMG_4830.CR2', to: '2019_08\\' },
  { from: 'neg_0112.tif', to: '2004_06\\' },
  { from: 'neg_0113.tif', to: '2004_06\\' },
] as const;

/** Rows the rename preview rewrites live. The pattern types itself. */
export const renamePattern = 'Bali {n}';
export const renameRows = [
  { from: 'IMG_4821.CR2', ext: '.CR2', i: 1 },
  { from: 'IMG_4822.CR2', ext: '.CR2', i: 2 },
  { from: 'DSC_0043.JPG', ext: '.JPG', i: 3 },
  { from: 'IMG_4830.CR2', ext: '.CR2', i: 4 },
  { from: 'MVI_0071.MP4', ext: '.MP4', i: 5 },
  { from: 'neg_0112.tif', ext: '.tif', i: 6 },
] as const;
