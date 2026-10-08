import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTreatmentFilter } from "@/containers/wellness/hooks/useTreatmentFilter";

/** Mirrors the real split in `copy/treatments.ts`: four spa, three pool. */
const FACILITIES = ["spa", "spa", "spa", "spa", "pool", "pool", "pool"] as const;

describe("useTreatmentFilter", () => {
  it("shows every treatment under the default 'all' filter", () => {
    const { result } = renderHook(() => useTreatmentFilter([...FACILITIES]));
    expect(result.current.filter).toBe("all");
    expect(result.current.visible).toEqual([true, true, true, true, true, true, true]);
    expect(result.current.visibleCount).toBe(7);
    expect(result.current.statusText).toContain("all 7");
  });

  it("narrows to the spa and counts the matches", () => {
    const { result } = renderHook(() => useTreatmentFilter([...FACILITIES]));

    act(() => result.current.setFilter("spa"));

    expect(result.current.visible).toEqual([true, true, true, true, false, false, false]);
    expect(result.current.visibleCount).toBe(4);
    expect(result.current.statusText).toBe("Showing 4 spa treatments.");
  });

  it("handles the pool facility", () => {
    const { result } = renderHook(() => useTreatmentFilter([...FACILITIES]));

    act(() => result.current.setFilter("pool"));

    expect(result.current.visible).toEqual([false, false, false, false, true, true, true]);
    expect(result.current.visibleCount).toBe(3);
    expect(result.current.statusText).toBe("Showing 3 pool sessions.");
  });
});
