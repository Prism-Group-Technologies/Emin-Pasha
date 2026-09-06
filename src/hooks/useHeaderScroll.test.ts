import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { HEADER_SCROLL_THRESHOLD, useHeaderScroll } from "@/hooks/useHeaderScroll";

const mockPathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => mockPathname.value }));

/** rAF is scheduled by the hook; run callbacks synchronously in tests. */
beforeEach(() => {
  mockPathname.value = "/";
  window.scrollY = 0;
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    cb(0);
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

const scrollTo = (y: number) => {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
  });
};

describe("useHeaderScroll", () => {
  it("starts transparent over a hero route and condenses past the threshold", () => {
    const { result } = renderHook(() => useHeaderScroll(["/"]));
    expect(result.current.overHero).toBe(true);
    expect(result.current.transparent).toBe(true);
    expect(result.current.condensed).toBe(false);

    scrollTo(HEADER_SCROLL_THRESHOLD + 1);
    expect(result.current.condensed).toBe(true);
    // Past the threshold the header is opaque even on a hero route.
    expect(result.current.transparent).toBe(false);
  });

  it("starts solid on every non-hero route", () => {
    mockPathname.value = "/dining";
    const { result } = renderHook(() => useHeaderScroll(["/"]));
    expect(result.current.overHero).toBe(false);
    expect(result.current.transparent).toBe(false);
  });

  it("does not condense below the threshold", () => {
    const { result } = renderHook(() => useHeaderScroll(["/"]));
    scrollTo(HEADER_SCROLL_THRESHOLD - 1);
    expect(result.current.condensed).toBe(false);
  });
});
