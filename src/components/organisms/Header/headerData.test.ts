import { describe, expect, it } from "vitest";

import { NAV_CHEVRON_SIZE, NAV_METRICS } from "@/components/organisms/Header/constants";
import { headerData } from "@/components/organisms/Header/headerData";
import { assets } from "@/content/assets";
import { navPanelCopy } from "@/content/nav-copy";
import { navigation } from "@/content/navigation";
import { spacingFn } from "@/theme/tokens";

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

/**
 * The bar's horizontal budget, as an executable assertion.
 *
 * The desktop header is one nowrap row sharing a container only 1176px wide
 * at `NAV_BREAKPOINT`, and the failure mode when it overruns is not a wrap
 * or a scrollbar — it is the nav labels painting on top of the lock-up and
 * the utility row. That failure is invisible to every other test here, it
 * shows up only at certain window widths, and it is one `push()` in
 * `navigation.ts` away at all times. So the budget is asserted.
 *
 * Every width below is **measured**, not guessed: the live bar was rendered
 * in headless Chrome at the `lg` tokens and its parts read off the DOM. The
 * model reproduces the real 751px nav to within a pixel at the current six
 * entries, which is what makes its answer for a *seventh* worth anything.
 */
describe("desktop nav fits the header bar", () => {
  /** Measured content box of the `xl` container at a 1200px viewport. */
  const CONTAINER_PX = 1176;
  /** Measured, at the `lg` lock-up width and the `lg` utility row. */
  const LOCKUP_PX = 168;
  const UTILITY_PX = 177;
  /** Measured mean for 12px uppercase Inter at 0.08em over all six labels. */
  const PX_PER_CHAR = 8.64;
  /**
   * Held back rather than spent. The measurement above is one face on one
   * platform; the same labels are wider in the metric-compatible fallback a
   * visitor sees before Inter arrives, and wider again on a machine with
   * neither. A budget drawn to the last pixel would be correct in Chrome on
   * macOS and overlapping everywhere else.
   */
  const FALLBACK_RESERVE_PX = 48;

  /** The theme's own scale, so the test cannot drift from what it renders. */
  const px = (factor: number) => spacingFn(factor);

  const navWidth = () => {
    const { headerNavigation, panels } = headerData;
    const labels = headerNavigation.reduce((sum, item) => sum + item.label.length, 0);
    const disclosures = headerNavigation.filter((item) => panels[item.href]).length;
    return (
      labels * PX_PER_CHAR +
      disclosures * (NAV_CHEVRON_SIZE.width + px(NAV_METRICS.triggerGap.lg)) +
      Math.max(0, headerNavigation.length - 1) * px(NAV_METRICS.itemGap.lg)
    );
  };

  it("models the real bar closely enough for the budget to mean anything", () => {
    // The bar measures 751px in the browser at these tokens. If this drifts,
    // the assertion below has quietly stopped describing the thing it names.
    expect(navWidth()).toBeCloseTo(751, -1);
  });

  it("leaves the nav room beside the lock-up, the utility row and the gaps", () => {
    const available = CONTAINER_PX - LOCKUP_PX - UTILITY_PX - px(NAV_METRICS.toolbarGap.lg) * 2;

    // Fails on a seventh `HEADER_NAV_HREFS` entry, and on a materially longer
    // label for an existing one. Both are real changes to the header's
    // layout and both should be a decision rather than a surprise: make room
    // deliberately — drop an entry, shorten a label, or push `NAV_BREAKPOINT`
    // out — rather than raising the numbers here to match.
    expect(navWidth()).toBeLessThanOrEqual(available - FALLBACK_RESERVE_PX);
  });
});
