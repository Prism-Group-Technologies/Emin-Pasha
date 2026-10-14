import { describe, expect, it } from "vitest";

import { allImageSlots, allMediaSlots } from "@/content/mediaInventory";
import { photoAssignments, stretchedAssignments } from "@/content/photoAssignments";
import { photos } from "@/content/photography";

const allSlots = allMediaSlots;
const imageSlots = allImageSlots;

describe("photo assignments", () => {
  it("fills every image slot on the site", () => {
    const unfilled = imageSlots.filter((slot) => !slot.image).map((slot) => slot.id);
    expect(unfilled).toEqual([]);
  });

  it("has no assignment for a slot that does not exist", () => {
    const declared = new Set(allSlots.map((slot) => slot.id));
    const stale = Object.keys(photoAssignments).filter((id) => !declared.has(id));
    expect(stale).toEqual([]);
  });

  it("uses every photograph in the library at least once", () => {
    const used = new Set(Object.values(photoAssignments));
    const unused = Object.keys(photos).filter((key) => !used.has(key as keyof typeof photos));
    expect(unused).toEqual([]);
  });

  it("only marks real slots as awaiting photography", () => {
    const declared = new Set(allSlots.map((slot) => slot.id));
    const stale = [...stretchedAssignments].filter((id) => !declared.has(id));
    expect(stale).toEqual([]);
  });
});
