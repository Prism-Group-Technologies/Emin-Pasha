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
      // White (ink.contrastCopy #FBFAF7) label on the gold fill. White fails AA
      // on gold.500 (2.2:1), so the contained-primary fill drops to gold.800
      // (6.6:1) with gold.900 on hover (10.2:1) — see the note in tokens.ts.
      // The `contained` boxShadow-on-hover above still applies: Emotion merges
      // the two `&:hover` blocks. `containedSecondary` already puts sand.50 on
      // garden.500 (6.9:1) through the palette, so it needs nothing here.
      containedPrimary: {
        backgroundColor: colorTokens.gold[800],
        color: colorTokens.ink.contrastCopy,
        "&:hover": { backgroundColor: colorTokens.gold[900] },
      },
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
    // Default Link `color` is 'primary' (gold) in stock MUI — that fails AA on
    // light surfaces (DESIGN_DIRECTION.md §B.2). Force text-primary instead;
    // gold is reserved for fills/icons/dark-surface text, never inline link text.
    defaultProps: { underline: "hover", color: "textPrimary" },
  },
};
