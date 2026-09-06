import Stack from "@mui/material/Stack";

import { Text } from "@/components/atoms/Text";
import { Card } from "@/components/molecules/Card";
import { MediaCard } from "@/components/molecules/MediaCard";
import { StatBlock } from "@/components/molecules/StatBlock";

/**
 * Card, MediaCard, StatBlock. `MediaCard` uses a local demo-only SVG
 * (`public/styleguide/placeholder.svg`) — every real asset ships as a
 * `status: "placeholder"` AssetRef until photography is delivered
 * (docs/ASSET_MANIFEST.md), so nothing real exists to show here yet.
 */
export function CardsSection() {
  return (
    <Stack spacing={2}>
      <Text variant="h2">Cards</Text>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Card sx={{ maxWidth: 320 }}>
          <Text variant="body1">A plain content card — radius-md, shadow-none by default.</Text>
        </Card>
        <MediaCard
          image={{
            src: "/styleguide/placeholder.svg",
            alt: "Demo placeholder image",
            width: 320,
            height: 213,
          }}
          title="Superior Room"
          description="Corporate, diplomatic, solo business travellers."
          href="/accommodation/superior-room"
        />
        <StatBlock value="300ft" label="Swimming pool" />
      </Stack>
    </Stack>
  );
}
