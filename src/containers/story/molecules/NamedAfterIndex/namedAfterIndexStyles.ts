import { colorTokens, easingTokens, motionTokens, radiusTokens } from "@/theme/tokens";

/**
 * Every style decision the index band makes, pulled out of the components —
 * the same argument `navCardStyles.ts` makes: the panel, the list and each row
 * have to agree about one hover, and three sets of inline ternaries both drift
 * and push each file past the repo's `complexity` ceiling.
 *
 * Plain inferred objects with no MUI type annotation: `@mui/*` may only be
 * imported inside `src/components/**` and `src/theme/**` (CLAUDE.md §5.1), and
 * a container cannot name `SystemStyleObject` without crossing that boundary.
 * They are static objects rather than `sx` callbacks for the same reason
 * `gallery/styles.ts` is — a callback cannot cross the Server Component
 * boundary (DECISIONS.md D25).
 */

const { ink, gold } = colorTokens;

/**
 * The band is `variant="contrast"`, which is the one ground on the site that
 * is identical in both colour schemes (see `sectionShellStyles.ts`). So these
 * values are literals derived from `ink.contrastCopy` rather than palette
 * references: `divider` and `text.secondary` follow the scheme and would
 * vanish into the gradient in one of the two.
 */
const HAIRLINE = "rgba(250,248,246,0.16)";
const HAIRLINE_ACTIVE = gold[500];

const EASE = easingTokens.emin;
const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";

/**
 * Asymmetric, not 50/50. An even split reads as a two-column layout; the list
 * taking the wider track is what makes the panel read as supporting evidence
 * for an index rather than as half a slideshow.
 */
export const indexRootSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.8fr) minmax(0, 1fr)" },
  gap: { xs: 0, md: 7, lg: 9 },
  alignItems: "start",
};

/**
 * Sticky, so the photograph stays beside whichever row the reader has reached
 * instead of scrolling away under the first one. Hidden below `md`: the panel
 * has no hover to drive it on touch, and `display: none` also means its three
 * lazy images never enter a viewport and so are never fetched on a phone.
 */
export const spotlightRailSx = {
  display: { xs: "none", md: "block" },
  position: "sticky",
  top: 120,
};

export const spotlightFrameSx = {
  position: "relative",
  aspectRatio: "3 / 2",
  overflow: "hidden",
  borderRadius: `${radiusTokens.xl}px`,
  border: "1px solid",
  borderColor: gold[600],
  bgcolor: ink[900],
};

/** Cross-fade only — no transform, so the swap costs no layout and no paint. */
export const spotlightLayerSx = (active: boolean) => ({
  position: "absolute",
  inset: 0,
  opacity: active ? 1 : 0,
  transition: `opacity ${motionTokens.navFade}ms ${EASE}`,
  [REDUCED_MOTION]: { transition: "none" },
});

export const spotlightCaptionSx = {
  display: "block",
  mt: 3,
  fontFamily: "var(--font-cartographic)",
  letterSpacing: "0.14em",
  color: gold[300],
};

export const listSx = {
  listStyle: "none",
  m: 0,
  p: 0,
  borderTop: "1px solid",
  borderColor: HAIRLINE,
};

/**
 * The row is the hairline. A list of bordered cards on a dark ground reads as
 * a second grid stacked on the one above it; rules read as an index, which is
 * the whole point of the form.
 */
export const rowSx = (active: boolean) => ({
  borderBottom: "1px solid",
  // Only where the panel exists. Below `md` nothing is driving the highlight,
  // so a lit first row would claim a selection the reader never made.
  borderColor: active ? { xs: HAIRLINE, md: HAIRLINE_ACTIVE } : HAIRLINE,
  transition: `border-color ${motionTokens.cardHover}ms ${EASE}`,
  [REDUCED_MOTION]: { transition: "none" },
});

export const rowLinkSx = (dimmed: boolean) => ({
  display: "flex",
  alignItems: { xs: "flex-start", sm: "center" },
  gap: { xs: 3, md: 4 },
  py: { xs: 4, md: 5 },
  px: { xs: 0, md: 2 },
  color: ink.contrastCopy,
  opacity: dimmed ? 0.55 : 1,
  transition: `opacity ${motionTokens.cardHover}ms ${EASE}, padding-left ${motionTokens.cardHover}ms ${EASE}`,
  "&:hover, &:focus-visible": { pl: { md: 3 } },
  "&:focus-visible": { outline: "2px solid", outlineColor: gold[300], outlineOffset: 2 },
  [REDUCED_MOTION]: { transition: "none", "&:hover, &:focus-visible": { pl: { md: 2 } } },
});

/**
 * Hidden below `sm`, where a 360px row cannot carry a numeral, a thumbnail and
 * a three-line body at once. The thumbnail wins there: it is the only
 * photography the band has on a phone.
 */
export const ordinalSx = {
  display: { xs: "none", sm: "block" },
  flexShrink: 0,
  width: { sm: 40, md: 56 },
  fontFamily: "var(--font-cartographic)",
  fontSize: { sm: "1.25rem", md: "1.5rem" },
  lineHeight: 1,
  color: gold[300],
};

/** The inverse of the panel: the row's own image, and only where there is no panel. */
export const rowThumbSx = {
  display: { xs: "block", md: "none" },
  position: "relative",
  flexShrink: 0,
  width: { xs: 88, sm: 104 },
  aspectRatio: "1 / 1",
  overflow: "hidden",
  borderRadius: `${radiusTokens.md}px`,
  bgcolor: ink[800],
};

export const rowBodySx = { minWidth: 0, flex: 1 };

export const rowSectionSx = {
  display: "block",
  fontFamily: "var(--font-cartographic)",
  letterSpacing: "0.14em",
  color: ink.contrastMuted,
};

export const rowNameSx = (active: boolean) => ({
  mt: 0.5,
  // Desktop-only for the same reason as `rowSx`'s rule.
  color: active ? { xs: ink.contrastCopy, md: gold[300] } : ink.contrastCopy,
  transition: `color ${motionTokens.cardHover}ms ${EASE}`,
  textWrap: "balance",
  [REDUCED_MOTION]: { transition: "none" },
});

export const rowFromSx = {
  display: "block",
  mt: 1,
  color: ink.contrastMuted,
  textWrap: "pretty",
};

/**
 * The nudge to visit is the one invented line in the band, and the least
 * load-bearing: it is held back until `sm` so a phone row stays scannable.
 */
export const rowBlurbSx = {
  display: { xs: "none", sm: "block" },
  mt: 2,
  color: ink.contrastMuted,
  textWrap: "pretty",
};

export const rowArrowSx = {
  flexShrink: 0,
  alignSelf: "center",
  color: gold[300],
};
