import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SCROLL_TO_TOP_THRESHOLD_VH, useScrollToTop } from "@/hooks/useScrollToTop";

const reducedMotion = vi.hoisted(() => ({ value: false }));
vi.mock("@/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => reducedMotion.value,
}));

const VIEWPORT = 800;
const THRESHOLD = VIEWPORT * SCROLL_TO_TOP_THRESHOLD_VH;
const TARGET_ID = "main-content";

let scrollTo: ReturnType<typeof vi.fn>;
let frames: FrameRequestCallback[];

/**
 * The hook reads scroll position inside a `requestAnimationFrame` callback,
 * so the tests have to drive the frame themselves.
 *
 * The stub **queues** rather than invoking inline. Running the callback
 * inline looks equivalent but is not: the hook stores the handle rAF returns
 * as its "a frame is already scheduled" flag, and an inline stub runs the
 * callback (which clears that flag) *before* the assignment that sets it —
 * so the flag stays set forever and every scroll event after the first is
 * silently dropped. Real browsers return the handle first, and queueing here
 * reproduces that ordering.
 */
beforeEach(() => {
  reducedMotion.value = false;
  window.scrollY = 0;
  window.innerHeight = VIEWPORT;
  scrollTo = vi.fn();
  frames = [];
  vi.stubGlobal("scrollTo", scrollTo);
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

/** Runs every frame the hook has queued, as the browser would on the next tick. */
const flushFrames = () => {
  for (const frame of frames.splice(0)) {
    frame(0);
  }
};

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

const scroll = (y: number) => {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
    flushFrames();
  });
};

const resize = (height: number) => {
  act(() => {
    window.innerHeight = height;
    window.dispatchEvent(new Event("resize"));
    flushFrames();
  });
};

const mountMain = () => {
  const main = document.createElement("main");
  main.id = TARGET_ID;
  main.tabIndex = -1;
  document.body.append(main);
  return main;
};

describe("useScrollToTop", () => {
  it("stays hidden until a full viewport has scrolled past", () => {
    const { result } = renderHook(() => useScrollToTop(TARGET_ID));
    expect(result.current.visible).toBe(false);

    scroll(THRESHOLD);
    expect(result.current.visible).toBe(false);

    scroll(THRESHOLD + 1);
    expect(result.current.visible).toBe(true);
  });

  it("hides again once the guest scrolls back up", () => {
    const { result } = renderHook(() => useScrollToTop(TARGET_ID));
    scroll(THRESHOLD + 1);
    expect(result.current.visible).toBe(true);

    scroll(0);
    expect(result.current.visible).toBe(false);
  });

  it("re-evaluates the threshold when the viewport is resized", () => {
    const { result } = renderHook(() => useScrollToTop(TARGET_ID));
    scroll(THRESHOLD + 1);
    expect(result.current.visible).toBe(true);

    // A taller viewport moves the threshold past the current scroll position.
    resize(VIEWPORT * 3);
    expect(result.current.visible).toBe(false);
  });

  it("scrolls smoothly and hands focus to the main landmark", () => {
    const main = mountMain();
    const { result } = renderHook(() => useScrollToTop(TARGET_ID));

    act(() => result.current.scrollToTop());

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    expect(document.activeElement).toBe(main);
  });

  it("jumps without animation under prefers-reduced-motion", () => {
    reducedMotion.value = true;
    const { result } = renderHook(() => useScrollToTop(TARGET_ID));

    act(() => result.current.scrollToTop());

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("still scrolls when the focus target is absent", () => {
    const { result } = renderHook(() => useScrollToTop(TARGET_ID));

    expect(() => act(() => result.current.scrollToTop())).not.toThrow();
    expect(scrollTo).toHaveBeenCalled();
  });

  it("tears down both listeners on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrollToTop(TARGET_ID));
    unmount();

    const events = remove.mock.calls.map(([event]) => event);
    expect(events).toContain("scroll");
    expect(events).toContain("resize");
    remove.mockRestore();
  });
});
