import { describe, expect, it } from "vitest";

import { headerData } from "@/components/organisms/Header/headerData";
import { assets } from "@/content/assets";
import { navPanelCopy } from "@/content/nav-copy";
import { navigation } from "@/content/navigation";

/**
 * The panel model is assembled server-side from three modules that are edited
 * independently — the nav tree, `nav-copy.ts` and `assets.ts`. These assertions
 * are the join: they fail when a section gains a child that nobody wrote copy
 * for, or when an `assetIds` entry points at an asset id that no longer exists.
 */
describe("headerData panels", () => {
  const sectionsWithChildren = navigation.filter((item) => item.children?.length);

  it("builds a panel for every section that has children", () => {
    for (const section of sectionsWithChildren) {
      expect(headerData.panels[section.href], `no panel for ${section.href}`).toBeDefined();
    }
  });

  it("builds no panel for a section without children", () => {
    const leaves = navigation.filter((item) => !item.children?.length);
    expect(leaves.length).toBeGreaterThan(0);
    for (const leaf of leaves) {
      expect(headerData.panels[leaf.href]).toBeUndefined();
    }
  });

  it("gives every desktop header entry with children a panel", () => {
    // This is the regression that made Spa & Wellness and Our Story desktop
    // dead-ends: both had children, neither had a panel.
    for (const item of headerData.headerNavigation) {
      if (item.children?.length) {
        expect(headerData.panels[item.href], `no desktop panel for ${item.href}`).toBeDefined();
      }
    }
  });

  it("keeps one panel link per nav child, in nav order", () => {
    for (const section of sectionsWithChildren) {
      const panel = headerData.panels[section.href];
      expect(panel?.links.map((link) => link.href)).toEqual(
        section.children?.map((child) => child.href),
      );
    }
  });

  it("resolves every asset id `nav-copy.ts` names", () => {
    const assetIds = new Set(assets.map((asset) => asset.id));
    for (const [section, copy] of Object.entries(navPanelCopy)) {
      for (const [href, assetId] of Object.entries(copy.assetIds)) {
        // A card with no asset at all is fine — photography is still being
        // delivered. A *dangling* id is not: it means `nav-copy.ts` names an
        // asset `assets.ts` no longer has, and the card silently loses its
        // image with nothing failing.
        expect(assetIds.has(assetId), `${section} → ${href} → "${assetId}"`).toBe(true);
      }
    }
  });

  it("addresses every copy entry to a href that exists in the nav tree", () => {
    for (const [section, copy] of Object.entries(navPanelCopy)) {
      const children = navigation.find((item) => item.href === section)?.children ?? [];
      const childHrefs = new Set(children.map((child) => child.href));
      expect(childHrefs.size, `no nav section at ${section}`).toBeGreaterThan(0);

      for (const href of Object.keys(copy.descriptions)) {
        // Catches a slug renamed in `navigation.ts` while its copy was left
        // behind — the description would just stop appearing, invisibly.
        expect(childHrefs.has(href), `${section} copy names unknown href ${href}`).toBe(true);
      }
    }
  });

  it("always has a view-all label, even with no copy written", () => {
    for (const panel of Object.values(headerData.panels)) {
      expect(panel.viewAllLabel.length).toBeGreaterThan(0);
      expect(panel.eyebrow.length).toBeGreaterThan(0);
    }
  });
});
