"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";

/**
 * Long enough for React to have swapped the `<title>` the new route's
 * `generateMetadata` produced, short enough that the announcement still
 * belongs to the click that caused it.
 */
const TITLE_SETTLE_MS = 120;

function currentRouteName(): string {
  return document.title || document.querySelector("h1")?.textContent?.trim() || "";
}

/**
 * Says the name of the page the guest has just landed on.
 *
 * Next ships an announcer of its own for exactly this, and on this site it is
 * not in the document — checked in a real browser rather than assumed: after a
 * client-side navigation there is no `next-route-announcer` element, so the
 * route change is entirely silent. Without it a screen-reader guest who
 * activates "View Rooms & Rates" hears nothing at all, which is the same
 * complaint that started this work, in a form the sighted fix does not reach.
 *
 * `polite` rather than `assertive`: arriving on a page is not an emergency,
 * and interrupting whatever the guest is already having read to them is the
 * usual way live regions become something people switch off. The region itself
 * is rendered empty on first paint and stays mounted — a live region added to
 * the DOM with its message already in it is not reliably announced — and says
 * nothing on first load, which the browser announces by itself.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState("");
  const isFirstCommit = useRef(true);

  useEffect(() => {
    if (isFirstCommit.current) {
      isFirstCommit.current = false;
      return;
    }
    const timer = window.setTimeout(() => setAnnouncement(currentRouteName()), TITLE_SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div role="status" aria-live="polite" aria-atomic="true">
      <VisuallyHidden>{announcement}</VisuallyHidden>
    </div>
  );
}
