"use client";

import { useRef } from "react";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Scroll-snap carousel logic — CSS `scroll-snap` gives touch/swipe support
 * for free; this hook adds the prev/next controls and keyboard handling on
 * top of it, and drops smooth scrolling under `prefers-reduced-motion`.
 */
export function useCarousel(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  function scrollToIndex(index: number) {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, itemCount - 1));
    const child = container.children[clamped];
    if (child instanceof HTMLElement) {
      child.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
    }
  }

  function scrollBy(direction: 1 | -1) {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollBy({
      left: direction * width,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollBy(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollBy(-1);
    }
  }

  return { containerRef, scrollToIndex, scrollBy, handleKeyDown };
}
