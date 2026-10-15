import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { PhotoCarousel } from "@/components/molecules/PhotoCarousel/PhotoCarousel";
import { type OutletId } from "@/containers/dining/anchors";
import { outletHours, outletMeta } from "@/containers/dining/copy";
import { outletCarousel } from "@/containers/dining/copy/carousels";
import { HoursTable } from "@/containers/dining/molecules/HoursTable";
import { OutletShowcaseMedia } from "@/containers/dining/molecules/OutletShowcaseMedia";
import type { RevealDirection } from "@/theme/motion";

export interface OutletIntroMediaProps {
  outletId: OutletId;
  mediaMotion: RevealDirection;
}

/**
 * The intro band's media column: the outlet's carousel, then its hours.
 *
 * **This replaced a sticky rail.** The rail pinned a single photograph while
 * the copy scrolled past it, which solved a real problem — two outlets have a
 * one-sentence description and used to leave a full-height photograph standing
 * beside two lines of text. A carousel solves the same problem differently and
 * better: eleven frames of Equatoria are worth more than one frame held still,
 * and the band no longer has to borrow height from an image to look finished.
 *
 * It is deliberately **not** sticky. A pinned element that also crossfades on
 * a timer is two kinds of movement competing in the corner of the eye, and
 * pinning would carry the carousel's controls down the page to sit over
 * whatever the reader had scrolled to.
 *
 * An outlet with no carousel falls back to its single showcase frame rather
 * than rendering an empty box — `outletCarousel` returns an empty list for an
 * outlet nobody has shot yet, which is a content gap, not an error.
 *
 * A Server Component: it resolves the slides here and hands finished
 * `AssetRef`s to the client carousel (DECISIONS.md D25).
 */
export function OutletIntroMedia({ outletId, mediaMotion }: OutletIntroMediaProps) {
  const meta = outletMeta[outletId];
  const slides = outletCarousel(outletId);

  return (
    <Box sx={{ order: { xs: 1, md: 2 }, display: "grid", gap: { xs: 5, md: 6 } }}>
      <Reveal direction={mediaMotion} media>
        {slides.length > 0 ? (
          <PhotoCarousel
            slides={slides}
            sizes="(max-width: 900px) 100vw, 42vw"
            label={`${meta.kicker} — photographs`}
          />
        ) : (
          <OutletShowcaseMedia
            outletId={outletId}
            caption={`§ ${meta.kicker}`}
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        )}
      </Reveal>
      <HoursTable hours={outletHours[outletId]} />
    </Box>
  );
}
