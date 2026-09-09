/**
 * Claim: these are figures Folio actually holds.
 *
 * The real figure stays in the markup until the count actually starts, so a
 * counter that never fires shows the truth rather than a zero. Under reduced
 * motion nothing animates and the markup value simply stands.
 */
import { gsap, ScrollTrigger, type MotionModule } from './registry';

const intFormat = new Intl.NumberFormat('en-US');

const format = (value: number, decimals: number): string =>
  decimals > 0 ? value.toFixed(decimals) : intFormat.format(Math.round(value));

/** Counts an element to `target`. Exported so the plan runner reuses it. */
export function countTo(
  el: HTMLElement,
  target: number,
  options: { decimals?: number; suffix?: string; duration?: number; reduced?: boolean } = {},
): Promise<void> {
  const { decimals = 0, suffix = '', duration = 1.5, reduced = false } = options;

  if (reduced) {
    el.textContent = format(target, decimals) + suffix;
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = format(state.value, decimals) + suffix;
      },
      onComplete: () => {
        el.textContent = format(target, decimals) + suffix;
        resolve();
      },
    });
  });
}

export const initCounters: MotionModule = (reduced) => {
  if (reduced) return;

  const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-count]')).map((el) => {
    const target = Number.parseFloat(el.dataset.count ?? '');
    if (Number.isNaN(target)) return null;
    const decimals = Number.parseInt(el.dataset.decimals ?? '0', 10);
    const suffix = el.dataset.suffix ?? '';

    return ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => void countTo(el, target, { decimals, suffix }),
    });
  });

  return () => triggers.forEach((t) => t?.kill());
};
