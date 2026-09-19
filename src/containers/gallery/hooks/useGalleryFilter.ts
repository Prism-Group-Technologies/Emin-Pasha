"use client";

import { useMemo, useState } from "react";

import {
  GALLERY_CATEGORY_LABEL,
  GALLERY_CATEGORY_ORDER,
  type GalleryCategory,
} from "@/containers/gallery/anchors";

export type GalleryFilterValue = "all" | GalleryCategory;

export interface GalleryFilterOption {
  value: GalleryFilterValue;
  label: string;
  count: number;
}

const plural = (count: number) => `${count} photograph${count === 1 ? "" : "s"}`;

/**
 * The photo wall's filter state and its derived, filtered list — the gallery
 * twin of `offers/hooks/useOfferFilter`. The lightbox navigates `shown`, so
 * "next" never escapes the category the guest chose. Empty categories are
 * dropped from `options`, so a chip can never lead to an empty wall.
 */
export function useGalleryFilter<T extends { category: GalleryCategory }>(items: T[]) {
  const [filter, setFilter] = useState<GalleryFilterValue>("all");

  const options = useMemo<GalleryFilterOption[]>(() => {
    const counts = GALLERY_CATEGORY_ORDER.map((category) => ({
      value: category,
      label: GALLERY_CATEGORY_LABEL[category],
      count: items.filter((item) => item.category === category).length,
    })).filter((option) => option.count > 0);
    return [{ value: "all", label: "All", count: items.length }, ...counts];
  }, [items]);

  const shown = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const statusText =
    filter === "all"
      ? `Showing all ${plural(shown.length)}.`
      : `Showing ${plural(shown.length)} in ${GALLERY_CATEGORY_LABEL[filter]}.`;

  return { filter, setFilter, options, shown, statusText };
}
