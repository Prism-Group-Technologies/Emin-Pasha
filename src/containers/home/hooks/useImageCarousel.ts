"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

/** How long each frame holds before the carousel advances. */
const DEFAULT_INTERVAL_MS = 5000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * `prefers-reduced-motion` as an external store rather than an effect writing
 * to state. The media query *is* an external system, so this is what
 * `useSyncExternalStore` is for — and it avoids the cascading render that
 * reading the query into `useState` inside an effect would cause.
 *
 * The server snapshot is `false`. The setting is unknowable during SSR and the
 * value never reaches the markup — it only decides whether a timer starts — so
 * there is nothing to mismatch on hydration.
 */
function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getReducedMotionOnServer = () => false;

export interface ImageCarouselState {
  /** Index of the frame currently on screen. */
  index: number;
  /** Jump to a frame. Wraps, so the loop has no ends. */
  select: (next: number) => void;
  /** Hold the current frame — bind to pointer enter and focus. */
  pause: () => void;
  /** Resume advancing — bind to pointer leave and blur. */
  resume: () => void;
}

/**
 * Drives an autoplaying, infinitely looping image carousel.
 *
 * Three things make the autoplay tolerable rather than hostile:
 *
 * - It stops under `prefers-reduced-motion`. A carousel that moves on its own
 *   is exactly the motion that setting asks us not to produce, so the first
 *   frame simply stays put and the dots still work. The query is subscribed to
 *   rather than read once, so changing the OS setting takes effect without a
 *   reload.
 * - It pauses on hover and on focus. Advancing the frame out from under
 *   someone who is reading it — or who is tabbing through the dots — is the
 *   classic carousel failure.
 * - Picking a frame by hand restarts the clock, because `index` is a
 *   dependency of the timer. Otherwise a manual pick could be overwritten a
 *   few hundred milliseconds later by a tick already in flight.
 *
 * `count` is the number of frames, not an index; a carousel of fewer than two
 * never starts a timer at all.
 */
export function useImageCarousel(
  count: number,
  intervalMs: number = DEFAULT_INTERVAL_MS,
): ImageCarouselState {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer,
  );

  useEffect(() => {
    if (paused || reduced || count < 2) return;

    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), intervalMs);
    return () => window.clearTimeout(timer);
  }, [count, index, intervalMs, paused, reduced]);

  const select = useCallback(
    (next: number) => {
      if (count > 0) setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);

  return { index, select, pause, resume };
}
