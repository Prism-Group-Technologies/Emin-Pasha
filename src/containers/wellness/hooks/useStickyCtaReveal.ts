"use client";

import { useEffect, useState } from "react";

/**
 * How far the guest must scroll before the page's sticky "book" bar appears,
 * in viewport heights. One full screen means the hero — which carries its own
 * primary CTA — is behind them before a second, persistent one slides in, so
 * the two never compete above the fold. The same viewport-relative reasoning
 * as `hooks/useScrollToTop`.
 */
const REVEAL_THRESHOLD_VH = 1;

/**
 * `window.scrollY` is read inside a `requestAnimationFrame` callback, never
 * in the listener itself, so the scroll handler only ever schedules a frame
 * and does no layout work on the main thread (CLAUDE.md §8). `{ passive: true }`
 * tells the browser the handler will never `preventDefault`. `resize` is
 * subscribed alongside `scroll` because the threshold is derived from
 * `innerHeight`.
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
