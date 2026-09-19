"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Lightbox state and keyboard navigation, shared by the gallery wall and the
 * room-detail mosaic — it knows a count and an index and nothing about what
 * is being shown, which is why it lives here rather than in either container.
 *
 * Arrow keys move, Escape closes, and focus returns to the thumbnail that
 * opened it — a lightbox you can enter but not leave by keyboard is a trap
 * (CLAUDE.md §10). The listener is bound only while open, so a closed gallery
 * costs nothing. `Home` / `End` jump to the first and last photograph.
 */
export function useLightbox(count: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null && count > 0;

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
    const keys: Record<string, () => void> = {
      ArrowRight: next,
      ArrowLeft: previous,
      Home: () => setIndex(0),
      End: () => setIndex(count - 1),
    };
    const onKeyDown = (event: KeyboardEvent) => keys[event.key]?.();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count, next, open, previous]);

  return { index: open ? index : null, open, openAt: setIndex, close, next, previous };
}

export type LightboxState = ReturnType<typeof useLightbox>;
