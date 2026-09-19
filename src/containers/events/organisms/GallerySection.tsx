import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { galleryShots, sections } from "@/containers/events/copy";
import { GalleryStrip } from "@/containers/events/molecules/GalleryStrip";
import type { RevealDirection } from "@/theme/motion";

/**
 * The dressed-room gallery — a horizontal scroll rail of set-up shots so an
 * organiser sees the spaces working. Imagery is placeholder; see
 * `copy/media.ts`.
 */
export function GallerySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.gallery.eyebrow}
      heading={sections.gallery.heading}
      description={sections.gallery.description}
    >
      <Reveal direction={motion} media>
        <GalleryStrip shots={galleryShots} />
      </Reveal>
    </SectionShell>
  );
}
