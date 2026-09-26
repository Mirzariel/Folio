/**
 * The questions worth asking before trusting software with your memories.
 *
 * These live as typed data rather than Markdown because almost every answer
 * states a commercial fact (the price, the device count, the update scope)
 * that must come from src/config/site.ts. Interpolating here keeps one
 * source of truth; a Markdown body could not import it.
 *
 * Long-form prose (legal pages, changelog, docs) stays in src/content/.
 *
 * Answers must not overstate. "no release date" appears here on purpose and is
 * one of the three places AGENTS.md requires the roadmap to be stated plainly.
 */
import { site } from '@/config/site';

export interface FaqEntry {
  readonly question: string;
  /** One entry per paragraph. May contain inline markup. */
  readonly answer: readonly string[];
}

export const faqEntries: readonly FaqEntry[] = [
  {
    question: 'Is Folio really going to delete my photos?',
    answer: [
      'Not without you reading a plan and pressing a button. Scanning and analysis only read. ' +
        'A cleanup you approve moves copies to the <b>Windows Recycle Bin</b>, where you can ' +
        'put them back, and one copy of every photograph always remains.',
      'Where Windows cannot guarantee that a copy can be restored, Folio refuses the cleanup ' +
        'and says why: on USB flash drives and SD cards, on exFAT drives, when the Recycle Bin ' +
        'is off or too full, and for a file larger than the Recycle Bin.',
      'Today’s Folio has no permanent delete at all. Emptying the Recycle Bin stays your ' +
        'decision, made in Windows.',
    ],
  },
  {
    question: 'How does Folio decide two photos are the same?',
    answer: [
      'By comparing what is inside the files. Two photographs are duplicates only when they ' +
        'are byte-for-byte identical. A shared name, size or timestamp is a hint, never proof.',
      'A group appears only once its copies are verified identical, so there is no "probably ' +
        'the same" list to trust. Photographs that merely look alike are not detected.',
    ],
  },
  {
    question: 'I keep a copy of everything on a backup drive. Will Folio wipe it?',
    answer: [
      'Not if you tell it that copy is your backup. Folio notes which copies share a drive, ' +
        'and any copy you mark <b>Keep as backup</b> is never offered for removal, including ' +
        'when you let Folio choose. Without that mark, Let Folio choose keeps exactly one ' +
        'copy of each photograph, so mark your backups first.',
      'To be precise: marking a copy to keep records your intention. It is not evidence ' +
        'that a backup has been made or checked, and Folio will not claim otherwise.',
    ],
  },
  {
    question: 'Does anything get uploaded?',
    answer: [
      'No. Folio reads the folders and drives you nominate and keeps its catalog on your own ' +
        'PC. Your photographs, filenames and catalog never leave it.',
      'The internet is needed once, to activate your license. After that Folio works with it ' +
        'switched off. When it is online, Folio confirms the license about once a week and ' +
        'checks for updates; neither sends anything about your photographs.',
    ],
  },
  {
    question: 'What about RAW files and videos?',
    answer: [
      'Both are catalogued alongside your JPEGs. RAW files such as .CR2 keep their extension ' +
        'through every rename, and clips carry a small badge in the gallery.',
      'Two limits today: Folio does not yet read the capture date from ORF, RW2, CR3 and RAF ' +
        'files, so organizing by date leaves those where they are. Previews of HEIC, AVIF and ' +
        'RAW depend on the image support installed in Windows.',
    ],
  },
  {
    question: 'Is there a Mac version?',
    answer: [
      'In development, and your license already covers it. Folio is a Windows ' +
        'application today, and macOS is the next platform.',
      'Being straight with you: there is <b>no release date</b>. Buy it for the Windows ' +
        'application. The Mac build is a bonus, not the thing you are paying for.',
    ],
  },
  {
    question: 'Can it pull photos off my iPhone or Android phone?',
    answer: [
      'Not in today’s build. Connected-device transfer is being built, and this page ' +
        'describes it as direction rather than delivery. Your license buys what ships today ' +
        'plus every future update for life, major versions included, so if it lands, you get it.',
    ],
  },
  {
    question: 'How many computers can I install it on?',
    answer: [
      `One license includes ${site.license.devices} activations, for one person, not an ` +
        'office. Each Windows user account you activate Folio in uses one; restarting, ' +
        'updating or reinstalling Folio does not.',
      'Another PC, another Windows account, a reinstall of Windows, or deleting Folio’s own ' +
        'data uses another activation, and activations cannot be moved back.',
    ],
  },
  {
    question: 'What happens if I unplug a drive halfway through a job?',
    answer: [
      'Folio keeps everything that genuinely finished and tells you what did not. It never ' +
        'reports an unverified operation as complete. The drive’s records stay in the catalog, ' +
        'and when it is back you choose Resume to continue the scan.',
    ],
  },
] as const;
