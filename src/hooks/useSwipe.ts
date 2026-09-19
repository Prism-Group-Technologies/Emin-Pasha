"use client";

import { type PointerEvent, useRef } from "react";

/** Horizontal travel, in px, before a drag counts as a swipe. */
const SWIPE_THRESHOLD_PX = 48;

export type SwipeIntent = "next" | "previous" | null;

/**
 * Pure: a mostly-horizontal drag past the threshold is a swipe — leftward
 * means "next", as in every photo app. Mostly-vertical drags are left alone so
 * the dialog can still scroll on a short phone screen.
 */
export function swipeIntent(dx: number, dy: number, threshold = SWIPE_THRESHOLD_PX): SwipeIntent {
  if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) {
    return null;
  }
  return dx < 0 ? "next" : "previous";
}

/**
 * Pointer handlers that turn a swipe on the lightbox stage into next /
 * previous. Pointer events cover touch, pen and mouse with one code path.
 */
export function useSwipe(handlers: { onNext: () => void; onPrevious: () => void }) {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: PointerEvent) => {
    start.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!start.current) {
      return;
    }
    const intent = swipeIntent(event.clientX - start.current.x, event.clientY - start.current.y);
    start.current = null;
    if (intent === "next") {
      handlers.onNext();
    } else if (intent === "previous") {
      handlers.onPrevious();
    }
  };

  return { onPointerDown, onPointerUp, onPointerCancel: () => (start.current = null) };
}
