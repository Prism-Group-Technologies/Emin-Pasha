"use client";

import { useCallback, useEffect, useRef } from "react";

import type { NavigationKind } from "@/lib/navigation/routeTransition";

/**
 * Tells `RouteTransition` whether the route that just committed arrived by a
 * link (`push`) or by the back/forward button (`pop`), which is the one
 * distinction that decides between "show them the top of the new page" and
 * "put them back exactly where they were".
 *
 * The App Router exposes no navigation events, so this reads the one signal
 * the platform does give: `popstate` fires synchronously, during the gesture,
 * before React re-renders. What it records is the *path* of that entry rather
 * than a bare flag, and that detail is load-bearing. A guest who follows an
 * in-page anchor and then presses back produces a `popstate` with no path
 * change and therefore no commit to consume the flag; a boolean would still be
 * set when they next clicked through to a real page, and that navigation would
 * silently be misread as a back. Comparing paths means an unconsumed record
 * can only ever match the route it actually came from.
 */
export function useNavigationKind(): (path: string) => NavigationKind {
  const poppedPath = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      poppedPath.current = window.location.pathname;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return useCallback((path: string) => {
    const kind: NavigationKind = poppedPath.current === path ? "pop" : "push";
    poppedPath.current = null;
    return kind;
  }, []);
}
