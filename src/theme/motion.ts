import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

import { breakpointTokens, easingTokens, revealTokens } from "@/theme/tokens";

/**
 * Typed as `SystemStyleObject`, not `SxProps`, for the same reason as
 * `sectionShellStyles` — `SxProps` is a union that already includes the array
 * form, so a helper returning it cannot be composed into
 * `sx={[revealSx(…), { …overrides }]}`, which is the whole point of a mixin.
 */

/** Where the element travels *from* as it enters the viewport. */
export type RevealDirection = "up" | "left" | "right" | "none";

export interface RevealOptions {
  /**
   * `left`/`right` are honoured from `md` up only; below that they collapse to
   * `up`. See the overflow note on `LATERAL_FROM` below.
   */
  direction?: RevealDirection;
  /** Stagger position among siblings — DESIGN_DIRECTION.md §B.5. */
  index?: number;
  /** Adds the settle-from-scale that photography gets instead of a lift. */
  media?: boolean;
  /** Makes the element fill its grid/flex track. */
  fill?: boolean;
}

const REDUCED_MOTION = "@media (prefers-reduced-motion: reduce)";
const SUPPORTS_SCROLL_TIMELINE = "@supports (animation-timeline: view())";

/**
 * Lateral reveals start from `md`.
 *
 * A `translateX` on a section that already spans the container is the classic
 * way to give a page a horizontal scrollbar — the element is pushed outside
 * the initial containing block for the first half of its animation. On a
 * narrow viewport there is no slack in the gutters to absorb that, so phones
 * and small tablets get the vertical rise instead. `sectionRoot` also sets
 * `overflow-x: clip` as a second line of defence; `clip` rather than `hidden`
 * because `hidden` would turn every section into a scroll container and break
 * any `position: sticky` descendant.
 */
const LATERAL_FROM = `@media (min-width:${breakpointTokens.md}px)`;

const {
  riseDistance,
  slideDistance,
  mediaScale,
  staggerStep,
  maxStaggerIndex,
  rangeStart,
  rangeEnd,
} = revealTokens;

/**
 * Applied as one spread rather than as per-parameter defaults, which keeps
 * `revealSx` inside the repo's complexity ceiling — every `= value` in a
 * destructuring pattern is another branch as far as the `complexity` rule is
 * concerned, and four of them plus the real logic put it over.
 */
const REVEAL_DEFAULTS = {
  direction: "up",
  index: 0,
  media: false,
  fill: false,
} as const satisfies Required<RevealOptions>;

/** The x offset a lateral reveal starts from, or `null` if it is not lateral. */
function lateralOffset(direction: RevealDirection): string | null {
  if (direction === "left") {
    return `${-slideDistance}px`;
  }
  if (direction === "right") {
    return `${slideDistance}px`;
  }
  return null;
}

/**
 * Scroll-driven reveal, as a style object rather than a wrapper component.
 *
 * **Zero JavaScript, by construction.** The whole effect is
 * `animation-timeline: view()`, so the browser drives it on the compositor:
 * no IntersectionObserver, no scroll listener, no `useState`, no hydration,
 * and nothing added to any bundle. Applying it as `sx` rather than through a
 * component also means no extra wrapper `<div>` per revealed element — the
 * homepage alone has around thirty, and the old `Reveal` wrapper needed a
 * `fill` escape hatch precisely because that surplus div broke grid tracks.
 *
 * **One keyframe for every variant.** `emin-in` interpolates
 * `translate3d(var(--emin-x), var(--emin-y), 0) scale(var(--emin-s))`, and
 * this mixin only sets those three custom properties. A direction change is
 * therefore a variable swap, not another `@keyframes` block, so adding
 * lateral motion cost no extra CSS and the responsive collapse at `md` is a
 * two-property media query rather than a second animation.
 *
 * **Progressive enhancement in the safe direction.** The starting `opacity: 0`
 * lives *inside* `@supports (animation-timeline: view())`, so a browser that
 * cannot run the animation never hides the content either. Scroll-driven
 * animations are still not Baseline, and a fallback that hid content in the
 * browsers that lack them would be far worse than no animation at all. There
 * is no JS in this path, so content is equally visible with scripting off.
 *
 * **Why the range ends in `cover`, not `entry`.** This is the difference
 * between a reveal you watch happen and one that is already over.
 *
 * The `entry` phase is much shorter than it sounds: it begins when the
 * element's leading edge crosses the *bottom* of the viewport and ends when
 * its trailing edge crosses that same bottom edge. Its whole duration is one
 * element-height of scrolling, and every frame of it happens while the element
 * is still down in the bottom sliver of the screen. An `entry`-anchored reveal
 * on a 180px block in a 900px viewport is fully settled by the time the block
 * sits 88% of the way down — long before the reader's eye arrives. It looks
 * like nothing animated at all.
 *
 * The `cover` phase spans the element's entire crossing of the viewport, so a
 * percentage of it is a position on screen rather than a fraction of the
 * element's own height. Ending at `cover 40%` lands the settle point near the
 * middle of the viewport, where the reader actually is. `tokens.ts` works the
 * geometry out for three element heights.
 *
 * **Above-the-fold content still renders settled.** `entry 0%` and `cover 0%`
 * are the same instant — both are the leading edge touching the viewport's end
 * edge — so starting at `cover 0%` gives up nothing, and anything already well
 * inside the viewport at first paint is past `cover 40%` and renders at its end
 * state. Content sitting right on the fold line is the one case that now paints
 * partly revealed rather than finished; that is correct behaviour for something
 * half in view, and it is why the hero is excluded from reveals entirely.
 *
 * **CLS stays at zero.** Only `opacity` and `transform` are touched; neither
 * triggers layout, and the element occupies its final space from first paint.
 *
 * `prefers-reduced-motion` drops the animation rather than shortening it —
 * with no JS there is no state to unwind, so the element renders as itself.
 * That block is written last on purpose: it sits at the same specificity as
 * the `md` lateral override, so source order is what makes it win.
 *
 * No duration token is applied. A scroll-driven animation takes its progress
 * from scroll position rather than from a clock, so `motionTokens.contentReveal`
 * has nothing to attach to; the stagger survives as an offset in
 * `animation-range`, because time-based `animation-delay` is ignored on a
 * scroll timeline.
 */
export function revealSx(options: RevealOptions = {}): SystemStyleObject<Theme> {
  const { direction, index, media, fill } = { ...REVEAL_DEFAULTS, ...options };

  if (direction === "none") {
    return fill ? { height: "100%" } : {};
  }

  const offset = Math.min(Math.max(index, 0), maxStaggerIndex) * staggerStep;
  const lateral = lateralOffset(direction);

  return {
    ...(fill && { height: "100%" }),
    // A media reveal settles down from 104%, so the element clips its own
    // overflow rather than letting the extra 4% widen the page mid-animation.
    ...(media && { overflow: "hidden" }),
    [SUPPORTS_SCROLL_TIMELINE]: {
      opacity: 0,
      // The base state is always the vertical rise: it is what small screens
      // use, and what a lateral reveal falls back to below `md`.
      "--emin-x": "0px",
      "--emin-y": `${riseDistance}px`,
      "--emin-s": media ? String(mediaScale) : "1",
      animationName: "emin-in",
      animationFillMode: "both",
      animationTimingFunction: easingTokens.emin,
      animationTimeline: "view()",
      animationRange: `cover ${rangeStart + offset}% cover ${rangeEnd + offset}%`,
      ...(lateral !== null && {
        [LATERAL_FROM]: { "--emin-x": lateral, "--emin-y": "0px" },
      }),
      [REDUCED_MOTION]: {
        opacity: 1,
        animationName: "none",
      },
    },
  };
}

/**
 * The direction a section should reveal from, given its position in the page.
 *
 * Alternating by index is what turns a column of individually-animated
 * sections into something that reads as choreography: each band enters from
 * the opposite side to the one before it, so the eye is handed across the page
 * as it scrolls rather than being pulled straight down thirteen times.
 *
 * Callers pass their own index because section order is a page-level fact —
 * a section organism has no idea where it sits, and hard-coding a direction
 * into one would break the alternation the moment a page reordered or reused
 * it. `oppositeOf` exists for the two-column sections, where the media half
 * must enter against its copy rather than alongside it.
 */
export function alternatingDirection(index: number): RevealDirection {
  return index % 2 === 0 ? "left" : "right";
}

export function oppositeOf(direction: RevealDirection): RevealDirection {
  if (direction === "left") {
    return "right";
  }
  if (direction === "right") {
    return "left";
  }
  return direction;
}
