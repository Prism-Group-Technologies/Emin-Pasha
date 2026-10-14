"use client";

import { useLayoutEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { useNavigationKind } from "@/hooks/useNavigationKind";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { resolveScrollIntent } from "@/lib/navigation/routeTransition";
import { easingTokens, motionTokens } from "@/theme/tokens";

/**
 * The new page arrives already at the top, then fades up from nothing over
 * this. The fade is the whole signal: it is what tells a guest that the thing
 * in front of them is a *different* page, without anything travelling up the
 * screen to say so. Short enough that it never delays reading.
 */
const FADE_KEYFRAMES: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];

/**
 * Owns what happens to the viewport, and to focus, when a route commits.
 *
 * Mounted once from the root layout, **after** `PageShell`. The ordering is
 * not cosmetic: React runs commit-phase work in tree order, so a layout effect
 * declared after the subtree that holds the router runs after the router's own
 * scroll handling. Whatever that handler decides — including deciding to do
 * nothing, which is the bug this replaces — this component gets the last word
 * in the same frame, before the browser paints. The guest never sees two
 * positions.
 *
 * Three things happen together, and they are three things rather than one
 * because each addresses a different guest:
 *
 *   - **The jump.** `behavior: "auto"`, never `"smooth"`. Scrolling 6,900px of
 *     page back to a hero takes most of a second and shows the guest a blur of
 *     content they did not ask to see; from deep in a page it reads as the
 *     site losing its place rather than as an answer to their click.
 *   - **The fade.** Replaces the motion that was just removed, at a scale that
 *     cannot disorient: opacity only, no travel. Suppressed outright under
 *     `prefers-reduced-motion` (CLAUDE.md §10) — the jump alone is correct
 *     there, and it is what a full page load has always done.
 *   - **Focus.** A client-side navigation leaves focus on `<body>`, so a
 *     keyboard guest's next Tab resumes from wherever the old page left it and
 *     a screen reader is told nothing. Moving focus to the main landmark is
 *     the documented SPA fix, and it is the same landmark the skip link and
 *     the back-to-top control already hand focus to. `preventScroll` because
 *     the scroll above has already happened and the browser must not redo it.
 */
export function RouteTransition({ focusTargetId }: { focusTargetId: string }) {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  const navigationKind = useNavigationKind();
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const intent = resolveScrollIntent(previousPath.current, pathname, navigationKind(pathname));
    previousPath.current = pathname;
    if (intent === "none") {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const main = document.getElementById(focusTargetId);
    main?.focus({ preventScroll: true });

    // `animate` is missing under jsdom and in any browser without the Web
    // Animations API; the navigation is already correct without the fade.
    if (!reducedMotion && typeof main?.animate === "function") {
      main.animate(FADE_KEYFRAMES, {
        duration: motionTokens.routeFade,
        easing: easingTokens.emin,
      });
    }
  }, [focusTargetId, navigationKind, pathname, reducedMotion]);

  return null;
}
