import { afterEach, describe, expect, it, vi } from "vitest";

import { openHandoff } from "@/lib/booking/openHandoff";

const URL_UNDER_TEST =
  "https://letsbook.me/booking/theeminpashahotelspakampala?checkin=2026-09-28&checkout=2026-09-29";

/**
 * jsdom implements neither `window.open` nor navigation, so both are stubbed.
 *
 * The stub deliberately **models the spec rather than obliging the caller**:
 * a `noopener` feature string returns `null` even though the tab opened,
 * because that is what a real browser does and it is the entire reason this
 * module exists. A mock that returned the handle regardless of arguments
 * would pass against the very implementation these tests are here to prevent.
 */
function stubWindow({ blocked = false } = {}) {
  const opened = { opener: {} } as Window;
  const open = vi.fn((_url: string, _target?: string, features?: string): Window | null => {
    if (blocked) {
      return null;
    }
    return features?.includes("noopener") ? null : opened;
  });
  const assign = vi.fn();
  vi.stubGlobal("window", { ...globalThis.window, open, location: { assign } });
  return { open, assign, opened };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("openHandoff", () => {
  it("navigates exactly once when the new tab opens", () => {
    // The regression this file exists for: the guest got the engine in a new
    // tab *and* lost the page they were reading in the old one.
    const { open, assign } = stubWindow();

    expect(openHandoff(URL_UNDER_TEST)).toBe("new-tab");
    expect(open).toHaveBeenCalledTimes(1);
    expect(assign).not.toHaveBeenCalled();
  });

  it("omits the feature string, so the returned handle means something", () => {
    const { open } = stubWindow();

    openHandoff(URL_UNDER_TEST);

    // Adding a third argument containing `noopener` reintroduces the bug: the
    // return value stops distinguishing "blocked" from "worked".
    expect(open).toHaveBeenCalledWith(URL_UNDER_TEST, "_blank");
  });

  it("severs the opener so the engine cannot navigate the tab behind it", () => {
    const { opened } = stubWindow();

    openHandoff(URL_UNDER_TEST);

    expect(opened.opener).toBeNull();
  });

  it("falls back to the current tab when the browser blocks the new one", () => {
    const { assign } = stubWindow({ blocked: true });

    expect(openHandoff(URL_UNDER_TEST)).toBe("same-tab");
    expect(assign).toHaveBeenCalledWith(URL_UNDER_TEST);
  });

  it("keeps the tab when severing the opener is refused cross-origin", () => {
    const { assign, opened } = stubWindow();
    Object.defineProperty(opened, "opener", {
      get: () => ({}),
      set: () => {
        throw new Error("cross-origin setter refused");
      },
    });

    // Hardening failed; the booking is still open in front of the guest.
    expect(openHandoff(URL_UNDER_TEST)).toBe("new-tab");
    expect(assign).not.toHaveBeenCalled();
  });
});
