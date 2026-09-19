/**
 * The assignment table is the one place where a mistake is invisible: a typo
 * in a slot id does not throw, it silently leaves that slot on the labelled
 * placeholder, and a photograph dropped from the table silently stops being
 * referenced while its bytes stay in the build.
 *
 * These three tests close both gaps by walking every media module on the site
 * and reconciling it against the table in both directions.
 */
import { describe, expect, it } from "vitest";

import { contactMedia } from "@/containers/contact/copy/media";
import { signatureDishAssets } from "@/containers/dining/copy/menus/assets";
import { kudaraAssets } from "@/containers/events/copy/kudaraMedia";
import { eventsAssets } from "@/containers/events/copy/media";
import { transferAssets } from "@/containers/experiences/transfer/copy/media";
import { faqAssets } from "@/containers/faq/copy/media";
import { placeholderPhotos } from "@/containers/gallery/media";
import { legalPromiseAsset } from "@/containers/legal/copy/media";
import { spacesAssets } from "@/containers/spaces/copy/media";
import { wellnessAssets } from "@/containers/wellness/copy/media";
import { poolAssets } from "@/containers/wellness/copy/poolMedia";
import { spaAssets } from "@/containers/wellness/copy/spaMedia";
import { assets } from "@/content/assets";
import { photoAssignments, stretchedAssignments } from "@/content/photoAssignments";
import { photos } from "@/content/photography";
import type { AssetRef } from "@/schemas/content/assetRef";

/** Every image slot the site declares, from all thirteen media modules. */
const allSlots: AssetRef[] = [
  ...assets,
  ...placeholderPhotos.map((photo) => photo.asset),
  ...spacesAssets,
  ...signatureDishAssets,
  ...eventsAssets,
  ...kudaraAssets,
  ...transferAssets,
  ...contactMedia,
  ...poolAssets,
  ...spaAssets,
  ...wellnessAssets,
  ...faqAssets,
  legalPromiseAsset,
];

const imageSlots = allSlots.filter((slot) => slot.kind === "image");

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
