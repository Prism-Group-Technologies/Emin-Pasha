import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

import { easingTokens, motionTokens, radiusTokens } from "@/theme/tokens";

export interface MediaFrameProps {
  children: ReactNode;
  /** Corner-radius token. Defaults to `lg`. */
  radius?: keyof typeof radiusTokens;
  /**
   * Animate a slight scale-up on the descendant `<img>` on hover. `transform`
   * only, so it runs on the compositor with no layout or paint, and it is
   * disabled under `prefers-reduced-motion`.
   */
  hoverZoom?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * A rounded, clipped frame around a `next/image` (rendered via `Image` or
 * `AssetImage`). It supplies only the radius, the `overflow: hidden` that
 * makes the radius bite, `position: relative` so callers can pin chips over
 * the image, and the optional hover zoom. Aspect ratio stays the child's
 * responsibility — `AssetImage` already holds each slot's real ratio, which
 * is what keeps CLS at 0 when real photography replaces the placeholder.
 */
export function MediaFrame({ children, radius = "lg", hoverZoom = false, sx }: MediaFrameProps) {
  return (
    <Box
      sx={[
        {
          position: "relative",
          overflow: "hidden",
          borderRadius: `${radiusTokens[radius]}px`,
          ...(hoverZoom && {
            "& img": {
              transition: `transform ${motionTokens.imageZoom}ms ${easingTokens.emin}`,
            },
            "&:hover img": { transform: "scale(1.045)" },
            "@media (prefers-reduced-motion: reduce)": {
              "& img": { transition: "none" },
              "&:hover img": { transform: "none" },
            },
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
