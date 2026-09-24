/**
 * Claim: the preview updates before you commit.
 *
 * The first time the rename panel comes into view, the example name types
 * itself into the real field, one character at a time, and the preview rows
 * follow every keystroke through the same input event a visitor would fire.
 * It happens once, and never after the visitor has touched the field. Under
 * reduced motion the example name is simply already there.
 */
import { ScrollTrigger, type MotionModule } from './registry';
import { renameDefault } from '@/data/rename';

export const initRenameType: MotionModule = (reduced) => {
  const input = document.querySelector<HTMLInputElement>('#rnName');
  if (!input || reduced) return;

  let touched = false;
  let timer = 0;
  const stop = () => { touched = true; window.clearTimeout(timer); };
  input.addEventListener('pointerdown', stop, { once: true });
  input.addEventListener('keydown', stop, { once: true });

  const type = (i: number) => {
    if (touched) return;
    input.value = renameDefault.slice(0, i);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    if (i < renameDefault.length) timer = window.setTimeout(() => type(i + 1), 95 + Math.random() * 70);
  };

  const st = ScrollTrigger.create({
    trigger: input,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      if (touched || input.value !== renameDefault) return;
      type(0);
    },
  });

  return () => {
    st.kill();
    window.clearTimeout(timer);
    input.removeEventListener('pointerdown', stop);
    input.removeEventListener('keydown', stop);
    if (!touched && input.value !== renameDefault) {
      input.value = renameDefault;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };
};
