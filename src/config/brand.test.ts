import { describe, expect, it } from "vitest";

import lockupLight from "@/assets/images/logo-lockup-light.webp";
import lockup from "@/assets/images/logo-lockup.webp";
import { HEADER_HEIGHT, HEADER_HEIGHT_CONDENSED } from "@/components/organisms/Header/constants";
import { brandLockupSizes, brandLockupWidth } from "@/config/brand";

const RATIO = lockup.width / lockup.height;

describe("brand lock-up", () => {
  /**
   * The contract `BrandMark` is built on. It reserves **one** box and swaps
   * the file underneath it per variant, so if the two artworks ever stop
   * sharing an intrinsic ratio the `light` lock-up starts letterboxing inside
   * a box cut for the `dark` one — a silent regression that no type catches.
   *
   * `scripts/derive-logo.ts` makes this true by construction (both are
   * composited from one trimmed buffer). This asserts the construction held,
   * because the files are committed and could be replaced by hand.
   */
  it("ships both variants at one intrinsic ratio", () => {
    expect(lockupLight.width).toBe(lockup.width);
    expect(lockupLight.height).toBe(lockup.height);
  });

  /**
   * The artwork is a horizontal lock-up. If a future delivery is near-square
   * again — as the previous one was, at 0.80 — every width in this module
   * silently becomes a height far taller than the bar it sits in, and the
   * header blows out rather than failing.
   */
  it("ships artwork that is wider than it is tall", () => {
    expect(RATIO).toBeGreaterThan(2);
  });

  /**
   * The reason `brand.ts` pins a width rather than a height: the height is
   * whatever the artwork's ratio makes it, and nothing in the layout checks
   * that it still fits. Each state is asserted against the bar it renders in.
   */
  it.each([
    ["expanded xs", brandLockupWidth.expanded.xs, HEADER_HEIGHT.xs],
    ["expanded md", brandLockupWidth.expanded.md, HEADER_HEIGHT.md],
    ["condensed xs", brandLockupWidth.condensed.xs, HEADER_HEIGHT_CONDENSED.xs],
    ["condensed md", brandLockupWidth.condensed.md, HEADER_HEIGHT_CONDENSED.md],
  ])("clears the header bar when %s", (_state, width, bar) => {
    expect(Math.round(width / RATIO)).toBeLessThan(bar);
  });

  /**
   * `sizes` has to describe the largest box the element ever occupies. The
   * header mounts expanded and condenses on scroll, and Next picks one
   * candidate per element and never re-fetches upward — so a `sizes` written
   * against the condensed widths would leave the expanded lock-up soft.
   */
  it("declares sizes at the expanded widths, not the condensed ones", () => {
    expect(brandLockupSizes).toContain(`${brandLockupWidth.expanded.xs}px`);
    expect(brandLockupSizes).toContain(`${brandLockupWidth.expanded.md}px`);
  });
});
