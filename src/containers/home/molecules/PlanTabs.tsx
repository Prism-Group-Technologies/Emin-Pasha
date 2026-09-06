"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { PlanYourVisitState } from "@/containers/home/hooks/usePlanYourVisit";

export type PlanTabsProps = Pick<
  PlanYourVisitState,
  "paths" | "activeId" | "select" | "onKeyDown" | "tabId" | "panelId"
>;

/**
 * The tablist for the three lead paths — structure only; every piece of state
 * and the whole keyboard contract come in from `usePlanYourVisit`.
 *
 * Roving tabindex: only the selected tab is reachable with Tab, and the arrow
 * keys move between them, which is the WAI-ARIA tabs pattern rather than three
 * separate tab stops.
 *
 * The selected tab is marked by a gold underline *and* a weight change, not by
 * colour alone — gold at 2.33:1 on the light surface cannot be the only signal
 * carrying "this one is active".
 */
export function PlanTabs({ paths, activeId, select, onKeyDown, tabId, panelId }: PlanTabsProps) {
  return (
    <Box
      role="tablist"
      aria-label="Plan your visit"
      onKeyDown={onKeyDown}
      sx={{
        display: "flex",
        gap: { xs: 0, sm: 2 },
        overflowX: "auto",
        borderBottom: "1px solid",
        borderColor: "divider",
        mb: { xs: 6, md: 7 },
        // A horizontal scroller on a phone should not also show a scrollbar
        // over the labels; the tabs stay reachable by arrow key regardless.
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {paths.map((path) => {
        const selected = path.id === activeId;
        return (
          <Box
            key={path.id}
            component="button"
            type="button"
            role="tab"
            id={tabId(path.id)}
            aria-selected={selected}
            aria-controls={panelId(path.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => select(path.id)}
            sx={{
              flex: { xs: "1 0 auto", sm: "0 0 auto" },
              appearance: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              px: { xs: 4, md: 5 },
              py: 4,
              mb: "-1px",
              borderBottom: "2px solid",
              borderColor: selected ? "primary.main" : "transparent",
              color: selected ? "text.primary" : "text.secondary",
              transition: "color 150ms, border-color 150ms",
              whiteSpace: "nowrap",
              "&:hover": { color: "text.primary" },
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            }}
          >
            <Text
              variant="overline"
              component="span"
              sx={{ fontWeight: selected ? 700 : 400, color: "inherit" }}
            >
              {path.tab}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
