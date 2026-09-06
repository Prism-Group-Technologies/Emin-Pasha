import type { Breakpoints } from "@mui/material/styles";
import type { TypographyOptions } from "@mui/material/styles/createTypography";

import { bodyFont, displayFont } from "./fonts";

const displayFamily = displayFont.style.fontFamily;
const bodyFamily = bodyFont.style.fontFamily;

/**
 * Maps DESIGN_DIRECTION.md §B.3's 9 named text roles onto MUI's fixed
 * h1–h6/subtitle/body/button/caption/overline variants (approved D02).
 * h1–h3 map directly to display-1/2/3; the larger display-hero role is
 * applied only inside the homepage Hero component via `sx`, never as a
 * sitewide h1 override — most pages don't have a hero-sized headline.
 * h4–h6 continue the same 1.25 modular scale downward since MUI needs more
 * heading steps than the design doc named explicitly.
 */
export function buildTypography(breakpoints: Breakpoints): TypographyOptions {
  const down = breakpoints.down("sm");
  return {
    fontFamily: bodyFamily,
    h1: {
      fontFamily: displayFamily,
      fontSize: "3.0625rem",
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: "-0.01em",
      [down]: { fontSize: "1.9375rem" },
    },
    h2: {
      fontFamily: displayFamily,
      fontSize: "1.9375rem",
      fontWeight: 400,
      lineHeight: 1.15,
      [down]: { fontSize: "1.5625rem" },
    },
    h3: {
      fontFamily: displayFamily,
      fontSize: "1.5625rem",
      fontWeight: 500,
      lineHeight: 1.2,
      [down]: { fontSize: "1.25rem" },
    },
    h4: {
      fontFamily: displayFamily,
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.3,
      [down]: { fontSize: "1.125rem" },
    },
    h5: { fontFamily: displayFamily, fontSize: "1rem", fontWeight: 500, lineHeight: 1.3 },
    h6: { fontFamily: displayFamily, fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1.3 },
    subtitle1: {
      fontFamily: bodyFamily,
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.55,
      [down]: { fontSize: "1.125rem" },
    },
    subtitle2: { fontFamily: bodyFamily, fontSize: "1rem", fontWeight: 500, lineHeight: 1.5 },
    body1: { fontFamily: bodyFamily, fontSize: "1rem", fontWeight: 400, lineHeight: 1.65 },
    body2: { fontFamily: bodyFamily, fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.5 },
    button: {
      fontFamily: bodyFamily,
      fontSize: "0.875rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      textTransform: "none",
    },
    caption: { fontFamily: bodyFamily, fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.5 },
    overline: {
      fontFamily: bodyFamily,
      fontSize: "0.8125rem",
      fontWeight: 600,
      letterSpacing: "0.18em",
      lineHeight: 1.2,
      textTransform: "uppercase",
    },
  };
}
