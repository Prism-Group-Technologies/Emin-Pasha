import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted via next/font/google, DESIGN_DIRECTION.md §B.3 (approved D02).
 * Fraunces requests the SOFT + opsz axes for the "soft-serif, high optical
 * size" display cut the brief calls for — see theme/typography.ts for where
 * those axis values are applied. Only the display face is preloaded
 * (CLAUDE.md §6.3: "preloading of the display face only") since it's the
 * one used in the hero/H1 LCP element; body text is not typically the LCP
 * candidate and preloading both would compete for the same critical-path
 * bandwidth budget (§8).
 */
export const displayFont = Fraunces({
  weight: "variable",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "opsz"],
  preload: true,
});

export const bodyFont = Instrument_Sans({
  weight: "variable",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  preload: false,
});

/**
 * Cartographic micro-face — the signature-element coordinate markers only
 * (DESIGN_DIRECTION.md §B.3/§B.6). Deliberately not preloaded: it's never on
 * the critical/LCP path.
 */
export const cartographicFont = JetBrains_Mono({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cartographic",
  preload: false,
});
