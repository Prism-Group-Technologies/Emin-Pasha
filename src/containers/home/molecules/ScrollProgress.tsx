import { Box } from "@/components/atoms/Box";
import { zIndexTokens } from "@/theme/tokens";

/**
 * The Equatorial Line as a reading indicator: a gold hairline pinned to the top
 * of the viewport that fills left-to-right as the page is scrolled.
 *
 * Zero JavaScript. `animation-timeline: scroll(root block)` binds the fill
 * directly to the document scroller, so the browser drives it on the
 * compositor — there is no scroll listener, no `requestAnimationFrame` loop and
 * no layout read on any frame. A JS progress bar is one of the classic causes
 * of scroll jank precisely because it does all three.
 *
 * `scaleX` on a `transform-origin: left` element, never `width`: animating
 * width would relayout the bar on every frame, which is the difference between
 * a composited animation and a main-thread one.
 *
 * Wrapped in `@supports` so browsers without scroll-driven animations get
 * nothing at all rather than a permanently empty gold bar. It sits one step
 * above the app bar so the header cannot cover it, and is `aria-hidden` — it
 * reports scroll position, which assistive tech already conveys.
 */
export function ScrollProgress() {
  return (
    <Box
      aria-hidden
      sx={{
        display: "none",
        "@supports (animation-timeline: scroll())": {
          display: "block",
          position: "fixed",
          insetInline: 0,
          top: 0,
          height: "2px",
          bgcolor: "primary.main",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          zIndex: zIndexTokens.appBar + 1,
          pointerEvents: "none",
          animationName: "emin-progress",
          animationFillMode: "both",
          animationTimingFunction: "linear",
          animationTimeline: "scroll(root block)",
        },
      }}
    />
  );
}
