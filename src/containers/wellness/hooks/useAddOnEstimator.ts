"use client";

import { useMemo, useState } from "react";

import type { SpaEnhancement } from "@/containers/wellness/copy/enhancements";
import { formatUgx } from "@/utils/currency";

export interface AddOnEstimatorResult {
  /** Selected enhancement ids, in `enhancements` order. */
  selected: string[];
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
  count: number;
  /** Running indicative total of the selected add-ons, in UGX. */
  total: number;
  /** `total` formatted the way the site writes money, e.g. "UGX 130,000". */
  totalLabel: string;
  /** One line a guest can read out to the wellness desk. */
  summary: string;
}

const EMPTY_SUMMARY = "No add-ons shortlisted yet — tap the ones you want.";

/**
 * The add-on menu's only interactive state: which enhancements a guest has
 * shortlisted, and the derived indicative total and desk-ready summary line.
 *
 * Kept out of the section organism — like `useTreatmentFilter` — so the menu
 * stays a thin layout component and the selection/total rule lives in one
 * testable place. Holds only a set of ids; the rows stay presentational.
 */
export function useAddOnEstimator(enhancements: SpaEnhancement[]): AddOnEstimatorResult {
  const [ids, setIds] = useState<ReadonlySet<string>>(() => new Set());

  return useMemo(() => {
    const chosen = enhancements.filter((item) => ids.has(item.id));
    const total = chosen.reduce((sum, item) => sum + item.priceUgx, 0);
    const totalLabel = formatUgx(total);
    const summary = chosen.length
      ? `${chosen.map((item) => item.name).join(", ")} — around ${totalLabel} on top, indicative.`
      : EMPTY_SUMMARY;

    return {
      selected: chosen.map((item) => item.id),
      isSelected: (id: string) => ids.has(id),
      toggle: (id: string) =>
        setIds((current) => {
          const next = new Set(current);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        }),
      clear: () => setIds(new Set()),
      count: chosen.length,
      total,
      totalLabel,
      summary,
    };
  }, [enhancements, ids]);
}
