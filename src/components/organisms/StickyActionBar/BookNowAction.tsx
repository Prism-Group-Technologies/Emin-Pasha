"use client";

import type { MouseEvent, ReactNode } from "react";

import type { TypographyProps } from "@mui/material/Typography";

import { ExternalLink } from "@/components/atoms/ExternalLink";
import { useBookingStore } from "@/stores/bookingStore";

export interface BookNowActionProps {
  label: string;
  /** Kept as a real `href` — the no-JS destination, and what a long-press copies. */
  href: string;
  sx?: TypographyProps<"a">["sx"];
  children: ReactNode;
}

/**
 * The one client leaf in the otherwise server-rendered mobile action bar.
 *
 * Below `md` there is no room for a booking bar, so Book opens the full-screen
 * `MobileBookingSheet` instead of navigating — dates and guests without ever
 * leaving the page the guest was reading, and the sheet then hands off to the
 * engine *with* those dates attached, which a bare tap on this link cannot do.
 *
 * `preventDefault` only fires once the store handler exists, so with JS off
 * (or before hydration) the anchor still goes straight to the booking engine
 * and the conversion path is never dead. That fallback is why this renders
 * through `ExternalLink` rather than `Link`: the href is an absolute URL now,
 * which `next/link` must not handle, and the new-tab note has to be announced.
 */
export function BookNowAction({ label, href, sx, children }: BookNowActionProps) {
  const openSheet = useBookingStore((state) => state.openSheet);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, download, middle-click) behave normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    openSheet();
  };

  return (
    <ExternalLink href={href} variant="body2" aria-haspopup="dialog" onClick={onClick} sx={sx}>
      {children}
      {label}
    </ExternalLink>
  );
}
