"use client";

import { Stack } from "@/components/atoms/Stack";
import { Modal } from "@/components/molecules/Modal";
import { LightboxCaption } from "@/containers/gallery/molecules/LightboxCaption";
import { LightboxStage } from "@/containers/gallery/molecules/LightboxStage";
import { LightboxThumbStrip } from "@/containers/gallery/molecules/LightboxThumbStrip";
import type { GalleryItem } from "@/containers/gallery/types";
import type { LightboxState } from "@/hooks/useLightbox";

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
 */
export function GalleryLightbox({ items, lightbox }: GalleryLightboxProps) {
  const index = lightbox.index ?? 0;
  const shown = lightbox.index !== null ? items[lightbox.index] : undefined;

  return (
    <Modal
      open={lightbox.open}
      onClose={lightbox.close}
      title={shown?.title ?? "Gallery"}
      maxWidth="lg"
      dense
    >
      {shown && (
        <Stack spacing={{ xs: 3, md: 4 }}>
          <LightboxStage item={shown} onNext={lightbox.next} onPrevious={lightbox.previous} />
          <LightboxCaption item={shown} position={index + 1} count={items.length} />
          <LightboxThumbStrip items={items} activeIndex={index} onSelect={lightbox.openAt} />
        </Stack>
      )}
    </Modal>
  );
}
