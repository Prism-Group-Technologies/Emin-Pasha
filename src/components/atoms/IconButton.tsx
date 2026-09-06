"use client";

import { forwardRef } from "react";

import MuiIconButton, {
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";

export interface IconButtonProps extends Omit<MuiIconButtonProps, "href"> {
  /** Required — an icon-only control must always have an accessible name. */
  "aria-label": string;
  /**
   * Renders an anchor instead of a button. An `http(s)` target additionally
   * gets `target="_blank"` with the new-tab safety `rel` — the same contract
   * the `Button` atom applies, so an icon-only external link (the footer's
   * social row) no longer has to reach past this atom to MUI's own.
   */
  href?: string;
}

/** 44×44px minimum touch target (CLAUDE.md §7), enforced regardless of `size`. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { sx, href, ...rest },
  ref,
) {
  const linkProps = href
    ? {
        component: "a" as const,
        href,
        ...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      }
    : {};
  return <MuiIconButton ref={ref} sx={{ width: 44, height: 44, ...sx }} {...linkProps} {...rest} />;
});
