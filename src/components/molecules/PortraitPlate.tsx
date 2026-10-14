import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { CutoutPortrait } from "@/components/molecules/CutoutPortrait";
import type { AssetRef } from "@/schemas/content/assetRef";
import { radiusTokens } from "@/theme/tokens";

export interface PortraitPlateProps {
  asset: AssetRef;
  /** Rendered width of the artwork itself — cap it to the source's native pixels. */
  width: { xs: number; md: number };
  sizes: string;
  /** Life dates, e.g. "1840 — 1892". Verified fact, not marketing copy. */
  dates?: string;
  /** One-line museum label under the rule, e.g. the medium and the sitter's office. */
  caption?: string;
}

/**
 * The warm ground the cutout sits on.
 *
 * Built from *relative* alpha over `background.paper` rather than from sand
 * hexes, so the one declaration serves both colour schemes: the copper wash
 * reads as a warm glow on the light ground and as a lit alcove on the dark
 * one, and the ink stop at the edge is the vignette in both. Raw hexes would
 * have needed a `theme.applyStyles` callback, and an `sx` callback cannot
 * cross the Server Component boundary (DECISIONS.md D25) — channel variables
 * keep the object static and serialisable.
 *
 * The light is placed at 22% from the top because that is where the sitter's
 * face lands once the artwork is centred: the brightest part of the plate
 * falls behind the head, which is what makes the dissolve at the hem read as
 * depth rather than as a missing bottom edge.
 */
const PLATE_WASH = [
  "radial-gradient(118% 88% at 50% 22%,",
  "rgba(var(--mui-palette-primary-mainChannel) / 0.085) 0%,",
  "rgba(var(--mui-palette-primary-mainChannel) / 0.025) 46%,",
  "rgba(var(--mui-palette-text-primaryChannel) / 0.055) 100%)",
].join(" ");

/**
 * A cutout portrait presented as a framed plate, with an optional museum
 * label beneath it.
 *
 * **The problem it solves.** `CutoutPortrait` dissolves its subject's cut edge
 * into whatever is behind it, which is correct treatment and a layout hazard:
 * the artwork has no edge, so it cannot hold a column on its own. Dropped into
 * a fluid grid track it floats, and the track's remaining width reads as a
 * rendering fault rather than as composition. Both namesake blocks had that
 * defect — a 236px engraving centred in a ~480px track, because the artwork is
 * capped to its 477px source while the track was free to open to any width.
 *
 * The plate is the fix: it fills the track, so the negative space becomes a
 * bounded panel with a deliberate edge, and the dissolve now resolves into the
 * plate's own wash instead of into the page. The artwork stays at native
 * resolution — nothing here upscales it.
 *
 * **Why the label sits inside the frame.** A short, nearly square engraving
 * leaves the plate bottom-heavy once the hem has faded out. The rule and the
 * two lines of label occupy exactly that dead band, which is why they are part
 * of this component rather than a sibling the call sites each rebuild.
 *
 * Both are optional: a plate with no label is still a plate.
 */
export function PortraitPlate({ asset, width, sizes, dates, caption }: PortraitPlateProps) {
  const hasLabel = Boolean(dates ?? caption);

  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        px: { xs: 4, md: 5 },
        pt: { xs: 4, md: 5 },
        pb: hasLabel ? { xs: 3, md: 4 } : { xs: 4, md: 5 },
        maxWidth: { xs: 360, md: "none" },
        mx: { xs: "auto", md: 0 },
        borderRadius: `${radiusTokens.xl}px`,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        backgroundImage: PLATE_WASH,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CutoutPortrait asset={asset} width={width} sizes={sizes} />
      </Box>

      {hasLabel && (
        <Box
          component="figcaption"
          sx={{
            mt: { xs: 3, md: 4 },
            pt: { xs: 3, md: 4 },
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          {dates && (
            <Text
              variant="overline"
              component="p"
              sx={{ fontFamily: "var(--font-cartographic)", color: "text.primary" }}
            >
              {dates}
            </Text>
          )}
          {caption && (
            <Text
              variant="caption"
              component="p"
              sx={{ mt: dates ? 1 : 0, color: "text.secondary", textWrap: "pretty" }}
            >
              {caption}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
