import { easingTokens, motionTokens } from "@/theme/tokens";

/**
 * Header heights are fixed numbers, not content-driven, for one reason: the
 * header is `position: fixed`, and the spacer that reserves room for it below
 * is sized from `HEADER_HEIGHT` at render time on the server. Both the
 * expanded and condensed heights therefore have to be knowable without
 * measuring the DOM, or the reserved space would be wrong on first paint and
 * the page would shift (CLAUDE.md §8, CLS ≤ 0.05).
 */
export const HEADER_HEIGHT = { xs: 72, md: 96 } as const;
export const HEADER_HEIGHT_CONDENSED = { xs: 56, md: 64 } as const;

/** Mobile-only sticky action bar — its height is reserved at the page foot. */
export const STICKY_BAR_HEIGHT = 64;

export const HEADER_TRANSITION = [
  `height ${motionTokens.navFade}ms ${easingTokens.emin}`,
  `background-color ${motionTokens.navFade}ms ${easingTokens.emin}`,
  `border-color ${motionTokens.navFade}ms ${easingTokens.emin}`,
  `color ${motionTokens.navFade}ms ${easingTokens.emin}`,
].join(", ");

/**
 * The header floats over a full-bleed hero video, and "fully transparent"
 * cannot on its own guarantee the 4.5:1 the nav links need (CLAUDE.md
 * §6.2/§10) — the contrast of white-on-video depends on the frame, which CSS
 * cannot know. This `ink/900` scrim holds a near-constant 0.62 across the
 * band the nav actually occupies before falling away, which is as far as a
 * scrim can go without becoming an opaque bar and defeating the floating
 * treatment the brief asks for.
 *
 * **The scrim is necessary but not sufficient.** Measured against a
 * worst-case white video frame, `sand/50` text over a 0.62 scrim is ~2.4:1 —
 * a fail. AA at this transparency is therefore a **requirement on the
 * footage**, not on this file: the top ~140px of the hero video must be
 * graded dark. Registered as TODO(EMIN-Q69) against the Q43 video delivery,
 * and logged as DECISIONS.md D26.
 */
export const HERO_SCRIM = [
  "linear-gradient(180deg,",
  "rgba(11,11,10,0.68) 0%,",
  "rgba(11,11,10,0.62) 55%,",
  "rgba(11,11,10,0.30) 85%,",
  "rgba(11,11,10,0) 100%)",
].join(" ");

/**
 * `sizes` for a mega-menu panel thumbnail. The panel only exists at `md` and
 * up, so the first clause tells the browser the image is never painted below
 * 900px and no candidate is fetched there at all; above that a card is roughly
 * a fifth of a container that itself caps at the `xl` breakpoint.
 */
export const PANEL_IMAGE_SIZES = "(max-width: 899px) 0px, (max-width: 1536px) 20vw, 300px";

/**
 * `sizes` for a drawer row thumbnail — a fixed 88px square, so it is stated
 * as a fixed size rather than a viewport fraction. 2x covers retina.
 */
export const DRAWER_IMAGE_SIZES = "176px";
