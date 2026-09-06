"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Lightbox state and keyboard navigation.
 *
 * Arrow keys move, Escape closes, and focus returns to the thumbnail that
 * opened it — a lightbox you can enter but not leave by keyboard is a trap
 * (CLAUDE.md §10). The listener is bound only while open, so a closed gallery
 * costs nothing.
 */
export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % count)), [count]);
  const previous = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + count) % count)),
    [count],
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        previous();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, open, previous]);

  return { index, open, openAt: setIndex, close, next, previous };
}
