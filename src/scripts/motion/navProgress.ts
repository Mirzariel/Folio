/**
 * Infrastructure: the sticky nav background, the reading-progress rule, the
 * section the nav marks, and the mobile buy bar.
 *
 * The buy bar hides itself while the pricing section is on screen, so it never
 * covers the thing it is pointing at. All of this runs under reduced motion
 * too: it is state, not decoration.
 */
import { gsap, ScrollTrigger, type MotionModule } from './registry';
import { navSectionIds } from '@/data/navigation';

export const initNavProgress: MotionModule = () => {
  const nav = document.querySelector<HTMLElement>('#nav');
  const progress = document.querySelector<HTMLElement>('#progress');
  const buybar = document.querySelector<HTMLElement>('#buybar');
  const pricing = document.querySelector<HTMLElement>('#pricing');

  const triggers: ScrollTrigger[] = [];

  if (nav) {
    triggers.push(
      ScrollTrigger.create({
        start: 'top -40',
        end: 'max',
        onToggle: (self) => nav.classList.toggle('is-stuck', self.isActive),
      }),
    );
  }

  if (progress) {
    gsap.set(progress, { scaleX: 0, transformOrigin: '0 50%' });
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
      }),
    );
  }

  if (buybar) {
    /* Visible past the first screen, except while pricing is in view. */
    let pastFold = false;
    let pricingVisible = false;
    const sync = () => buybar.classList.toggle('is-on', pastFold && !pricingVisible);

    triggers.push(
      ScrollTrigger.create({
        start: () => `${window.innerHeight * 0.9} top`,
        end: 'max',
        onToggle: (self) => { pastFold = self.isActive; sync(); },
      }),
    );

    if (pricing) {
      triggers.push(
        ScrollTrigger.create({
          trigger: pricing,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => { pricingVisible = self.isActive; sync(); },
        }),
      );
    }
  }

  /* Marks the nav link for the section in the middle of the viewport. */
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('#navlinks a'));
  const linkFor = new Map<string, HTMLAnchorElement>();
  links.forEach((a) => {
    const id = a.getAttribute('href')?.split('#')[1];
    if (id) linkFor.set(id, a);
  });

  const mark = (id: string) => {
    links.forEach((a) => a.classList.remove('is-here'));
    linkFor.get(id)?.classList.add('is-here');
  };

  navSectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 50%',
        onToggle: (self) => { if (self.isActive) mark(id); },
      }),
    );
  });

  return () => triggers.forEach((t) => t.kill());
};
