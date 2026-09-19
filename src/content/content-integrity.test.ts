import { describe, expect, it } from "vitest";

import * as allContent from "@/content/assets";
import { contactChannels } from "@/content/contact";
import { identity } from "@/content/identity";
import { offers } from "@/content/offers";
import { rooms } from "@/content/rooms";
import { testimonials } from "@/content/testimonials";
import { hotelJsonLd, organizationJsonLd } from "@/lib/seo/organisation";

/**
 * The Step 4 forbidden-content rules and the Step 15 NAP rules, as assertions.
 *
 * `yarn check:content` and `yarn check:seo` already enforce these in CI; this
 * suite exists so a regression fails the *test* run too, and so the rules are
 * documented where a developer will actually read them.
 */
const everyExportedString = (module: Record<string, unknown>): string[] => {
  const found: string[] = [];
  const walk = (value: unknown) => {
    if (typeof value === "string") found.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  };
  walk(module);
  return found;
};

describe("forbidden content (Step 4 rules)", () => {
  it("publishes no room rate in USD", () => {
    for (const room of rooms) {
      expect(JSON.stringify(room)).not.toMatch(/USD/);
      expect(Number.isInteger(room.rateUgx)).toBe(true);
    }
  });

  it("never ships the forbidden 'Nice Place' / Ina Aldrich testimonial", () => {
    const haystack = JSON.stringify(testimonials);
    for (const banned of ["Nice Place", "Ina Aldrich", "Castro", "monastery"]) {
      expect(haystack).not.toContain(banned);
    }
  });

  it("ships exactly the three approved testimonials", () => {
    expect(testimonials).toHaveLength(3);
  });

  it("never ships a legacy USD room category", () => {
    const haystack = JSON.stringify({ rooms, offers });
    // "Deluxe Suite" was a legacy USD 145 category (rooms.ts
    // LEGACY_ROOMS_DO_NOT_PUBLISH). Since the Garden -> Deluxe rename it is an
    // approved name on the UGX rate card, exactly as "Superior Suite" already
    // was, so the name alone is no longer the signal. What must never ship is
    // the legacy *pricing* — guarded by the UGX-integer assertion above and by
    // the "USD" entry in check-content.ts's FORBIDDEN_SUBSTRINGS.
    for (const banned of ["Two-bedroom Apartment", "Superior Suite USD"]) {
      expect(haystack).not.toContain(banned);
    }
  });

  it("never ships the corporate client roster", () => {
    const haystack = everyExportedString(allContent).join(" ");
    for (const banned of ["Next Media", "Timothy Rafi", "Unino Lavnos", "Greentree Wildlife"]) {
      expect(haystack).not.toContain(banned);
    }
  });

  it("never implies the building itself is colonial-era", () => {
    const haystack = everyExportedString(allContent).join(" ").toLowerCase();
    expect(haystack).not.toContain("colonial-era building");
  });
});

describe("NAP integrity (Step 15 rules)", () => {
  const hotel = hotelJsonLd();
  const org = organizationJsonLd();

  it("uses one address string everywhere", () => {
    expect(hotel.address.streetAddress).toBe(identity.address);
    expect(org.address.streetAddress).toBe(identity.address);
  });

  it("uses one phone number everywhere", () => {
    expect(hotel.telephone).toBe(identity.telephone);
    expect(org.telephone).toBe(identity.telephone);
    for (const channel of contactChannels) {
      if (channel.telephone) expect(channel.telephone).toBe(identity.telephone);
    }
  });

  it("uses one name everywhere", () => {
    expect(hotel.name).toBe(identity.name);
    expect(org.name).toBe(identity.name);
  });

  it("declares no AggregateRating until verified reviews exist", () => {
    expect(JSON.stringify(hotel)).not.toContain("aggregateRating");
    expect(JSON.stringify(hotel)).not.toContain("starRating");
  });

  it("quotes prices only in UGX", () => {
    expect(hotel.priceRange).toContain(identity.currency);
    for (const offer of hotel.makesOffer) {
      expect(offer.priceCurrency).toBe("UGX");
    }
  });
});
