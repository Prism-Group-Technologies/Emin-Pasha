"use client";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { VisuallyHidden } from "@/components/atoms/VisuallyHidden";
import { useGalleryFilter } from "@/containers/gallery/hooks/useGalleryFilter";
import { GalleryFilterChips } from "@/containers/gallery/molecules/GalleryFilterChips";
import { PhotoWall } from "@/containers/gallery/molecules/PhotoWall";
import { GalleryLightbox } from "@/containers/gallery/organisms/GalleryLightbox";
import type { GalleryItem } from "@/containers/gallery/types";
import { useLightbox } from "@/hooks/useLightbox";

export interface GalleryGridProps {
  items: GalleryItem[];
  filterLabel: string;
  openLabel: string;
}

/**
 * 'use client' justification: category filter and lightbox state.
 *
 * A thin composition — the filter rule lives in `useGalleryFilter`, the
 * navigation in `useLightbox`, the layout in `PhotoWall`. The items arrive as
 * plain data from `catalogue.ts`, so no content layer crosses the boundary.
 * The chip row is hidden when there is only one category to show (a
 * single-category collection route), where it would be noise.
 */
export function GalleryGrid({ items, filterLabel, openLabel }: GalleryGridProps) {
  const { filter, setFilter, options, shown, statusText } = useGalleryFilter(items);
  const lightbox = useLightbox(shown.length);

  return (
    <Stack spacing={{ xs: 4, md: 5 }}>
      {options.length > 2 && (
        <GalleryFilterChips
          options={options}
          value={filter}
          onChange={setFilter}
          label={filterLabel}
        />
      )}
      <Box role="status" aria-live="polite">
        <VisuallyHidden>{statusText}</VisuallyHidden>
      </Box>
      <PhotoWall items={shown} onOpen={lightbox.openAt} openLabel={openLabel} />
      <GalleryLightbox items={shown} lightbox={lightbox} />
    </Stack>
  );
}
