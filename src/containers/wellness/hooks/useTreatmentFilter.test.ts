import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTreatmentFilter } from "@/containers/wellness/hooks/useTreatmentFilter";

const FACILITIES = ["spa", "spa", "spa", "gym", "gym", "pool"] as const;

describe("useTreatmentFilter", () => {
  it("shows every treatment under the default 'all' filter", () => {
    const { result } = renderHook(() => useTreatmentFilter([...FACILITIES]));
    expect(result.current.filter).toBe("all");
    expect(result.current.visible).toEqual([true, true, true, true, true, true]);
    expect(result.current.visibleCount).toBe(6);
    expect(result.current.statusText).toContain("all 6");
  });

  it("narrows to a single facility and counts the matches", () => {
    const { result } = renderHook(() => useTreatmentFilter([...FACILITIES]));

    act(() => result.current.setFilter("gym"));

    expect(result.current.visible).toEqual([false, false, false, true, true, false]);
    expect(result.current.visibleCount).toBe(2);
    expect(result.current.statusText).toBe("Showing 2 gym sessions.");
  });

  it("handles the pool facility", () => {
    const { result } = renderHook(() => useTreatmentFilter([...FACILITIES]));

    act(() => result.current.setFilter("pool"));

    expect(result.current.visible).toEqual([false, false, false, false, false, true]);
    expect(result.current.statusText).toBe("Showing 1 pool sessions.");
  });
});
