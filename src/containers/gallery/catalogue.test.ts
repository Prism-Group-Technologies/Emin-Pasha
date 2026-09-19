import { describe, expect, it } from "vitest";

import { COLLECTION_SLUGS } from "@/containers/gallery/anchors";
import { galleryCollections, galleryImage, galleryItems } from "@/containers/gallery/catalogue";
import { collectionCopy } from "@/containers/gallery/copy/collections";
import { lensTiles } from "@/containers/gallery/copy/lens";
import { stories } from "@/containers/gallery/copy/stories";
import { routePaths } from "@/content/routes";

describe("gallery catalogue", () => {
  it("keeps COLLECTION_SLUGS, the copy layer and content/routes in step", () => {
    expect(collectionCopy.map((copy) => copy.slug)).toEqual([...COLLECTION_SLUGS]);
    for (const slug of COLLECTION_SLUGS) {
      expect(routePaths).toContain(`/gallery/${slug}`);
    }
  });

  it("resolves every collection photograph to a wall item", () => {
    for (const copy of collectionCopy) {
      const view = galleryCollections.find((collection) => collection.slug === copy.slug);
      expect(view?.items.map((item) => item.id)).toEqual(copy.assetIds);
      expect(copy.assetIds.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("resolves every story, lens and poster image", () => {
    const ids = [
      ...stories.map((story) => story.assetId),
      ...lensTiles.map((tile) => tile.assetId),
      "gallery-film-poster",
      "gallery-tour-poster",
    ];
    for (const id of ids) {
      expect(galleryImage(id), id).toBeDefined();
    }
  });

  it("has unique ids and a WhatsApp link naming each photograph", () => {
    const ids = galleryItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of galleryItems) {
      expect(item.whatsappHref).toContain(encodeURIComponent(item.title));
    }
  });

  it("keeps collection meta descriptions within 155 characters", () => {
    for (const copy of collectionCopy) {
      expect(copy.metaDescription.length, copy.slug).toBeLessThanOrEqual(155);
    }
  });
});
