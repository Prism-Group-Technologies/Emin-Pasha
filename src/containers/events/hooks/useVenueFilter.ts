"use client";

import { useState } from "react";

import { EVENT_TYPE_ORDER, type EventTypeId } from "@/containers/events/anchors";

export type VenueFilterValue = "all" | EventTypeId;

export interface VenueFilterResult {
  filter: VenueFilterValue;
  setFilter: (value: VenueFilterValue) => void;
  /** Per-venue, in the order `suits` was given: is this card shown? */
  visible: boolean[];
  visibleCount: number;
  /** `aria-live` status string for the result count. */
  statusText: string;
}

export const VENUE_FILTER_OPTIONS: { value: VenueFilterValue; label: string }[] = [
  { value: "all", label: "All events" },
  { value: "conference", label: "Conferences" },
  { value: "meeting", label: "Meetings" },
  { value: "wedding", label: "Weddings" },
  { value: "launch", label: "Launches" },
  { value: "social", label: "Celebrations" },
];

const LABEL: Record<VenueFilterValue, string> = {
  all: "venues",
  conference: "conference venues",
  meeting: "meeting venues",
  wedding: "wedding venues",
  launch: "launch venues",
  social: "celebration venues",
};

/** True when `filter` matches — kept pure so the test can exercise it directly. */
export function matchesVenueFilter(suits: EventTypeId[], filter: VenueFilterValue): boolean {
  return filter === "all" || suits.includes(filter);
}

/**
 * The venue grid's only interactive state: an event-type filter and the
 * derived visibility of each card. Kept out of the organism — like
 * `dining/hooks/useOutletFilter` — so the grid stays a thin layout component
 * and the match rule lives in one testable place. Holds nothing but the
 * filter string: the cards themselves stay server-rendered.
 */
export function useVenueFilter(suits: EventTypeId[][]): VenueFilterResult {
  const [filter, setFilter] = useState<VenueFilterValue>("all");

  const visible = suits.map((entry) => matchesVenueFilter(entry, filter));
  const visibleCount = visible.filter(Boolean).length;

  const statusText =
    filter === "all"
      ? `Showing all ${suits.length} venues.`
      : `Showing ${visibleCount} ${LABEL[filter]}.`;

  return { filter, setFilter, visible, visibleCount, statusText };
}

/** All selectable filter values, so the segmented control and the test agree. */
export const VENUE_FILTER_VALUES: VenueFilterValue[] = ["all", ...EVENT_TYPE_ORDER];
