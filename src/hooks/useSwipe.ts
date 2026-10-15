"use client";

import { type MouseEvent, type PointerEvent, useRef } from "react";

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
 * Pointer handlers that turn a swipe on the lightbox stage or a carousel into
 * next / previous. Pointer events cover touch, pen and mouse with one code
 * path.
 *
 * `onClickCapture` is what stops a swipe from also counting as a tap. The
 * browser still synthesises a `click` at the end of a horizontal drag, and now
 * that every photograph is a button that opens the image modal, a swipe
 * through a carousel would advance the slide *and* enlarge it. Cancelling the
 * click marks the native event `defaultPrevented`, which is exactly the signal
 * the modal's delegated listener already looks for — so the suppression works
 * without either side knowing about the other.
 */
export function useSwipe(handlers: { onNext: () => void; onPrevious: () => void }) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const onPointerDown = (event: PointerEvent) => {
    start.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!start.current) {
      return;
    }
    const intent = swipeIntent(event.clientX - start.current.x, event.clientY - start.current.y);
    start.current = null;
    swiped.current = intent !== null;
    if (intent === "next") {
      handlers.onNext();
    } else if (intent === "previous") {
      handlers.onPrevious();
    }
  };

  const onClickCapture = (event: MouseEvent) => {
    if (!swiped.current) {
      return;
    }
    swiped.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return {
    onPointerDown,
    onPointerUp,
    onClickCapture,
    onPointerCancel: () => (start.current = null),
  };
}
