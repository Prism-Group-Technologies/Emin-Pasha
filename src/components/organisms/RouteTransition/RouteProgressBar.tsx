"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import LinearProgress from "@mui/material/LinearProgress";

import { isClientRouteChange } from "@/lib/navigation/routeTransition";
import { zIndexTokens } from "@/theme/tokens";

/**
 * If a route has not committed within this, something has gone wrong — the
 * network stalled, or an `onClick` cancelled the navigation after the fact. A
 * bar that creeps forever is a worse lie than no bar, so it retires itself.
 */
const STALL_TIMEOUT_MS = 8000;

/** A modifier key or a non-primary button: the guest is opening a new tab. */
function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

/**
 * A hairline that runs across the top of the window while a route is in
 * flight, and the only acknowledgement the site gives between the click and
 * the new page.
 *
 * It exists because of what the fix above cannot cover. On a fast connection
 * the two are a frame apart and this never appears; on the 3G a guest actually
 * books from, the gap is long enough that a silent click reads as a dead
 * button, and the documented consequence is that people click it again.
 *
 * Driven from a delegated `click` listener rather than from each link, because
 * the links are everywhere — `Button`, `Link`, the mega-menu, the footer,
 * every card — and threading a prop through all of them to arrive at the same
 * behaviour would be a worse version of the same thing. `isClientRouteChange`
 * holds the judgement about which clicks qualify, and is unit-tested; this
 * component only owns the timing.
 *
 * `aria-hidden` on purpose. The guest who cannot see the bar is served by
 * `RouteAnnouncer`, which names the page they have actually arrived on; a
 * second live "Loading" on every navigation would be noise over the top of it.
 * The indeterminate animation is exempt from `prefers-reduced-motion` on the
 * same grounds as `Spinner` — it reports real status rather than decorating.
 */
export function RouteProgressBar() {
  const pathname = usePathname();
  const [startedOn, setStartedOn] = useState<string | null>(null);

  /**
   * Derived rather than reset from an effect: the bar is running exactly while
   * the guest is still standing on the route they clicked from, so the commit
   * of the new route ends it by itself, with no second render to do it.
   */
  const pending = startedOn === pathname;

  useEffect(() => {
    if (!pending) {
      return;
    }
    const timer = window.setTimeout(() => setStartedOn(null), STALL_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [pending]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }
      const activation = {
        href: anchor.getAttribute("href"),
        target: anchor.getAttribute("target"),
        hasDownload: anchor.hasAttribute("download"),
        modified: isModifiedClick(event),
      };
      if (isClientRouteChange(activation, window.location.href)) {
        setStartedOn(window.location.pathname);
      }
    };
    // Capture phase, and that is not incidental. `next/link` calls
    // `preventDefault()` on every internal click before the event reaches
    // document in the bubble phase, so a bubble-phase listener that skipped
    // already-defaulted events would skip precisely the navigations this bar
    // exists for — which is what it did until this was measured.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!pending) {
    return null;
  }

  return (
    <LinearProgress
      aria-hidden
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        // Above the fixed header, below the modal/tooltip layers — the bar
        // reports on the whole window, including the header it crosses.
        zIndex: zIndexTokens.drawer,
        bgcolor: "transparent",
      }}
    />
  );
}
