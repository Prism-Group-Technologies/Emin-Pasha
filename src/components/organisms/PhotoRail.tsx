"use client";

import { useMemo } from "react";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { LightboxMeta } from "@/components/molecules/LightboxMeta";
import { LightboxStage } from "@/components/molecules/LightboxStage";
import { LightboxThumbStrip } from "@/components/molecules/LightboxThumbStrip";
import { Modal } from "@/components/molecules/Modal";
import { PhotoRailFrame } from "@/components/molecules/PhotoRailFrame";
import type { LightboxPhoto } from "@/components/molecules/lightboxPhoto";
import { useLightbox } from "@/hooks/useLightbox";
import { toZoomImage } from "@/utils/imageZoom";

export interface PhotoRailProps {
  photos: LightboxPhoto[];
  /** Names the rail for screen readers, e.g. "The estate dressed for a celebration". */
  "aria-label": string;
  /** Dialog heading when a frame is enlarged. */
  title: string;
}

/**
 * A swipeable rail of captioned photographs, every one of which opens a
 * full-screen lightbox.
 *
 * Why a rail and not a single-image slider: the research on venue galleries is
 * consistent that engagement falls away after about the fifth slide and few
 * visitors ever reach the tenth, so a one-at-a-time hero would bury most of a
 * twelve-frame set. A rail shows four or five at once, signals with a cut-off
 * frame that there is more, and — crucially — every frame is in the HTML, so
 * nothing is hidden from a crawler or a reader who never drags.
 *
 * Why a rail *and* a lightbox: the rail answers "what is there", the lightbox
 * answers "show me properly". Both routes reach all N photographs — the rail
 * by scrolling, the lightbox by arrows, swipe, Home/End or the thumbnail
 * strip — which is what "users can view all images" has to mean.
 *
 * Built on the same `useLightbox` / `LightboxStage` / `LightboxThumbStrip`
 * pieces the gallery wall uses, so focus trapping, Escape, arrow keys and
 * focus restoration are the behaviour already shipped and tested rather than a
 * second implementation. No carousel library: CSS `scroll-snap` gives native
 * touch momentum for free, and the nearest dependency would have cost 7–47KB
 * to replace behaviour the platform already has.
 */
export function PhotoRail({ photos, "aria-label": ariaLabel, title }: PhotoRailProps) {
  // Rail frame and lightbox entry are paired up front rather than indexed out
  // of two lists, so the two can never drift: a slot with no photograph
  // delivered yet drops out of both at once instead of shifting the modal's
  // numbering by one against the rail the visitor just clicked.
  const { entries, zooms } = useMemo(() => {
    const paired = photos.flatMap((photo) => {
      const zoom = toZoomImage(photo.asset, photo.caption);
      return zoom ? [{ photo, zoom }] : [];
    });
    return { entries: paired, zooms: paired.map((entry) => entry.zoom) };
  }, [photos]);
  const lightbox = useLightbox(entries.length);
  const index = lightbox.index ?? 0;
  const shown = entries[index];

  if (entries.length === 0) {
    return null;
  }

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Box
        role="group"
        aria-label={ariaLabel}
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: { xs: "82%", sm: "48%", md: "31%" },
          gap: { xs: 3, md: 4 },
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          pb: 2,
          // Bleed to the screen edge on phones so the cut-off frame reads as
          // "there is more", not as a layout mistake.
          mx: { xs: -2, md: 0 },
          px: { xs: 2, md: 0 },
        }}
      >
        {entries.map(({ photo }, position) => (
          <PhotoRailFrame key={photo.id} photo={photo} onOpen={() => lightbox.openAt(position)} />
        ))}
      </Box>

      <Button
        variant="ghost"
        onClick={() => lightbox.openAt(0)}
        sx={{ justifySelf: "start", alignSelf: "flex-start" }}
      >
        {`View all ${entries.length} photographs`}
      </Button>

      <Modal open={lightbox.open} onClose={lightbox.close} title={title} maxWidth="lg" dense>
        {shown && (
          <Stack spacing={{ xs: 3, md: 4 }}>
            <LightboxStage
              image={shown.zoom}
              onNext={lightbox.next}
              onPrevious={lightbox.previous}
            />
            <LightboxMeta
              position={index + 1}
              count={entries.length}
              caption={shown.zoom.caption}
            />
            <LightboxThumbStrip images={zooms} activeIndex={index} onSelect={lightbox.openAt} />
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}
