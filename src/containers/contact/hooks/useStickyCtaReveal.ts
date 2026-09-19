"use client";

import { useEffect, useState } from "react";

/**
 * How far the visitor must scroll before the Contact page's sticky bar
 * appears, in viewport heights. One full screen puts the hero — which carries
 * its own two CTAs — behind them first, so the two never compete above the
 * fold.
 *
 * A page-local copy of the story / wellness / events hook of the same name:
 * the threshold is a per-funnel decision, so each funnel owns its own rather
 * than importing across containers.
 */
const REVEAL_THRESHOLD_VH = 1;

/**
 * `window.scrollY` is read inside a `requestAnimationFrame` callback, never in
 * the listener itself, so the scroll handler only schedules a frame and does
 * no layout work on the main thread (CLAUDE.md §8).
 */
function subscribe(onChange: (past: boolean) => void): () => void {
  let frame = 0;
  const read = () => {
    frame = 0;
    onChange(window.scrollY > window.innerHeight * REVEAL_THRESHOLD_VH);
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

/** True once a full viewport of content sits above the fold. */
export function useStickyCtaReveal(): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => subscribe(setVisible), []);
  return visible;
}
