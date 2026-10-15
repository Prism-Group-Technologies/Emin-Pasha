"use client";

import { useMemo } from "react";

import { Stack } from "@/components/atoms/Stack";
import { LightboxStage } from "@/components/molecules/LightboxStage";
import { LightboxThumbStrip } from "@/components/molecules/LightboxThumbStrip";
import { Modal } from "@/components/molecules/Modal";
import { LightboxCaption } from "@/containers/gallery/molecules/LightboxCaption";
import type { GalleryItem } from "@/containers/gallery/types";
import type { LightboxState } from "@/hooks/useLightbox";
import type { ZoomImage } from "@/types/imageZoom";
import { toZoomImage } from "@/utils/imageZoom";

export interface GalleryLightboxProps {
  items: GalleryItem[];
  lightbox: LightboxState;
}

/**
 * The enlarged view: stage (swipe + overlaid arrows), the "book this view"
 * caption, and a thumbnail strip. Focus trapping, Escape and focus
 * restoration come from the shared `Modal` molecule (MUI `Dialog`);
 * `useLightbox` adds arrow / Home / End keys on top, so the gallery is fully
 * operable without a pointer.
 *
 * The stage and the strip are the shared `components/molecules` versions,
 * which speak `ZoomImage` rather than `GalleryItem` — the mapping below is the
 * whole cost of that, and it is what lets `PhotoRail` and the site-wide image
 * modal reuse the same two pieces. The offer-bearing caption stays here,
 * because selling a view is the gallery's job and no other surface wants it.
 */
export function GalleryLightbox({ items, lightbox }: GalleryLightboxProps) {
  const index = lightbox.index ?? 0;
  const shown = lightbox.index !== null ? items[lightbox.index] : undefined;

  const photos = useMemo<ZoomImage[]>(
    () => items.flatMap((item) => toZoomImage(item.asset, item.title) ?? []),
    [items],
  );
  const stage = shown ? toZoomImage(shown.asset, shown.title) : null;

  return (
    <Modal
      open={lightbox.open}
      onClose={lightbox.close}
      title={shown?.title ?? "Gallery"}
      maxWidth="lg"
      dense
    >
      {shown && stage && (
        <Stack spacing={{ xs: 3, md: 4 }}>
          <LightboxStage image={stage} onNext={lightbox.next} onPrevious={lightbox.previous} />
          <LightboxCaption item={shown} position={index + 1} count={items.length} />
          <LightboxThumbStrip images={photos} activeIndex={index} onSelect={lightbox.openAt} />
        </Stack>
      )}
    </Modal>
  );
}
