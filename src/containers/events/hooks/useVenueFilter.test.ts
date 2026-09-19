import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { EventTypeId } from "@/containers/events/anchors";
import { matchesVenueFilter, useVenueFilter } from "@/containers/events/hooks/useVenueFilter";

const SUITS: EventTypeId[][] = [
  ["conference", "launch", "wedding", "social"],
  ["meeting", "conference", "launch"],
  ["meeting"],
  ["wedding", "launch", "social"],
  ["wedding", "social", "launch"],
];

describe("matchesVenueFilter", () => {
  it("matches everything under 'all'", () => {
    expect(matchesVenueFilter(["meeting"], "all")).toBe(true);
  });

  it("matches only when the venue suits the chosen type", () => {
    expect(matchesVenueFilter(["meeting", "conference"], "conference")).toBe(true);
    expect(matchesVenueFilter(["meeting"], "wedding")).toBe(false);
  });
});

describe("useVenueFilter", () => {
  it("shows every venue under the default 'all' filter", () => {
    const { result } = renderHook(() => useVenueFilter(SUITS));
    expect(result.current.filter).toBe("all");
    expect(result.current.visible).toEqual([true, true, true, true, true]);
    expect(result.current.visibleCount).toBe(5);
    expect(result.current.statusText).toContain("all 5");
  });

  it("narrows to a single event type and counts the matches", () => {
    const { result } = renderHook(() => useVenueFilter(SUITS));

    act(() => result.current.setFilter("meeting"));

    expect(result.current.visible).toEqual([false, true, true, false, false]);
    expect(result.current.visibleCount).toBe(2);
    expect(result.current.statusText).toBe("Showing 2 meeting venues.");
  });

  it("narrows to weddings", () => {
    const { result } = renderHook(() => useVenueFilter(SUITS));

    act(() => result.current.setFilter("wedding"));

    expect(result.current.visible).toEqual([true, false, false, true, true]);
    expect(result.current.statusText).toBe("Showing 3 wedding venues.");
  });
});
