/**
 * "Six things Folio will not do to you". Each card states a safety guarantee
 * that AGENTS.md forbids weakening. `body` carries inline markup.
 */
import { site } from '@/config/site';

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
      'When Folio removes something as part of a cleanup you approved, it goes to the ' +
      'Windows Recycle Bin. There is no silent permanent delete.',
  },
  {
    icon: 'folder',
    title: 'Quarantine before removal',
    body:
      `Duplicate copies are moved to a <code>${site.canvas.quarantineFolder}</code> folder ` +
      'on the same drive, where you can put them back. Until you explicitly reclaim, Folio ' +
      'tells you it has freed nothing.',
  },
  {
    icon: 'fingerprint',
    title: 'A matching name proves nothing',
    body:
      'Two files called <code>IMG_4821.CR2</code> are not duplicates because they share a ' +
      'name. Folio compares content, and says <em>likely</em> until it has verified, ' +
      '<em>verified</em> after.',
  },
  {
    icon: 'shield',
    title: 'Your backups stay backups',
    body:
      'A second copy on a different physical drive can be a deliberate backup, and Folio ' +
      'treats it as one rather than as garbage. You can mark copies as protected, and it ' +
      'respects that.',
  },
  {
    icon: 'scale',
    title: 'It reports what actually happened',
    body:
      'An operation that has not been verified is never reported as finished. If a job is ' +
      'interrupted, Folio says precisely what completed, what did not, and what to do next.',
  },
  {
    icon: 'resume',
    title: 'Unplugging a drive is not a disaster',
    body:
      'Large collections and drives that come and go are the normal case, not an error ' +
      'state. Work resumes where it stopped instead of starting from zero.',
  },
] as const;
