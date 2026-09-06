"use client";

import {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { usePathname } from "next/navigation";

import { useDelayedAction } from "@/hooks/useDelayedAction";
import { useMenuDismissal } from "@/hooks/useMenuDismissal";
import { useRevealLatch } from "@/hooks/useRevealLatch";

/**
 * Grace period before a hover-out closes the panel, so the pointer can travel
 * from the trigger down into the panel without it collapsing underneath.
 */
const CLOSE_DELAY_MS = 120;

/**
 * Hover *intent*: a pointer merely crossing the bar on its way somewhere else
 * should not fire panels. Without this the previous implementation opened on
 * the first `pointerenter` with no delay, so sweeping across the six triggers
 * flashed every panel in turn. Short enough to feel instant on a deliberate
 * hover, long enough that a pass-through never registers.
 */
const OPEN_DELAY_MS = 90;

export interface MegaMenuState {
  openHref: string | null;
  /** True once any panel is open — the bar uses it to drop its transparency. */
  isOpen: boolean;
  /** Hrefs whose panels have been opened once, and so may load thumbnails. */
  revealedHrefs: ReadonlySet<string>;
  close: () => void;
  /** Cancels a pending close — the pointer reached the panel in time. */
  cancelClose: () => void;
  toggle: (href: string) => void;
  scheduleOpen: (href: string) => void;
  scheduleClose: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
}

/**
 * Desktop mega-menu state. Pointer and keyboard are treated as equals
 * (CLAUDE.md §7, "no hover-only affordances"): hover opens, but so does
 * click/Enter/Space on the trigger, Escape closes and returns focus, and
 * focus leaving the whole nav closes it. Nothing here depends on a pointer
 * existing.
 *
 * Called from `Header` rather than `DesktopNav`, because the bar's own chrome
 * now depends on it — an open panel forces the bar out of its transparent
 * hero state so panel and bar read as one surface.
 */
export function useMegaMenu(): MegaMenuState {
  const pathname = usePathname();
  const [openHref, setOpenHref] = useState<string | null>(null);
  const { revealed, reveal } = useRevealLatch();
  const timer = useDelayedAction();

  // Guarded against a ref rather than fired on every `pathname` render: an
  // unconditional `setState` in an effect trips `react-hooks/set-state-in-effect`
  // and does cause a cascading render. This only runs on a real route change.
  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (lastPathname.current !== pathname) {
      lastPathname.current = pathname;
      setOpenHref(null);
    }
  }, [pathname]);

  const openNow = useCallback(
    (href: string) => {
      timer.cancel();
      reveal(href);
      setOpenHref(href);
    },
    [reveal, timer],
  );

  const close = useCallback(() => {
    timer.cancel();
    setOpenHref(null);
  }, [timer]);

  const scheduleOpen = useCallback(
    (href: string) => {
      // A panel already being open means the visitor is inside the menu and
      // moving between sections; switching should be immediate, not delayed.
      if (openHref !== null) {
        openNow(href);
        return;
      }
      timer.schedule(() => openNow(href), OPEN_DELAY_MS);
    },
    [openHref, openNow, timer],
  );

  const scheduleClose = useCallback(() => {
    timer.schedule(() => setOpenHref(null), CLOSE_DELAY_MS);
  }, [timer]);

  const toggle = useCallback(
    (href: string) => {
      timer.cancel();
      reveal(href);
      setOpenHref((current) => (current === href ? null : href));
    },
    [reveal, timer],
  );

  const { onKeyDown, onBlur } = useMenuDismissal(openHref, close);

  return useMemo(
    () => ({
      openHref,
      isOpen: openHref !== null,
      revealedHrefs: revealed,
      close,
      cancelClose: timer.cancel,
      toggle,
      scheduleOpen,
      scheduleClose,
      onKeyDown,
      onBlur,
    }),
    [
      openHref,
      revealed,
      close,
      timer.cancel,
      toggle,
      scheduleOpen,
      scheduleClose,
      onKeyDown,
      onBlur,
    ],
  );
}
