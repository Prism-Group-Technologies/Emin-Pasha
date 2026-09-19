"use client";

import { useEffect, useRef } from "react";

/**
 * Keeps the lightbox's active thumbnail in view as the guest moves through the
 * photographs with arrows or swipes. Scrolls only the strip (`block:
 * "nearest"`), never the page, and respects reduced motion.
 */
export function useThumbScroll(activeIndex: number) {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = stripRef.current?.querySelector<HTMLElement>(`[data-thumb="${activeIndex}"]`);
    if (!thumb || typeof thumb.scrollIntoView !== "function") {
      return;
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    thumb.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return stripRef;
}
