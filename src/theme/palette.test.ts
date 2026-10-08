import { describe, expect, it } from "vitest";

import { colorTokens } from "@/theme/colorTokens";
import { contrastRatio } from "@/utils/contrast";

const { copper, gold, maroon, sand, ink, support } = colorTokens;

/** WCAG 2.2 floors: normal text, and the boundary of a UI control (1.4.11). */
const AA = 4.5;
const UI = 3;

/**
 * The brand hexes, at the step each one anchors. These are the contract: the
 * ramps around them are generated, but these four values are the brand itself
 * and a regeneration that moves one of them is a bug, not a retune.
 */
const BRAND: ReadonlyArray<[string, string, string]> = [
  ["primary copper", copper[500], "#BE6E29"],
  ["secondary maroon", maroon[800], "#6E2828"],
  ["neutral greige", sand[300], "#DCD2C9"],
  ["ornament gold", gold[300], "#D0AB42"],
];

/** Every pair the site actually ships, with the floor it has to clear. */
const SHIPPED: ReadonlyArray<[string, string, string, number]> = [
  // light scheme
  ["body text", ink[900], sand[50], AA],
  ["secondary text", sand[800], sand[50], AA],
  ["body on the greige band", ink[900], sand[300], AA],
  ["secondary text on the greige band", sand[800], sand[300], AA],
  ["primary button", ink.contrastCopy, copper[700], AA],
  ["primary button hover", ink.contrastCopy, copper[800], AA],
  ["primary button edge on the page", copper[700], sand[50], UI],
  ["inline copper link", copper[700], sand[50], AA],
  ["copper rule / glyph / large type", copper[500], sand[50], UI],
  ["secondary button", ink.contrastCopy, maroon[800], AA],
  ["secondary button hover", ink.contrastCopy, maroon[900], AA],
  ["icon chip — copper", copper[700], copper[50], AA],
  ["icon chip — gold", gold[700], gold[50], AA],
  ["icon chip — maroon", maroon[800], maroon[50], AA],
  ["gold pill under an ink label", ink[900], gold[300], AA],
  ["copper pill under white", ink.contrastCopy, copper[700], AA],
  ["maroon pill under white", ink.contrastCopy, maroon[800], AA],
  ["success text", support.success.light, sand[50], AA],
  ["warning text", support.warning.lightText, sand[50], AA],
  ["error text / icon / border", support.error.light, sand[50], AA],
  ["info text", support.info.light, sand[50], AA],
  // dark scheme
  ["dark body text", sand[50], ink[900], AA],
  ["dark secondary text", ink.contrastMuted, ink[900], AA],
  ["dark body on paper", sand[50], ink[800], AA],
  ["dark copper accent text", copper[300], ink[900], AA],
  ["dark gold accent text", gold[300], ink[900], AA],
  ["dark maroon accent text", maroon[300], ink[900], AA],
  ["dark primary button", ink.contrastCopy, copper[600], AA],
  ["dark primary button edge", copper[600], ink[900], UI],
  ["dark primary button hover", ink.contrastCopy, copper[700], AA],
  ["dark secondary button", ink[900], maroon[500], AA],
  ["dark secondary button edge", maroon[500], ink[900], UI],
  ["dark secondary button hover", ink[900], maroon[400], AA],
  ["dark success text", support.success.dark, ink[900], AA],
  ["dark warning text", support.warning.dark, ink[900], AA],
  ["dark error text", support.error.dark, ink[900], AA],
  ["dark info text", support.info.dark, ink[900], AA],
  // the fixed dark band, which follows neither scheme
  ["band copy, top stop", ink.contrastCopy, ink[900], AA],
  ["band copy, bottom stop", ink.contrastCopy, ink[800], AA],
  ["band muted copy, top stop", ink.contrastMuted, ink[900], AA],
  ["band muted copy, bottom stop", ink.contrastMuted, ink[800], AA],
  ["band gold eyebrow, top stop", gold[300], ink[900], AA],
  ["band gold eyebrow, bottom stop", gold[300], ink[800], AA],
  ["band copper eyebrow", copper[300], ink[900], AA],
  // the floating action button keeps one fill in both schemes, so its ring
  // has to clear the boundary floor against each ground on its own
  ["brand FAB fill", ink.contrastCopy, copper[700], AA],
  ["brand FAB ring on a light page", copper[500], sand[50], UI],
  ["brand FAB ring on a dark page", copper[500], ink[900], UI],
];

/**
 * Pairings the system deliberately does not ship. They are asserted as
 * failures so that promoting one to a real role breaks here rather than
 * shipping — the brand copper under white text is the constraint the whole
 * primary-button treatment exists to work around.
 */
const WITHHELD: ReadonlyArray<[string, string, string]> = [
  ["brand copper under white text", ink.contrastCopy, copper[500]],
  ["brand copper as inline body text", copper[500], sand[50]],
  ["brand gold as text on a light ground", gold[300], sand[50]],
  ["a light-scheme fill on the dark ground", copper[700], ink[900]],
];

describe("brand palette", () => {
  it.each(BRAND)("keeps the %s hex exact", (_label, actual, expected) => {
    expect(actual).toBe(expected);
  });

  it.each(SHIPPED)("%s clears its floor", (_label, fg, bg, floor) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(floor);
  });

  it.each(WITHHELD)("withholds %s", (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeLessThan(AA);
  });

  it("keeps semantic error distinct from the brand maroon", () => {
    // Both are reds. If they ever converge, an error stops reading as an
    // error and starts reading as estate maroon, which carries no warning.
    expect(contrastRatio(support.error.light, maroon[800])).toBeGreaterThan(1.5);
  });
});
