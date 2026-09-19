import { Stack } from "@/components/atoms/Stack";
import { SectionShell } from "@/components/templates/SectionShell";
import { COLLECTIONS_ANCHOR_ID } from "@/containers/gallery/anchors";
import { galleryCollections } from "@/containers/gallery/catalogue";
import { sections } from "@/containers/gallery/copy/sections";
import { CollectionLinkRow } from "@/containers/gallery/molecules/CollectionLinkRow";
import { CollectionExplorer } from "@/containers/gallery/organisms/CollectionExplorer";
import type { RevealDirection } from "@/theme/motion";

const { collections } = sections;

/**
 * The page's anchor interaction: six mood collections, one at a time, each a
 * bookable stay. The server resolves the photographs and WhatsApp links; the
 * explorer island only switches between them.
 */
export function CollectionsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={COLLECTIONS_ANCHOR_ID}
      motion={motion}
      eyebrow={collections.eyebrow}
      heading={collections.heading}
      description={collections.description}
    >
      <Stack spacing={{ xs: 5, md: 6 }}>
        <CollectionExplorer
          collections={galleryCollections}
          labels={{
            filter: collections.filterLabel,
            ask: collections.ask,
            view: collections.viewCollection,
          }}
        />
        <CollectionLinkRow items={galleryCollections} />
      </Stack>
    </SectionShell>
  );
}
