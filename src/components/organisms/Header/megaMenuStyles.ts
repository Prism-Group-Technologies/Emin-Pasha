import type { SxProps, Theme } from "@mui/material/styles";

import { easingTokens, motionTokens } from "@/theme/tokens";

/**
 * The panel surface.
 *
 * Two details are load-bearing rather than decorative:
 *
 * `background.default` rather than `paper`. The bar above already paints
 * `background.default` once it is opaque, and an open panel now forces the bar
 * opaque — so panel and bar are the same colour and meet with no seam. On
 * `paper` the panel read as a Material dropdown stuck under a header.
 *
 * A gold hairline along the **bottom** edge. In light mode a drop shadow is
 * enough to lift the panel off the page; in dark mode a shadow over a near
 * black ground (`ink/900`) is simply invisible, and the panel would have no
 * bottom edge at all. The hairline gives it one in both schemes, and it is the
 * same brand rule used elsewhere on the site rather than a new device.
 */
export function megaMenuPanelSx(open: boolean): SxProps<Theme> {
  return {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    bgcolor: "background.default",
    borderTop: "1px solid",
    borderTopColor: "divider",
    borderBottom: "1px solid",
    borderBottomColor: "primary.main",
    boxShadow: 24,
    // A long panel on a laptop in landscape must scroll rather than run off
    // the viewport; `100%` here is the bar's own height, since the panel is
    // positioned against it.
    maxHeight: "calc(100dvh - 100%)",
    overflowY: "auto",
    overscrollBehavior: "contain",
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    transform: open ? "translateY(0)" : "translateY(-8px)",
    transition: [
      `opacity ${motionTokens.navFade}ms ${easingTokens.emin}`,
      `transform ${motionTokens.navFade}ms ${easingTokens.emin}`,
      `visibility ${motionTokens.navFade}ms`,
    ].join(", "),
    "@media (prefers-reduced-motion: reduce)": {
      transform: "none",
      transition: `opacity ${motionTokens.reducedMotionMax}ms linear`,
    },
  };
}

/**
 * Intro rail beside cards. The rail keeps a fixed minimum so the cards never
 * squeeze it into a two-word column on a 900px viewport.
 */
export const megaMenuLayoutSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { md: "minmax(180px, 1fr) minmax(0, 2.4fr)" },
  gap: { md: 6, lg: 8 },
  py: { md: 6, lg: 7 },
};
