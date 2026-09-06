"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** CLAUDE.md §10 — every animation must respect this. `useSyncExternalStore`
 * avoids the server/client mismatch a `useState`+`useEffect` version would need. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
