/**
 * One group of byte-for-byte identical copies for the "Find duplicates" demo.
 * The wording of the notes and fates is the application's own.
 *
 * It mirrors the engine's recommendation (paged_cleanup_review.rs,
 * recommend_survivors): "Let Folio choose" keeps exactly one copy per group,
 * preferring a copy you marked Keep as backup, otherwise the first copy in path
 * order. A copy marked Keep as backup is never offered for removal. Copies are
 * listed in path order here, so the first one is the one Folio would keep.
 */
export interface DupCopy {
  readonly path: string;
  /** The app notes copies that share a storage volume with another copy. */
  readonly sharesVolume: boolean;
}

export const dupName = 'IMG_4821.CR2';
export const dupSizeMb = 24.1;

export const dupCopies: readonly DupCopy[] = [
  { path: 'D:\\Family Archive\\2019\\08\\IMG_4821.CR2', sharesVolume: true },
  { path: 'D:\\Family Archive\\Old phone\\IMG_4821 (1).CR2', sharesVolume: true },
  { path: 'D:\\Family Archive\\Unsorted\\IMG_4821 - Copy.CR2', sharesVolume: true },
  { path: 'E:\\Backup 2020\\IMG_4821.CR2', sharesVolume: false },
] as const;
