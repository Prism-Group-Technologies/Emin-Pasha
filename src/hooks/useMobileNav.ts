"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

/**
 * Mobile drawer open state plus the two behaviours the drawer itself cannot
 * own: collapse the expanded submenu when the drawer closes, and close on
 * route change.
 *
 * Focus trapping, Escape-to-close, `aria-hidden` on the rest of the page and
 * the body-scroll lock are **not** re-implemented here — MUI's `Modal` (which
 * `Drawer` composes) already does all four; verified against the installed
 * @mui/material@6.5.0 `Modal.d.ts`, which exposes `disableEnforceFocus` and
 * `disableScrollLock` as opt-*outs*, i.e. both are on by default.
 */
export function useMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** Latches on first open so the lazily-imported drawer chunk is never even
   * requested in a session that only ever uses the desktop nav. */
  const [openedOnce, setOpenedOnce] = useState(false);
  const [expandedHref, setExpandedHref] = useState<string | null>(null);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setOpen(false);
      setExpandedHref(null);
    }
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    setExpandedHref(null);
  }, []);

  const toggleSection = useCallback((href: string) => {
    setExpandedHref((current) => (current === href ? null : href));
  }, []);

  const openNav = useCallback(() => {
    setOpenedOnce(true);
    setOpen(true);
  }, []);

  return { open, openedOnce, expandedHref, openNav, close, toggleSection };
}
