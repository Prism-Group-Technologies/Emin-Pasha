import type { SxProps, Theme } from "@mui/material/styles";

import { easingTokens, motionTokens } from "@/theme/tokens";

export type NavCardOrientation = "vertical" | "horizontal";

/** Fixed thumbnail edge for the horizontal (drawer row) form. */
export const THUMB_WIDTH_HORIZONTAL = 88;

/**
 * Every branching style decision the card makes, pulled out of the components
 * themselves. Two reasons, and neither is tidiness for its own sake: the card
 * renders in two orientations and three interaction states, so inline
 * ternaries pushed the component past the repo's complexity ceiling; and the
 * link, media and body pieces have to agree about the same hover, which is far
 * easier to keep true when the selectors live in one object.
 */
export function navCardRootSx(orientation: NavCardOrientation): SxProps<Theme> {
  const horizontal = orientation === "horizontal";

  return {
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    alignItems: horizontal ? "center" : "stretch",
    gap: horizontal ? 3 : 2,
    py: horizontal ? 2 : 0,
    minHeight: 44,
    textDecoration: "none",
    color: "inherit",
    borderRadius: 1,
    // The card is the single hover target, so every child animation keys off
    // these selectors rather than each element owning its own listener.
    "&:hover .NavCard-media, &:focus-visible .NavCard-media": { transform: "scale(1.04)" },
    "&:hover .NavCard-label, &:focus-visible .NavCard-label": { color: "primary.main" },
    "&:hover .NavCard-arrow, &:focus-visible .NavCard-arrow": {
      opacity: 1,
      transform: "translateX(2px)",
    },
    "&:focus-visible": {
      outline: "2px solid",
      outlineColor: "primary.main",
      outlineOffset: 4,
    },
    "@media (prefers-reduced-motion: reduce)": {
      "&:hover .NavCard-media, &:focus-visible .NavCard-media": { transform: "none" },
      "&:hover .NavCard-arrow, &:focus-visible .NavCard-arrow": { transform: "none" },
    },
  };
}

/**
 * The media frame. It is painted whether or not an asset exists or has been
 * revealed yet, so a mixed grid never goes ragged and revealing an image later
 * moves nothing (CLAUDE.md §8, CLS ≤ 0.05).
 */
export function navCardMediaSx(orientation: NavCardOrientation, active: boolean): SxProps<Theme> {
  const horizontal = orientation === "horizontal";

  return {
    position: "relative",
    overflow: "hidden",
    borderRadius: 1,
    flexShrink: 0,
    bgcolor: "action.hover",
    width: horizontal ? THUMB_WIDTH_HORIZONTAL : "100%",
    aspectRatio: horizontal ? "1 / 1" : "4 / 3",
    ...(active && { outline: "1px solid", outlineColor: "primary.main" }),
  };
}

export const navCardMediaInnerSx: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  transition: `transform ${motionTokens.contentReveal}ms ${easingTokens.emin}`,
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
};

export const navCardArrowSx: SxProps<Theme> = {
  fontSize: "0.875rem",
  color: "primary.main",
  opacity: 0,
  transition: [
    `opacity ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
    `transform ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
  ].join(", "),
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
};
