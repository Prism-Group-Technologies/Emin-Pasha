import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

/**
 * Footer layout only — no colour, no copy.
 *
 * Spacing factors read against `theme/tokens.ts`'s custom scale, **not** the
 * MUI default: `spacingFn` maps 1→4px, 5→24px, 6→32px, 7→48px, 8→64px.
 */

/**
 * One band, four tracks: identity, links, location, newsletter.
 *
 * This replaces two stacked bands, and the measurement is why. At 1512px the
 * previous footer ran 843px — of which 192px was nothing but the margin and
 * padding either side of two hairline dividers, and 209px was a second band
 * that existed only because the hours list needed ~420px of width and so
 * could not sit beside anything. Moving the hours to `/contact` (where they
 * already rendered) let the remaining four blocks stand in a single row.
 *
 * `alignItems: start` matters here: the tracks are deliberately unequal in
 * height and must not stretch to match.
 */
export const FOOTER_BAND: SystemStyleObject<Theme> = {
  display: "grid",
  gap: { xs: 6, md: 7 },
  // Two tracks from `sm`, not `md`. Measured: at 768px a single stacked
  // column made the footer 1243px — *taller than the 390px phone layout*,
  // because every block sat full-width one under the other while half the
  // viewport went unused.
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "0.85fr 1.9fr 0.75fr 1.05fr",
  },
  alignItems: "start",
};

/**
 * The five link groups inside their own track. Two across until `lg`, where
 * the track finally gets ~571px and a third column fits at ~174px each —
 * enough for "Weddings & Celebrations" on one line. Between `sm` and `md`
 * the band itself has already halved, so the track cannot hold three.
 */
export const FOOTER_LINK_GRID: SystemStyleObject<Theme> = {
  display: "grid",
  columnGap: 5,
  rowGap: 6,
  gridTemplateColumns: {
    xs: "repeat(2, minmax(0, 1fr))",
    md: "repeat(3, minmax(0, 1fr))",
  },
};

/**
 * The one remaining hairline, before the legal line. At 24px either side
 * rather than the 48px it used to carry — a rule separating a 33px strip
 * from the band above it does not need 96px of air to read as a separation.
 */
export const FOOTER_BAND_DIVIDER: SystemStyleObject<Theme> = {
  mt: { xs: 5, md: 6 },
  pt: { xs: 5, md: 6 },
  borderTop: "1px solid",
  borderColor: "divider",
};
