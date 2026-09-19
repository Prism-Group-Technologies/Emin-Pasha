import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { CollectionSlug } from "@/containers/gallery/anchors";
import { galleryCollections } from "@/containers/gallery/catalogue";
import { sections } from "@/containers/gallery/copy/sections";
import { CollectionCard } from "@/containers/gallery/molecules/CollectionCard";
import type { RevealDirection } from "@/theme/motion";

export interface OtherCollectionsSectionProps {
  current: CollectionSlug;
  motion?: RevealDirection;
}

/**
 * The five sibling collections as photo cards — the collection route's
 * internal-linking band, so every collection links to every other.
 */
export function OtherCollectionsSection({ current, motion = "up" }: OtherCollectionsSectionProps) {
  const others = galleryCollections.filter((collection) => collection.slug !== current);

  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.others.eyebrow}
      heading={sections.others.heading}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        {others.map((collection, index) => (
          <Reveal key={collection.slug} index={index} media fill>
            <CollectionCard collection={collection} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
