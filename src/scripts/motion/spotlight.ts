/**
 * Infrastructure, no claim: app windows and cards catch a soft light where the
 * pointer is, the way a lit surface would. The CSS owns the look (.spot in
 * components.css); this only reports the pointer position. Fine pointers only,
 * and not under reduced motion.
 */
import type { MotionModule } from './registry';

const SELECTOR = '.win, .card, .dev__card';

export const initSpotlight: MotionModule = (reduced) => {
  if (reduced || !window.matchMedia('(pointer: fine)').matches) return;

  const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  const onMove = (event: PointerEvent) => {
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - r.left}px`);
    el.style.setProperty('--my', `${event.clientY - r.top}px`);
  };
  els.forEach((el) => {
    el.classList.add('spot');
    el.addEventListener('pointermove', onMove);
  });

  return () => els.forEach((el) => {
    el.classList.remove('spot');
    el.removeEventListener('pointermove', onMove);
  });
};
