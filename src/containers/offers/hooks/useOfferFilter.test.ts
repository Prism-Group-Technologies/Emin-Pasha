import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { OfferCategory } from "@/containers/offers/anchors";
import { useOfferFilter } from "@/containers/offers/hooks/useOfferFilter";

const CATEGORIES: OfferCategory[] = ["stay", "stay", "dining", "dining", "dining", "seasonal"];

describe("useOfferFilter", () => {
  it("shows every offer under the default 'all' filter", () => {
    const { result } = renderHook(() => useOfferFilter(CATEGORIES));
    expect(result.current.filter).toBe("all");
    expect(result.current.visible.every(Boolean)).toBe(true);
    expect(result.current.statusText).toBe("Showing all 6 offers.");
  });

  it("offers only non-empty categories, in chip order, with counts", () => {
    const { result } = renderHook(() => useOfferFilter(CATEGORIES));
    expect(result.current.options.map((option) => [option.value, option.count])).toEqual([
      ["all", 6],
      ["stay", 2],
      ["dining", 3],
      ["seasonal", 1],
    ]);
  });

  it("narrows to one category and announces the singular count", () => {
    const { result } = renderHook(() => useOfferFilter(CATEGORIES));

    act(() => result.current.setFilter("seasonal"));

    expect(result.current.visible).toEqual([false, false, false, false, false, true]);
    expect(result.current.statusText).toBe("Showing 1 offer in Seasonal.");
  });
});
