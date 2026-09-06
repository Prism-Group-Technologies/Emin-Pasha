"use client";

import { useCallback, useMemo, useState } from "react";

import { type PlanPathCopy, planPaths } from "@/containers/home/copy";
import { track } from "@/lib/analytics/events";

export interface PlanYourVisitState {
  paths: PlanPathCopy[];
  activeId: PlanPathCopy["id"];
  activePath: PlanPathCopy;
  activeIndex: number;
  select: (id: PlanPathCopy["id"]) => void;
  /** Roving-tabindex keyboard handler for the tablist (WAI-ARIA tabs pattern). */
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  tabId: (id: PlanPathCopy["id"]) => string;
  panelId: (id: PlanPathCopy["id"]) => string;
}

/** Same narrowing pattern as `constants.ts:resolveHero` — a throw at module
 *  scope doesn't narrow the binding for TypeScript, a function return does. */
function firstPath(): PlanPathCopy {
  const first = planPaths[0];
  if (!first) {
    throw new Error("containers/home/copy.ts: planPaths must not be empty");
  }
  return first;
}

const FIRST_PATH = firstPath();

/**
 * All of the Plan Your Visit section's state and behaviour, so the organism
 * that renders it stays pure structure (CLAUDE.md §5.2).
 *
 * Three things live here rather than in the view:
 *
 * 1. **Which path is open.** Defaults to "stay", the highest-volume intent.
 * 2. **The intent signal.** Selecting a path fires `home_lead_path_selected` —
 *    consent-gated inside `track()` — because which of the three panels a
 *    visitor opens is the only intent data this page produces before the
 *    booking widget.
 * 3. **Keyboard navigation.** The WAI-ARIA tabs pattern requires arrow keys,
 *    Home and End to move selection; without it the section is a mouse-only
 *    control, and this is the section the whole page funnels into.
 *
 * The initial selection deliberately does **not** fire an event: nobody chose
 * it, so counting it would inflate "stay" against the two paths a visitor has
 * to actively open.
 */
export function usePlanYourVisit(): PlanYourVisitState {
  const [activeId, setActiveId] = useState<PlanPathCopy["id"]>(FIRST_PATH.id);

  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        planPaths.findIndex((path) => path.id === activeId),
      ),
    [activeId],
  );

  const activePath: PlanPathCopy = planPaths[activeIndex] ?? FIRST_PATH;

  const select = useCallback((id: PlanPathCopy["id"]) => {
    setActiveId((current) => {
      if (current === id) {
        return current;
      }
      track("home_lead_path_selected", { path: id });
      return id;
    });
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const offsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
      const offset = offsets[event.key];
      const last = planPaths.length - 1;

      let nextIndex: number | undefined;
      if (offset !== undefined) {
        // Wraps, per the ARIA authoring practices for a horizontal tablist.
        nextIndex = (activeIndex + offset + planPaths.length) % planPaths.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = last;
      }

      const next = nextIndex === undefined ? undefined : planPaths[nextIndex];
      if (!next) {
        return;
      }
      event.preventDefault();
      select(next.id);
      // Selection follows focus in this pattern, so the newly selected tab has
      // to actually receive focus or the next arrow press goes nowhere.
      document.getElementById(`plan-tab-${next.id}`)?.focus();
    },
    [activeIndex, select],
  );

  return useMemo(
    () => ({
      paths: planPaths,
      activeId,
      activePath,
      activeIndex,
      select,
      onKeyDown,
      tabId: (id) => `plan-tab-${id}`,
      panelId: (id) => `plan-panel-${id}`,
    }),
    [activeId, activePath, activeIndex, select, onKeyDown],
  );
}
