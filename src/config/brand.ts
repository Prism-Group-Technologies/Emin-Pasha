/**
 * Brand lock-up sizing.
 *
 * Lives in config rather than in the header because the lock-up is a brand
 * primitive, not a header detail: `BrandMark` is an atom, and the same
 * measurements are reused by the fixed header bar, the mobile drawer, the
 * footer rail, and anywhere else the lock-up appears later.
 *
 * **Width, not height.** The previous artwork was a cropped portrait mark at
 * a 0.80 ratio, so a height drove it and the width that followed was small
 * enough to ignore. The delivered lock-up is 2.56:1 — it spends the bar's
 * *horizontal* budget, and a header's horizontal budget is the scarce one
 * (the lock-up shares the row with six nav entries, the utility row and the
 * book CTA). Declaring the width makes the scarce axis the one that is
 * pinned, and the height falls out of the artwork's intrinsic ratio in
 * `BrandMark` — which is what keeps the lock-up from ever being stretched.
 *
 * The heights those widths imply, against `HEADER_HEIGHT` (72/96 expanded,
 * 56/64 condensed):
 *
 * | state     | xs           | md            |
 * | --------- | ------------ | ------------- |
 * | expanded  | 150 → 59/72  | 200 → 78/96   |
 * | condensed | 116 → 45/56  | 132 → 52/64   |
 *
 * Every row clears its bar with room to spare, so the bar never has to
 * measure the lock-up — the same reason these are fixed numbers rather than
 * percentages (CLAUDE.md §8, CLS ≤ 0.05).
 *
 * The xs expanded width is 150 and not more because it shares a 320px-wide
 * viewport's content box with the 44px menu button: 150 + 32 gap + 44 still
 * fits inside 272px of gutter-less container.
 *
 * No imports on purpose: this module is reachable from the always-loaded
 * client bundle and must not pull the Zod-validated content layer in with it
 * (DECISIONS.md D25).
 */
export const brandLockupWidth = {
  expanded: { xs: 150, md: 200 },
  condensed: { xs: 116, md: 132 },
} as const;

/**
 * `sizes` for the lock-up — fixed pixels, not viewport-relative.
 *
 * The lock-up is the same handful of pixels at every viewport width, so the
 * only candidates Next ever needs are the smallest in `imageSizes`. Declaring
 * that explicitly is what keeps a 640px master from being served at 640px;
 * CLAUDE.md §6.6 requires `sizes` to be a deliberate choice, never inherited.
 *
 * The values are the *expanded* widths, not the condensed ones. `sizes` has
 * to describe the largest box the element ever occupies, or a header that
 * loads expanded and then condenses would be the only state served a sharp
 * image; Next picks one candidate per element and never re-fetches upward.
 *
 * The breakpoint is 899px, not 900px: MUI's `md` applies from 900px *up*, so
 * a `max-width: 900px` query would still be claiming the small width on the
 * first pixel at which the large one renders.
 */
export const brandLockupSizes = "(max-width: 899px) 150px, 200px";
