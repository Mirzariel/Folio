/**
 * Claim: the launch price really is lower than the regular one.
 *
 * When the offer card arrives, the figure counts down from the regular price to
 * the launch price and the old price is struck through. Once, and only while the
 * offer is live. Under reduced motion the strike is simply drawn and the launch
 * price simply shown.
 */
import { gsap, ScrollTrigger, type MotionModule } from './registry';

export const initPriceDrop: MotionModule = (reduced) => {
  const price = document.querySelector<HTMLElement>('#offerPrice');
  const amount = document.querySelector<HTMLElement>('#offerAmt');
  if (!price || !amount) return;

  const from = Number(price.dataset.from);
  const to = Number(price.dataset.to);
  const ended = () => document.documentElement.classList.contains('offer-ended');

  if (reduced || ended() || !(from > to)) {
    price.classList.add('is-dropped');
    return () => price.classList.remove('is-dropped');
  }

  const state = { v: from };
  let tween: gsap.core.Tween | null = null;
  const st = ScrollTrigger.create({
    trigger: price,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      price.classList.add('is-dropped');
      amount.textContent = String(from);
      tween = gsap.to(state, {
        v: to,
        duration: 1.1,
        delay: 0.45,
        ease: 'power2.out',
        onUpdate: () => { amount.textContent = String(Math.round(state.v)); },
        onComplete: () => { amount.textContent = String(to); },
      });
      /* The price a buyer pays must not depend on the animation finishing: a
         tab that stops painting mid-count would otherwise be left showing the
         regular price. A timer lands the real figure regardless. */
      window.setTimeout(() => { amount.textContent = String(to); }, 1800);
    },
  });

  return () => {
    st.kill();
    tween?.kill();
    amount.textContent = String(to);
  };
};
