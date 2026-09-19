import { describe, expect, it } from "vitest";

import type { GalleryCategory } from "@/containers/gallery/anchors";
import { categoryForPage, interleaveByCategory, shapeFor } from "@/containers/gallery/galleryModel";

describe("categoryForPage", () => {
  it("maps manifest pages onto wall categories by prefix", () => {
    expect(categoryForPage("accommodation/deluxe-suites")).toBe("rooms");
    expect(categoryForPage("lounges/acropole-lounge")).toBe("spaces");
    expect(categoryForPage("spa/pool")).toBe("wellness");
    expect(categoryForPage("weddings")).toBe("events");
    expect(categoryForPage("our-story/the-hotel")).toBe("estate");
    expect(categoryForPage("story")).toBe("estate");
  });

  it("returns undefined for pages that are not on the wall", () => {
    expect(categoryForPage("offers")).toBeUndefined();
    expect(categoryForPage("contact")).toBeUndefined();
  });
});

describe("shapeFor", () => {
  it("classifies by intrinsic ratio", () => {
    expect(shapeFor(1600, 900)).toBe("wide");
    expect(shapeFor(1600, 1067)).toBe("landscape");
    expect(shapeFor(1000, 1000)).toBe("square");
    expect(shapeFor(1200, 1500)).toBe("portrait");
  });
});

describe("interleaveByCategory", () => {
  const item = (id: string, category: GalleryCategory) => ({ id, category });

  it("deals round-robin in category order and keeps order within a category", () => {
    const items = [
      item("r1", "rooms"),
      item("r2", "rooms"),
      item("r3", "rooms"),
      item("d1", "dining"),
      item("e1", "estate"),
      item("e2", "estate"),
    ];
    const result = interleaveByCategory(items, ["rooms", "dining", "estate"]);
    expect(result.map((entry) => entry.id)).toEqual(["r1", "d1", "e1", "r2", "e2", "r3"]);
  });

  it("returns an empty list for no items", () => {
    expect(interleaveByCategory([], ["rooms"])).toEqual([]);
  });
});
