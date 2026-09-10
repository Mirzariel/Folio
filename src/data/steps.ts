/** The three steps in "How it works". One idea per step, one note under it. */
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
      'Point Folio at a folder or a drive. Plug in a phone, camera or memory card and you ' +
      'can browse it without adding it to anything.',
    note: `${site.canvas.sourcePath} \u00b7 C:\Users\you\Pictures \u00b7 that drive in the drawer`,
    noteIcon: 'folder',
  },
  {
    n: 2,
    title: 'Folio reads it',
    body:
      'The scan only reads. It records what each photograph actually is: its content, its ' +
      'capture date, its real identity. That is what lets it prove a claim later.',
    note: 'Pause it, resume it, unplug the drive. You do not go back to the start.',
  },
  {
    n: 3,
    title: 'See the plan, approve it',
    body:
      'Folio writes the whole plan out first. Every file, every destination, in plain ' +
      'language. Then it waits.',
    note:
      'Approve it and Folio verifies every completed change against the plan, then reports ' +
      'what changed and what did not.',
  },
] as const;
