/**
 * Interaction that must work whatever the motion preference, and whatever GSAP
 * is doing: the mobile menu, the FAQ accordion, and the gallery's two
 * segmented controls.
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

/**
 * A segmented control: one of N, with roving tabindex and arrow keys, which is
 * what role="radio" promises a keyboard user. Returns nothing; `onPick` owns
 * whatever the choice actually does.
 */
function initSegment(group: HTMLElement, onPick: (chosen: HTMLElement) => void): void {
  const options = Array.from(group.querySelectorAll<HTMLElement>('[role="radio"]'));

  const select = (chosen: HTMLElement, focus = false) => {
    options.forEach((option) => {
      const on = option === chosen;
      option.classList.toggle('is-on', on);
      option.setAttribute('aria-checked', on ? 'true' : 'false');
      option.tabIndex = on ? 0 : -1;
    });
    if (focus) chosen.focus();
    onPick(chosen);
  };

  group.addEventListener('click', (event) => {
    const option = (event.target as HTMLElement).closest<HTMLElement>('[role="radio"]');
    if (option) select(option);
  });

  group.addEventListener('keydown', (event) => {
    const step = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    if (!step) return;
    const at = options.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    event.preventDefault();
    select(options[(at + step + options.length) % options.length]!, true);
  });
}

/**
 * The gallery's two segmented controls. They looked pressable, so people
 * pressed them; now they work. Scale redraws the wall at three densities and
 * the kind filter shows photographs or clips.
 */
function initGallery(): void {
  const grid = document.querySelector<HTMLElement>('#galgrid');
  const scale = document.querySelector<HTMLElement>('#galScale');
  const kind = document.querySelector<HTMLElement>('#galKind');
  const meta = document.querySelector<HTMLElement>('#galMeta');
  if (!grid || !scale || !kind || !meta) return;

  const cells = Array.from(grid.querySelectorAll<HTMLElement>('.gal__cell'));
  const status = document.querySelector<HTMLElement>('#galStatus');
  const month = meta.dataset.month ?? '';
  const total = meta.dataset.total ?? '';

  initSegment(scale, (chosen) => {
    grid.dataset.scale = chosen.dataset.scale ?? 'm';
    if (status) {
      status.textContent = `Scale: ${chosen.textContent?.trim()} · Sorted by capture date`;
    }
  });

  initSegment(kind, (chosen) => {
    const want = chosen.dataset.kind ?? 'all';
    cells.forEach((cell) => {
      cell.classList.toggle('is-out', want !== 'all' && cell.dataset.kind !== want);
    });
    /* Never invent a filtered figure. The wall shows a handful of tiles while
       the meta claims a whole month, so counting what is on screen would be a
       lie either way. Say which kind is showing instead. */
    meta.textContent =
      want === 'all'
        ? `${month} · ${total}`
        : `${month} · ${chosen.textContent?.trim().toLowerCase()} only`;
  });
}

export function initInteractions(): void {
  initMenu();
  initFaq();
  initGallery();
}
