/**
 * Brand lock-up sizing.
 *
 * Lives in config rather than in the header because the lock-up is a brand
 * primitive, not a header detail: `BrandMark` is an atom, and the same
 * measurements are reused by the fixed header bar, the mobile drawer, and
 * anywhere else the lock-up appears later.
 *
 * The heights are chosen against `HEADER_HEIGHT` (72/96 expanded, 56/64
 * condensed) so the mark always clears the bar's vertical rhythm without the
 * bar having to measure it — the same reason those heights are fixed numbers
 * (CLAUDE.md §8, CLS ≤ 0.05).
 *
 * No imports on purpose: this module is reachable from the always-loaded
 * client bundle and must not pull the Zod-validated content layer in with it
 * (DECISIONS.md D25).
 */
export const brandMarkHeight = {
  expanded: { xs: 36, md: 52 },
  condensed: { xs: 30, md: 36 },
} as const;

/**
 * `sizes` for the mark — fixed pixels, not viewport-relative.
 *
 * The lock-up is the same handful of pixels at every viewport width, so the
 * only candidates Next ever needs are the smallest in `imageSizes`. Declaring
 * that explicitly is what keeps a 512px master from being served at 512px;
 * CLAUDE.md §6.6 requires `sizes` to be a deliberate choice, never inherited.
 *
 * The breakpoint is 899px, not 900px: MUI's `md` applies from 900px *up*, so
 * a `max-width: 900px` query would still be claiming the small width on the
 * first pixel at which the large one renders.
 */
export const brandMarkSizes = "(max-width: 899px) 36px, 52px";
