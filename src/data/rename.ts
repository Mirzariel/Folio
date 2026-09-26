/**
 * Files and naming rules for the "Rename in bulk" demo. The three sequences and
 * their hints are the application's own. Extensions are never part of the
 * name you type: each photograph keeps its own file type.
 */
export interface RenameFile {
  readonly name: string;
  /** ISO local date-time the camera recorded, or null. */
  readonly taken: string | null;
}

export const renameFiles: readonly RenameFile[] = [
  { name: 'IMG_4821.CR2', taken: '2019-08-14T09:12:03' },
  { name: 'IMG_4822.CR2', taken: '2019-08-14T09:12:41' },
  { name: 'DSC_0043.JPG', taken: '2019-08-17T16:40:10' },
  { name: 'MVI_0071.MP4', taken: '2019-08-18T07:05:55' },
  { name: 'neg_0112.tif', taken: null },
  { name: 'IMG_5120.HEIC', taken: '2019-08-19T18:22:30' },
] as const;

export const renameDefault = 'Bali 2019';

export const sequences = [
  { id: 'time', label: 'Time', hint: 'When each photograph was taken, from the camera. One without a date is left alone.' },
  { id: 'number', label: 'Number', hint: 'Counting from one, in the order shown: 001, 002, 003.' },
  { id: 'letter', label: 'Letter', hint: 'Lettering in the order shown: A, B, C, and AA after Z.' },
] as const;

export const separators = [
  { id: 'space', label: 'Space', sep: ' ' },
  { id: 'under', label: 'Underscore', sep: '_' },
  { id: 'dash', label: 'Dash', sep: '-' },
] as const;

export type Sequence = (typeof sequences)[number]['id'];
export type Separator = (typeof separators)[number]['id'];

const letters = (n: number): string => {
  let s = '';
  for (let k = n; k > 0; k = Math.floor((k - 1) / 26)) s = String.fromCharCode(65 + ((k - 1) % 26)) + s;
  return s;
};

/** The new name without its extension, or null when the file is left alone. */
export function renameTo(file: RenameFile, index: number, base: string, seq: Sequence, sepId: Separator): string | null {
  const sep = separators.find((s) => s.id === sepId)!.sep;
  if (seq === 'time') {
    if (!file.taken) return null;
    /* The app's format (ui/src/pages/task/naming.ts, rnNameFor): date, then
       the time as HHMMSS, each after the chosen separator. */
    const [d, t] = file.taken.split('T');
    return `${base}${sep}${d}${sep}${t!.replace(/:/g, '')}`;
  }
  return `${base}${sep}${seq === 'number' ? String(index + 1).padStart(3, '0') : letters(index + 1)}`;
}

export const extOf = (name: string) => name.slice(name.lastIndexOf('.'));
