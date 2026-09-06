"use client";

import { useSyncExternalStore } from "react";

/**
 * A media-query hook that does not reach for MUI's `useMediaQuery` — that
 * import is barred outside `src/components`/`src/theme` (CLAUDE.md §5.1), and
 * containers legitimately need to branch on viewport.
 *
 * `useSyncExternalStore` gives the same answer on the server and on React's
 * first client pass, so nothing here can cause a hydration mismatch. The
 * server snapshot is `false` — treat as narrow — so a multi-step mobile form
 * is what renders before JS decides otherwise, which is the safer default.
 */
export function useMediaBreakpoint(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", callback);
      return () => list.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** `md` and up — matches the theme's 900px breakpoint. */
export const DESKTOP_QUERY = "(min-width:900px)";
