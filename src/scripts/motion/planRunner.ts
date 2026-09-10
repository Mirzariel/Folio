/**
 * Claim: you approve, then Folio does it and verifies it.
 *
 * Plan, Confirm, Move, Verify, Done. The approval beat is never skipped: the
 * button is visibly pressed before anything moves, and the status strip keeps
 * saying so. Under reduced motion the run still happens on click and still ends
 * at Done, it just arrives there without the intermediate choreography.
 *
 * The strip is aria-live, so a screen reader hears the state change.
 */
import { gsap, type MotionModule } from './registry';
import { loopWhileVisible } from './loop';
import { countTo } from './counters';
import { site, display } from '@/config/site';

const DONE_STATUS = `Done. ${display.planFiles} moved and verified. Nothing was deleted.`;

export const initPlanRunner: MotionModule = (reduced) => {
  const win = document.querySelector<HTMLElement>('#planwin');
  const approve = document.querySelector<HTMLButtonElement>('#approve');
  if (!win || !approve) return;

  const btnLabel = approve.querySelector<HTMLElement>('.plan__btnlabel');
  const flowSteps = Array.from(document.querySelectorAll<HTMLElement>('#planFlow .flow__s'));
  const rows = Array.from(document.querySelectorAll<HTMLElement>('#planRows .rows__r'));
  const count = document.querySelector<HTMLElement>('#planCount');
  const unit = document.querySelector<HTMLElement>('#planUnit');
  const label = document.querySelector<HTMLElement>('#planLabel');
  const status = document.querySelector<HTMLElement>('#planStatus');
  if (!btnLabel || !count || !unit || !label || !status) return;

  const initial = {
    count: count.textContent ?? '',
    unit: unit.textContent ?? '',
    label: label.textContent ?? '',
    status: status.textContent ?? '',
  };

  let running = false;
  let played = false;
  let stopLoop: (() => void) | null = null;
  let timeline: gsap.core.Timeline | null = null;

  const setFlow = (live: number) => {
    flowSteps.forEach((step, i) => {
      step.classList.toggle('is-done', i < live);
      step.classList.toggle('is-live', i === live);
    });
  };

  const reset = () => {
    setFlow(1);
    rows.forEach((row) => row.classList.remove('is-done'));
    count.textContent = initial.count;
    unit.textContent = initial.unit;
    label.textContent = initial.label;
    status.textContent = initial.status;
    status.classList.remove('is-done');
    btnLabel.textContent = 'Approve this plan';
    approve.disabled = false;
  };

  const finish = (replayLabel: string) => {
    setFlow(4);
    label.textContent = 'What happened';
    unit.textContent = 'files moved and verified';
    status.textContent = DONE_STATUS;
    status.classList.add('is-done');
    btnLabel.textContent = replayLabel;
    approve.disabled = false;
    running = false;
  };

  const run = () => {
    if (running) return;
    running = true;
    played = true;
    approve.disabled = true;
    approve.classList.add('is-pressed');
    window.setTimeout(() => approve.classList.remove('is-pressed'), 340);

    if (reduced) {
      rows.forEach((row) => row.classList.add('is-done'));
      finish('Reset the demo');
      return;
    }

    btnLabel.textContent = 'Approved';

    timeline = gsap.timeline();
    timeline
      .to({}, { duration: 0.42 })
      .call(() => {
        setFlow(2);
        label.textContent = 'What is happening';
        unit.textContent = 'files moved so far';
        status.textContent = 'Moving. Same drive, one file at a time.';
        rows.forEach((row, i) => {
          window.setTimeout(() => row.classList.add('is-done'), 120 + i * 165);
        });
        void countTo(count, site.canvas.planFiles, { duration: 1.4 });
      })
      .to({}, { duration: 1.45 })
      .call(() => {
        setFlow(3);
        unit.textContent = 'files checked against the plan';
        status.textContent = 'Verifying every completed change.';
      })
      .to({}, { duration: 0.95 })
      .call(() => finish('Run it again'));
  };

  const onClick = () => {
    if (running) return;
    /* The visitor has taken over. Stop replaying underneath them. */
    stopLoop?.();
    stopLoop = null;
    /* After a finished run the button says Run it again, so it must do exactly
       that: snap back to the plan, then play it through. */
    if (played) {
      reset();
      played = false;
      window.setTimeout(run, reduced ? 0 : 320);
      return;
    }
    run();
  };

  setFlow(1);
  approve.addEventListener('click', onClick);

  /* Plays itself over and over while the window is on screen, so the story is
     told even if nobody clicks and can be watched again without a reload. Never
     under reduced motion: there, the visitor asks for the run. */
  if (!reduced) {
    stopLoop = loopWhileVisible(
      win,
      () => {
        if (running) return;
        if (played) {
          reset();
          played = false;
        }
        run();
      },
      { every: 8, delay: 1.2, start: 'top 70%' },
    );
  }

  return () => {
    approve.removeEventListener('click', onClick);
    stopLoop?.();
    timeline?.kill();
  };
};
