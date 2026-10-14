import type { LightboxPhoto } from "@/components/molecules/lightboxPhoto";
import { PhotoRail } from "@/components/organisms/PhotoRail";
import { SectionShell } from "@/components/templates/SectionShell";
import {
  celebrationAsset,
  celebrationCaptions,
  celebrationsSection,
} from "@/containers/events/copy";
import type { RevealDirection } from "@/theme/motion";

/**
 * Twelve frames of one themed private celebration, as a swipeable rail that
 * opens a full lightbox.
 *
 * Resolved here, on the server, rather than inside `PhotoRail`: the asset
 * modules pull in the photography registry, which must never cross into a
 * client bundle (DECISIONS.md D25). The rail receives plain, serialisable
 * `LightboxPhoto` objects.
 */
const PHOTOS: LightboxPhoto[] = celebrationCaptions.flatMap(({ id, caption }) => {
  const asset = celebrationAsset(id);
  return asset ? [{ id, asset, caption }] : [];
});

export function CelebrationsRailSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={celebrationsSection.eyebrow}
      heading={celebrationsSection.heading}
      description={celebrationsSection.description}
    >
      <PhotoRail
        photos={PHOTOS}
        aria-label="Photographs of a themed private celebration at the estate"
        title="A celebration at the estate"
      />
    </SectionShell>
  );
}
