"use client";

import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Modal } from "@/components/molecules/Modal";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { roomGallerySection } from "@/containers/accommodation/copy";
import type { LightboxState } from "@/hooks/useLightbox";
import { useSwipe } from "@/hooks/useSwipe";
import type { AssetRef } from "@/schemas/content/assetRef";
import { radiusTokens } from "@/theme/tokens";

export interface RoomLightboxProps {
  photos: AssetRef[];
  lightbox: LightboxState;
  roomName: string;
}

const navSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  bgcolor: "rgba(11,11,10,0.55)",
  color: "#FBFAF7",
  "&:hover, &:focus-visible": { bgcolor: "rgba(11,11,10,0.8)" },
} as const;

/**
 * The enlarged view. Focus trapping, Escape and focus restoration come from
 * the shared `Modal`; `useLightbox` adds arrow / Home / End keys and
 * `useSwipe` adds the horizontal drag, so the mosaic is fully operable by
 * keyboard, pointer and thumb alike.
 *
 * The footer is the point of the whole band: a guest who has just looked at
 * every angle of a room is the likeliest to book it, and making them close
 * the dialog and hunt for the widget is where that intent is usually lost.
 * The CTA closes the lightbox on its way to `#book` so the anchor lands on a
 * widget that is actually on screen.
 *
 * The stage is capped by viewport height through the photograph's own ratio,
 * so a tall screen never pushes the caption below the fold.
 */
export function RoomLightbox({ photos, lightbox, roomName }: RoomLightboxProps) {
  const swipe = useSwipe({ onNext: lightbox.next, onPrevious: lightbox.previous });
  const index = lightbox.index ?? 0;
  const shown = lightbox.index === null ? undefined : photos[lightbox.index];

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
          <Box
            {...swipe}
            sx={{
              position: "relative",
              alignSelf: "center",
              width: `min(100%, ${((52 * shown.width) / shown.height).toFixed(1)}vh)`,
              borderRadius: `${radiusTokens.md}px`,
              overflow: "hidden",
              touchAction: "pan-y",
              userSelect: "none",
            }}
          >
            <AssetImage key={shown.id} asset={shown} sizes="(max-width: 1200px) 100vw, 1100px" />
            <IconButton
              aria-label="Previous photograph"
              onClick={lightbox.previous}
              sx={{ ...navSx, left: 8 }}
            >
              <Icon name="chevron-left" />
            </IconButton>
            <IconButton
              aria-label="Next photograph"
              onClick={lightbox.next}
              sx={{ ...navSx, right: 8 }}
            >
              <Icon name="chevron-right" />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { sm: "center" },
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Box sx={{ display: "grid", gap: 1, minWidth: 0 }}>
              <Text variant="overline" component="p" color="text.secondary" aria-live="polite">
                {`${index + 1} of ${photos.length}`}
              </Text>
              <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                {shown.subject}
              </Text>
            </Box>
            <Button
              href={`#${BOOKING_ANCHOR_ID}`}
              onClick={lightbox.close}
              sx={{ flexShrink: 0, alignSelf: { xs: "stretch", sm: "center" } }}
            >
              {roomGallerySection.lightboxCta}
            </Button>
          </Box>
        </Stack>
      )}
    </Modal>
  );
}
