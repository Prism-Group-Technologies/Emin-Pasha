"use client";

import { useCallback, useRef, useState } from "react";

import type { UseFormReturn } from "react-hook-form";

import { useDismissOnOutside } from "@/hooks/useDismissOnOutside";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import type { BookingSearch } from "@/schemas/booking";
import { selectWidgetPresence, useBookingStore } from "@/stores/bookingStore";

import { useReseedFromStore } from "./useReseedFromStore";

export interface StickyBookingBarState {
  /** Whether the bar has taken over from the hero widget. */
  shown: boolean;
  expanded: boolean;
  toggle: () => void;
  collapse: () => void;
  /** Wraps the summary row *and* the panel, so a click on a segment counts as inside. */
  panelRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Everything the sticky bar knows about *when* it exists and *how much* of it
 * is open. The bar component is then a pure arrangement of a summary row and a
 * panel, which is the only way it fits in one readable file.
 */
export function useStickyBookingBar(
  form: UseFormReturn<BookingSearch>,
  heroRoutes: readonly string[],
): StickyBookingBarState {
  const { condensed } = useHeaderScroll(heroRoutes);
  const presence = useBookingStore(selectWidgetPresence);
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Two conditions, both required. `condensed` is the floor: the bar is a
  // scroll affordance, so it may never appear over an un-scrolled page. That
  // alone was missing, and it is why the accommodation index and the room
  // pages opened with the bar already on screen — their in-page widget sits
  // below the fold, so the observer reported "hidden" on mount and the bar
  // took over at scroll 0, wedged under a still-expanded header (the bar is
  // offset by `HEADER_HEIGHT_CONDENSED`, which only matches once condensed).
  //
  // The presence check is then about handover, not timing: where a full
  // widget exists — the hero on the homepage, the in-page one on a room page
  // — the bar stays away while it is on screen, so the two are never in view
  // together. With no widget on the page, the condense threshold is the whole
  // cue.
  const shown = condensed && presence !== "visible";

  const collapse = useCallback(() => setExpanded(false), []);
  const toggle = useCallback(() => setExpanded((open) => !open), []);

  // Adjusted during render rather than in an effect — React's documented way
  // to reset state when a prop changes, and the only way that does not trip
  // `react-hooks/set-state-in-effect`. A panel left open behind the guest's
  // back is a panel that reopens over the hero next time the bar appears.
  const [lastShown, setLastShown] = useState(shown);
  if (lastShown !== shown) {
    setLastShown(shown);
    setExpanded(false);
  }

  useDismissOnOutside(panelRef, expanded, collapse);
  useReseedFromStore(form, shown);

  return { shown, expanded, toggle, collapse, panelRef };
}
