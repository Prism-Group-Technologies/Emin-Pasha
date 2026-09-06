"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * "Has this component hydrated on the client yet?"
 *
 * `useSyncExternalStore` with a no-op subscription returns the same `false`
 * on the server and on React's first client pass — so anything gated on it
 * cannot cause a hydration mismatch (CLAUDE.md §7) — then `true` afterwards.
 * The obvious `useState(false)` + mount `useEffect` alternative trips
 * `react-hooks/set-state-in-effect`.
 *
 * Extracted from `useColorSchemeToggle`, which was the first caller; the
 * theme toggle and the cookie-consent gate now share one implementation.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
