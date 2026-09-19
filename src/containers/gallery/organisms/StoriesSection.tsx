import { Stack } from "@/components/atoms/Stack";
import { SectionShell } from "@/components/templates/SectionShell";
import { galleryImage } from "@/containers/gallery/catalogue";
import { sections } from "@/containers/gallery/copy/sections";
import { stories } from "@/containers/gallery/copy/stories";
import { StoryChapter } from "@/containers/gallery/molecules/StoryChapter";
import { whatsappGalleryViewUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

/** Three editorial chapters — first light, golden hour, lantern light — alternating sides. */
export function StoriesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      variant="raised"
      motion={motion}
      eyebrow={sections.stories.eyebrow}
      heading={sections.stories.heading}
      description={sections.stories.description}
    >
      <Stack spacing={{ xs: 8, md: 10 }}>
        {stories.map((story, index) => (
          <StoryChapter
            key={story.id}
            story={story}
            asset={galleryImage(story.assetId)}
            whatsappHref={whatsappGalleryViewUrl(story.title)}
            flip={index % 2 === 1}
          />
        ))}
      </Stack>
    </SectionShell>
  );
}
