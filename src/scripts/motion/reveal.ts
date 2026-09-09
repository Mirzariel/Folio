/**
 * Infrastructure, not a claim: sections arrive rather than snapping in.
 *
 * The CSS owns the transition and the .js gate; this only decides when to add
 * .in. Reduced motion adds it immediately, so everything is simply already
 * arrived rather than animating faster.
 */
import { ScrollTrigger, type MotionModule } from './registry';

const SELECTOR = '.rv, .lines, .eyebrow';

export const initReveal: MotionModule = (reduced) => {
  const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  if (els.length === 0) return;

  if (reduced) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const batch = ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (targets) => targets.forEach((t) => t.classList.add('in')),
  });

  /* Two cases the batch alone does not cover, both of which would strand an
     element in its hidden state:

     1. Registration is deferred until the display font has loaded, so anything
        already sitting above the trigger line when the batch is created never
        crosses it. The hero heading is the obvious victim.
     2. An anchor link can jump the page past a whole section without it ever
        crossing the trigger.

     So reveal anything already at or above the trigger line, now and after
     every hash change. */
  const sweep = () => {
    const line = window.innerHeight * 0.88;
    els.forEach((el) => {
      if (el.classList.contains('in')) return;
      if (el.getBoundingClientRect().top < line) el.classList.add('in');
    });
  };
  const onHash = () => window.setTimeout(sweep, 60);
  window.addEventListener('hashchange', onHash);
  sweep();

  return () => {
    window.removeEventListener('hashchange', onHash);
    batch.forEach((st) => st.kill());
  };
};
