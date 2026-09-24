/**
 * One group of byte-for-byte identical copies for the "Find duplicates" demo.
 * The wording of the placement notes and fates is the application's own.
 *
 * `backup` marks a copy on a different drive: it may be a deliberate backup,
 * so it starts kept and Folio's suggestion leaves it alone.
 * `suggest` is what "Let Folio choose" marks for removal.
 */
export interface DupCopy {
  readonly path: string;
  readonly place: string;
  readonly backup?: boolean;
  readonly suggest?: boolean;
}

export const dupName = 'IMG_4821.CR2';
export const dupSizeMb = 24.1;

export const dupCopies: readonly DupCopy[] = [
  { path: 'D:\\Family Archive\\2019\\08\\IMG_4821.CR2', place: 'In your archive, the oldest copy' },
  { path: 'D:\\Family Archive\\Old phone\\IMG_4821 (1).CR2', place: 'Same storage volume as another copy', suggest: true },
  { path: 'D:\\Downloads\\IMG_4821 - Copy.CR2', place: 'Same storage volume as another copy', suggest: true },
  { path: 'E:\\Backup 2020\\IMG_4821.CR2', place: 'A different drive. May be a backup', backup: true },
] as const;
