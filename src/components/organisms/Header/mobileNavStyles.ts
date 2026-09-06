import type { SxProps, Theme } from "@mui/material/styles";

import { easingTokens } from "@/theme/tokens";

/**
 * The drawer paper.
 *
 * `display: flex` + `column` is the load-bearing part, not cosmetic: it makes
 * the paper a three-row layout — fixed bar, scrolling nav, anchored CTA — so
 * BOOK NOW stays on screen at any scroll position. Without it the CTA was
 * simply the last block in a scrolling column and disappeared below the fold
 * as soon as a section was expanded.
 *
 * `backgroundImage: none` cancels MUI's dark-mode elevation overlay, which
 * would otherwise tint the paper a shade lighter than the header above it and
 * make the drawer read as a different surface from the rest of the site.
 */
export const drawerPaperSx: SxProps<Theme> = {
  width: "100%",
  maxWidth: { xs: "100%", sm: 420 },
  bgcolor: "background.default",
  backgroundImage: "none",
  display: "flex",
  flexDirection: "column",
  transitionTimingFunction: easingTokens.emin,
};
