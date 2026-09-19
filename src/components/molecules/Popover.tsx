"use client";

import MuiPopover, { type PopoverProps as MuiPopoverProps } from "@mui/material/Popover";

export type PopoverProps = MuiPopoverProps;

/**
 * An anchored overlay — MUI's focus trap, scroll lock and Escape handling,
 * behind the same single choke point every other primitive goes through
 * (CLAUDE.md §5.1, which is why containers may not reach for `@mui/*`
 * themselves).
 *
 * Distinct from `Modal`: a popover is tied to the control that opened it and
 * leaves the page beneath it visible, which is what a guest-count or filter
 * disclosure wants. A dialog that dims the page is too heavy for a control
 * the guest expects to adjust and dismiss in a second.
 */
export function Popover(props: PopoverProps) {
  return <MuiPopover {...props} />;
}
