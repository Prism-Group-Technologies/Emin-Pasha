"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const MOBILE_QUERY = "(max-width: 899px)";

function subscribeToViewport(callback: () => void) {
  const list = window.matchMedia(MOBILE_QUERY);
  list.addEventListener("change", callback);
  return () => list.removeEventListener("change", callback);
}

/**
 * True when the video must not be requested at all. Read through
 * `useSyncExternalStore` rather than a mount effect: it gives the same answer
 * on the server and on React's first client pass (no hydration mismatch), it
 * re-evaluates if the viewport crosses the breakpoint, and it avoids the
 * cascading render that `setState` inside an effect causes.
 *
 * The server snapshot is `true` — blocked — so the SSR HTML never contains a
 * `<source>`. Erring towards "no video" is the right default: the poster
 * alone is a complete hero.
 */
function useVideoBlocked(): boolean {
  return useSyncExternalStore(
    subscribeToViewport,
    () => {
      const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
        true;
      return saveData || window.matchMedia(MOBILE_QUERY).matches;
    },
    () => true,
  );
}

/**
 * Decides whether the hero video is attached at all, and never before the
 * poster has had the page to itself.
 *
 * CLAUDE.md §8 requires a static image on mobile, under
 * `prefers-reduced-motion` **and** under `Save-Data`. All three are checked
 * here rather than in CSS because the win is not hiding the video — it is
 * never requesting it: `<source>` elements are only rendered once this
 * returns true, so a mobile or data-saving visitor downloads zero video
 * bytes rather than downloading and hiding them.
 *
 * The idle wait is what protects LCP. The poster is the LCP element, and a
 * video fetch started during the load burst competes with it for bandwidth
 * on exactly the connection where that costs most.
 */
export function useHeroVideo() {
  const reducedMotion = usePrefersReducedMotion();
  const [idle, setIdle] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const blocked = useVideoBlocked();

  useEffect(() => {
    if (typeof window.requestIdleCallback !== "function") {
      const timer = setTimeout(() => setIdle(true), 1200);
      return () => clearTimeout(timer);
    }
    const handle = window.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
    return () => window.cancelIdleCallback(handle);
  }, []);

  const shouldAttach = idle && !blocked && !reducedMotion;

  return {
    /** Render `<source>` children only when true. */
    shouldAttach,
    /** Cross-fade the video over the poster once it can actually play. */
    visible: shouldAttach && canPlay,
    onCanPlayThrough: () => setCanPlay(true),
  };
}
