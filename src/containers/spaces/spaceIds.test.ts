import { describe, expect, it } from "vitest";

import { SPACE_IDS } from "@/containers/spaces/anchors";
import { spaceProfiles } from "@/containers/spaces/copy/profiles";
import { spaces } from "@/content/spaces";

describe("space ids", () => {
  it("mirror the approved content layer, in order", () => {
    expect([...SPACE_IDS]).toEqual(spaces.map((space) => space.id));
  });

  it("have exactly one invented profile each", () => {
    expect(spaceProfiles.map((profile) => profile.id)).toEqual([...SPACE_IDS]);
  });
});
