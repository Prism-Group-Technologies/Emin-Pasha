"use client";

import { useCallback, useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * How far the guest must scroll before the control appears, in viewport
 * heights. Viewport-relative rather than a fixed pixel count so the trigger
 * means the same thing on a 700px laptop and a 1400px studio display — one
 * full screen of content is behind you before the site offers you a way back.
 * NN/g's back-to-top guidance puts the useful range at one to two screens.
 */
export const SCROLL_TO_TOP_THRESHOLD_VH = 1;

/**
 * Same shape as `useHeaderScroll`'s subscriber, and for the same reason:
 * `window.scrollY` is read inside a `requestAnimationFrame` callback, never
 * in the listener itself, so the scroll handler only ever schedules a frame
 * and does no layout work that could jank the main thread (CLAUDE.md §8).
 * `{ passive: true }` tells the browser the handler will never
 * `preventDefault`, so scrolling is never blocked waiting on it.
 *
 * `resize` is subscribed alongside `scroll` because the threshold is derived
 * from `innerHeight` — rotating a tablet or opening devtools changes where
 * the button should appear, and without this the state would be stale until
 * the next scroll event.
 */
function subscribeToScroll(onChange: (past: boolean) => void): () => void {
  let frame = 0;
  const read = () => {
    frame = 0;
    onChange(window.scrollY > window.innerHeight * SCROLL_TO_TOP_THRESHOLD_VH);
  };
  const schedule = () => {
    if (frame === 0) {
      frame = window.requestAnimationFrame(read);
    }
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  read();
  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame !== 0) {
      window.cancelAnimationFrame(frame);
    }
  };
}

export interface ScrollToTopState {
  /** True once a full viewport of content sits above the fold. */
  visible: boolean;
  /** Scrolls the document to the top and hands focus back to the main landmark. */
  scrollToTop: () => void;
}

/**
 * The behaviour behind the back-to-top control, kept out of the component so
 * the button itself stays props-in/JSX-out.
 *
 * Two things it does that a naive `window.scrollTo(0, 0)` does not:
 *
 *   1. **It moves focus**, not just the scroll position. A keyboard or screen
 *      reader user who activates a scroll-only button ends up looking at the
 *      top of the page with focus still buried somewhere in the footer — the
 *      next Tab drops them straight back down. Focusing the main landmark
 *      (the same `targetId` the skip link uses) puts the caret where the eye
 *      already is. This is the explicit recommendation of NN/g and of the
 *      GOV.UK-lineage design systems that document the pattern.
 *   2. **It honours `prefers-reduced-motion`.** Smooth-scrolling a whole
 *      document is exactly the large-area motion that trips vestibular
 *      disorders, so under `reduce` the jump is instant (CLAUDE.md §10).
 *
 * `preventScroll` on the focus call is what keeps the two from fighting: the
 * browser would otherwise snap the landmark into view and cancel the smooth
 * scroll that was just requested.
 */
export function useScrollToTop(focusTargetId: string): ScrollToTopState {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => subscribeToScroll(setVisible), []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    document.getElementById(focusTargetId)?.focus({ preventScroll: true });
  }, [focusTargetId, reducedMotion]);

  return { visible, scrollToTop };
}
