import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { sections } from "@/containers/gallery/copy/sections";
import { CollectionMosaic } from "@/containers/gallery/molecules/CollectionMosaic";
import { CollectionSummary } from "@/containers/gallery/molecules/CollectionSummary";
import type { GalleryCollectionView } from "@/containers/gallery/types";
import type { RevealDirection } from "@/theme/motion";

export interface CollectionIntroSectionProps {
  collection: GalleryCollectionView;
  motion?: RevealDirection;
}

/**
 * The collection route's first band: the bento of five photographs beside the
 * full summary — the same pair the hub's explorer shows, rendered statically
 * with the summary title as this band's `h2`.
 */
export function CollectionIntroSection({ collection, motion = "up" }: CollectionIntroSectionProps) {
  return (
    <SectionShell motion={motion}>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 5, md: 6, lg: 8 },
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.25fr) minmax(0, 1fr)" },
          alignItems: "start",
        }}
      >
        <Reveal direction={motion} media>
          <CollectionMosaic items={collection.items} />
        </Reveal>
        <Box sx={{ display: "grid", gap: 3 }}>
          <CollectionSummary
            collection={collection}
            askLabel={sections.collections.ask}
            headingLevel="h2"
          />
          <Text variant="caption" color="text.secondary">
            {sections.indicative}
          </Text>
        </Box>
      </Box>
    </SectionShell>
  );
}
