import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { SpaEnhancement } from "@/containers/wellness/copy/enhancements";
import { useAddOnEstimator } from "@/containers/wellness/hooks/useAddOnEstimator";

const ENHANCEMENTS: SpaEnhancement[] = [
  { id: "a", name: "Scalp ritual", description: "", duration: "+15 min", priceUgx: 60000 },
  { id: "b", name: "Hot-stone back", description: "", duration: "+10 min", priceUgx: 70000 },
  { id: "c", name: "Lounge hour", description: "", duration: "+60 min", priceUgx: 45000 },
];

describe("useAddOnEstimator", () => {
  it("starts empty with a zero total and the prompt summary", () => {
    const { result } = renderHook(() => useAddOnEstimator(ENHANCEMENTS));

    expect(result.current.selected).toEqual([]);
    expect(result.current.count).toBe(0);
    expect(result.current.total).toBe(0);
    expect(result.current.totalLabel).toBe("UGX 0");
    expect(result.current.summary).toContain("No add-ons shortlisted");
  });

  it("adds the price of each toggled add-on to the running total", () => {
    const { result } = renderHook(() => useAddOnEstimator(ENHANCEMENTS));

    act(() => result.current.toggle("a"));
    act(() => result.current.toggle("c"));

    expect(result.current.selected).toEqual(["a", "c"]);
    expect(result.current.isSelected("a")).toBe(true);
    expect(result.current.isSelected("b")).toBe(false);
    expect(result.current.total).toBe(105000);
    expect(result.current.totalLabel).toBe("UGX 105,000");
    expect(result.current.summary).toBe(
      "Scalp ritual, Lounge hour — around UGX 105,000 on top, indicative.",
    );
  });

  it("toggles a selected add-on back off", () => {
    const { result } = renderHook(() => useAddOnEstimator(ENHANCEMENTS));

    act(() => result.current.toggle("b"));
    act(() => result.current.toggle("b"));

    expect(result.current.selected).toEqual([]);
    expect(result.current.total).toBe(0);
  });

  it("keeps `selected` in enhancements order regardless of toggle order", () => {
    const { result } = renderHook(() => useAddOnEstimator(ENHANCEMENTS));

    act(() => result.current.toggle("c"));
    act(() => result.current.toggle("a"));

    expect(result.current.selected).toEqual(["a", "c"]);
  });

  it("clears every selection", () => {
    const { result } = renderHook(() => useAddOnEstimator(ENHANCEMENTS));

    act(() => result.current.toggle("a"));
    act(() => result.current.toggle("b"));
    act(() => result.current.clear());

    expect(result.current.count).toBe(0);
    expect(result.current.selected).toEqual([]);
  });
});
