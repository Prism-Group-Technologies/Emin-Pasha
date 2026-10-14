"use client";

import { useEffect } from "react";

/** Browsers without `requestIdleCallback` (older Safari) get a plain delay. */
const IDLE_FALLBACK_MS = 1500;
const IDLE_TIMEOUT_MS = 4000;

/**
 * Runs `onIdle` once the browser has nothing better to do — never during the
 * load burst that produces LCP, and never later than the timeout.
 *
 * Extracted from `useDeferredHydration`, which proved the pattern for the
 * footer newsletter and is now one of two callers: the site-wide image modal
 * warms its chunk the same way, so a visitor's first tap on a photograph does
 * not wait on a network round trip. Both needed the same Safari fallback and
 * the same cancel-on-unmount, and a second hand-rolled copy of that is how
 * the two would have drifted.
 *
 * `onIdle` must be stable — wrap it in `useCallback` — or the idle request is
 * cancelled and re-queued on every render and may never fire.
 */
export function useWhenIdle(onIdle: () => void, skip = false) {
  useEffect(() => {
    if (skip) {
      return;
    }
    if (typeof window.requestIdleCallback !== "function") {
      const timeout = setTimeout(onIdle, IDLE_FALLBACK_MS);
      return () => clearTimeout(timeout);
    }
    const handle = window.requestIdleCallback(onIdle, { timeout: IDLE_TIMEOUT_MS });
    return () => window.cancelIdleCallback(handle);
  }, [onIdle, skip]);
}
