/**
 * The three-step demo in "Try it": Drop, Preview, Approve. It reproduces the
 * application's own first-run tour, so wording that appears in the app (the
 * step names, the captions) belongs to the app rather than to this page.
 *
 * `scanTotal` is the size of the demo folder, a stand-in library like the
 * design canvas figures. The eight photographs are the ones the demo plans and
 * moves; `into` is the year and month folder each one lands in.
 */
export const scanTotal = 1248;

export const tourSteps = [
  { name: 'Drop', title: 'Drop a folder.', body: 'Folio scans it. Your files stay exactly as they are.' },
  { name: 'Preview', title: 'See the plan first.', body: 'Every change is shown before it happens.' },
  {
    name: 'Approve',
    title: 'Approve. Then it happens.',
    body: 'Only you start a change. Each move is checked against the plan before it counts as done.',
  },
] as const;

export const pcFolders = [
  { name: 'Pictures', count: scanTotal, live: true },
  { name: 'Documents' },
  { name: 'Downloads' },
] as const;

export interface TourPhoto {
  readonly file: string;
  readonly name: string;
  /** Index into `tourFolders`. */
  readonly into: number;
}

export const tourFolders = ['2019\\08', '2021\\12', '2024\\05'] as const;

/** In the order they sit in the source folder, which is no order at all. */
export const tourPhotos: readonly TourPhoto[] = [
  { file: 't14.jpg', name: 'IMG_6120.JPG', into: 1 },
  { file: 't05.jpg', name: 'IMG_4821.CR2', into: 0 },
  { file: 't10.jpg', name: 'IMG_8012.HEIC', into: 2 },
  { file: 't01.jpg', name: 'IMG_4822.CR2', into: 0 },
  { file: 't16.jpg', name: 'IMG_6140.JPG', into: 1 },
  { file: 't12.jpg', name: 'IMG_8019.HEIC', into: 2 },
  { file: 't02.jpg', name: 'IMG_4830.CR2', into: 0 },
  { file: 't15.jpg', name: 'IMG_6133.JPG', into: 1 },
] as const;
