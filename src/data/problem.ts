/** The three "problem" figures. `body` carries inline <em>, rendered with set:html. */
export interface ProblemCard {
  readonly image: string;
  readonly alt: string;
  readonly title: string;
  readonly body: string;
}

export const problemCards: readonly ProblemCard[] = [
  {
    image: 'scatter.jpg',
    alt: 'Dozens of printed photographs spread across a table',
    title: 'Four drives, one collection',
    body:
      'Folders inside folders, named <em>New folder (3)</em>. You cannot see the shape of ' +
      'it from Explorer, so you keep everything, forever, just in case.',
  },
  {
    image: 'drive.jpg',
    alt: 'An external hard drive opened on a desk',
    title: '“Duplicate, or backup?”',
    body:
      'Same name, same size, two drives. One is wasted space. One is the only thing ' +
      'standing between you and losing 2014.',
  },
  {
    image: 'elder-photos.jpg',
    alt: 'Hands holding old black and white photographs',
    title: 'Being wrong is permanent',
    body:
      'A deleted spreadsheet can be rebuilt. Your daughter’s first birthday cannot. So ' +
      'you do nothing, and the mess doubles every year.',
  },
] as const;
