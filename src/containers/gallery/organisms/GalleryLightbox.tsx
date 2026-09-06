"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Modal } from "@/components/molecules/Modal";
import type { useLightbox } from "@/containers/gallery/hooks/useLightbox";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface GalleryLightboxProps {
  items: AssetRef[];
  lightbox: ReturnType<typeof useLightbox>;
}

/**
 * The enlarged view. Focus trapping, Escape and focus restoration come from
 * the shared `Modal` molecule (MUI `Dialog`); `useLightbox` adds arrow-key
 * navigation on top, so the gallery is fully operable without a pointer.
 */
export function GalleryLightbox({ items, lightbox }: GalleryLightboxProps) {
  const shown = lightbox.index !== null ? items[lightbox.index] : undefined;

  return (
    <Modal
      open={lightbox.open}
      onClose={lightbox.close}
      title={shown?.altText || shown?.subject || "Gallery"}
      actions={
        <Stack direction="row" spacing={2}>
          <Button
            variant="ghost"
            onClick={lightbox.previous}
            startIcon={<Icon name="chevron-left" />}
          >
            Previous
          </Button>
          <Button variant="ghost" onClick={lightbox.next}>
            Next
          </Button>
        </Stack>
      }
    >
      {shown && (
        <Stack spacing={3}>
          <AssetImage asset={shown} sizes="90vw" priority />
          <Text variant="body2" color="text.secondary">
            {`${(lightbox.index ?? 0) + 1} of ${items.length}`}
          </Text>
        </Stack>
      )}
    </Modal>
  );
}
