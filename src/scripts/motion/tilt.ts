/**
 * Micro detail: the mockup windows lean very slightly toward the pointer.
 * Fine pointers only, and never under reduced motion.
 */
import type { MotionModule } from './registry';

export const initTilt: MotionModule = (reduced) => {
  if (reduced || !window.matchMedia('(pointer: fine)').matches) return;

  const cleanups: (() => void)[] = [];

  document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--ry', `${(x * 2.2).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * 1.4).toFixed(2)}deg`);
    };
    const onLeave = () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      onLeave();
    });
  });

  return () => cleanups.forEach((fn) => fn());
};
