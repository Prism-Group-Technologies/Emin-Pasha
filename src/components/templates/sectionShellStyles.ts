import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

/**
 * These helpers are typed as `SystemStyleObject`, not `SxProps`. `SxProps` is a
 * union that already includes the array form, so a helper returning it cannot
 * be composed into `sx={[helper(), { …overrides }]}` — which is the whole
 * reason the helpers exist.
 */

import { colorTokens, radiusTokens, shadowTokens } from "@/theme/tokens";

export type SectionVariant = "default" | "raised" | "bleed" | "contrast";

const { ink, gold } = colorTokens;

/**
 * The dark band. The page was a single unbroken cream field from the hero to
 * the footer, which is what made a set of perfectly reasonable sections read
 * as a wireframe: with no tonal rhythm, nothing on the page is emphatic, so
 * every section looks equally optional.
 *
 * Identical in both colour schemes on purpose. A band whose whole job is to be
 * darker than its neighbours cannot follow the scheme — in dark mode it would
 * become invisible, which is exactly the problem it exists to solve.
 *
 * It is also the only ground on the site where gold can carry type. Verified
 * with `utils/contrast.ts` against both stops of the gradient: gold/500 8.43:1
 * and 8.03:1, gold/300 10.46:1 and 9.96:1, contrastCopy 18.87:1 and 17.96:1,
 * contrastMuted 9.33:1 and 8.88:1 — all past AA for normal text.
 */
const CONTRAST_BAND = `linear-gradient(180deg, ${ink[900]} 0%, ${ink[800]} 100%)`;

export const sectionRoot = (
  variant: SectionVariant,
  topRule: boolean,
): SystemStyleObject<Theme> => ({
  py: { xs: 8, md: 9 },
  /**
   * Contains a lateral reveal's travel so it can never give the document a
   * horizontal scrollbar. A section sliding in from the right sits 40px
   * outside the container for the first half of its animation, and on a
   * viewport with no gutter slack that is enough to widen the page.
   *
   * `clip` rather than `hidden`: `hidden` makes the section a scroll
   * container, which silently breaks `position: sticky` on any descendant —
   * the story page's table of contents is exactly that. `clip` cuts the
   * overflow without creating one, and leaves the block axis `visible` so
   * nothing else in the section is trimmed.
   */
  overflowX: "clip",
  ...(variant === "raised" && { bgcolor: "background.paper" }),
  ...(variant === "contrast" && {
    backgroundImage: CONTRAST_BAND,
    color: ink.contrastCopy,
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderColor: gold[700],
  }),
  ...(topRule && { borderTop: "1px solid", borderColor: "primary.main" }),
});

/** Muted body copy *inside* a contrast band, where `text.secondary` is unreadable. */
export const contrastMutedSx: SystemStyleObject<Theme> = { color: ink.contrastMuted };

export const headerRoot = (centred: boolean): SystemStyleObject<Theme> => ({
  display: "flex",
  flexDirection: { xs: "column", md: centred ? "column" : "row" },
  alignItems: { xs: centred ? "center" : "flex-start", md: centred ? "center" : "end" },
  justifyContent: "space-between",
  textAlign: centred ? "center" : "left",
  gap: { xs: 4, md: 6 },
  mb: { xs: 6, md: 7 },
  ...(centred && { maxWidth: "72ch", mx: "auto" }),
});

export const headerCopy = (centred: boolean): SystemStyleObject<Theme> => ({
  display: "grid",
  gap: 3,
  // A centred header is already width-limited by its parent; a left-aligned
  // one needs its own measure or the lede runs the full 1280px container.
  ...(centred ? {} : { maxWidth: "62ch" }),
});

export const eyebrowSx = (onDark: boolean): SystemStyleObject<Theme> => ({
  fontFamily: "var(--font-cartographic)",
  letterSpacing: "0.14em",
  color: onDark ? ink.contrastMuted : "text.secondary",
});

export const ledeSx = (onDark: boolean): SystemStyleObject<Theme> => ({
  textWrap: "pretty",
  color: onDark ? ink.contrastMuted : "text.secondary",
});

/**
 * The card surface shared by every tile on the homepage.
 *
 * The original tiles were a 1px gold rule with transparent everything else, so
 * a short card and a long card in the same row had no shared edge and the row
 * dissolved into floating text with a lot of nothing under it. A filled,
 * fully-bordered surface gives each card a definite boundary, which is what
 * makes uneven copy lengths read as a grid instead of as dead space.
 */
export const cardSurface = (accent = true): SystemStyleObject<Theme> => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  p: { xs: 5, md: 6 },
  bgcolor: "background.default",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: `${radiusTokens.lg}px`,
  boxShadow: shadowTokens.sm,
  ...(accent && { borderTop: "2px solid", borderTopColor: "primary.main" }),
  transition:
    "border-color 200ms cubic-bezier(0.16,1,0.3,1), box-shadow 200ms cubic-bezier(0.16,1,0.3,1), transform 200ms cubic-bezier(0.16,1,0.3,1)",
  "&:hover": {
    borderColor: "primary.main",
    boxShadow: shadowTokens.lg,
    transform: "translateY(-4px)",
  },
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&:hover": { transform: "none" },
  },
});
