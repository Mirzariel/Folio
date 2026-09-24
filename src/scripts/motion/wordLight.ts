/**
 * Claim: these are rules, and each one is meant to be read.
 *
 * The rules paragraph is lit a word at a time as its track scrolls past, so the
 * reading pace is the visitor's own. Under reduced motion every word is lit at
 * once and nothing is tied to scrolling.
 */
import { ScrollTrigger, type MotionModule } from './registry';

export const initWordLight: MotionModule = (reduced) => {
  const track = document.querySelector<HTMLElement>('#stmtTrack');
  const words = Array.from(document.querySelectorAll<HTMLElement>('#stmt .stmt__w'));
  if (!track || words.length === 0) return;

  if (reduced) {
    words.forEach((w) => w.classList.add('is-lit'));
    return () => words.forEach((w) => w.classList.remove('is-lit'));
  }

  let lit = -1;
  const st = ScrollTrigger.create({
    trigger: track,
    start: 'top 60%',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const upTo = Math.round(self.progress * words.length * 1.1) - 1;
      if (upTo === lit) return;
      lit = upTo;
      words.forEach((w, i) => w.classList.toggle('is-lit', i <= upTo));
    },
  });

  return () => st.kill();
};
