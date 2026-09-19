import type { BoxProps } from "@/components/atoms/Box";

/**
 * The shared look of one control in a row-layout widget — the two date
 * buttons and the guests button.
 *
 * Extracted so the three read as a single field group. Before this the guests
 * control was a bare stepper column standing beside two bordered buttons,
 * which is most of why the hero panel looked like a form with a piece
 * missing: nothing tied the third control to the first two.
 *
 * `background: none` and `color: inherit` rather than palette values — these
 * buttons sit on surfaces the field cannot know about (the hero's dark glass,
 * the sheet's paper), so the surface decides the colour and the field only
 * draws its own edge.
 *
 * ## Why the edge is not `divider`
 *
 * It used to be, and that failed WCAG 1.4.11 in *both* schemes — the boundary
 * of an interactive control needs 3:1, and `divider` is a hairline token for
 * separating content, not for drawing a control. Measured: `sand.200`
 * (#E4DFD3) on `sand.50` is **1.27:1**; `ink.600` (#2A2823) on `ink.900` is
 * **1.34:1**. That is why the fields over the hero video read as floating
 * text with no box around them at all.
 *
 * `text.primaryChannel` at 50% is the fix, and it is scheme-aware for free:
 * MUI publishes that channel per colour scheme, so one declaration resolves
 * to `ink.900` at 50% on light surfaces and `sand.50` at 50% on dark ones.
 * Verified:
 *
 *   - light, on `sand.50` ............................ 3.66:1
 *   - hero glass over a black video frame ............ 5.14:1
 *   - hero glass over a **white** video frame ........ 3.35:1
 *
 * The last is the one that governs. The panel floats over footage this file
 * cannot see, so the edge has to hold at the brightest frame the video can
 * produce — and it does, because HeroVideo lays a 0.35 black wash over the
 * video before the panel's own 0.58 goes on top. Drop either of those and
 * this number is the first thing to re-measure.
 */
export function bookingFieldSx(invalid?: boolean): BoxProps["sx"] {
  return {
    flex: 1,
    minWidth: 0,
    textAlign: "left",
    minHeight: 56,
    px: 3,
    py: 2,
    border: "1px solid",
    borderColor: invalid ? "error.main" : "rgba(var(--mui-palette-text-primaryChannel) / 0.5)",
    borderRadius: 0.5,
    background: "none",
    color: "inherit",
    cursor: "pointer",
    font: "inherit",
    transition: "border-color 150ms, background-color 150ms",
    "&:hover": { borderColor: "primary.main" },
    "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  };
}
