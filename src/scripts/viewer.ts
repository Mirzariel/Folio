/**
 * The photograph viewer.
 *
 * Claim: the product spec's connected enlargement. The tile grows into the
 * frame, and Escape reads as putting a print down rather than navigating back.
 *
 * Registered outside gsap.matchMedia(): a modal must never be torn down by a
 * preference change while it is open. Reduced motion skips the enlargement and
 * every control still works.
 *
 * Focus stays inside the dialog while it covers the wall and returns to the
 * tile now showing, which is where the print was put down.
 *
 * Note on the enlargement: this animates an explicit transform rather than
 * using the Flip plugin, because the tile and the viewer are two different
 * elements. The maths is small, the result identical, and it keeps the plugin
 * out of the bundle.
 */
import { gsap } from 'gsap';

/**
 * Runs cb on the next painted frame, or after a short timeout if no frame
 * arrives. A backgrounded or unpainted tab stalls requestAnimationFrame
 * indefinitely, and a modal that depends on a frame to become visible, or to
 * finish closing, would be stranded.
 */
function onNextFrame(cb: () => void): void {
  let done = false;
  const once = () => {
    if (done) return;
    done = true;
    cb();
  };
  requestAnimationFrame(once);
  window.setTimeout(once, 60);
}

export function initViewer(): void {
  const viewer = document.querySelector<HTMLElement>('#viewer');
  const cells = Array.from(document.querySelectorAll<HTMLButtonElement>('.gal__cell'));
  if (!viewer || cells.length === 0) return;

  const image = viewer.querySelector<HTMLImageElement>('#viewerImg');
  const nameEl = viewer.querySelector<HTMLElement>('#viewerName');
  const posEl = viewer.querySelector<HTMLElement>('#viewerPos');
  const closeBtn = viewer.querySelector<HTMLButtonElement>('#viewerClose');
  const prevBtn = viewer.querySelector<HTMLButtonElement>('#viewerPrev');
  const nextBtn = viewer.querySelector<HTMLButtonElement>('#viewerNext');
  if (!image || !nameEl || !posEl || !closeBtn || !prevBtn || !nextBtn) return;

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const month = document.querySelector<HTMLElement>('.gal__meta')?.textContent?.split('\u00b7')[0]?.trim();

  let index = 0;
  let isOpen = false;
  let lastFocus: HTMLElement | null = null;

  /* The gallery's kind filter hides tiles, and a hidden tile must not be
     reachable through the arrows or counted in "n of N". */
  const shown = () => cells.filter((cell) => !cell.classList.contains('is-out'));

  const paintMeta = () => {
    const tile = cells[index];
    nameEl.textContent = tile?.dataset.name ?? 'Photograph';
    const list = shown();
    const at = tile ? list.indexOf(tile) : -1;
    posEl.textContent = `${at + 1} of ${list.length}${month ? ` in ${month}` : ''}`;
  };

  const tileImage = (i: number) => cells[i]?.querySelector('img') ?? null;

  /** Animates the viewer image from the tile's box to its natural place. */
  const growFrom = (rect: DOMRect) => {
    if (reduced()) return;
    const to = image.getBoundingClientRect();
    if (!to.width || !to.height) return;
    gsap.fromTo(
      image,
      {
        x: rect.left - to.left,
        y: rect.top - to.top,
        scaleX: rect.width / to.width,
        scaleY: rect.height / to.height,
      },
      { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.44, ease: 'power2.out' },
    );
  };

  const open = (i: number) => {
    index = i;
    lastFocus = document.activeElement as HTMLElement | null;
    const source = tileImage(index);
    if (!source) return;
    const rect = source.getBoundingClientRect();

    image.src = source.currentSrc || source.src;
    image.alt = source.alt || '';
    paintMeta();

    viewer.hidden = false;
    isOpen = true;

    // hold the page still without letting the scrollbar's width shift it
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    gsap.set(image, { clearProps: 'transform' });
    if (image.complete && image.naturalWidth) {
      growFrom(rect);
    } else {
      image.addEventListener('load', () => growFrom(rect), { once: true });
    }

    onNextFrame(() => viewer.classList.add('is-open'));
    closeBtn.focus();
  };

  let closing = false;
  const finishClose = () => {
    if (!closing) return;
    closing = false;
    viewer.hidden = true;
    gsap.set(image, { clearProps: 'transform' });
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    const back = cells[index] ?? lastFocus;
    if (back && back !== document.body) back.focus({ preventScroll: true });
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    closing = true;
    viewer.classList.remove('is-open');

    const source = tileImage(index);
    const to = image.getBoundingClientRect();
    if (reduced() || !source || !to.width || !to.height) {
      finishClose();
      return;
    }

    const rect = source.getBoundingClientRect();
    gsap.to(image, {
      x: rect.left - to.left,
      y: rect.top - to.top,
      scaleX: rect.width / to.width,
      scaleY: rect.height / to.height,
      duration: 0.34,
      ease: 'power2.in',
      onComplete: finishClose,
    });
    /* The tween is rAF-driven. If no frame ever arrives the viewer must still
       close, so a timer closes it and finishClose guards against running twice. */
    window.setTimeout(finishClose, 380);
  };

  const step = (direction: number) => {
    const list = shown();
    if (list.length === 0) return;
    const at = list.indexOf(cells[index]!);
    index = cells.indexOf(list[(Math.max(at, 0) + direction + list.length) % list.length]!);
    const source = tileImage(index);
    if (!source) return;
    const swap = () => {
      image.src = source.currentSrc || source.src;
      image.alt = source.alt || '';
      paintMeta();
      image.classList.remove('is-swapping');
    };
    image.classList.add('is-swapping');
    window.setTimeout(swap, reduced() ? 0 : 160);
  };

  cells.forEach((cell, i) => cell.addEventListener('click', () => open(i)));
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  viewer.querySelectorAll<HTMLElement>('[data-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    } else if (event.key === 'Tab') {
      // keep focus inside the viewer while it covers the wall
      const order = [closeBtn, prevBtn, nextBtn];
      const at = order.indexOf(document.activeElement as HTMLButtonElement);
      event.preventDefault();
      const next = (at + (event.shiftKey ? -1 : 1) + order.length) % order.length;
      order[next]?.focus();
    }
  });
}
