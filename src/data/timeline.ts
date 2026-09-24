/**
 * Photographs per month for the hub's timeline, 2018 to 2024: the prototype's
 * "When they were taken" strip. A design-canvas library like the figures in
 * src/config/site.ts, not anybody's real archive. Deterministic, so the build
 * is reproducible: summers and Decembers are busy, one August is the peak.
 */
export const timelineFrom = 2018;
export const timelineTo = 2024;

const seasonal = [0.25, 0.2, 0.3, 0.45, 0.55, 0.7, 0.95, 1, 0.6, 0.4, 0.3, 0.85];

export const timelineMonths: readonly number[] = Array.from(
  { length: (timelineTo - timelineFrom + 1) * 12 },
  (_, k) => {
    const month = k % 12;
    const noise = ((k * 37) % 17) / 17;
    const gap = k === 27 || k === 28 || k === 51 ? 0 : 1;
    return Math.round(gap * (seasonal[month]! * 620 + noise * 180 + (k === 19 ? 900 : 0)));
  },
);

export const timelinePeak = timelineMonths.indexOf(Math.max(...timelineMonths));
