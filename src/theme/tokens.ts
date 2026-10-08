/**
 * Design tokens. Framework-agnostic — no MUI/React imports here.
 * palette.ts / typography.ts map these onto MUI's theme shape.
 *
 * Colour lives in `./colorTokens` and is re-exported here so that
 * `@/theme/tokens` stays the single import site for every token family.
 */
export { colorTokens, brandColorTokens } from "./colorTokens";

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

/**
 * Corner radii. The original scale (2 / 4 / 8) came from DESIGN_DIRECTION.md
 * §D's anti-cliché guardrails; it was relaxed toward a warm-contemporary
 * hospitality look (rounded imagery and cards) in the D-series follow-up that
 * also added the soft shadow ramp below. `sm`/`md`/`lg` grew in place so no
 * call site needed changing; `xl` and `pill` are new. `pill` (999) is now the
 * chip radius — see `theme/components.ts`.
 */
export const radiusTokens = { sm: 6, md: 12, lg: 20, xl: 28, pill: 999 } as const;

/**
 * Soft elevation, added alongside the radius relaxation. The rgba is built on
 * `ink.600` (#312A24, a warm near-black) rather than pure black so the shadow
 * reads warm against the sand grounds. `xs`→`lg` is a four-step ramp for
 * resting/hover card states; `hover` is kept as an alias of `md` for the
 * existing `MuiButton` contained-hover override. `modal` is unchanged.
 *
 * These are consumed **explicitly** through `sx` and `cardSurface()` — the
 * `muiShadowLevels` array below is deliberately left flat so Menu / Popover /
 * Tooltip / Paper elevation is not silently changed sitewide.
 */
export const shadowTokens = {
  none: "none",
  xs: "0 1px 2px rgba(49,42,36,0.06)",
  sm: "0 4px 14px rgba(49,42,36,0.07)",
  md: "0 12px 32px rgba(49,42,36,0.09)",
  lg: "0 28px 64px rgba(49,42,36,0.13)",
  hover: "0 12px 32px rgba(49,42,36,0.09)",
  modal: "0 24px 64px rgba(8,5,3,0.24)",
} as const;

/**
 * MUI's 25-level Material elevation array, still disciplined down to two real
 * states: everything is `none` except index 24, which Dialog/Popover/Menu use
 * by default — that one gets shadow-modal. The soft `xs`→`lg` ramp above is
 * applied per-component via `sx` / `cardSurface`, never through this array, so
 * adding it did not change any surface that was not opted in by hand.
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
  /** Card lift / shadow transition on hover — see `cardSurface()`. */
  cardHover: 200,
  /** Image scale-up on hover inside `MediaFrame`. */
  imageZoom: 640,
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
