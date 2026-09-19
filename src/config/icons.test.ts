import { describe, expect, it } from "vitest";

import favicon from "@/assets/images/favicon.ico";
import { appIcons, faviconSrc, manifestIcons } from "@/config/icons";

describe("appIcons", () => {
  it("serves the favicon from the src/assets/images master", () => {
    expect(faviconSrc).toBe(favicon.src);
    expect(appIcons.icon[0]).toMatchObject({ url: favicon.src, type: "image/x-icon" });
  });

  /**
   * The guard that earns this file. next@16's `resolve-metadata` only folds
   * the `app/icon.*` conventions in `if (!resolvedMetadata.icons)`, so once a
   * layout declares `icons` these three must be listed here or their `<link>`
   * tags vanish from every page with nothing failing — the files stay in
   * `src/app/`, their routes keep returning 200, and only the head is wrong.
   */
  it("re-declares every icon the file conventions would otherwise emit", () => {
    expect(appIcons.icon.map((icon) => icon.url)).toEqual(
      expect.arrayContaining(["/icon.svg", "/icon.png"]),
    );
    expect(appIcons.apple.map((icon) => icon.url)).toEqual(["/apple-icon.png"]);
  });
});

describe("manifestIcons", () => {
  it("offers the installable formats only — no platform installs from an ICO", () => {
    expect(manifestIcons.map((icon) => icon.src)).toEqual([
      "/icon.svg",
      "/icon.png",
      "/apple-icon.png",
    ]);
    expect(manifestIcons.some((icon) => icon.src.endsWith(".ico"))).toBe(false);
  });
});
