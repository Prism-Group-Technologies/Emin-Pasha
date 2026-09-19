import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { eventsAsset } from "@/containers/events/copy";
import { InclusionChecklist } from "@/containers/events/molecules/InclusionChecklist";

export interface WhatYouGetBlockProps {
  items: string[];
  /** Events-copy asset id for the supporting photo, and its caption. */
  imageId?: string;
  caption?: string;
}

/**
 * The "what you get" row: a gold-checked inclusions list beside a supporting
 * photo of the room. Falls back to a full-width two-track list when no image
 * resolves, so the block never leaves the right two-thirds of the container
 * empty the way the old single-column list did.
 */
export function WhatYouGetBlock({ items, imageId, caption }: WhatYouGetBlockProps) {
  const asset = imageId ? eventsAsset(imageId) : undefined;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: asset ? "minmax(0, 1fr) minmax(0, 0.82fr)" : "1fr",
        },
        gap: { xs: 5, md: 8 },
        alignItems: "center",
      }}
    >
      <Stack spacing={4}>
        <Text variant="h3" component="h2">
          What you get
        </Text>
        <InclusionChecklist items={items} columns={asset ? 1 : 2} />
      </Stack>

      {asset && (
        <Box sx={{ order: { xs: -1, md: 1 } }}>
          <MediaFrame hoverZoom>
            <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 45vw" />
          </MediaFrame>
          {caption && (
            <Text
              variant="caption"
              component="p"
              sx={{ mt: 2, fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
            >
              {caption}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}
