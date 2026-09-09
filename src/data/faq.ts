/**
 * The questions worth asking before trusting software with your memories.
 *
 * These live as typed data rather than Markdown because almost every answer
 * states a commercial fact (the refund window, the device count, the quarantine
 * folder) that must come from src/config/site.ts. Interpolating here keeps one
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
      'Not without you reading a plan and pressing a button, and not permanently by ' +
        'accident. Analysis is read-only. Cleanup you approve uses the Windows Recycle Bin. ' +
        `Duplicate copies are quarantined into a <b>${site.canvas.quarantineFolder}</b> ` +
        'folder on the same drive first, where you can put them back.',
      'There is exactly one path to permanent removal: an option clearly labelled as ' +
        'permanent, with no undo, which is never the pre-selected choice.',
    ],
  },
  {
    question: 'How does Folio decide two photos are the same?',
    answer: [
      'By comparing what is actually inside the files. Two photographs are only called ' +
        'duplicates when they are byte-for-byte identical. A shared filename, a matching ' +
        'file size or the same timestamp is a hint, never proof, and Folio does not present ' +
        'hints as proof.',
      'Before content has been verified Folio says <b>likely</b>. It says <b>verified</b> ' +
        'only afterwards.',
    ],
  },
  {
    question: 'I keep a copy of everything on a backup drive. Will Folio wipe it?',
    answer: [
      'No. Identical content does not prove a copy is unwanted, and a copy on a different ' +
        'physical drive may be exactly the backup you intended. Folio distinguishes copies ' +
        'by the volume they sit on, lets you mark copies as protected, and will not treat a ' +
        'protected copy as waste.',
      'Worth being precise about one thing: marking something as protected records your ' +
        'intention. It is not evidence that a backup has been made or checked. Folio will ' +
        'not claim otherwise.',
    ],
  },
  {
    question: 'Does anything get uploaded?',
    answer: [
      'No. Folio is local-first. It reads the folders and drives you nominate and keeps its ' +
        'catalog on your own PC. It works with the internet switched off.',
    ],
  },
  {
    question: 'What about RAW files and videos?',
    answer: [
      'Both are catalogued alongside your JPEGs. RAW files such as .CR2 keep their ' +
        'extension through every rename, and clips appear in the gallery with a small badge ' +
        'so a video is not mistaken for a still frame.',
    ],
  },
  {
    question: 'Is there a Mac version?',
    answer: [
      'It is in development, and your licence already covers it. Folio is a native Windows ' +
        'application today. The Rust engine underneath was deliberately built to be shared, ' +
        'and macOS is the next platform.',
      'Being straight with you: there is <b>no release date</b>. If you are buying today, ' +
        'buy it for the Windows application. The Mac build arriving later at no extra cost ' +
        'is a bonus, not the thing you are paying for.',
    ],
  },
  {
    question: 'Can it pull photos off my iPhone or Android phone?',
    answer: [
      'Not in today’s build. Connected-device transfer is designed and being built, ' +
        'and it is described on this page as direction rather than delivery. Your ' +
        `${display.price} buys what ships today plus every ${site.license.updatesScope} ` +
        `update, so if it lands in ${site.license.updatesScope}, you get it.`,
    ],
  },
  {
    question: 'How many computers can I install it on?',
    answer: [
      `Up to ${site.license.devices} devices that you personally use, across Windows and ` +
        'macOS. A desktop and a laptop and the machine in the studio is fine. It is one ' +
        'licence for one person, not a site licence for an office.',
    ],
  },
  {
    question: 'What happens if I unplug a drive halfway through a job?',
    answer: [
      'Folio stops, keeps everything that genuinely finished, and tells you what did not. ' +
        'It will not report an unverified operation as complete, and it will not make you ' +
        'start the scan again from the beginning when the drive comes back.',
    ],
  },
  {
    question: 'What is the refund policy?',
    answer: [
      `${display.refundWindow.replace(/^./, (c) => c.toUpperCase())}. If Folio does not do ` +
        'what this page says it does, email us and we will refund you. You do not have to ' +
        'argue the case.',
    ],
  },
] as const;
