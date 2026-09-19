"use client";

import { useMemo } from "react";

import { useActiveSection } from "@/containers/story/hooks/useActiveSection";

export interface TocItem {
  id: string;
  title: string;
}

/**
 * The legal table of contents' active entry. Reuses the story page's single
 * `IntersectionObserver` hook; the id list is memoised on the items so the
 * observer is not rebuilt on every render.
 */
export function useLegalToc(items: TocItem[]): string | null {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  return useActiveSection(ids);
}
