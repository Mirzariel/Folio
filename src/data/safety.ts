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
      'What Folio removes in a cleanup you approved goes to the Windows Recycle Bin. There ' +
      'is no silent permanent delete.',
  },
  {
    icon: 'folder',
    title: 'Quarantine before removal',
    body:
      `Duplicate copies move to a <code>${site.canvas.quarantineFolder}</code> folder on the ` +
      'same drive, where you can put them back. Until you reclaim, Folio says it freed nothing.',
  },
  {
    icon: 'fingerprint',
    title: 'A matching name proves nothing',
    body:
      'Two files called <code>IMG_4821.CR2</code> are not duplicates because they share a ' +
      'name. Folio compares content, and says <em>likely</em> until it has verified.',
  },
  {
    icon: 'shield',
    title: 'Your backups stay backups',
    body:
      'A second copy on a different drive can be a deliberate backup, so Folio treats it as ' +
      'one. Mark copies as protected and it respects that.',
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
      'Drives that come and go are the normal case, not an error state. Work resumes where ' +
      'it stopped instead of starting from zero.',
  },
] as const;
