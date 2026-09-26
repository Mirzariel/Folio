/**
 * The launch offer's countdown, to the real deadline in src/config/site.ts.
 *
 * State, not decoration: it runs under every motion preference, on a one-second
 * timer rather than requestAnimationFrame, and at the deadline it sets
 * <html class="offer-ended">, which hides every offer-only element and shows
 * the regular price. So a page left open across the deadline stops advertising
 * the offer at the moment it ends.
 */
const pad = (n: number) => String(n).padStart(2, '0');

export function initOffer(): void {
  const clocks = Array.from(document.querySelectorAll<HTMLElement>('[data-offer-ends]'));
  if (clocks.length === 0) return;

  const end = Date.parse(clocks[0]!.dataset.offerEnds ?? '');
  if (Number.isNaN(end)) return;

  const tick = () => {
    const left = Math.max(0, end - Date.now());
    if (left === 0) {
      document.documentElement.classList.add('offer-ended');
      window.clearInterval(timer);
    }
    const s = Math.floor(left / 1000);
    const parts: Record<string, string> = {
      d: pad(Math.floor(s / 86400)),
      h: pad(Math.floor((s % 86400) / 3600)),
      m: pad(Math.floor((s % 3600) / 60)),
      s: pad(s % 60),
    };
    clocks.forEach((clock) => {
      clock.querySelectorAll<HTMLElement>('[data-unit]').forEach((cell) => {
        const next = parts[cell.dataset.unit ?? ''] ?? '00';
        if (cell.textContent === next) return;
        cell.textContent = next;
        /* Restart the tick animation on the digit that changed. */
        cell.classList.remove('is-tick');
        void cell.offsetWidth;
        cell.classList.add('is-tick');
      });
    });
  };

  const timer = window.setInterval(tick, 1000);
  tick();
}
