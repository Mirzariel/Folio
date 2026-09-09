/**
 * Claim: quarantine frees nothing until you reclaim, and Folio says so.
 *
 * Three of four identical copies slide into the quarantine folder and one
 * stays. Choosing the permanent outcome re-labels the destination and turns it
 * red, because the page must not make the dangerous option look like the safe
 * one. The CSS owns the movement; this owns the state.
 *
 * The outcome buttons are a radiogroup and keep working under reduced motion.
 */
import { ScrollTrigger, type MotionModule } from './registry';
import { site } from '@/config/site';

export const initDupeCollapse: MotionModule = (reduced) => {
  const root = document.querySelector<HTMLElement>('#dupes');
  if (!root) return;

  const stage = root.querySelector<HTMLElement>('.dupes__stage');
  const destName = root.querySelector<HTMLElement>('.dupes__destname');
  const outcomes = Array.from(root.querySelectorAll<HTMLButtonElement>('.outc'));
  if (!stage || !destName) return;

  const collapse = () => {
    stage.classList.remove('is-collapsed');
    if (reduced) {
      stage.classList.add('is-collapsed');
      return;
    }
    // let the reset paint before replaying
    requestAnimationFrame(() => {
      requestAnimationFrame(() => stage.classList.add('is-collapsed'));
    });
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
    collapse();
  };

  const handlers = outcomes.map((button) => {
    const handler = () => onOutcome(button);
    button.addEventListener('click', handler);
    return { button, handler };
  });

  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 'top 80%',
    once: true,
    onEnter: () => window.setTimeout(collapse, 420),
  });

  return () => {
    handlers.forEach((entry) => entry.button.removeEventListener('click', entry.handler));
    trigger.kill();
  };
};
