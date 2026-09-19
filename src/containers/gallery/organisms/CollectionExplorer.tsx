"use client";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { COLLECTION_SLUGS } from "@/containers/gallery/anchors";
import { useActiveId } from "@/containers/gallery/hooks/useActiveId";
import { CollectionMosaic } from "@/containers/gallery/molecules/CollectionMosaic";
import { CollectionSummary } from "@/containers/gallery/molecules/CollectionSummary";
import { CollectionTabs } from "@/containers/gallery/molecules/CollectionTabs";
import type { GalleryCollectionView } from "@/containers/gallery/types";

export interface CollectionExplorerProps {
  collections: GalleryCollectionView[];
  labels: { filter: string; ask: string; view: string };
}

const PANEL_ID = "collection-panel";

/**
 * 'use client' justification: which collection is showing.
 *
 * Selection lives in `useActiveId`; the island only composes the mood
 * switcher, the bento of five photographs and the summary. The panel is
 * re-keyed per collection so its reveal replays and screen readers hear the
 * new heading.
 */
export function CollectionExplorer({ collections, labels }: CollectionExplorerProps) {
  const { active, select } = useActiveId(COLLECTION_SLUGS);
  const current = collections.find((collection) => collection.slug === active) ?? collections[0];

  if (!current) {
    return null;
  }

  return (
    <Stack spacing={{ xs: 5, md: 6 }}>
      <CollectionTabs
        items={collections}
        active={active}
        onSelect={select}
        label={labels.filter}
        panelId={PANEL_ID}
      />
      <Box
        key={current.slug}
        id={PANEL_ID}
        role="region"
        aria-label={current.title}
        sx={{
          display: "grid",
          gap: { xs: 5, md: 6, lg: 8 },
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.25fr) minmax(0, 1fr)" },
          alignItems: "start",
          "@keyframes collectionIn": {
            from: { opacity: 0, transform: "translateY(12px)" },
            to: { opacity: 1, transform: "none" },
          },
          animation: "collectionIn 420ms cubic-bezier(0.16,1,0.3,1)",
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        <CollectionMosaic items={current.items} />
        <CollectionSummary collection={current} askLabel={labels.ask} viewLabel={labels.view} />
      </Box>
    </Stack>
  );
}
