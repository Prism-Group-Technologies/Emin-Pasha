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

  // Where a full widget exists — the hero on the homepage, the in-page one on
  // a room page — the bar waits for it to leave. On a page with none, and in
  // the frame or two before an observer has reported, there is nothing to hand
  // over from, so the header's own condense threshold is the right cue.
  const shown = presence === "none" ? condensed : presence === "hidden";

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
