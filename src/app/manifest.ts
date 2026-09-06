import type { MetadataRoute } from "next";

import { identity } from "@/content/identity";
import { colorTokens } from "@/theme/tokens";

/**
 * Web app manifest — CLAUDE.md §9. Verified against next@16.2.12's
 * `metadata/types/manifest-types.d.ts`, which is what `MetadataRoute.Manifest`
 * resolves to; Next serves this at `/manifest.webmanifest` and links it
 * automatically, so no `<link rel="manifest">` is written by hand.
 *
 * `name`/`short_name` are the two approved name forms from
 * 02_CONTENT_SOURCE_OF_TRUTH.md §1 — not new strings. `description` is the
 * approved elevator-pitch opening, trimmed to the one sentence that fits an
 * install prompt.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: identity.name,
    short_name: identity.shortName,
    description: `${identity.category} at ${identity.address}`,
    start_url: "/",
    display: "standalone",
    background_color: colorTokens.sand[50],
    theme_color: colorTokens.gold[500],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
