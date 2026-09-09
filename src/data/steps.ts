/** The three steps in "How it works". Prose is migrated verbatim. */
import { site } from '@/config/site';

export interface Step {
  readonly n: number;
  readonly title: string;
  readonly body: string;
  /** Small print under the step. May contain a leading icon. */
  readonly note: string;
  readonly noteIcon?: string;
}

export const steps: readonly Step[] = [
  {
    n: 1,
    title: 'Choose a source',
    body:
      'Point Folio at a folder or a drive and it becomes a Folio library. Plug in a phone, ' +
      'camera or memory card and you can browse it without adding it to anything. Browsing ' +
      'costs nothing and changes nothing.',
    note: `${site.canvas.sourcePath} \u00b7 C:\\Users\\you\\Pictures \u00b7 that drive in the drawer`,
    noteIcon: 'folder',
  },
  {
    n: 2,
    title: 'Folio reads it',
    body:
      'The scan only reads. It never changes, moves or deletes your files, and it can be ' +
      'paused and resumed. Folio records what each photograph actually is: its content, its ' +
      'capture date, its real identity. That is what lets it prove a claim later instead of ' +
      'guessing at one.',
    note: 'Big collections and drives that get unplugged do not send you back to the start.',
  },
  {
    n: 3,
    title: 'Pick a task, see the plan, approve it',
    body:
      'Organize by date, find duplicates, or rename in bulk. Folio writes the whole plan out ' +
      'first, every file, every destination, every copy it proposes to set aside, and shows ' +
      'you the consequences in plain language. Then it waits.',
    note:
      'Approve it and Folio does the work, verifies every completed change against the plan, ' +
      'and reports what changed and what did not.',
  },
] as const;
