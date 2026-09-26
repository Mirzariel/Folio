/**
 * The motion layer.
 *
 * gsap.matchMedia() is the architecture here. Reduced motion is a complete
 * second design, not a switch that breaks things: both branches are registered
 * up front, GSAP tears one down and builds the other when the preference
 * changes, and every module is handed a `reduced` flag so it can deliver its
 * finished state instead of simply doing nothing.
 *
 * Every module names the product claim it carries. A motion with no claim does
 * not belong on this page. See docs/COPY_AND_MOTION.md.
 *
 * Interaction (the viewer, the menu, the FAQ) is deliberately NOT registered
 * here: it must survive a preference change untouched. See scripts/main.ts.
 */
import { gsap, ScrollTrigger, type MotionModule } from './registry';
import { initReveal } from './reveal';
import { initFilm } from './film';
import { initNavProgress } from './navProgress';
import { initCounters } from './counters';
import { initScanSweep } from './scanSweep';
import { initPlanRunner } from './planRunner';
import { initRenameType } from './renameType';
import { initTourAutoplay } from './tourAutoplay';
import { initWordLight } from './wordLight';
import { initPriceDrop } from './priceDrop';
import { initSpotlight } from './spotlight';
import { initTilt } from './tilt';

const modules: MotionModule[] = [
  initReveal,
  initFilm,
  initNavProgress,
  initCounters,
  initScanSweep,
  initPlanRunner,
  initRenameType,
  initTourAutoplay,
  initWordLight,
  initPriceDrop,
  initSpotlight,
  initTilt,
];

export function initMotion(): void {
  /* Wait for the display face before measuring anything.
     Spectral reflows every heading on this page, which moves each trigger's
     start position by hundreds of pixels. Registering first meant triggers far
     below the fold fired against a document that was still short, and a
     "once" trigger that has fired cannot be un-fired by a later refresh. */
  if (document.fonts && document.fonts.status !== 'loaded') {
    void document.fonts.ready.then(register);
  } else {
    register();
  }

  /* Late-loading images and the final layout still nudge positions. */
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

function register(): void {
  const mm = gsap.matchMedia();

  mm.add(
    {
      full: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const reduced = context.conditions?.reduced === true;
      const cleanups = modules.map((module) => module(reduced));
      return () => cleanups.forEach((cleanup) => cleanup?.());
    },
  );
}
