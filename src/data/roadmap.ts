/**
 * The roadmap. Both items are tagged "In development" and neither has a release
 * date. AGENTS.md requires that honesty in three places: here, the pricing
 * footnote, and the Mac/iPhone FAQ answers. A refund from someone who thought
 * they were buying phone import costs more than the sale.
 */
import { display } from '@/config/site';
export interface RoadmapCard {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
  /** Optional footnote with a check icon. */
  readonly note?: string;
}

export const roadmapCards: readonly RoadmapCard[] = [
  {
    icon: 'phone',
    title: 'Import from phone and camera',
    body:
      'A plugged-in phone or camera is a connected source, not automatically a Folio ' +
      'library. Browsing it costs nothing and changes nothing. When the transfer flow lands, ' +
      'copy is the default and the destination is verified before anything is freed. An ' +
      'interrupted transfer will report items <em>copied and verified, awaiting source ' +
      'removal</em> rather than pretending they are finished.',
  },
  {
    icon: 'apple',
    title: 'Folio for macOS',
    body:
      'The same Rust engine underneath, a native Mac interface on top. Shared media ' +
      'intelligence, platform-specific transport. That boundary was drawn on day one ' +
      'precisely so a Mac client would not need an architectural rewrite.',
    note: `Your ${display.price} licence already covers it. When it ships, it is yours at no extra cost.`,
  },
] as const;
