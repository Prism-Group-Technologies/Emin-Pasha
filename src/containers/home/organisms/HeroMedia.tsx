"use client";

import { Box } from "@/components/atoms/Box";
import { placeholderVideoSources } from "@/config/assets";
import { useHeroVideo } from "@/containers/home/hooks/useHeroVideo";
import { easingTokens } from "@/theme/tokens";

/**
 * The video layer only. The poster is **not** here — it is rendered by the
 * server as a `next/image` with `priority` beneath this, so the LCP element
 * is in the initial HTML and does not wait on hydration (CLAUDE.md §8).
 *
 * This layer sits on top and cross-fades in over 400ms once the video can
 * actually play (DESIGN_DIRECTION.md §B.5, "cross-fades in over the poster
 * once ready rather than popping in"). Because it is absolutely positioned
 * over a box the poster already sized, it can never move anything: its
 * contribution to CLS is structurally zero.
 *
 * `preload="none"` and the `<source>` children being conditional mean a
 * mobile, reduced-motion or Save-Data visitor requests no video bytes at all.
 */
export function HeroMedia() {
  const { shouldAttach, visible, onCanPlayThrough } = useHeroVideo();

  return (
    <Box
      component="video"
      aria-hidden
      muted
      loop
      autoPlay
      playsInline
      preload="none"
      tabIndex={-1}
      onCanPlayThrough={onCanPlayThrough}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: visible ? 1 : 0,
        transition: `opacity 400ms ${easingTokens.emin}`,
        pointerEvents: "none",
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      }}
    >
      {shouldAttach &&
        placeholderVideoSources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
    </Box>
  );
}
