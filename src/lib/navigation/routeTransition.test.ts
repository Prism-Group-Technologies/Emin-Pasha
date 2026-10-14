import { describe, expect, it } from "vitest";

import {
  type LinkActivation,
  isClientRouteChange,
  resolveScrollIntent,
} from "@/lib/navigation/routeTransition";

const HERE = "https://www.eminpasha.com/accommodation/deluxe-room";

function activation(overrides: Partial<LinkActivation> = {}): LinkActivation {
  return { href: "/dining", target: null, hasDownload: false, modified: false, ...overrides };
}

describe("resolveScrollIntent", () => {
  it("scrolls to the top on a forward move to a different route", () => {
    expect(resolveScrollIntent("/accommodation/deluxe-room", "/dining", "push")).toBe("top");
  });

  /**
   * The regression this module exists for. A room page's "Reserve This Room"
   * points at a *sibling* room's booking anchor; before this, the guest stayed
   * at y≈6900 and was shown the new page's identical "Other rooms" band.
   */
  it("scrolls to the top even when the destination carries a fragment", () => {
    expect(
      resolveScrollIntent("/accommodation/deluxe-room", "/accommodation/apartment-room", "push"),
    ).toBe("top");
  });

  it("leaves the viewport alone on the first commit, so shared deep links survive", () => {
    expect(resolveScrollIntent(null, "/accommodation/deluxe-room", "push")).toBe("none");
  });

  it("leaves the viewport alone on back and forward, so the router can restore it", () => {
    expect(resolveScrollIntent("/dining", "/accommodation/deluxe-room", "pop")).toBe("none");
  });

  it("leaves the viewport alone for an in-page anchor on the same route", () => {
    expect(
      resolveScrollIntent("/accommodation/deluxe-room", "/accommodation/deluxe-room", "push"),
    ).toBe("none");
  });
});

describe("isClientRouteChange", () => {
  it("accepts a relative link to another route", () => {
    expect(isClientRouteChange(activation(), HERE)).toBe(true);
  });

  it("accepts a cross-route link that carries a fragment", () => {
    expect(isClientRouteChange(activation({ href: "/accommodation#compare" }), HERE)).toBe(true);
  });

  it("rejects a fragment on the route already being read", () => {
    expect(isClientRouteChange(activation({ href: "#book" }), HERE)).toBe(false);
  });

  it("rejects the booking engine and any other origin", () => {
    expect(isClientRouteChange(activation({ href: "https://booking.example.com" }), HERE)).toBe(
      false,
    );
  });

  it("rejects tel: and mailto: hand-offs", () => {
    expect(isClientRouteChange(activation({ href: "tel:+256200900000" }), HERE)).toBe(false);
    expect(isClientRouteChange(activation({ href: "mailto:stay@example.com" }), HERE)).toBe(false);
  });

  it("rejects a link that opens a new tab", () => {
    expect(isClientRouteChange(activation({ target: "_blank" }), HERE)).toBe(false);
  });

  it("rejects a modifier-click, which opens a new tab too", () => {
    expect(isClientRouteChange(activation({ modified: true }), HERE)).toBe(false);
  });

  it("rejects a download", () => {
    expect(isClientRouteChange(activation({ hasDownload: true }), HERE)).toBe(false);
  });

  it("rejects an anchor with no href at all", () => {
    expect(isClientRouteChange(activation({ href: null }), HERE)).toBe(false);
  });

  it("rejects an unparseable href rather than throwing", () => {
    expect(isClientRouteChange(activation({ href: "http://[::1" }), HERE)).toBe(false);
  });
});
