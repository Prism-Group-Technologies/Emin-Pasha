import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { IconBadge } from "@/components/atoms/IconBadge";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { culinaryStory, sections } from "@/containers/dining/copy";
import { assets } from "@/content/assets";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const asset = assets.find((item) => item.id === "dining-sir-samuel-baker");

/**
 * The kitchen story: the dumbwaiter, the tri-continental menu and the
 * garden-to-pass sourcing, beside a photograph. Two columns that enter against
 * each other on desktop.
 */
export function CulinaryStorySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.story.eyebrow}
      heading={sections.story.heading}
      description={sections.story.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Stack spacing={5} sx={{ order: { xs: 2, md: 1 } }}>
          {culinaryStory.paragraphs.map((paragraph) => (
            <Text key={paragraph.slice(0, 24)} variant="body1" color="text.secondary">
              {paragraph}
            </Text>
          ))}
          <Box
            component="ul"
            sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 4, mt: 2 }}
          >
            {culinaryStory.highlights.map((highlight) => (
              <Box key={highlight.title} component="li" sx={{ display: "flex", gap: 3 }}>
                <IconBadge name={highlight.icon} size={44} />
                <Box sx={{ display: "grid", gap: 0.5 }}>
                  <Text variant="h5" component="h3">
                    {highlight.title}
                  </Text>
                  <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
                    {highlight.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>

        {asset && (
          <Box sx={{ order: { xs: 1, md: 2 } }}>
            <Reveal direction={oppositeOf(motion)} media>
              <MediaFrame>
                <AssetImage asset={asset} sizes="(max-width: 900px) 100vw, 45vw" />
              </MediaFrame>
            </Reveal>
          </Box>
        )}
      </Box>
    </SectionShell>
  );
}
