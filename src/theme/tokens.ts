/**
 * Raw design tokens from docs/DESIGN_DIRECTION.md §B.1–B.4 (approved D01–D03).
 * Framework-agnostic — no MUI/React imports here. palette.ts / typography.ts
 * map these onto MUI's theme shape.
 */
export const colorTokens = {
  // gold.700 (#8A731A) is NOT safe as inline text on sand.50 — verified 4.42:1,
  // fails AA for normal text (DESIGN_DIRECTION.md originally claimed 6.1:1;
  // corrected after /styleguide's live contrast check caught the error, see
  // DECISIONS.md D16). Use gold.800 for inline gold text on light surfaces;
  // gold.700 is fine only for icons/borders/large text (>=3:1 needed).
  gold: { 500: "#C4A832", 300: "#D4BC5E", 700: "#8A731A", 800: "#6B5813" },
  // `contrastCopy`/`contrastMuted` are the two text values used on the dark
  // band (see templates/sectionShellStyles.ts). They are fixed rather than
  // scheme-dependent because the band itself is fixed — 17.9:1 and 8.4:1
  // against ink/900, both comfortably past AA.
  ink: {
    900: "#0B0B0A",
    800: "#121211",
    600: "#2A2823",
    contrastCopy: "#FBFAF7",
    contrastMuted: "#B9B2A2",
  },
  sand: { 50: "#FBFAF7", 100: "#F2EFE8", 200: "#E4DFD3", 400: "#B9B2A2", 800: "#3A362E" },
  garden: { 700: "#22402F", 500: "#34614A", 200: "#A9C2B2" },
  support: {
    success: { light: "#2E7D5B", dark: "#6FBE99" },
    warning: { light: "#B8860B", lightText: "#8C6408", dark: "#E0B84D" },
    error: { light: "#9B2C2C", dark: "#E08585" },
    info: { light: "#2F5D7C", dark: "#7FB0D1" },
  },
} as const;

/**
 * Third-party brand colours. **Not part of the estate palette** and
 * deliberately not in `colorTokens` — nothing here is scheme-dependent,
 * because a brand mark that changes colour between light and dark stops
 * being recognisable, which is the only reason to use the vendor's colour
 * instead of our own gold in the first place.
 *
 * `whatsapp.main` is WhatsApp's own #25D366. Measured against it, the white
 * glyph is **1.98:1** — below the 3:1 WCAG 1.4.11 asks of a graphical object,
 * and unfixable while the fill stays brand-true, since no glyph colour clears
 * 3:1 on this green except a dark one. Two mitigations, then the honest note:
 *
 *   - `ring` (#0E7A3C) outlines the control so its *boundary* is identifiable
 *     against both grounds — 5.2:1 on sand.50, 3.5:1 on ink.900 — which is
 *     the other half of what 1.4.11 requires, and the half that is fixable.
 *   - The button is never icon-only to assistive tech: it carries a full
 *     `aria-label`, so the glyph is decoration over a named control.
 *
 * If the 1.98:1 is judged unacceptable, swap `main` to WhatsApp's own dark
 * green **#128C7E** — white on it measures 4.13:1 and passes — and this is
 * the only line that changes.
 */
export const brandColorTokens = {
  whatsapp: { main: "#25D366", hover: "#1EBE5B", ring: "#0E7A3C", glyph: "#FFFFFF" },
} as const;

/** 4px base spacing scale, `space-1`…`space-11` in DESIGN_DIRECTION.md §B.4. */
export const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192] as const;

const SPACING_BASE_PX = 4;

/**
 * MUI's `theme.spacing()` is called with fractional multipliers all over the
 * ecosystem (`spacing={0.5}`, `p: 1.5`) — a plain array-indexed `spacing`
 * option throws on any non-integer factor (verified live: it logged "theme.spacing
 * array type cannot be combined with non integer values" in the browser
 * console during the /styleguide screenshot pass). A function keeps the
 * named `space-1`…`space-11` steps for integer factors in range and falls
 * back to `factor * 4px` for anything else, so it never throws.
 */
export function spacingFn(factor: number): number {
  if (Number.isInteger(factor) && factor >= 0 && factor <= spacingScale.length) {
    return factor === 0 ? 0 : (spacingScale[factor - 1] ?? factor * SPACING_BASE_PX);
  }
  return factor * SPACING_BASE_PX;
}

export const radiusTokens = { sm: 2, md: 4, lg: 8 } as const;

export const shadowTokens = {
  none: "none",
  hover: "0 12px 24px rgba(11,11,10,0.08)",
  modal: "0 24px 64px rgba(11,11,10,0.24)",
} as const;

/**
 * MUI's 25-level Material elevation array, disciplined down to our two real
 * shadow states (DESIGN_DIRECTION.md §B.4, approved D03): everything is
 * `none` except index 24, which Dialog/Popover/Menu use by default — that
 * one gets shadow-modal. Hover shadows are applied per-component via `sx`
 * in Step 5, not through this static elevation array.
 */
export const muiShadowLevels: readonly string[] = [
  ...Array<string>(24).fill(shadowTokens.none),
  shadowTokens.modal,
];

/** The one named easing curve used sitewide — DESIGN_DIRECTION.md §B.5. */
export const easingTokens = {
  emin: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

/** 1.25 modular scale from a 16px base, DESIGN_DIRECTION.md §B.3. */
export const typeScale = {
  displayHero: { desktop: 76, mobile: 39 },
  display1: { desktop: 49, mobile: 31 },
  display2: { desktop: 31, mobile: 25 },
  display3: { desktop: 25, mobile: 20 },
  bodyLg: { desktop: 20, mobile: 18 },
  body: { desktop: 16, mobile: 16 },
  bodySm: { desktop: 13, mobile: 13 },
  eyebrow: { desktop: 13, mobile: 12 },
  cartographic: { desktop: 12, mobile: 11 },
} as const;

/** CLAUDE.md §7 — MUI defaults, verified against installed createBreakpoints.js. */
export const breakpointTokens = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } as const;

/**
 * Mirrors MUI's own default z-index scale (verified against installed
 * styles/zIndex.js) so any custom layer references this single source
 * instead of a magic number, even though the values match the framework
 * default and theme.zIndex isn't overridden.
 */
export const zIndexTokens = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;

/** Named durations from DESIGN_DIRECTION.md §B.5, paired with easingTokens.emin. */
export const motionTokens = {
  linkUnderline: 200,
  buttonHover: 150,
  navFade: 300,
  contentReveal: 550,
  staggerStep: 80,
  kenBurns: 6000,
  reducedMotionMax: 150,
} as const;

/**
 * Scroll-driven reveal geometry — the distances, the stagger and the range
 * that `theme/motion.ts` compiles into `sx`, and that the single `emin-in`
 * keyframe in components.ts reads back out of custom properties.
 *
 * `slideDistance` is deliberately larger than `riseDistance`: a lateral move
 * reads as weaker than a vertical one at the same magnitude, because the eye
 * tracks a scrolling page vertically and a 20px sideways shift disappears into
 * that motion. It is applied only from `md` up — see `motion.ts`.
 *
 * `rangeStart`/`rangeEnd` are percentages of the **`cover`** phase, which runs
 * for the element's entire crossing of the viewport. They are not `entry`
 * percentages, and the difference is the whole reason the reveal lands where
 * it does — see the range note in `motion.ts`.
 *
 * `rangeEnd: 40` puts the settle point near the middle of the screen. Writing
 * the completion position out, for viewport `V` and element height `H`, the
 * element's top edge sits at `V − rangeEnd × (V + H)` when the animation
 * finishes:
 *
 *   H = 0.2·V (a section header)  → settles at 52% down the viewport
 *   H = 0.5·V (a copy column)     → settles at 40% down
 *   H = 1.0·V (a tall media band) → settles at 20% down
 *
 * Taller elements finish proportionally higher, which is what you want: a
 * band that fills the screen should not still be fading once it has.
 *
 * The stagger step is small (4) because it now offsets a `cover` percentage
 * rather than an `entry` one, and a point of `cover` is a much longer scroll
 * than a point of `entry`. Capped at index 5, the last sibling in a row
 * finishes at `cover 60%` — still comfortably before the element leaves.
 */
export const revealTokens = {
  riseDistance: 20,
  slideDistance: 40,
  mediaScale: 1.04,
  staggerStep: 4,
  maxStaggerIndex: 5,
  rangeStart: 0,
  rangeEnd: 40,
} as const;
