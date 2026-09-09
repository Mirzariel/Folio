/**
 * Claim: scattered photographs become an ordered archive.
 *
 * The whole pitch, made before a word is read. One custom property, --p, runs
 * from 0 (the pile) to 1 (the grid); the CSS multiplies each print's offset by
 * (1 - p). Under reduced motion the prints are already at 1 via the stylesheet,
 * so this module simply does not run.
 */
import { gsap, type MotionModule } from './registry';

export const initHeroPrints: MotionModule = (reduced) => {
  const prints = document.querySelector<HTMLElement>('#prints');
  if (!prints || reduced) return;

  const tween = gsap.fromTo(
    prints,
    { '--p': 0 },
    {
      '--p': 1,
      ease: 'none',
      scrollTrigger: {
        /* Anchored to the top of the hero, which is the top of the page: the
           pile must still be a pile at scroll position 0, where the visitor
           starts. Triggering on the prints entering would begin the resolve
           already part-done. The resolve completes within 0.8 of a viewport
           height, capped at 640px, exactly as before. */
        trigger: '#hero',
        start: 'top top',
        end: () => `+=${Math.min(window.innerHeight * 0.8, 640)}`,
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    },
  );

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
};
