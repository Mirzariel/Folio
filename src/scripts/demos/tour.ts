/**
 * The live demo in "Try it": Drop, Preview, Approve.
 *
 * Interaction, not motion: registered outside gsap.matchMedia() so a change of
 * motion preference can never leave a control dead. Every state a visitor needs
 * is set synchronously by class; the flights and counts on top are decoration,
 * driven by timers and the Web Animations API rather than requestAnimationFrame,
 * so a tab that never paints still ends at the right state.
 *
 * Dragging uses pointer events, so it works with a mouse, a pen and a finger.
 * Pressing the folder, or the primary button, does the same thing as a drop.
 *
 * motion/tourAutoplay.ts may dispatch `demo:autoplay` on #tour once. The demo
 * plays itself only if the visitor has not touched it, and stops the moment
 * they do.
 */
import { tourSteps, tourPhotos, scanTotal } from '@/data/tour';

const fmt = new Intl.NumberFormat('en-US');
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = 'cubic-bezier(.22,.61,.36,1)';

export function initTour(): void {
  const tour = document.querySelector<HTMLElement>('#tour');
  const drop = document.querySelector<HTMLElement>('#tourDrop');
  const plan = document.querySelector<HTMLElement>('#tourPlan');
  const folder = document.querySelector<HTMLButtonElement>('#tourFolder');
  const ghost = document.querySelector<HTMLElement>('#tourGhost');
  const cursor = document.querySelector<SVGElement>('#tourCursor');
  const next = document.querySelector<HTMLButtonElement>('#tourNext');
  const back = document.querySelector<HTMLButtonElement>('#tourBack');
  const title = document.querySelector<HTMLElement>('#tourTitle');
  const body = document.querySelector<HTMLElement>('#tourBody');
  const stepLabel = document.querySelector<HTMLElement>('#tourStep');
  const state = document.querySelector<HTMLElement>('#tourState');
  const status = document.querySelector<HTMLElement>('#tourStatus');
  if (!tour || !drop || !plan || !folder || !ghost || !cursor || !next || !back || !title || !body || !stepLabel || !state) return;

  const doors = Array.from(drop.querySelectorAll<HTMLElement>('.td__door'));
  const stepBtns = Array.from(tour.querySelectorAll<HTMLButtonElement>('.tour__st'));
  const lines = Array.from(tour.querySelectorAll<HTMLElement>('.tour__line'));
  const cells = Array.from(plan.querySelectorAll<HTMLElement>('.tp__cell'));
  const slots = Array.from(plan.querySelectorAll<HTMLElement>('.tp__slot'));
  const rows = Array.from(plan.querySelectorAll<HTMLElement>('.tp__row'));
  const idle = status?.textContent ?? '';

  let step = 0;
  let reached = 0;
  let scanned = false;
  let busy = false;
  let moved = false;
  let touched = false;
  let timers: number[] = [];
  const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, reducedMotion() ? 0 : ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const setStatus = (text: string) => { if (status) status.textContent = text; };

  const syncButtons = () => {
    back.disabled = step === 0 || busy;
    if (step === 0) next.textContent = busy ? 'Scanning…' : scanned ? 'Next' : 'Scan Pictures';
    else if (step === 1) next.textContent = 'Next';
    else next.textContent = busy ? 'Moving…' : moved ? 'Start again' : `Move ${tourPhotos.length} photos`;
    next.disabled = busy;
  };

  const go = (to: number) => {
    step = to;
    reached = Math.max(reached, to);
    tour.dataset.step = String(to);
    stepBtns.forEach((btn, i) => {
      btn.classList.toggle('is-on', i === to);
      btn.classList.toggle('is-done', i < to || (i === 2 && moved));
      btn.disabled = i > reached || busy;
    });
    lines.forEach((line, i) => line.classList.toggle('is-done', i < to));
    const copy = tourSteps[to]!;
    /* New text, and the caption's entrance plays again. */
    for (const [el, text] of [[title, copy.title], [body, copy.body]] as const) {
      if (el.textContent === text) continue;
      el.textContent = text;
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    }
    stepLabel.textContent = `${to + 1} of 3`;
    if (to === 1 && !moved) slots.forEach((slot, i) => later(120 + i * 90, () => slot.classList.add('is-planned')));
    syncButtons();
  };

  /* ---- step one: the scan ------------------------------------------------ */
  const scan = (door: HTMLElement) => {
    if (busy || scanned) return;
    busy = true;
    doors.forEach((d) => d.classList.remove('is-over', 'is-scanned', 'is-scanning'));
    door.classList.add('is-scanning');
    const n = door.querySelector<HTMLElement>('.td__n')!;
    const bar = door.querySelector<HTMLElement>('.td__bar')!;
    const lab = door.querySelector<HTMLElement>('.td__lab')!;
    lab.textContent = 'Scanning';
    syncButtons();
    const ticks = reducedMotion() ? 1 : 40;
    for (let t = 1; t <= ticks; t++) {
      later(t * 40, () => {
        const f = t / ticks;
        const value = Math.round(scanTotal * (1 - Math.pow(1 - f, 2)));
        n.textContent = fmt.format(value);
        bar.style.setProperty('--f', String(f));
        setStatus(`Reading photographs · ${fmt.format(value)} of ${fmt.format(scanTotal)}`);
        if (t === ticks) {
          door.classList.replace('is-scanning', 'is-scanned');
          lab.textContent = 'Photos found';
          setStatus(`Folder read · ${fmt.format(scanTotal)} photographs · nothing changed`);
          busy = false;
          scanned = true;
          syncButtons();
          later(800, () => { if (step === 0) go(1); });
        }
      });
    }
  };

  /* ---- step three: the move, then the check ------------------------------ */
  const move = () => {
    if (busy || moved) return;
    busy = true;
    syncButtons();
    const order = tourPhotos.map((_, i) => i);
    order.forEach((i, k) => later(200 + k * 260, () => {
      const cell = cells[i]!;
      const slot = slots.find((s) => s.dataset.i === String(i))!;
      const from = cell.getBoundingClientRect();
      const to = slot.getBoundingClientRect();
      slot.classList.add('is-filled');
      cell.classList.add('is-gone');
      if (!reducedMotion() && from.width > 0) {
        slot.style.zIndex = '4';
        const anim = slot.animate(
          [
            { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`, transformOrigin: '0 0' },
            { transform: 'none', transformOrigin: '0 0' },
          ],
          { duration: 560, easing: EASE },
        );
        anim.onfinish = () => { slot.style.zIndex = ''; };
      }
      state.textContent = `${k + 1} of ${tourPhotos.length} moved`;
      setStatus(`Organizing by date · ${k + 1} of ${tourPhotos.length}`);
    }));
    const end = 200 + order.length * 260 + 400;
    later(end, () => { state.textContent = 'Verifying every move against the plan'; setStatus('Verifying'); });
    rows.forEach((row, r) => later(end + 300 + r * 260, () => row.classList.add('is-ok')));
    later(end + 300 + rows.length * 260 + 200, () => {
      plan.classList.add('is-done');
      state.textContent = `${tourPhotos.length} moved and verified · nothing was deleted`;
      setStatus('Done and verified');
      busy = false;
      moved = true;
      go(2);
    });
  };

  const resetMove = () => {
    moved = false;
    plan.classList.remove('is-done');
    cells.forEach((c) => c.classList.remove('is-gone'));
    slots.forEach((s) => s.classList.remove('is-filled'));
    rows.forEach((r) => r.classList.remove('is-ok'));
    state.textContent = `${tourPhotos.length} planned · Nothing has moved`;
  };

  const resetAll = () => {
    clearTimers();
    busy = false;
    scanned = false;
    reached = 0;
    resetMove();
    slots.forEach((s) => s.classList.remove('is-planned'));
    doors.forEach((d) => {
      d.classList.remove('is-over', 'is-scanning', 'is-scanned');
      d.querySelector<HTMLElement>('.td__n')!.textContent = '0';
      d.querySelector<HTMLElement>('.td__bar')!.style.setProperty('--f', '0');
    });
    setStatus(idle);
    go(0);
  };

  /* ---- controls ---------------------------------------------------------- */
  const takeOver = () => {
    if (touched) return;
    touched = true;
    cursor.classList.remove('is-on');
    ghost.classList.remove('is-on');
  };
  tour.addEventListener('pointerdown', takeOver, { capture: true });
  tour.addEventListener('keydown', takeOver, { capture: true });

  next.addEventListener('click', () => {
    if (step === 0) { if (scanned) go(1); else scan(doors[0]!); }
    else if (step === 1) go(2);
    else if (moved) resetAll();
    else move();
  });
  back.addEventListener('click', () => {
    if (busy) return;
    if (step === 2 && moved) resetMove();
    go(step - 1);
  });
  stepBtns.forEach((btn, i) => btn.addEventListener('click', () => {
    if (busy || i > reached) return;
    if (i < 2 && moved) resetMove();
    go(i);
  }));

  /* Drag the folder onto a door. A press without movement is a click. */
  let drag: { id: number; x: number; y: number; moving: boolean } | null = null;
  let suppressClick = false;
  const doorAt = (x: number, y: number) =>
    (document.elementFromPoint(x, y) as HTMLElement | null)?.closest<HTMLElement>('.td__door') ?? null;
  const place = (el: Element, x: number, y: number, dx = 14, dy = 10) => {
    const box = drop.getBoundingClientRect();
    (el as HTMLElement).style.transform = `translate(${x - box.left + dx}px, ${y - box.top + dy}px)`;
  };

  folder.addEventListener('pointerdown', (e) => {
    if (busy || scanned) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moving: false };
    /* Capture keeps the drag alive outside the button. A pointer the browser
       no longer tracks cannot be captured, and the drag still works without. */
    try { folder.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
  });
  folder.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moving && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
    drag.moving = true;
    folder.classList.add('is-held');
    ghost.classList.add('is-on');
    place(ghost, e.clientX, e.clientY);
    const over = doorAt(e.clientX, e.clientY);
    doors.forEach((d) => d.classList.toggle('is-over', d === over));
  });
  const endDrag = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    const wasMoving = drag.moving;
    drag = null;
    folder.classList.remove('is-held');
    ghost.classList.remove('is-on');
    if (!wasMoving) return;
    suppressClick = true;
    const over = doorAt(e.clientX, e.clientY);
    doors.forEach((d) => d.classList.remove('is-over'));
    if (over) scan(over);
  };
  folder.addEventListener('pointerup', endDrag);
  folder.addEventListener('pointercancel', endDrag);
  folder.addEventListener('click', () => {
    if (suppressClick) { suppressClick = false; return; }
    scan(doors[0]!);
  });

  /* ---- autoplay, offered once by the motion layer ------------------------ */
  tour.addEventListener('demo:autoplay', () => {
    if (touched || scanned || busy || reducedMotion()) return;
    const box = drop.getBoundingClientRect();
    const f = folder.getBoundingClientRect();
    const d = doors[0]!.getBoundingClientRect();
    const start = [f.left + f.width * 0.4, f.top + f.height * 0.5] as const;
    const end = [d.left + d.width * 0.5, d.top + d.height * 0.55] as const;
    const frames = (dx: number, dy: number) => [
      { transform: `translate(${start[0] - box.left + dx}px, ${start[1] - box.top + dy}px)` },
      { transform: `translate(${start[0] - box.left + dx}px, ${start[1] - box.top + dy}px)`, offset: 0.2 },
      { transform: `translate(${end[0] - box.left + dx}px, ${end[1] - box.top + dy}px)` },
    ];
    cursor.classList.add('is-on');
    place(cursor, start[0], start[1], 0, 0);
    later(500, () => {
      if (touched) return;
      ghost.classList.add('is-on');
      cursor.animate(frames(0, 0), { duration: 1300, easing: EASE, fill: 'forwards' });
      ghost.animate(frames(14, 10), { duration: 1300, easing: EASE, fill: 'forwards' });
    });
    later(1500, () => { if (!touched) doors[0]!.classList.add('is-over'); });
    later(2000, () => {
      if (touched) return;
      ghost.classList.remove('is-on');
      cursor.classList.remove('is-on');
      scan(doors[0]!);
    });
    later(5200, () => { if (!touched && step === 1) go(2); });
    later(6400, () => { if (!touched && step === 2) move(); });
  });

  go(0);
}
