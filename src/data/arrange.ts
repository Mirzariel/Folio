/**
 * The files in the "Organize by date" demo. `taken` is the date the camera
 * recorded, or null when there is none: a photograph without one stays where
 * it is and the plan says why, exactly as the application does.
 */
export interface ArrangeFile {
  readonly name: string;
  readonly taken: string | null;
}

export const arrangeFiles: readonly ArrangeFile[] = [
  { name: 'IMG_4821.CR2', taken: '2019-08-14' },
  { name: 'IMG_4822.CR2', taken: '2019-08-14' },
  { name: 'DSC_0043.JPG', taken: '2019-08-17' },
  { name: 'MVI_0071.MP4', taken: '2021-12-24' },
  { name: 'IMG_8012.HEIC', taken: '2024-05-02' },
  { name: 'neg_0112.tif', taken: null },
] as const;

export const arrangeDepths = [
  { id: 'y', label: 'Year', headline: 'Into year folders.' },
  { id: 'm', label: 'Year and month', headline: 'Into year and month folders.' },
  { id: 'd', label: 'Year, month and day', headline: 'Into year, month and day folders.' },
] as const;

export const arrangeStyles = [
  { id: 'nested', label: 'Nested', sep: '\\' },
  { id: 'dashed', label: 'Dashed', sep: '-' },
  { id: 'under', label: 'Underscored', sep: '_' },
] as const;

export type Depth = (typeof arrangeDepths)[number]['id'];
export type Style = (typeof arrangeStyles)[number]['id'];

/** The folder a photograph goes to, or null when it stays where it is. */
export function destFor(taken: string | null, depth: Depth, style: Style): string | null {
  if (!taken) return null;
  const [y, m, d] = taken.split('-');
  const parts = depth === 'y' ? [y] : depth === 'm' ? [y, m] : [y, m, d];
  const sep = arrangeStyles.find((s) => s.id === style)!.sep;
  return `${parts.join(depth === 'y' ? '' : sep)}\\`;
}

/** Every folder the plan would create, parents included when nested. */
export function foldersFor(depth: Depth, style: Style): string[] {
  const out = new Set<string>();
  for (const file of arrangeFiles) {
    const dest = destFor(file.taken, depth, style);
    if (!dest) continue;
    const segs = dest.replace(/\\$/, '').split('\\');
    segs.forEach((_, i) => out.add(`${segs.slice(0, i + 1).join('\\')}\\`));
  }
  return [...out].sort();
}
