/**
 * Claim: scattered photographs become an ordered archive, and the reading in
 * between changes nothing.
 *
 * The film section is a tall track with a sticky room inside it. Scrolling the
 * track advances three beats and resolves the prints: --p runs from 0 (the
 * pile) to 1 (the grid) across the middle of the track, so the pile is still a
 * pile while "Scattered" is on screen and already a grid for "Placed".
 *
 * Under reduced motion this module does nothing; the stylesheet flattens the
 * track into an ordinary section with the grid finished and every beat listed.
 */
import { gsap, ScrollTrigger, type MotionModule } from './registry';

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const initFilm: MotionModule = (reduced) => {
  const film = document.querySelector<HTMLElement>('#film');
  const track = document.querySelector<HTMLElement>('#filmTrack');
  const prints = document.querySelector<HTMLElement>('#prints');
  if (!film || !track || !prints || reduced) return;

  const st = ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      const beat = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
      if (film.dataset.beat !== String(beat)) film.dataset.beat = String(beat);
      film.style.setProperty('--prog', p.toFixed(3));
      gsap.to(prints, { '--p': clamp01((p - 0.5) / 0.3), duration: 0.35, ease: 'power2.out', overwrite: true });
    },
  });

  return () => {
    st.kill();
    film.dataset.beat = '0';
    prints.style.removeProperty('--p');
  };
};
