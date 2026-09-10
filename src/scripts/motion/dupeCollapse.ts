/**
 * Claim: quarantine frees nothing until you reclaim, and Folio says so.
 *
 * Three of four identical copies converge on the quarantine folder and one
 * stays. The folder then says how many arrived, so the panel ends on a fact
 * rather than on three pictures having vanished. Choosing the permanent outcome
 * re-labels the destination and turns it red, because the page must not make
 * the dangerous option look like the safe one. The CSS owns the movement; this
 * owns the state and the timing.
 *
 * The outcome buttons are a radiogroup and keep working under reduced motion.
 */
import { type MotionModule } from './registry';
import { loopWhileVisible } from './loop';
import { site } from '@/config/site';

/** How long the four copies sit there before the three leave. */
const HOLD = 1300;
/** A click deserves a faster answer than a replay does. */
const HOLD_ON_CLICK = 320;

export const initDupeCollapse: MotionModule = (reduced) => {
  const root = document.querySelector<HTMLElement>('#dupes');
  if (!root) return;

  const stage = root.querySelector<HTMLElement>('.dupes__stage');
  const destName = root.querySelector<HTMLElement>('.dupes__destname');
  const outcomes = Array.from(root.querySelectorAll<HTMLButtonElement>('.outc'));
  if (!stage || !destName) return;

  let hold = 0;

  /* The "before" is the half that carries the problem: four copies you have to
     be able to count. The old pass spent less than half a second on it. */
  const collapse = (wait: number) => {
    window.clearTimeout(hold);
    if (reduced) {
      stage.classList.add('is-collapsed');
      return;
    }
    stage.classList.remove('is-collapsed');
    hold = window.setTimeout(() => stage.classList.add('is-collapsed'), wait);
  };

  const onOutcome = (chosen: HTMLButtonElement) => {
    outcomes.forEach((button) => {
      const on = button === chosen;
      button.classList.toggle('is-on', on);
      button.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    const reclaim = chosen.dataset.outcome === 'reclaim';
    stage.classList.toggle('is-danger', reclaim);
    destName.textContent = reclaim ? 'Removed for good' : site.canvas.quarantineFolder;
    collapse(HOLD_ON_CLICK);
  };

  const handlers = outcomes.map((button) => {
    const handler = () => onOutcome(button);
    button.addEventListener('click', handler);
    return { button, handler };
  });

  /* Reduced motion gets no loop: the copies are already collapsed and the
     outcome buttons still work. */
  const stopLoop = reduced
    ? null
    : loopWhileVisible(root, () => collapse(HOLD), { every: 6, delay: 0.4, start: 'top 80%' });

  return () => {
    handlers.forEach((entry) => entry.button.removeEventListener('click', entry.handler));
    window.clearTimeout(hold);
    stopLoop?.();
  };
};
