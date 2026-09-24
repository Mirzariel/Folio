/**
 * Find duplicates, live.
 *
 * The rules are the application's: at least one copy always remains, so the
 * mark that would leave none is refused and the card says why; a copy on
 * another drive starts kept as a possible backup; removal goes to the Recycle
 * Bin, after a confirmation that says it is not permanent; and everything that
 * went in can be put back.
 *
 * State is set by class immediately. The flight into and out of the bin is a
 * Web Animation on top, skipped under reduced motion.
 */
import { dupCopies, dupSizeMb } from '@/data/dupes';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initDupes(): void {
  const root = document.querySelector<HTMLElement>('#dupes');
  const line = document.querySelector<HTMLElement>('#dupLine');
  const choose = document.querySelector<HTMLButtonElement>('#dupChoose');
  const review = document.querySelector<HTMLButtonElement>('#dupReview');
  const bin = document.querySelector<HTMLElement>('#dupBin');
  const binN = document.querySelector<HTMLElement>('#dupBinN');
  const done = document.querySelector<HTMLElement>('#dupDone');
  const doneN = document.querySelector<HTMLElement>('#dupDoneN');
  const restore = document.querySelector<HTMLButtonElement>('#dupRestore');
  const confirm = document.querySelector<HTMLElement>('#dupConfirm');
  const confirmN = document.querySelector<HTMLElement>('#dupConfirmN');
  const confirmStay = document.querySelector<HTMLElement>('#dupConfirmStay');
  const cancel = document.querySelector<HTMLButtonElement>('#dupCancel');
  const proceed = document.querySelector<HTMLButtonElement>('#dupProceed');
  if (!root || !line || !choose || !review || !bin || !binN || !done || !doneN || !restore || !confirm || !confirmN || !confirmStay || !cancel || !proceed) return;

  const cards = Array.from(root.querySelectorAll<HTMLElement>('.dup__c'));
  const marked = new Set<number>();
  const binned = new Set<number>();

  const card = (i: number) => cards[i]!;
  const toggleOf = (i: number) => card(i).querySelector<HTMLButtonElement>('.dup__toggle')!;
  const fateOf = (i: number) => card(i).querySelector<HTMLElement>('.dup__fate span')!;
  const refuseOf = (i: number) => card(i).querySelector<HTMLElement>('.dup__refuse')!;
  const remaining = () => dupCopies.length - binned.size;

  const render = () => {
    cards.forEach((_, i) => {
      const isMarked = marked.has(i);
      const isBinned = binned.has(i);
      card(i).classList.toggle('is-marked', isMarked && !isBinned);
      card(i).classList.toggle('is-binned', isBinned);
      const t = toggleOf(i);
      t.setAttribute('aria-pressed', isMarked ? 'true' : 'false');
      t.textContent = isMarked ? 'Keep this copy' : 'Mark for removal';
      t.disabled = isBinned;
      fateOf(i).textContent = isBinned
        ? 'In the Recycle Bin'
        : isMarked ? 'Selected for the Recycle Bin' : 'This copy will remain';
    });
    const a = [...marked].filter((i) => !binned.has(i)).length;
    const stay = remaining() - a;
    line.textContent = a === 0
      ? 'Nothing marked for removal.'
      : `${a} marked · ${stay} would remain · would release at most ${(a * dupSizeMb).toFixed(1)} MB`;
    review.disabled = a === 0;
    choose.disabled = binned.size > 0;
    binN.textContent = String(binned.size);
    bin.classList.toggle('is-full', binned.size > 0);
  };

  const refuse = (i: number, text: string) => {
    const el = refuseOf(i);
    el.textContent = text;
    window.setTimeout(() => { if (el.textContent === text) el.textContent = ''; }, 3200);
  };

  cards.forEach((_, i) => {
    toggleOf(i).addEventListener('click', () => {
      if (binned.has(i)) return;
      if (marked.has(i)) {
        marked.delete(i);
      } else {
        const keptAfter = remaining() - [...marked].filter((m) => !binned.has(m)).length - 1;
        if (keptAfter < 1) {
          refuse(i, 'Not proposed: this would leave you no copy at all.');
          return;
        }
        marked.add(i);
      }
      render();
    });
  });

  choose.addEventListener('click', () => {
    marked.clear();
    dupCopies.forEach((copy, i) => { if (copy.suggest) marked.add(i); });
    render();
    cards.forEach((c, i) => { if (marked.has(i)) { c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); } });
  });

  /* ---- confirm, then the bin ---------------------------------------------- */
  const openConfirm = () => {
    const a = [...marked].filter((i) => !binned.has(i)).length;
    confirmN.textContent = String(a);
    confirmStay.textContent = `${remaining() - a} copies would stay where they are.`;
    confirm.hidden = false;
    proceed.focus();
  };
  const closeConfirm = () => { confirm.hidden = true; review.focus(); };
  review.addEventListener('click', openConfirm);
  cancel.addEventListener('click', closeConfirm);
  confirm.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeConfirm(); });

  const fly = (i: number, toBin: boolean) => {
    if (reducedMotion()) return;
    const pic = card(i).querySelector<HTMLElement>('.dup__pic')!;
    const a = pic.getBoundingClientRect();
    const b = bin.getBoundingClientRect();
    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - (a.top + a.height / 2);
    const away = { transform: `translate(${dx}px, ${dy}px) scale(.12) rotate(-8deg)`, opacity: 0, filter: 'none' };
    const home = { transform: 'none', opacity: 1, filter: 'none' };
    pic.animate(toBin ? [home, away] : [away, home], { duration: 700, easing: 'cubic-bezier(.65,.05,.36,1)' });
  };
  const bump = () => { bin.classList.remove('is-bump'); void bin.offsetWidth; bin.classList.add('is-bump'); };

  proceed.addEventListener('click', () => {
    confirm.hidden = true;
    const going = [...marked].filter((i) => !binned.has(i));
    going.forEach((i, k) => window.setTimeout(() => {
      fly(i, true);
      binned.add(i);
      render();
      window.setTimeout(bump, reducedMotion() ? 0 : 650);
    }, reducedMotion() ? 0 : k * 220));
    window.setTimeout(() => {
      doneN.textContent = `${going.length} ${going.length === 1 ? 'copy' : 'copies'} moved to the Recycle Bin.`;
      done.hidden = false;
    }, reducedMotion() ? 0 : going.length * 220 + 700);
  });

  restore.addEventListener('click', () => {
    const back = [...binned];
    binned.clear();
    marked.clear();
    done.hidden = true;
    render();
    back.forEach((i, k) => window.setTimeout(() => fly(i, false), reducedMotion() ? 0 : k * 160));
    choose.focus();
  });

  /* A copy on another drive starts kept, as a possible backup. */
  render();
}
