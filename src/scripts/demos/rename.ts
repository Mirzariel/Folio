/**
 * Rename in bulk, live. The name field and two segmented controls rewrite the
 * preview on every change. A photograph with no capture date is left alone when
 * numbering by time, and the count says so. The extension is never typed and
 * never changes.
 */
import { initSegment } from '../interactions';
import { renameFiles, sequences, renameTo, extOf, type Sequence, type Separator } from '@/data/rename';

export function initRename(): void {
  const input = document.querySelector<HTMLInputElement>('#rnName');
  const seqSeg = document.querySelector<HTMLElement>('#rnSeq');
  const sepSeg = document.querySelector<HTMLElement>('#rnSep');
  const seqHint = document.querySelector<HTMLElement>('#rnSeqHint');
  const count = document.querySelector<HTMLElement>('#rnCount');
  const unit = document.querySelector<HTMLElement>('#rnUnit');
  const warn = document.querySelector<HTMLElement>('#rnWarn');
  const status = document.querySelector<HTMLElement>('#rnStatus');
  if (!input || !seqSeg || !sepSeg || !seqHint || !count || !unit || !warn) return;

  const rows = Array.from(document.querySelectorAll<HTMLElement>('#rnRows .rows__r'));
  let seq: Sequence = 'number';
  let sep: Separator = 'space';

  const render = () => {
    /* A typed extension would double up, so it is dropped, as the app does. */
    const base = input.value.replace(/\.[A-Za-z0-9]{2,4}$/, '').trim();
    let renamed = 0;
    rows.forEach((row, i) => {
      const file = renameFiles[i]!;
      const nm = row.querySelector<HTMLElement>('.rn__nm')!;
      const ext = row.querySelector<HTMLElement>('.rn__ext')!;
      const next = base ? renameTo(file, i, base, seq, sep) : null;
      row.classList.toggle('is-left', base !== '' && next === null);
      if (!base) { nm.textContent = file.name.slice(0, -extOf(file.name).length); ext.textContent = extOf(file.name); return; }
      if (next === null) { nm.textContent = 'Left alone: no capture date'; ext.textContent = ''; return; }
      renamed += 1;
      nm.textContent = next;
      ext.textContent = extOf(file.name);
    });
    count.textContent = String(renamed);
    unit.textContent = renamed === 1 ? 'photograph will be renamed' : 'photographs will be renamed';
    const left = rows.length - renamed;
    warn.textContent = !base
      ? 'Type a name first.'
      : left > 0 ? `${left} will be left alone: ${left === 1 ? 'it doesn’t' : 'they don’t'} say when ${left === 1 ? 'it was' : 'they were'} taken.` : '';
    if (status) status.textContent = base ? 'Preview only · nothing renamed yet' : 'Waiting for a name';
  };

  input.addEventListener('input', render);
  initSegment(seqSeg, (chosen) => {
    seq = (chosen.dataset.v as Sequence) ?? 'number';
    seqHint.textContent = sequences.find((s) => s.id === seq)!.hint;
    render();
  });
  initSegment(sepSeg, (chosen) => { sep = (chosen.dataset.v as Separator) ?? 'space'; render(); });
  render();
}
