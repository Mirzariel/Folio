/**
 * The roadmap. Both items are tagged "In development" and neither has a release
 * date. AGENTS.md requires that honesty in three places: here, the pricing
 * footnote, and the Mac/iPhone FAQ answers. A buyer who thought they were
 * paying for phone import costs more than the sale.
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
      'library. When the transfer flow lands, copy is the default and the destination is ' +
      'verified before anything is freed.',
  },
  {
    icon: 'apple',
    title: 'Folio for macOS',
    body:
      'The same Rust engine underneath, a native Mac interface on top. That boundary was ' +
      'drawn on day one, so a Mac client needs no architectural rewrite.',
    note: `Your ${display.price} licence already covers it, at no extra cost.`,
  },
] as const;
