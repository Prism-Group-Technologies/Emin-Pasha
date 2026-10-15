"use client";

import { Stack } from "@/components/atoms/Stack";
import { LightboxMeta } from "@/components/molecules/LightboxMeta";
import { LightboxStage } from "@/components/molecules/LightboxStage";
import { LightboxThumbStrip, THUMB_STRIP_MIN } from "@/components/molecules/LightboxThumbStrip";
import { Modal } from "@/components/molecules/Modal";
import type { ImageZoomState } from "@/hooks/useImageZoom";

export interface ImageZoomDialogProps {
  zoom: ImageZoomState;
}

/**
 * The site-wide image modal: any photograph on the site, enlarged over a
 * blurred page.
 *
 * It is assembled from the pieces the gallery wall and the room mosaic
 * already use — the `Modal` molecule brings the blurred scrim, focus trapping,
 * Escape and focus restoration; `LightboxStage` brings the capped frame,
 * overlaid arrows and swipe; `LightboxThumbStrip` the film strip. Nothing
 * about enlarging a photograph is implemented twice.
 *
 * The caption is the dialog's accessible name rather than a line in the body,
 * so it is announced on open and is not repeated underneath — which leaves
 * `LightboxMeta` carrying only the counter, and nothing at all for a set of
 * one, where "1 of 1" and a restated caption are both noise.
 */
export function ImageZoomDialog({ zoom }: ImageZoomDialogProps) {
  const shown = zoom.images[zoom.index];
  const count = zoom.images.length;

  return (
    <Modal open={zoom.open} onClose={zoom.close} title={shown?.caption ?? ""} maxWidth="lg" dense>
      {shown && (
        <Stack spacing={{ xs: 3, md: 4 }}>
          <LightboxStage
            image={shown}
            onNext={zoom.next}
            onPrevious={zoom.previous}
            navigable={count > 1}
          />
          {count > 1 && <LightboxMeta position={zoom.index + 1} count={count} />}
          {count >= THUMB_STRIP_MIN && (
            <LightboxThumbStrip
              images={zoom.images}
              activeIndex={zoom.index}
              onSelect={zoom.select}
            />
          )}
        </Stack>
      )}
    </Modal>
  );
}
