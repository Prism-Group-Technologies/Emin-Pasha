import { SectionShell } from "@/components/templates/SectionShell";
import { PHOTOS_ANCHOR_ID } from "@/containers/gallery/anchors";
import { sections } from "@/containers/gallery/copy/sections";
import { GalleryGrid } from "@/containers/gallery/organisms/GalleryGrid";
import type { GalleryItem } from "@/containers/gallery/types";
import type { RevealDirection } from "@/theme/motion";

export interface PhotosSectionProps {
  items: GalleryItem[];
  motion?: RevealDirection;
  /** Overrides for the collection route, which titles the wall after the collection. */
  heading?: string;
  description?: string;
}

/** The filterable photo wall with the "book this view" lightbox. Shared by hub and collection routes. */
export function PhotosSection({ items, motion = "up", heading, description }: PhotosSectionProps) {
  const { photos } = sections;

  return (
    <SectionShell
      id={PHOTOS_ANCHOR_ID}
      motion={motion}
      eyebrow={photos.eyebrow}
      heading={heading ?? photos.heading}
      description={description ?? photos.description}
    >
      <GalleryGrid items={items} filterLabel={photos.filterLabel} openLabel={photos.openLabel} />
    </SectionShell>
  );
}
