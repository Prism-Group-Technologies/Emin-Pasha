"use client";

import { useState } from "react";

import { type FacilityId } from "@/containers/wellness/anchors";

export type TreatmentFilterValue = "all" | FacilityId;

export interface TreatmentFilterResult {
  filter: TreatmentFilterValue;
  setFilter: (value: TreatmentFilterValue) => void;
  /** Per-card, in the order `facilities` was given: is this card shown? */
  visible: boolean[];
  visibleCount: number;
  /** `aria-live` status string for the result count. */
  statusText: string;
}

const LABEL: Record<TreatmentFilterValue, string> = {
  all: "treatments & sessions",
  spa: "spa treatments",
  gym: "gym sessions",
  pool: "pool sessions",
};

/**
 * The signature-treatment strip's only interactive state: a facility filter
 * and the derived visibility of each card.
 *
 * Kept out of the organism — like `dining/hooks/useOutletFilter` — so the
 * strip stays a thin layout component and the match rule lives in one
 * testable place. Holds nothing but the filter string: the cards themselves
 * stay server-rendered.
 */
export function useTreatmentFilter(facilities: FacilityId[]): TreatmentFilterResult {
  const [filter, setFilter] = useState<TreatmentFilterValue>("all");

  const visible = facilities.map((facility) => filter === "all" || facility === filter);
  const visibleCount = visible.filter(Boolean).length;

  const statusText =
    filter === "all"
      ? `Showing all ${facilities.length} treatments & sessions.`
      : `Showing ${visibleCount} ${LABEL[filter]}.`;

  return { filter, setFilter, visible, visibleCount, statusText };
}
