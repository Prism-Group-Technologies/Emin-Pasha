"use client";

import { useCallback, useMemo, useState } from "react";

export interface RevealLatch {
  revealed: ReadonlySet<string>;
  reveal: (key: string) => void;
}

/**
 * A grow-only set of keys that have been "seen" at least once.
 *
 * The mega-menu uses it to gate thumbnail loading: a panel's images mount only
 * after that panel has been opened, so a visitor who never touches the
 * navigation pays for none of them, and one who opens Dining pays for Dining
 * alone. Same latch idea as `useMobileNav`'s `openedOnce`, generalised to a set
 * because there are several panels rather than one drawer.
 *
 * Grow-only on purpose: once an image is in the browser cache, un-revealing it
 * would only throw away work and re-fetch on the next open.
 */
export function useRevealLatch(): RevealLatch {
  const [revealed, setRevealed] = useState<ReadonlySet<string>>(() => new Set());

  const reveal = useCallback((key: string) => {
    setRevealed((current) => {
      // Returning the same reference when nothing changes keeps this from
      // re-rendering the header on every hover of an already-opened panel.
      if (current.has(key)) {
        return current;
      }
      const next = new Set(current);
      next.add(key);
      return next;
    });
  }, []);

  return useMemo(() => ({ revealed, reveal }), [revealed, reveal]);
}
