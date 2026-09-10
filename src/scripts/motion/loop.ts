/**
 * Repetition, on purpose.
 *
 * Each demo on this page carries a claim, and a claim you can only watch once
 * is a claim most visitors miss: they arrive mid-animation, or they scroll back
 * to look properly and find a frozen last frame. So a demo plays again while it
 * is on screen, and stops the moment it is not.
 *
 * Stopping matters as much as looping. A timer left running behind the fold
 * burns a laptop battery for something nobody is looking at, so the interval is
 * cleared on leave and started again on re-entry. Under reduced motion no
 * module calls this at all: there, the finished state is simply there.
 */
import { ScrollTrigger } from './registry';

interface LoopOptions {
  /** Seconds between the start of one pass and the start of the next. */
  every: number;
  /** Seconds to wait before the first pass, so a section can settle first. */
  delay?: number;
  start?: string;
  end?: string;
}

/** Plays `pass` on entry and every `every` seconds while `trigger` is on screen. */
export function loopWhileVisible(
  trigger: Element,
  pass: () => void,
  { every, delay = 0, start = 'top 80%', end = 'bottom 20%' }: LoopOptions,
): () => void {
  let timer = 0;
  let first = 0;
  let stopped = false;
  let onScreen = false;

  const clear = () => {
    window.clearTimeout(first);
    window.clearInterval(timer);
    first = 0;
    timer = 0;
  };

  const begin = () => {
    if (stopped || document.hidden || !onScreen || timer || first) return;
    first = window.setTimeout(() => {
      first = 0;
      pass();
      timer = window.setInterval(pass, every * 1000);
    }, delay * 1000);
  };

  /* A background tab throttles requestAnimationFrame to about one frame a
     second, so a pass started there cannot finish: the timer would simply keep
     restarting an animation nobody can see. Hold until the tab is looked at. */
  const onVisibility = () => (document.hidden ? clear() : begin());
  document.addEventListener('visibilitychange', onVisibility);

  const st = ScrollTrigger.create({
    trigger,
    start,
    end,
    onToggle: (self) => {
      onScreen = self.isActive;
      if (onScreen) begin();
      else clear();
    },
  });

  return () => {
    stopped = true;
    clear();
    document.removeEventListener('visibilitychange', onVisibility);
    st.kill();
  };
}

/**
 * Re-arms a CSS class that drives a one-shot transition. Removing and adding a
 * class in the same frame is a no-op, so the removal has to be painted first.
 */
export function replayClass(el: Element, className: string): void {
  el.classList.remove(className);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add(className));
  });
}
