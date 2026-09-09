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
      'Folders inside folders, named <em>New folder (3)</em>. Copies of copies. You cannot ' +
      'see the shape of it from Explorer, so you keep everything, forever, just in case.',
  },
  {
    image: 'drive.jpg',
    alt: 'An external hard drive opened on a desk',
    title: '\u201cIs this one a duplicate, or a backup?\u201d',
    body:
      'Same name, same size, two drives. One is wasted space and one is the only thing ' +
      'standing between you and losing 2014. They look identical from the outside.',
  },
  {
    image: 'elder-photos.jpg',
    alt: 'Hands holding old black and white photographs',
    title: 'The cost of being wrong is permanent',
    body:
      'A spreadsheet you delete twice can be rebuilt. Your daughter\u2019s first birthday ' +
      'cannot. So the safest thing is to do nothing, and the mess quietly doubles every year.',
  },
] as const;
