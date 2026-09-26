/**
 * "Six things Folio will not do to you". Each card states a safety guarantee
 * that AGENTS.md forbids weakening. `body` carries inline markup.
 */

export interface SafetyCard {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}

export const safetyCards: readonly SafetyCard[] = [
  {
    icon: 'recycle',
    title: 'Cleanup uses the Recycle Bin',
    body:
      'What Folio removes in a cleanup you approved goes to the Windows Recycle Bin. There ' +
      'is no silent permanent delete.',
  },
  {
    icon: 'folder',
    title: 'One copy always remains',
    body:
      'Folio will not propose removing every copy of a photograph. A plan that would leave ' +
      'you none is refused, and the review says which copy stays.',
  },
  {
    icon: 'fingerprint',
    title: 'A matching name proves nothing',
    body:
      'Two files called <code>IMG_4821.CR2</code> are not duplicates because they share a ' +
      'name. Folio compares what is inside them, and a group appears only when every copy ' +
      'in it is byte-for-byte identical.',
  },
  {
    icon: 'shield',
    title: 'Your backups stay backups',
    body:
      'A second copy can be a deliberate backup. Mark it <em>Keep as backup</em> and Folio ' +
      'never offers it for removal, not even when it chooses for you.',
  },
  {
    icon: 'scale',
    title: 'It reports what actually happened',
    body:
      'An unverified operation is never reported as finished. If a job is interrupted, Folio ' +
      'says what completed, what did not, and what to do next.',
  },
  {
    icon: 'resume',
    title: 'Unplugging a drive is not a disaster',
    body:
      'Drives that come and go are the normal case. Their records stay in the catalog while ' +
      'they are away, and a stopped scan picks up where it left off when you choose Resume.',
  },
] as const;
