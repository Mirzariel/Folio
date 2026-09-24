/**
 * Claim: nothing changes until you approve, shown once for a visitor who only
 * watches.
 *
 * When the live demo is well into view, this asks it to play itself through:
 * a cursor drags the folder onto a door, the scan counts, the plan appears and
 * is approved. The demo (src/scripts/demos/tour.ts) owns the behaviour and
 * ignores the request the moment a visitor has touched it. Never under reduced
 * motion: there the demo waits to be operated.
 */
import { ScrollTrigger, type MotionModule } from './registry';

export const initTourAutoplay: MotionModule = (reduced) => {
  const tour = document.querySelector<HTMLElement>('#tour');
  if (!tour || reduced) return;

  const st = ScrollTrigger.create({
    trigger: tour,
    start: 'top 55%',
    once: true,
    onEnter: () => window.setTimeout(() => tour.dispatchEvent(new CustomEvent('demo:autoplay')), 700),
  });

  return () => st.kill();
};
