import { describe, expect, it } from "vitest";

import { namedAfterEntries, storyChapters } from "@/containers/story/catalogue";
import { namedAfter } from "@/containers/story/copy/namedAfter";

/**
 * The two Our Story cross-link bands resolve everything they render by href.
 * That is what keeps a renamed route from going stale in two more places
 * (CLAUDE.md §5.4) — and it is also what makes them fail silently when a route
 * moves, since a missing lookup renders a card with no label rather than
 * throwing. These assertions are the alarm.
 */
describe("namedAfterEntries", () => {
  it("resolves a photograph for every named space", () => {
    expect(namedAfterEntries).toHaveLength(namedAfter.length);
    for (const entry of namedAfterEntries) {
      expect(entry.asset, `${entry.id} → "${entry.assetId}"`).toBeDefined();
    }
  });

  it("resolves the owning section from navigation, through a deep link", () => {
    const byId = new Map(namedAfterEntries.map((entry) => [entry.id, entry]));

    // A child route…
    expect(byId.get("equatoria")?.section).toBe("Dining");
    // …and two hash links into the same top-level section.
    expect(byId.get("mehmed-pasha-lounge")?.section).toBe("Lounges & Spaces");
    expect(byId.get("equatorial-gardens")?.section).toBe("Lounges & Spaces");
  });
});

describe("storyChapters", () => {
  it("returns all three chapters, labelled and numbered in reading order", () => {
    const chapters = storyChapters();

    expect(chapters.map((chapter) => chapter.ordinal)).toEqual(["01", "02", "03"]);
    for (const chapter of chapters) {
      expect(chapter.label, chapter.href).toBeTruthy();
      expect(chapter.blurb, chapter.href).toBeTruthy();
    }
  });

  it("drops the excluded chapter but keeps the others' original numbers", () => {
    const chapters = storyChapters("/our-story/the-hotel");

    expect(chapters.map((chapter) => chapter.href)).toEqual([
      "/our-story/emin-pasha",
      "/our-story/message-from-the-general-manager",
    ]);
    expect(chapters.map((chapter) => chapter.ordinal)).toEqual(["01", "03"]);
  });

  it("ignores an href that is not a chapter", () => {
    expect(storyChapters("/our-story")).toHaveLength(3);
  });
});
