import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import type { AssetRef } from "@/schemas/content/assetRef";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

export interface ReceptionMediaPairProps {
  /** The frame that carries the argument — the desk itself. */
  lead: AssetRef;
  /** The supporting frame, offset beneath it from `md` up. */
  support: AssetRef;
  /** Drawn under the pair as a caption for the lead frame. */
  caption?: string;
}

/**
 * Two reception frames composed as one figure: the desk at full width, and a
 * second frame stepped in from the left beneath it.
 *
 * The overlap only exists from `md` up. Below that the two frames stack at
 * full width with ordinary spacing — a negative margin on a 360px viewport
 * either crops the support frame to a letterbox or pushes it past the gutter,
 * and the composition is worth nothing if it costs the page a horizontal
 * scrollbar. This is the same reason `revealSx` drops lateral motion below
 * `md`, and it is why the offset is expressed as a responsive `mt`/`ml` rather
 * than as absolute positioning: a stacking context that has to be unwound at
 * one breakpoint is how these compositions usually break.
 */
const frameSx = {
  overflow: "hidden",
  borderRadius: `${radiusTokens.lg}px`,
  boxShadow: shadowTokens.lg,
};

export function ReceptionMediaPair({ lead, support, caption }: ReceptionMediaPairProps) {
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box sx={frameSx}>
        <AssetImage asset={lead} sizes="(max-width: 900px) 100vw, 48vw" />
      </Box>

      <Box
        sx={[
          frameSx,
          {
            width: { xs: "100%", md: "62%" },
            mt: { xs: 4, md: -8 },
            ml: { xs: 0, md: -5 },
            position: "relative",
            border: "4px solid",
            borderColor: "background.default",
          },
        ]}
      >
        <AssetImage asset={support} sizes="(max-width: 900px) 100vw, 30vw" />
      </Box>

      {caption && (
        <Text
          component="figcaption"
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 3, textWrap: "pretty" }}
        >
          {caption}
        </Text>
      )}
    </Box>
  );
}
