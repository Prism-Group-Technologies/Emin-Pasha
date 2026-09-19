/**
 * How far through an element the reader is, from 0 (its top has not reached
 * the top of the viewport) to 1 (its bottom has reached the bottom). An
 * element shorter than the viewport counts as fully read. Pure, so the
 * reading-progress bar's maths is tested without a DOM.
 */
export function progressWithin(rect: { top: number; height: number }, viewport: number): number {
  const span = rect.height - viewport;
  if (span <= 0) {
    return 1;
  }
  return Math.min(1, Math.max(0, -rect.top / span));
}
