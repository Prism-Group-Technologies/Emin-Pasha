import { ImageResponse } from "next/og";

import { identity } from "@/content/identity";
import { site } from "@/content/site";
import { colorTokens } from "@/theme/tokens";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = identity.name;

/**
 * The share card. Verified against next@16.2.12: `ImageResponse` is exported
 * from `next/og`, and the `opengraph-image` file convention generates the
 * route and the meta tags automatically.
 *
 * Uses the brand's own ink/gold tokens rather than new values. It does
 * **not** try to load Fraunces: `ImageResponse` needs font bytes fetched at
 * render time, and a webfont fetch inside image generation is a failure mode
 * on every cold start. A system serif in the brand colours degrades far
 * better than a card that fails to render.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: colorTokens.ink[900],
        padding: "72px 80px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: colorTokens.gold[300],
            fontFamily: "monospace",
          }}
        >
          § Nakasero · Kampala
        </div>
        <div
          style={{ display: "flex", fontSize: 76, color: colorTokens.sand[50], lineHeight: 1.1 }}
        >
          {identity.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", height: 1, background: colorTokens.gold[500] }} />
        <div
          style={{ display: "flex", fontSize: 30, color: colorTokens.sand[400], lineHeight: 1.3 }}
        >
          {site.positioning.oneLiner}
        </div>
      </div>
    </div>,
    size,
  );
}
