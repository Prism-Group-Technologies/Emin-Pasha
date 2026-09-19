import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useLightbox } from "@/hooks/useLightbox";
import { swipeIntent } from "@/hooks/useSwipe";

describe("useLightbox", () => {
  it("opens at an index and wraps in both directions", () => {
    const { result } = renderHook(() => useLightbox(3));
    expect(result.current.open).toBe(false);

    act(() => result.current.openAt(2));
    act(() => result.current.next());
    expect(result.current.index).toBe(0);

    act(() => result.current.previous());
    expect(result.current.index).toBe(2);

    act(() => result.current.close());
    expect(result.current.index).toBeNull();
  });

  it("moves with arrow keys and jumps with Home / End while open", () => {
    const { result } = renderHook(() => useLightbox(4));
    act(() => result.current.openAt(1));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
    expect(result.current.index).toBe(2);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    });
    expect(result.current.index).toBe(3);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    });
    expect(result.current.index).toBe(0);
  });
});

describe("swipeIntent", () => {
  it("reads a leftward horizontal drag as next and rightward as previous", () => {
    expect(swipeIntent(-80, 10)).toBe("next");
    expect(swipeIntent(90, -5)).toBe("previous");
  });

  it("ignores short or mostly-vertical drags", () => {
    expect(swipeIntent(-20, 0)).toBeNull();
    expect(swipeIntent(-60, 120)).toBeNull();
  });
});
