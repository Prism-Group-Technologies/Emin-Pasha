import { describe, expect, it } from "vitest";

import favicon from "@/assets/images/favicon/favicon.ico";
import { appIcons, faviconSrc, manifestIcons } from "@/config/icons";

describe("appIcons", () => {
  it("serves the favicon from the src/assets/images master", () => {
    expect(faviconSrc).toBe(favicon.src);
    expect(appIcons.icon[0]).toMatchObject({ url: favicon.src, type: "image/x-icon" });
  });

  /**
   * The guard that earns this file. next@16's `resolve-metadata` only folds
   * the `app/icon.*` conventions in `if (!resolvedMetadata.icons)`, so once a
   * layout declares `icons` nothing else emits an icon `<link>` — and there is
   * no longer an `app/icon.png` or `app/apple-icon.png` to fall back on. Drop
   * an entry here and the tag simply vanishes from every page with nothing
   * failing, so the set is asserted rather than trusted.
   */
  it("declares the .ico plus both PNG tab sizes, sharpest first", () => {
    expect(appIcons.icon.map((icon) => icon.sizes)).toEqual(["any", "32x32", "16x16"]);
    expect(appIcons.icon.every((icon) => icon.url.startsWith("/_next/static/media/"))).toBe(true);
  });

  it("declares exactly one 180x180 apple-touch-icon", () => {
    expect(appIcons.apple).toHaveLength(1);
    expect(appIcons.apple[0]).toMatchObject({ sizes: "180x180", type: "image/png" });
  });
});

describe("manifestIcons", () => {
  it("offers the installable formats only — no platform installs from an ICO", () => {
    expect(manifestIcons.some((icon) => icon.src.endsWith(".ico"))).toBe(false);
    expect(manifestIcons.every((icon) => icon.type === "image/png")).toBe(true);
  });

  /**
   * Chrome's installability check looks for a 192 and a 512; 512 is also what
   * Android scales the splash screen from. Losing either downgrades the
   * install prompt silently.
   */
  it("carries the two sizes Chrome's install criteria require", () => {
    expect(manifestIcons.map((icon) => icon.sizes)).toEqual(
      expect.arrayContaining(["192x192", "512x512"]),
    );
  });
});
