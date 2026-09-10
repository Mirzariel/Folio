/**
 * The questions worth asking before trusting software with your memories.
 *
 * These live as typed data rather than Markdown because almost every answer
 * states a commercial fact (the price, the device count, the quarantine folder)
 * that must come from src/config/site.ts. Interpolating here keeps one
 * source of truth; a Markdown body could not import it.
 *
 * Long-form prose (legal pages, changelog, docs) stays in src/content/.
 *
 * Answers must not overstate. "no release date" appears here on purpose and is
 * one of the three places AGENTS.md requires the roadmap to be stated plainly.
 */
import { site, display } from '@/config/site';

export interface FaqEntry {
  readonly question: string;
  /** One entry per paragraph. May contain inline markup. */
  readonly answer: readonly string[];
}

export const faqEntries: readonly FaqEntry[] = [
  {
    question: 'Is Folio really going to delete my photos?',
    answer: [
      'Not without you reading a plan and pressing a button. Analysis is read-only. Cleanup ' +
        'you approve uses the Windows Recycle Bin, and duplicate copies are quarantined into ' +
        `a <b>${site.canvas.quarantineFolder}</b> folder first, where you can put them back.`,
      'There is one path to permanent removal: an option labelled as permanent, with no undo, ' +
        'never pre-selected.',
    ],
  },
  {
    question: 'How does Folio decide two photos are the same?',
    answer: [
      'By comparing what is inside the files. Two photographs are duplicates only when they ' +
        'are byte-for-byte identical. A shared name, size or timestamp is a hint, never proof.',
      'Before content is verified Folio says <b>likely</b>. It says <b>verified</b> only ' +
        'afterwards.',
    ],
  },
  {
    question: 'I keep a copy of everything on a backup drive. Will Folio wipe it?',
    answer: [
      'No. A copy on a different physical drive may be exactly the backup you intended. ' +
        'Folio distinguishes copies by the volume they sit on, lets you mark copies as ' +
        'protected, and will not treat a protected copy as waste.',
      'To be precise: marking something protected records your intention. It is not evidence ' +
        'that a backup has been made or checked, and Folio will not claim otherwise.',
    ],
  },
  {
    question: 'Does anything get uploaded?',
    answer: [
      'No. Folio reads the folders and drives you nominate and keeps its catalog on your own ' +
        'PC. It works with the internet switched off.',
    ],
  },
  {
    question: 'What about RAW files and videos?',
    answer: [
      'Both are catalogued alongside your JPEGs. RAW files such as .CR2 keep their extension ' +
        'through every rename, and clips carry a small badge in the gallery.',
    ],
  },
  {
    question: 'Is there a Mac version?',
    answer: [
      'In development, and your licence already covers it. Folio is a native Windows ' +
        'application today, and macOS is the next platform.',
      'Being straight with you: there is <b>no release date</b>. Buy it for the Windows ' +
        'application. The Mac build is a bonus, not the thing you are paying for.',
    ],
  },
  {
    question: 'Can it pull photos off my iPhone or Android phone?',
    answer: [
      'Not in today’s build. Connected-device transfer is being built, and this page ' +
        `describes it as direction rather than delivery. Your ${display.price} buys what ` +
        `ships today plus every ${site.license.updatesScope} update, so if it lands in ` +
        `${site.license.updatesScope}, you get it.`,
    ],
  },
  {
    question: 'How many computers can I install it on?',
    answer: [
      `Up to ${site.license.devices} devices that you personally use, across Windows and ` +
        'macOS. One licence for one person, not a site licence for an office.',
    ],
  },
  {
    question: 'What happens if I unplug a drive halfway through a job?',
    answer: [
      'Folio stops, keeps everything that genuinely finished, and tells you what did not. It ' +
        'never reports an unverified operation as complete, and the scan resumes when the ' +
        'drive comes back.',
    ],
  },
] as const;
