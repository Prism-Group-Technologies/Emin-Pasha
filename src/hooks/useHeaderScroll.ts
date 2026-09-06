"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

/** Scroll distance past which the header condenses, in px. */
export const HEADER_SCROLL_THRESHOLD = 64;

/**
 * Reads `window.scrollY` inside a `requestAnimationFrame` callback rather
 * than in the scroll handler itself, so the handler only ever schedules a
 * frame and never touches layout — the scroll listener does no work that can
 * jank the main thread (CLAUDE.md §8, this step's "rAF-throttled" brief).
 * `{ passive: true }` additionally tells the browser the handler will never
 * call `preventDefault`, so scrolling is never blocked waiting on it.
 */
function subscribeToScroll(onCross: (past: boolean) => void): () => void {
  let frame = 0;
  const read = () => {
    frame = 0;
    onCross(window.scrollY > HEADER_SCROLL_THRESHOLD);
  };
  const onScroll = () => {
    if (frame === 0) {
      frame = window.requestAnimationFrame(read);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  read();
  return () => {
    window.removeEventListener("scroll", onScroll);
    if (frame !== 0) {
      window.cancelAnimationFrame(frame);
    }
  };
}

export interface HeaderScrollState {
  /** True once scrolled past the threshold — header condenses and goes opaque. */
  condensed: boolean;
  /** True when the header should float transparent over a full-bleed hero. */
  overHero: boolean;
  /** The state the header actually paints: transparent only over an un-scrolled hero. */
  transparent: boolean;
}

/**
 * `heroRoutes` is passed in rather than read from `content/shell` so this
 * hook — which runs in the always-loaded header island — carries no import
 * edge into the Zod-validated content layer (DECISIONS.md D25).
 */
export function useHeaderScroll(heroRoutes: readonly string[]): HeaderScrollState {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);

  useEffect(() => subscribeToScroll(setCondensed), []);

  const overHero = heroRoutes.includes(pathname);

  return { condensed, overHero, transparent: overHero && !condensed };
}
