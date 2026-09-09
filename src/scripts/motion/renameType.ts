/**
 * Claim: the preview is mandatory and it updates before you commit.
 *
 * The pattern types itself and the rows rewrite live, one character at a time,
 * so the preview is visibly downstream of the pattern. Extensions never change.
 * Under reduced motion the finished pattern and its preview are simply there.
 */
import { gsap, ScrollTrigger, type MotionModule } from './registry';
import { renamePattern } from '@/data/mockup';

export const initRenameType: MotionModule = (reduced) => {
  const root = document.querySelector<HTMLElement>('#rename');
  if (!root) return;

  const text = root.querySelector<HTMLElement>('#rnText');
  const caret = root.querySelector<HTMLElement>('.rn__caret');
  const previews = Array.from(root.querySelectorAll<HTMLElement>('#rnRows b'));
  if (!text) return;

  const paint = (typed: string) => {
    text.textContent = typed;
    // a half-typed token must not leak into the preview
    const base = typed.replace(/\{n?$/, '');
    previews.forEach((el) => {
      const index = String(el.dataset.i ?? '').padStart(3, '0');
      const name = base.includes('{n}') ? base.replace('{n}', index) : base;
      el.textContent = name + (el.dataset.ext ?? '');
    });
  };

  if (reduced) {
    paint(renamePattern);
    caret?.classList.add('is-off');
    return;
  }

  let tween: gsap.core.Tween | null = null;

  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      const state = { chars: 0 };
      tween = gsap.to(state, {
        chars: renamePattern.length,
        duration: renamePattern.length * 0.062,
        ease: 'none',
        onUpdate: () => paint(renamePattern.slice(0, Math.round(state.chars))),
        onComplete: () => {
          paint(renamePattern);
          window.setTimeout(() => caret?.classList.add('is-off'), 900);
        },
      });
    },
  });

  return () => {
    trigger.kill();
    tween?.kill();
  };
};
