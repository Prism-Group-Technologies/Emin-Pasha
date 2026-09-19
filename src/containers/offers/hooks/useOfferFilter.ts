"use client";

import { useState } from "react";

import {
  OFFER_CATEGORY_LABEL,
  OFFER_CATEGORY_ORDER,
  type OfferCategory,
} from "@/containers/offers/anchors";

export type OfferFilterValue = "all" | OfferCategory;

export interface OfferFilterOption {
  value: OfferFilterValue;
  label: string;
  count: number;
}

export interface OfferFilterResult {
  filter: OfferFilterValue;
  setFilter: (value: OfferFilterValue) => void;
  /** "All" plus every category that has at least one offer, with counts. */
  options: OfferFilterOption[];
  /** Per-card, in the order `categories` was given: is this card shown? */
  visible: boolean[];
  /** `aria-live` status string for the result count. */
  statusText: string;
}

const plural = (count: number) => `${count} offer${count === 1 ? "" : "s"}`;

/**
 * The offer grid's only interactive state: a category filter and the derived
 * visibility of each card. Kept out of the island — like
 * `wellness/hooks/useTreatmentFilter` — so the grid stays a thin layout
 * component and the match rule lives in one testable place. Cards stay
 * server-rendered; this only decides which are shown.
 *
 * Empty categories are dropped from `options`, so a chip can never lead to an
 * empty grid.
 */
export function useOfferFilter(categories: OfferCategory[]): OfferFilterResult {
  const [filter, setFilter] = useState<OfferFilterValue>("all");

  const counts = OFFER_CATEGORY_ORDER.map((category) => ({
    value: category,
    label: OFFER_CATEGORY_LABEL[category],
    count: categories.filter((item) => item === category).length,
  })).filter((option) => option.count > 0);

  const options: OfferFilterOption[] = [
    { value: "all", label: "All offers", count: categories.length },
    ...counts,
  ];

  const visible = categories.map((category) => filter === "all" || category === filter);
  const shown = visible.filter(Boolean).length;
  const statusText =
    filter === "all"
      ? `Showing all ${plural(shown)}.`
      : `Showing ${plural(shown)} in ${OFFER_CATEGORY_LABEL[filter]}.`;

  return { filter, setFilter, options, visible, statusText };
}
