import { describe, expect, it } from "vitest";

import { BOOKING_ENGINE_PARAMS, BOOKING_ENGINE_URL } from "@/config/bookingEngine";
import { DEEP_LINK_PARAMS, buildDeepLink, ycsDeepLinkAdapter } from "@/lib/booking/ycsDeepLink";
import type { BookingSearch } from "@/schemas/booking";

/**
 * The reference URL the operator captured from the live LetsBook engine. Every
 * assertion here exists to catch one specific regression: a rename, a reorder
 * or a "helpful" extra parameter quietly changing what the engine receives.
 * If this file needs editing, the handoff contract changed — confirm against a
 * real engine URL before making the test agree with the code.
 */
const REFERENCE_URL =
  "https://letsbook.me/booking/theeminpashahotelspakampala" +
  "?checkin=2026-09-28&checkout=2026-09-29&adults=2&children=0";

const search: BookingSearch = {
  checkIn: "2026-09-28",
  checkOut: "2026-09-29",
  adults: 2,
  children: 0,
  rooms: 1,
};

describe("booking engine deep link", () => {
  it("reproduces the operator's reference URL exactly", () => {
    expect(buildDeepLink(BOOKING_ENGINE_URL, DEEP_LINK_PARAMS, search, {})).toBe(REFERENCE_URL);
  });

  it("sends children=0 rather than omitting it", () => {
    // `0` is falsy; an `if (value)` guard would drop it and let the engine
    // apply its own default, which may not be zero.
    const url = new URL(buildDeepLink(BOOKING_ENGINE_URL, DEEP_LINK_PARAMS, search, {}));
    expect(url.searchParams.get("children")).toBe("0");
  });

  it("omits fields the engine is not known to read", () => {
    const url = new URL(
      buildDeepLink(
        BOOKING_ENGINE_URL,
        DEEP_LINK_PARAMS,
        { ...search, rooms: 3, promoCode: "SUMMER", roomTypeId: "superior-room" },
        {},
      ),
    );
    // Unverified parameter names are never guessed — see config/bookingEngine.
    expect([...url.searchParams.keys()]).toEqual(["checkin", "checkout", "adults", "children"]);
  });

  it("forwards UTM parameters so attribution survives the handoff", () => {
    const url = new URL(
      buildDeepLink(BOOKING_ENGINE_URL, DEEP_LINK_PARAMS, search, {
        utm: { utm_source: "google", utm_campaign: "kampala boutique" },
      }),
    );
    expect(url.searchParams.get("utm_source")).toBe("google");
    expect(url.searchParams.get("utm_campaign")).toBe("kampala boutique");
  });

  it("percent-encodes values rather than interpolating them raw", () => {
    const url = buildDeepLink(
      BOOKING_ENGINE_URL,
      { ...DEEP_LINK_PARAMS, promoCode: "promo" },
      {
        ...search,
        promoCode: "STAY&SAVE 20%",
      },
      {},
    );
    expect(url).toContain("promo=STAY%26SAVE+20%25");
  });

  it("keeps the property slug and never rewrites the path", () => {
    const url = new URL(buildDeepLink(BOOKING_ENGINE_URL, DEEP_LINK_PARAMS, search, {}));
    expect(url.origin).toBe("https://letsbook.me");
    expect(url.pathname).toBe("/booking/theeminpashahotelspakampala");
  });
});

describe("ycsDeepLinkAdapter", () => {
  it("redirects when a booking URL is configured", async () => {
    const outcome = await ycsDeepLinkAdapter.submit(search, { bookingUrl: BOOKING_ENGINE_URL });
    expect(outcome).toEqual({ kind: "redirect", url: REFERENCE_URL });
  });

  it("falls back to the enquiry path with no booking URL", async () => {
    // CLAUDE.md §4 — the enquiry path stays reachable, whatever the engine does.
    const outcome = await ycsDeepLinkAdapter.submit(search, {});
    expect(outcome).toMatchObject({ kind: "enquiry", reason: "not-configured" });
  });

  it("uses the dates the guest chose, not today's", async () => {
    const outcome = await ycsDeepLinkAdapter.submit(
      { ...search, checkIn: "2027-01-10", checkOut: "2027-01-14", adults: 4, children: 2 },
      { bookingUrl: BOOKING_ENGINE_URL },
    );
    expect(outcome).toEqual({
      kind: "redirect",
      url:
        "https://letsbook.me/booking/theeminpashahotelspakampala" +
        "?checkin=2027-01-10&checkout=2027-01-14&adults=4&children=2",
    });
  });
});

describe("BOOKING_ENGINE_PARAMS", () => {
  it("names only the four parameters read off a real engine URL", () => {
    expect(Object.values(BOOKING_ENGINE_PARAMS)).toEqual([
      "checkin",
      "checkout",
      "adults",
      "children",
    ]);
  });
});
