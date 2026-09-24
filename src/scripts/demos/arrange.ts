/**
 * Organize by date, live. Two segmented controls rewrite the plan rows, the
 * headline and the list of folders that would appear. Nothing here animates a
 * state into existence: the text is set immediately and a short flash marks
 * what changed, so reduced motion loses only the flash.
 */
import { initSegment } from '../interactions';
import { arrangeDepths, destFor, foldersFor, type Depth, type Style } from '@/data/arrange';

export function initArrange(): void {
  const root = document.querySelector<HTMLElement>('#arrange');
  const depthSeg = document.querySelector<HTMLElement>('#arrDepth');
  const styleSeg = document.querySelector<HTMLElement>('#arrStyle');
  const head = document.querySelector<HTMLElement>('#arrHead');
  const tree = document.querySelector<HTMLElement>('#arrTree');
  const treeN = document.querySelector<HTMLElement>('#arrFolderN');
  const status = document.querySelector<HTMLElement>('#arrStatus');
  if (!root || !depthSeg || !styleSeg || !head || !tree || !treeN) return;

  const cells = Array.from(root.querySelectorAll<HTMLElement>('#arrRows b[data-taken]'));
  let depth: Depth = 'm';
  let style: Style = 'nested';

  const flash = (el: Element) => {
    el.classList.remove('is-flash');
    void (el as HTMLElement).offsetWidth;
    el.classList.add('is-flash');
  };

  const render = () => {
    cells.forEach((cell) => {
      const dest = destFor(cell.dataset.taken || null, depth, style);
      if (!dest || cell.textContent === dest) return;
      cell.textContent = dest;
      flash(cell);
    });
    const headline = arrangeDepths.find((d) => d.id === depth)!.headline;
    if (head.textContent !== headline) { head.textContent = headline; flash(head); }

    const folders = foldersFor(depth, style);
    tree.replaceChildren(
      ...folders.map((f, k) => {
        const li = document.createElement('li');
        li.textContent = f;
        li.style.setProperty('--d', String(f.split('\\').length - 2));
        li.style.setProperty('--k', String(k));
        return li;
      }),
    );
    treeN.textContent = String(folders.length);
    if (status) status.textContent = 'Plan updated to your new choices · nothing has moved';

    /* A single level has no separator to style, so the choice is not offered. */
    styleSeg.querySelectorAll<HTMLButtonElement>('button').forEach((b) => { b.disabled = depth === 'y'; });
  };

  initSegment(depthSeg, (chosen) => { depth = (chosen.dataset.v as Depth) ?? 'm'; render(); });
  initSegment(styleSeg, (chosen) => { style = (chosen.dataset.v as Style) ?? 'nested'; render(); });
}
