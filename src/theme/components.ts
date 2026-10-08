import type { Components, Theme } from "@mui/material/styles";

import { colorTokens, easingTokens, motionTokens, radiusTokens, shadowTokens } from "./tokens";

const hoverTransition = `background-color ${motionTokens.buttonHover}ms ${easingTokens.emin}, transform ${motionTokens.buttonHover}ms ${easingTokens.emin}`;

/**
 * DESIGN_DIRECTION.md §B.4/§B.5 (approved D01–D03). Every value here traces
 * to tokens.ts — no magic numbers or hex literals in this file.
 */
export const components: Components<Theme> = {
  MuiCssBaseline: {
    /**
     * The scroll-animation keyframes, defined once for the whole document.
     *
     * They live here rather than in each component's `sx` because Emotion
     * serialises a separate copy of any `@keyframes` written inline — with
     * roughly thirty revealed elements on the homepage alone that is thirty
     * identical rule blocks in the critical CSS. One global definition,
     * referenced by name, is a single block.
     *
     * Both animate `opacity` and `transform` only. Both of those are
     * composited properties, so a scroll-driven animation on them runs
     * entirely on the compositor thread and never triggers layout or paint —
     * which is the whole reason this approach costs nothing at runtime.
     *
     * `emin-in` is a *single* keyframe serving every reveal variant. It reads
     * its start offsets out of three custom properties that `theme/motion.ts`
     * sets per element, so "rise", "slide from the left", "settle from 104%"
     * and every combination of them are one rule block rather than one block
     * each. That is what makes the responsive collapse cheap: below `md` a
     * lateral reveal simply stops overriding `--emin-x`, and no second
     * animation has to exist for small screens.
     *
     * The custom properties are read, not interpolated — each keyframe
     * resolves them once to a concrete transform, and the browser then
     * interpolates between the two resulting matrices. They therefore need no
     * `@property` registration.
     *
     * `translate3d` rather than `translate`, so the element is promoted to its
     * own compositor layer for the duration of the animation instead of being
     * re-rastered on the main thread each frame.
     */
    styleOverrides: {
      "@keyframes emin-in": {
        from: {
          opacity: 0,
          transform:
            "translate3d(var(--emin-x, 0px), var(--emin-y, 0px), 0) scale(var(--emin-s, 1))",
        },
        to: { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      },
      "@keyframes emin-progress": {
        from: { transform: "scaleX(0)" },
        to: { transform: "scaleX(1)" },
      },
    },
  },
  MuiTypography: {
    // MUI's stock `variantMapping` renders subtitle1/subtitle2 as <h6>, which
    // turns every lede paragraph into a heading — caught by Lighthouse's
    // heading-order audit on the homepage. These three are body copy, so they
    // map to <p>; the h1–h6 variants keep their own mapping.
    defaultProps: {
      variantMapping: { subtitle1: "p", subtitle2: "p", body1: "p", body2: "p" },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: radiusTokens.md, transition: hoverTransition },
      contained: { "&:hover": { boxShadow: shadowTokens.hover } },
      /**
       * The contained buttons are the one place the brand hex cannot simply be
       * used as-is, and the two schemes fail it in opposite directions — so
       * each gets its own fill.
       *
       * **Light.** White on the brand copper is 3.69:1, under the 4.5:1 AA
       * floor, so the fill drops to `copper.700` (7.03:1), hover `copper.800`
       * (9.73:1). Same hue, lower value: it still reads as copper.
       *
       * **Dark.** Here the problem is the opposite one. A dark fill on a
       * near-black page satisfies its label easily but leaves the control with
       * no findable *edge* — `copper.700` is 2.73:1 against the ground, under
       * the 3:1 WCAG 1.4.11 floor. So the fill steps up, to the one stop that
       * satisfies the label and the boundary at the same time: white on
       * `copper.600` is 4.97:1, past AA, and `copper.600` is 3.86:1 against
       * `ink.900`, past 1.4.11. The label stays white in both schemes, which
       * is the point — the brand's button reads the same either way, and the
       * exact brand `copper.500` could not carry white (3.64:1).
       *
       * Dark hover is `copper.700` (white 7.03:1), darkening like the light
       * scheme rather than lightening. Its own 2.73:1 against the ground is
       * under 1.4.11, which is acceptable only for *hover*: the pointer is on
       * the control, so the fill is no longer what identifies it. The resting
       * state, which is the one 1.4.11 is about, passes.
       *
       * `containedSecondary` needs only its hover: the palette already supplies
       * a scheme-correct `secondary.main` + `contrastText` pair, but MUI's
       * default contained hover reaches for `secondary.dark`, which on the
       * dark scheme would move the fill *away* from the ground and undo the
       * boundary. Light hover is `maroon.900` (13.00:1); dark hover lightens
       * to `maroon.400` (7.13:1 under ink), matching the primary's direction.
       *
       * The `contained` boxShadow-on-hover above still applies throughout:
       * Emotion merges the two `&:hover` blocks.
       */
      containedPrimary: ({ theme }) => ({
        backgroundColor: colorTokens.copper[700],
        color: colorTokens.ink.contrastCopy,
        "&:hover": { backgroundColor: colorTokens.copper[800] },
        ...theme.applyStyles("dark", {
          backgroundColor: colorTokens.copper[600],
          "&:hover": { backgroundColor: colorTokens.copper[700] },
        }),
      }),
      containedSecondary: ({ theme }) => ({
        "&:hover": { backgroundColor: colorTokens.maroon[900] },
        ...theme.applyStyles("dark", {
          "&:hover": { backgroundColor: colorTokens.maroon[400] },
        }),
      }),
    },
  },
  MuiTextField: {
    defaultProps: { variant: "outlined", size: "medium" },
    styleOverrides: {
      root: { "& .MuiOutlinedInput-root": { borderRadius: radiusTokens.sm } },
    },
  },
  MuiPaper: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: { borderRadius: radiusTokens.md, backgroundImage: "none" },
    },
  },
  MuiAppBar: {
    defaultProps: { elevation: 0, color: "transparent" },
    styleOverrides: {
      root: {
        boxShadow: "none",
        transition: `background-color ${motionTokens.navFade}ms ${easingTokens.emin}`,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: { borderRadius: radiusTokens.lg, backgroundImage: "none" },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: { backgroundImage: "none" },
    },
  },
  MuiChip: {
    // Now a full pill. The original radius-sm cap was an anti-cliché guardrail
    // (D03); it was lifted with the warm-contemporary refresh, where pill tags
    // (room inclusions, package audiences) are the intended reading.
    styleOverrides: {
      root: { borderRadius: radiusTokens.pill },
    },
  },
  MuiLink: {
    // Default Link `color` is 'primary' in stock MUI, which here is the brand
    // copper — 3.64:1 on light surfaces, short of AA for normal text. Force
    // text-primary instead. Where a link should read as copper it uses
    // `copper.700` (7.03:1); the brand hex itself is reserved for fills, rules,
    // glyphs and large type, never inline link text.
    defaultProps: { underline: "hover", color: "textPrimary" },
  },
};
