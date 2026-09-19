import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { GalleryCategory } from "@/containers/gallery/anchors";
import { useGalleryFilter } from "@/containers/gallery/hooks/useGalleryFilter";

const ITEMS: { id: string; category: GalleryCategory }[] = [
  { id: "a", category: "rooms" },
  { id: "b", category: "dining" },
  { id: "c", category: "rooms" },
  { id: "d", category: "estate" },
];

describe("useGalleryFilter", () => {
  it("shows every photograph under the default filter", () => {
    const { result } = renderHook(() => useGalleryFilter(ITEMS));
    expect(result.current.filter).toBe("all");
    expect(result.current.shown).toHaveLength(4);
    expect(result.current.statusText).toBe("Showing all 4 photographs.");
  });

  it("offers only non-empty categories, in chip order, with counts", () => {
    const { result } = renderHook(() => useGalleryFilter(ITEMS));
    expect(result.current.options.map((option) => [option.value, option.count])).toEqual([
      ["all", 4],
      ["rooms", 2],
      ["dining", 1],
      ["estate", 1],
    ]);
  });

  it("narrows the list, preserving order, and announces the singular count", () => {
    const { result } = renderHook(() => useGalleryFilter(ITEMS));

    act(() => result.current.setFilter("rooms"));
    expect(result.current.shown.map((item) => item.id)).toEqual(["a", "c"]);

    act(() => result.current.setFilter("dining"));
    expect(result.current.statusText).toBe("Showing 1 photograph in Dining.");
  });
});
