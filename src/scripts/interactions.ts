/**
 * Interaction that must work whatever the motion preference, and whatever GSAP
 * is doing: the mobile menu and the FAQ accordion.
 *
 * Registered outside gsap.matchMedia() on purpose, so a preference change never
 * tears a listener down and leaves a control dead.
 */

/** The burger menu. Mirrors its state into aria-expanded and the label. */
function initMenu(): void {
  const burger = document.querySelector<HTMLButtonElement>('#burger');
  const links = document.querySelector<HTMLElement>('#navlinks');
  const nav = document.querySelector<HTMLElement>('#nav');
  if (!burger || !links || !nav) return;

  const setOpen = (open: boolean) => {
    links.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  burger.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
  links.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).tagName === 'A') setOpen(false);
  });
}

/** One answer open at a time, so the list stays readable. */
function initFaq(): void {
  const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('.faq details'));
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

export function initInteractions(): void {
  initMenu();
  initFaq();
}
