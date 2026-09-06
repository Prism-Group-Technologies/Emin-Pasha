import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

import { easingTokens, motionTokens } from "./tokens";

/**
 * The "quiet link" role — a secondary-coloured link that resolves to
 * text-primary on hover, used on every non-primary navigation surface
 * (footer columns, legal bar, NAP). It lives in the theme rather than beside
 * one of its callers because three different *elements* wear it: `Link`
 * (`next/link`), `ExternalLink` (`<a>`) and the consent reopener
 * (`<button>`). No single component could own it without the other two
 * restating it — which is what CLAUDE.md §5.4 calls a bug, and it was
 * verbatim in three files before this.
 *
 * Every colour is an `sx` palette path, never a token literal, so the light
 * and dark schemes both resolve through the theme's CSS variables. A
 * `theme => …` callback would read `theme.palette` eagerly and freeze the
 * default scheme's values into the class.
 *
 * ## The 44px question — the spacing this footer was losing
 *
 * A footer link is 13px text. Giving every one a 44px box (WCAG 2.5.5 AAA)
 * is right under a finger and wrong under a mouse: it turned a five-item
 * column into 240px of mostly empty space. `pointer: coarse` is the media
 * feature that separates the two, so the target grows only on the input
 * device that needs it. Fine pointers keep a 32px line box — still clear of
 * WCAG 2.5.8 AA's 24px minimum.
 *
 * `width: fit-content` with a 44px `min-width` keeps the hover region on the
 * words instead of spanning the whole column, while still guaranteeing
 * 44×44 on touch for a label as short as "Gym".
 */
export const quietLinkSx: SystemStyleObject<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "fit-content",
  // `fit-content` resolves toward max-content, so this caps it at the track
  // rather than letting a future long label push past its column. Defensive:
  // the longest label today ("Weddings & Celebrations", 153px) clears the
  // narrowest track it lands in (187px at 390px viewport) without it.
  maxWidth: "100%",
  minWidth: 44,
  minHeight: 32,
  color: "text.secondary",
  textDecoration: "none",
  transition: `color ${motionTokens.buttonHover}ms ${easingTokens.emin}`,
  // The gold hairline is decoration, not the state signal — the shift to
  // text-primary carries that — so it is out of scope for WCAG 1.4.11 and
  // free to be the brand accent rather than a contrast-safe grey.
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: "calc(50% - 0.85em)",
    width: "100%",
    height: "1px",
    backgroundColor: "primary.main",
    transformOrigin: "left center",
    transform: "scaleX(0)",
    transition: `transform ${motionTokens.linkUnderline}ms ${easingTokens.emin}`,
  },
  "&:hover, &:focus-visible": { color: "text.primary" },
  "&:hover::after, &:focus-visible::after": { transform: "scaleX(1)" },
  "@media (pointer: coarse)": { minHeight: 44 },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&::after": { transition: "none" },
  },
  "&:hover": { textDecoration: "none" },
};
