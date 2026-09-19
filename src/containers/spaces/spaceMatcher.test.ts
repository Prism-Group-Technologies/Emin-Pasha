import { describe, expect, it } from "vitest";

import { matcherOccasions } from "@/containers/spaces/copy/matcher";
import { matcherTimes } from "@/containers/spaces/copy/matcherTimes";
import { spaceProfiles } from "@/containers/spaces/copy/profiles";
import { rankSpaces } from "@/containers/spaces/spaceMatcher";

const options = { spaces: spaceProfiles, occasions: matcherOccasions, times: matcherTimes };

describe("rankSpaces", () => {
  it("puts the Acropole Lounge first for late after-work drinks for two", () => {
    const [top] = rankSpaces({ occasionId: "after-work", timeId: "late", guests: 2 }, options);
    expect(top?.spaceId).toBe("acropole-lounge");
    expect(top?.fits).toBe(true);
  });

  it("puts the Mehmed Pasha Lounge first for quiet morning work", () => {
    const [top] = rankSpaces({ occasionId: "quiet-work", timeId: "morning", guests: 1 }, options);
    expect(top?.spaceId).toBe("mehmed-pasha-lounge");
  });

  it("puts the gardens first for a large evening celebration", () => {
    const [top] = rankSpaces(
      { occasionId: "celebration", timeId: "evening", guests: 150 },
      options,
    );
    expect(top?.spaceId).toBe("equatorial-gardens");
  });

  it("sinks spaces the party cannot fit, with a 0% match and a reason", () => {
    const ranked = rankSpaces({ occasionId: "reception", timeId: "evening", guests: 200 }, options);
    const lounges = ranked.filter((match) => match.spaceId !== "equatorial-gardens");
    expect(ranked[0]?.spaceId).toBe("equatorial-gardens");
    for (const match of lounges) {
      expect(match.fits).toBe(false);
      expect(match.percent).toBe(0);
      expect(match.reasons.at(-1)).toMatch(/^Too small/);
    }
  });

  it("scores a perfect fit at 100%", () => {
    const [top] = rankSpaces({ occasionId: "after-work", timeId: "evening", guests: 4 }, options);
    expect(top).toMatchObject({ spaceId: "acropole-lounge", percent: 100 });
  });

  it("clamps a nonsensical party size to one guest", () => {
    const ranked = rankSpaces({ occasionId: "date-night", timeId: "evening", guests: -3 }, options);
    expect(ranked.every((match) => match.fits)).toBe(true);
    expect(ranked[0]?.reasons.at(-1)).toBe("Seats 1 guest comfortably.");
  });

  it("still returns every space in a stable order for unknown choices", () => {
    const ranked = rankSpaces({ occasionId: "nope", timeId: "nope", guests: 2 }, options);
    expect(ranked.map((match) => match.spaceId)).toEqual(spaceProfiles.map((space) => space.id));
  });

  it("gives every occasion a reason for every space", () => {
    for (const occasion of matcherOccasions) {
      for (const space of spaceProfiles) {
        expect(occasion.fit[space.id].reason.length).toBeGreaterThan(0);
      }
    }
  });
});
