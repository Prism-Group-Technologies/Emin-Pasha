"use client";

import { useState } from "react";

import type { Outlet } from "@/schemas/content/outlet";

export type OutletFilterValue = "all" | Outlet["type"];

export interface OutletFilterResult {
  filter: OutletFilterValue;
  setFilter: (value: OutletFilterValue) => void;
  /** Per-card, in the order `types` was given: is this card shown? */
  visible: boolean[];
  visibleCount: number;
  /** `aria-live` status string for the result count. */
  statusText: string;
}

const LABEL: Record<OutletFilterValue, string> = {
  all: "outlets",
  restaurant: "restaurants",
  bar: "bars",
  "in-room": "in-room dining",
};

/**
 * The outlet grid's only interactive state: a type filter and the derived
 * visibility of each card.
 *
 * Kept out of the organism — like `accommodation/hooks/useRoomFilter` — so
 * the grid stays a thin layout component and the match rule lives in one
 * testable place. Holds nothing but the filter string: the cards themselves
 * stay server-rendered, so no card is ever built on the client.
 */
export function useOutletFilter(types: Outlet["type"][]): OutletFilterResult {
  const [filter, setFilter] = useState<OutletFilterValue>("all");

  const visible = types.map((type) => filter === "all" || type === filter);
  const visibleCount = visible.filter(Boolean).length;

  const statusText =
    filter === "all"
      ? `Showing all ${types.length} outlets.`
      : `Showing ${visibleCount} ${LABEL[filter]}.`;

  return { filter, setFilter, visible, visibleCount, statusText };
}
