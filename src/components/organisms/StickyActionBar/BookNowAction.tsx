"use client";

import type { MouseEvent, ReactNode } from "react";

import { Link, type LinkProps } from "@/components/atoms/Link";
import { useBookingStore } from "@/stores/bookingStore";

export interface BookNowActionProps {
  label: string;
  /** Kept as a real `href` — the no-JS destination, and what a long-press copies. */
  href: string;
  sx?: LinkProps["sx"];
  children: ReactNode;
}

/**
 * The one client leaf in the otherwise server-rendered mobile action bar.
 *
 * Below `md` there is no room for a booking bar, so Book opens the full-screen
 * `MobileBookingSheet` instead of navigating — dates and guests without ever
 * leaving the page the guest was reading. `preventDefault` only fires once the
 * store handler exists, so with JS off (or before hydration) the anchor still
 * goes to the enquiry page and the conversion path is never dead.
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
    <Link href={href} variant="body2" aria-haspopup="dialog" onClick={onClick} sx={sx}>
      {children}
      {label}
    </Link>
  );
}
