import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { FILM_ANCHOR_ID } from "@/containers/gallery/anchors";
import { galleryImage } from "@/containers/gallery/catalogue";
import { filmChapters, tourCopy } from "@/containers/gallery/copy/film";
import { sections } from "@/containers/gallery/copy/sections";
import { TourCard } from "@/containers/gallery/molecules/TourCard";
import { FilmReel } from "@/containers/gallery/organisms/FilmReel";
import { whatsappGalleryUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

/**
 * The page's dark tonal break: the estate film (chapter picker island) beside
 * the 360° tour card. Both posters are placeholders until the film and tour
 * are produced.
 */
export function FilmSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={FILM_ANCHOR_ID}
      variant="contrast"
      motion={motion}
      eyebrow={sections.film.eyebrow}
      heading={sections.film.heading}
      description={sections.film.description}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 5, md: 5 },
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.7fr) minmax(0, 1fr)" },
          alignItems: "start",
        }}
      >
        <FilmReel
          chapters={filmChapters}
          poster={galleryImage("gallery-film-poster")}
          labels={{
            reel: tourCopy.reelLabel,
            play: tourCopy.playLabel,
            pending: tourCopy.pendingNote,
          }}
        />
        <TourCard
          copy={tourCopy}
          poster={galleryImage("gallery-tour-poster")}
          whatsappHref={whatsappGalleryUrl}
        />
      </Box>
    </SectionShell>
  );
}
