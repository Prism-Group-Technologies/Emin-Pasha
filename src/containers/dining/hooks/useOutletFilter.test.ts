import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useOutletFilter } from "@/containers/dining/hooks/useOutletFilter";

const TYPES = ["restaurant", "restaurant", "bar", "bar", "in-room"] as const;

describe("useOutletFilter", () => {
  it("shows every outlet under the default 'all' filter", () => {
    const { result } = renderHook(() => useOutletFilter([...TYPES]));
    expect(result.current.filter).toBe("all");
    expect(result.current.visible).toEqual([true, true, true, true, true]);
    expect(result.current.visibleCount).toBe(5);
    expect(result.current.statusText).toContain("all 5");
  });

  it("narrows to a single type and counts the matches", () => {
    const { result } = renderHook(() => useOutletFilter([...TYPES]));

    act(() => result.current.setFilter("bar"));

    expect(result.current.visible).toEqual([false, false, true, true, false]);
    expect(result.current.visibleCount).toBe(2);
    expect(result.current.statusText).toBe("Showing 2 bars.");
  });

  it("handles the in-room type", () => {
    const { result } = renderHook(() => useOutletFilter([...TYPES]));

    act(() => result.current.setFilter("in-room"));

    expect(result.current.visible).toEqual([false, false, false, false, true]);
    expect(result.current.statusText).toBe("Showing 1 in-room dining.");
  });
});
