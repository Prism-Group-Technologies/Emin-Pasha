import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { assets } from "@/content/assets";
import { radiusTokens, shadowTokens } from "@/theme/tokens";

const gmPhoto = assets.find((asset) => asset.id === "story-gm-photo");

interface GmSignatureProps {
  /**
   * The letter composition: a smaller portrait that reads as a signature
   * detail beside a short letter rather than a co-equal column.
   */
  dense?: boolean;
}

/**
 * The portrait + by-line rail in the top-right cell of the welcome grid. The
 * portrait is the labelled, dimension-tagged placeholder (CLAUDE.md §6.6;
 * real photo is TODO(EMIN-Q21)) — matted on the paper surface with a hairline
 * frame and a soft lift, so the slot reads as a deliberately framed
 * photograph rather than an empty box while it waits for the master. The
 * by-line stays "The General Manager" only, per §12.4, and is the sole
 * attribution for the message.
 */
export function GmSignature({ dense = false }: GmSignatureProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: dense ? 2.5 : 3,
        alignContent: "start",
        justifyItems: { xs: "start", md: dense ? "start" : "stretch" },
        maxWidth: { xs: 260, md: dense ? 220 : "none" },
      }}
    >
      {gmPhoto && (
        <Box
          sx={{
            width: "100%",
            p: dense ? 0.75 : 1,
            bgcolor: "background.paper",
            borderRadius: `${radiusTokens.lg}px`,
            border: "1px solid",
            borderColor: "divider",
            borderTop: "2px solid",
            borderTopColor: "primary.main",
            boxShadow: dense ? shadowTokens.sm : shadowTokens.md,
          }}
        >
          <Box sx={{ borderRadius: `${radiusTokens.md}px`, overflow: "hidden" }}>
            <AssetImage asset={gmPhoto} sizes="(max-width: 900px) 240px, 320px" />
          </Box>
        </Box>
      )}
      <Box>
        <Box aria-hidden sx={{ width: 40, height: "2px", bgcolor: "primary.main", mb: 2 }} />
        <Text
          component="span"
          variant="overline"
          sx={{
            display: "block",
            fontFamily: "var(--font-cartographic)",
            letterSpacing: "0.14em",
            color: "text.primary",
          }}
        >
          The General Manager
        </Text>
        <Text component="span" variant="body2" sx={{ display: "block", color: "text.secondary" }}>
          The Emin Pasha Hotel &amp; Spa
        </Text>
      </Box>
    </Box>
  );
}
