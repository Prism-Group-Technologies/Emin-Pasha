import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useActiveId } from "@/containers/gallery/hooks/useActiveId";

const IDS = ["one", "two", "three"] as const;

describe("useActiveId", () => {
  it("selects the first id by default", () => {
    const { result } = renderHook(() => useActiveId(IDS));
    expect(result.current.active).toBe("one");
    expect(result.current.activeIndex).toBe(0);
  });

  it("honours an initial id and switches on select", () => {
    const { result } = renderHook(() => useActiveId(IDS, "two"));
    expect(result.current.activeIndex).toBe(1);

    act(() => result.current.select("three"));
    expect(result.current.active).toBe("three");
    expect(result.current.activeIndex).toBe(2);
  });

  it("ignores ids outside the list", () => {
    const { result } = renderHook(() => useActiveId<string>(["one", "two"]));
    act(() => result.current.select("nope"));
    expect(result.current.active).toBe("one");
  });
});
