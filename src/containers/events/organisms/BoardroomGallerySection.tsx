import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { boardroomAsset, boardroomGalleryShots, boardroomSections } from "@/containers/events/copy";
import type { RevealDirection } from "@/theme/motion";

const { gallery } = boardroomSections;

/**
 * The room from every angle, as a horizontal scroll rail.
 *
 * Deliberately not the shared `GalleryStrip`: that one reads from
 * `copy/media.ts` placeholders across four different venues, whereas these are
 * eight real frames of a single room and the rail is the argument — a buyer
 * deciding on a private room wants to see all of it, not one flattering shot.
 * Scrolls inside its own container so the page body never scrolls sideways.
 */
export function BoardroomGallerySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={gallery.eyebrow}
      heading={gallery.heading}
      description={gallery.description}
    >
      <Reveal direction={motion} media>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: { xs: "82%", sm: "48%", md: "31%" },
            gap: { xs: 3, md: 4 },
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            pb: 2,
            mx: { xs: -2, md: 0 },
            px: { xs: 2, md: 0 },
          }}
        >
          {boardroomGalleryShots.map((shot) => {
            const asset = boardroomAsset(shot.assetId);
            if (!asset) {
              return null;
            }
            return (
              <Box key={shot.assetId} sx={{ scrollSnapAlign: "start", display: "grid", gap: 2 }}>
                <MediaFrame hoverZoom>
                  <AssetImage
                    asset={asset}
                    sizes="(max-width: 600px) 82vw, (max-width: 900px) 48vw, 31vw"
                  />
                </MediaFrame>
                <Text
                  variant="caption"
                  component="p"
                  sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
                >
                  {shot.caption}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Reveal>
    </SectionShell>
  );
}
