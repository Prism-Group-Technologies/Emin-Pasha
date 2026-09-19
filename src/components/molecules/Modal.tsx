"use client";

import type { ReactNode } from "react";

import MuiDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { colorTokens } from "@/theme/tokens";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  /** Dialog width cap — defaults to `sm`; the gallery lightbox asks for `lg`. */
  maxWidth?: "sm" | "md" | "lg";
  /** Trims the dialog's outer margin on phones so media can use the screen width. */
  dense?: boolean;
}

const DENSE_PAPER = {
  sx: { m: { xs: 1.5, sm: 4 }, width: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" } },
};

/**
 * The scrim behind the dialog: the estate's own ink rather than MUI's flat
 * black, blurred so the page reads as depth-of-field behind the modal instead
 * of a page with a grey sheet over it. The tint is deliberately lighter than
 * the stock `rgba(0,0,0,0.5)` — blur already does most of the separating, and
 * keeping some of the page legible underneath is what makes an overlay feel
 * like a layer rather than a navigation.
 *
 * `backdrop-filter` is a progressive enhancement: a browser without it simply
 * shows the tint, which is why the tint is opaque enough to stand on its own.
 * `-webkit-` is still required for Safari.
 *
 * Two accessibility escapes, both of which drop the blur and deepen the tint
 * to compensate:
 *
 *   - `prefers-reduced-transparency` — a setting people turn on precisely
 *     because translucent layers are hard to parse.
 *   - `forced-colors` — a blurred scrim in a forced palette is either
 *     invisible or a solid block; Windows High Contrast should get the plain
 *     system canvas it expects.
 */
const BACKDROP = {
  sx: {
    backgroundColor: "rgba(11, 11, 10, 0.55)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    "@media (prefers-reduced-transparency: reduce)": {
      backgroundColor: colorTokens.ink[900],
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    },
    "@media (forced-colors: active)": {
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    },
  },
};

/**
 * A dialog — `radius-lg`/`shadow-modal` via `theme/components.ts` (elevation
 * 24, DECISIONS.md D14). MUI's `Dialog` traps focus and restores it to the
 * trigger on close natively; Escape closes it.
 *
 * The backdrop is styled here rather than in `theme/components.ts` on purpose.
 * Theming `MuiBackdrop` would reach every overlay MUI renders — the mobile nav
 * drawer and the booking sheet included — and those are full-height panels
 * that slide over the page, where a blur costs compositing on exactly the
 * devices least able to afford it. This is the one Dialog in the codebase, so
 * styling it here covers all four modal surfaces and nothing else.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  dense = false,
}: ModalProps) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      fullWidth
      maxWidth={maxWidth}
      PaperProps={dense ? DENSE_PAPER : undefined}
      slotProps={{ backdrop: BACKDROP }}
    >
      <DialogTitle
        id="modal-title"
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {title}
        <IconButton aria-label="Close dialog" onClick={onClose} size="small">
          <Icon name="close" fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
}
