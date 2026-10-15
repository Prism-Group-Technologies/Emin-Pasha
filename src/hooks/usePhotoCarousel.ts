"use client";

import { useCallback, useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** How long each frame holds before the carousel advances. */
const DEFAULT_INTERVAL_MS = 5000;

export interface PhotoCarouselState {
  /** Index of the frame currently on screen. */
  index: number;
  /** Jump to a frame. Wraps, so the loop has no ends. */
  select: (next: number) => void;
  next: () => void;
  previous: () => void;
  /** Whether autoplay is armed — the state the visible control toggles. */
  playing: boolean;
  toggle: () => void;
  /** Transient hold for pointer-enter and focus. Does not change `playing`. */
  hold: () => void;
  release: () => void;
  /** True when the OS asks for reduced motion; the control is hidden then. */
  reduced: boolean;
}

/**
 * Drives an autoplaying, infinitely looping image carousel.
 *
 * **Two kinds of pause, deliberately kept apart.** `playing` is the viewer's
 * standing decision, toggled by a visible button and remembered; `hold` is a
 * transient stop for hover and focus. Collapsing them into one flag was the
 * first version and it was wrong in both directions — moving the pointer away
 * from a carousel the viewer had explicitly paused would start it moving
 * again, and a hover could leave the button showing "paused" when the next
 * tick was already scheduled. The timer runs only when both agree.
 *
 * Three things keep the autoplay tolerable rather than hostile:
 *
 * - It stops under `prefers-reduced-motion`. A carousel that moves on its own
 *   is exactly the motion that setting asks us not to produce, so the first
 *   frame stays put and the manual controls still work. The query is
 *   subscribed to rather than read once, so changing the OS setting takes
 *   effect without a reload.
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
export function usePhotoCarousel(
  count: number,
  intervalMs: number = DEFAULT_INTERVAL_MS,
): PhotoCarouselState {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!playing || held || reduced || count < 2) return;

    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), intervalMs);
    return () => window.clearTimeout(timer);
  }, [count, held, index, intervalMs, playing, reduced]);

  const select = useCallback(
    (next: number) => {
      if (count > 0) setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => select(index + 1), [index, select]);
  const previous = useCallback(() => select(index - 1), [index, select]);
  const toggle = useCallback(() => setPlaying((current) => !current), []);
  const hold = useCallback(() => setHeld(true), []);
  const release = useCallback(() => setHeld(false), []);

  return { index, select, next, previous, playing, toggle, hold, release, reduced };
}
