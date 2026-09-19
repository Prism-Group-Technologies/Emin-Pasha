import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { CheckList } from "@/containers/experiences/transfer/molecules/CheckList";
import type { Story } from "@/containers/gallery/copy/stories";
import { GalleryWhatsAppCta } from "@/containers/gallery/molecules/GalleryWhatsAppCta";
import { photoBadgeSx, roundedMediaSx } from "@/containers/gallery/styles";
import type { AssetRef } from "@/schemas/content/assetRef";
import type { RevealDirection } from "@/theme/motion";

export interface StoryChapterProps {
  story: Story;
  asset: AssetRef | undefined;
  whatsappHref: string;
  /** Odd chapters put the photograph on the right from `md`. */
  flip: boolean;
}

/**
 * One editorial chapter: a large photograph with its time-stamp badge beside
 * the story, the practical details and a WhatsApp CTA. Stacks image-first on a
 * phone whichever way it is flipped on desktop.
 */
export function StoryChapter({ story, asset, whatsappHref, flip }: StoryChapterProps) {
  const imageFrom: RevealDirection = flip ? "right" : "left";

  return (
    <Box
      component="article"
      sx={{
        display: "grid",
        gap: { xs: 4, md: 8 },
        alignItems: "center",
        gridTemplateColumns: { xs: "1fr", md: flip ? "5fr 6fr" : "6fr 5fr" },
      }}
    >
      <Box sx={{ order: { md: flip ? 2 : 1 } }}>
        <Reveal direction={imageFrom} media>
          <Box sx={roundedMediaSx}>
            {asset && <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 55vw" />}
            <Box sx={{ ...photoBadgeSx, position: "absolute", left: 16, bottom: 16 }}>
              <Text
                component="span"
                sx={{ fontFamily: "var(--font-cartographic)", fontSize: "0.8125rem" }}
              >
                {story.time}
              </Text>
            </Box>
          </Box>
        </Reveal>
      </Box>
      <Box sx={{ order: { md: flip ? 1 : 2 }, display: "grid", gap: 3 }}>
        <Text variant="h3" component="h3" sx={{ textWrap: "balance" }}>
          {story.title}
        </Text>
        <Text variant="body1" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {story.body}
        </Text>
        <CheckList items={story.details} />
        <Box sx={{ pt: 1 }}>
          <GalleryWhatsAppCta
            href={whatsappHref}
            label={story.ctaLabel}
            variant="ghost"
            context={story.title}
          />
        </Box>
      </Box>
    </Box>
  );
}
