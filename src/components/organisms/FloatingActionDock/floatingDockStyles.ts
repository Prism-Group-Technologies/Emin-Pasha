import type { SxProps, Theme } from "@mui/material/styles";

import { zIndexTokens } from "@/theme/tokens";

import { FLOATING_DOCK_INSET } from "./constants";

/**
 * Pins one dock member to a bottom corner.
 *
 * A plain object, returned from a plain function — it is *called* on the
 * server and the result handed to MUI as data, which is what keeps this
 * usable from a Server Component (DECISIONS.md D22 forbids the callback form
 * of `sx` crossing the boundary, not the values it would have produced).
 *
 * `position: fixed`, so the dock is out of flow and contributes nothing to
 * CLS — unlike the two bars, it needs no reserved spacer at all.
 *
 * `zIndexTokens.fab` (1050) sits deliberately *below* `appBar` (1100) and
 * `snackbar` (1400): the header, the booking bar and the consent banner all
 * outrank a convenience control. The practical effect is that the consent
 * banner covers the dock on first visit, which is the correct precedence —
 * consent is a decision, these are shortcuts.
 */
export function floatingSlotSx(side: "left" | "right"): SxProps<Theme> {
  return {
    position: "fixed",
    // Below `md` the mobile sticky action bar owns the bottom of the screen
    // and already carries a WhatsApp action; a second one floating over it
    // would be the same destination twice, overlapping.
    display: { xs: "none", md: "inline-flex" },
    bottom: FLOATING_DOCK_INSET,
    [side]: FLOATING_DOCK_INSET,
    zIndex: zIndexTokens.fab,
  };
}
