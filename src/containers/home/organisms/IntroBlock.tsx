import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { INTRO_CTA_HREFS } from "@/containers/home/constants";
import { introLede, introStats } from "@/containers/home/copy";
import { CtaPair } from "@/containers/home/molecules/CtaPair";
import { TrustItem } from "@/containers/home/molecules/TrustItem";
import { assets } from "@/content/assets";
import { site } from "@/content/site";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const collageAsset = assets.find((asset) => asset.id === "story-the-hotel");
const [storyHref = "/our-story", roomsHref = "/accommodation"] = INTRO_CTA_HREFS;
const [storyLabel = "Our Story", roomsLabel = "View Rooms"] = site.homepage.introCtas;

/**
 * The introduction: a display-sized lede, the two approved paragraphs, a stat
 * rail and the two CTAs, against the collage image.
 *
 * This is one of the two places on the page where a photograph earns its
 * keep — a hotel that sells "a garden estate in the middle of the capital"
 * has to show the garden somewhere above the fold-and-a-half. Everything else
 * on the page is type-led, because every image slot is still a placeholder.
 *
 * The image sits slightly low against the text baseline, which is the collage
 * device rather than a tidy 50/50 split.
 *
 * Copy and collage enter from opposite sides, so the two halves close on the
 * baseline together instead of sliding in as one block — the split is the
 * point of the layout, and the motion states it.
 */
export function IntroBlock({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion={motion}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" },
          gap: { xs: 6, md: 8 },
          alignItems: "start",
        }}
      >
        <Reveal direction={motion}>
          <Stack spacing={5}>
            <Text
              variant="h2"
              component="h2"
              sx={{ fontFamily: "var(--font-display)", textWrap: "balance" }}
            >
              {introLede}
            </Text>
            {site.homepage.introParagraphs.map((paragraph, index) => (
              <Text
                key={paragraph.slice(0, 24)}
                variant={index === 0 ? "subtitle1" : "body1"}
                color={index === 0 ? "text.primary" : "text.secondary"}
                sx={{ textWrap: "pretty" }}
              >
                {paragraph}
              </Text>
            ))}

            <Box
              component="ul"
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                pt: 3,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 4,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              {introStats.map((stat) => (
                <Box component="li" key={stat.label}>
                  <TrustItem value={stat.value} label={stat.label} />
                </Box>
              ))}
            </Box>

            <CtaPair
              section="intro"
              primary={{ label: roomsLabel, href: roomsHref }}
              secondary={{ label: storyLabel, href: storyHref }}
            />
          </Stack>
        </Reveal>

        {collageAsset && (
          <Reveal index={1} direction={oppositeOf(motion)} media>
            <Box sx={{ mt: { md: 7 } }}>
              <AssetImage asset={collageAsset} sizes="(max-width: 900px) 100vw, 45vw" />
            </Box>
          </Reveal>
        )}
      </Box>
    </SectionShell>
  );
}
