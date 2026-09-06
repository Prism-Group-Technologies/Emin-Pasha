import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useMegaMenu } from "@/hooks/useMegaMenu";

const mockPathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => mockPathname.value }));

beforeEach(() => {
  mockPathname.value = "/";
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms));

describe("useMegaMenu", () => {
  it("does not open on hover until the intent delay has elapsed", () => {
    const { result } = renderHook(() => useMegaMenu());

    act(() => result.current.scheduleOpen("/dining"));
    // The whole point of hover intent: a pointer passing across the bar has
    // not opened anything yet.
    expect(result.current.openHref).toBeNull();

    advance(100);
    expect(result.current.openHref).toBe("/dining");
    expect(result.current.isOpen).toBe(true);
  });

  it("switches between sections immediately once a panel is already open", () => {
    const { result } = renderHook(() => useMegaMenu());

    act(() => result.current.scheduleOpen("/dining"));
    advance(100);

    // No delay this time — the visitor is inside the menu, so moving along the
    // bar should track the pointer rather than lag behind it.
    act(() => result.current.scheduleOpen("/accommodation"));
    expect(result.current.openHref).toBe("/accommodation");
  });

  it("cancels a pending close when the pointer reaches the panel", () => {
    const { result } = renderHook(() => useMegaMenu());

    act(() => result.current.toggle("/dining"));
    act(() => result.current.scheduleClose());
    act(() => result.current.cancelClose());

    advance(500);
    expect(result.current.openHref).toBe("/dining");
  });

  it("closes after the grace period when the pointer goes elsewhere", () => {
    const { result } = renderHook(() => useMegaMenu());

    act(() => result.current.toggle("/dining"));
    act(() => result.current.scheduleClose());

    advance(200);
    expect(result.current.openHref).toBeNull();
  });

  it("latches every opened section as revealed, and never un-reveals one", () => {
    const { result } = renderHook(() => useMegaMenu());

    // Nothing is revealed before the visitor touches the nav — this is what
    // keeps panel thumbnails out of the header of every route.
    expect(result.current.revealedHrefs.size).toBe(0);

    act(() => result.current.toggle("/dining"));
    expect(result.current.revealedHrefs.has("/dining")).toBe(true);

    act(() => result.current.close());
    expect(result.current.revealedHrefs.has("/dining")).toBe(true);
    expect(result.current.revealedHrefs.has("/accommodation")).toBe(false);
  });

  it("toggles the same section closed on a second activation", () => {
    const { result } = renderHook(() => useMegaMenu());

    act(() => result.current.toggle("/dining"));
    act(() => result.current.toggle("/dining"));
    expect(result.current.openHref).toBeNull();
  });
});
