/**
 * Claim: this is the scan populating the wall.
 *
 * A light bar sweeps the gallery and the tiles resolve behind it. The CSS owns
 * both the sweep and the per-tile stagger; this only decides when. Under
 * reduced motion the stylesheet has already delivered the wall scanned, so the
 * class is added immediately and nothing sweeps.
 */
import { ScrollTrigger, type MotionModule } from './registry';

export const initScanSweep: MotionModule = (reduced) => {
  const grid = document.querySelector<HTMLElement>('#galgrid');
  if (!grid) return;

  if (reduced) {
    grid.classList.add('is-scanned');
    return;
  }

  const trigger = ScrollTrigger.create({
    trigger: grid,
    start: 'top 85%',
    once: true,
    onEnter: () => grid.classList.add('is-scanned'),
  });

  return () => trigger.kill();
};
