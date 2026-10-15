"use client";

import { useMemo } from "react";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { LightboxMeta } from "@/components/molecules/LightboxMeta";
import { LightboxStage } from "@/components/molecules/LightboxStage";
import { LightboxThumbStrip, THUMB_STRIP_MIN } from "@/components/molecules/LightboxThumbStrip";
import { Modal } from "@/components/molecules/Modal";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { roomGallerySection } from "@/containers/accommodation/copy";
import type { LightboxState } from "@/hooks/useLightbox";
import type { AssetRef } from "@/schemas/content/assetRef";
import { toZoomImage } from "@/utils/imageZoom";

export interface RoomLightboxProps {
  photos: AssetRef[];
  lightbox: LightboxState;
  roomName: string;
}

/**
 * The enlarged view. Focus trapping, Escape and focus restoration come from
 * the shared `Modal`; `useLightbox` adds arrow / Home / End keys and
 * `LightboxStage` adds the capped frame, the overlaid arrows and the
 * horizontal drag — so the mosaic is fully operable by keyboard, pointer and
 * thumb alike.
 *
 * The stage, the meta line and the film strip are the shared molecules rather
 * than a second copy of each: this file used to re-implement the stage down to
 * its own `52vh` cap and its own pair of arrow buttons, which is two places to
 * fix the next time the enlarged view changes.
 *
 * The footer is the point of the whole band: a guest who has just looked at
 * every angle of a room is the likeliest to book it, and making them close the
 * dialog and hunt for the widget is where that intent is usually lost. The CTA
 * closes the lightbox on its way to `#book` so the anchor lands on a widget
 * that is actually on screen.
 */
export function RoomLightbox({ photos, lightbox, roomName }: RoomLightboxProps) {
  const images = useMemo(() => photos.flatMap((asset) => toZoomImage(asset) ?? []), [photos]);
  const index = lightbox.index ?? 0;
  const shown = images[index];

  return (
    <Modal
      open={lightbox.open}
      onClose={lightbox.close}
      title={`${roomName} — photographs`}
      maxWidth="lg"
      dense
    >
      {shown && (
        <Stack spacing={{ xs: 3, md: 4 }}>
          <LightboxStage
            image={shown}
            onNext={lightbox.next}
            onPrevious={lightbox.previous}
            navigable={images.length > 1}
          />
          <LightboxMeta
            position={index + 1}
            count={images.length}
            caption={shown.caption}
            action={
              <Button href={`#${BOOKING_ANCHOR_ID}`} onClick={lightbox.close} fullWidth>
                {roomGallerySection.lightboxCta}
              </Button>
            }
          />
          {images.length >= THUMB_STRIP_MIN && (
            <LightboxThumbStrip images={images} activeIndex={index} onSelect={lightbox.openAt} />
          )}
        </Stack>
      )}
    </Modal>
  );
}
