import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { INTRO_CTA_HREFS } from "@/containers/home/constants";
import { introLede, introStats } from "@/containers/home/copy";
import { CtaPair } from "@/containers/home/molecules/CtaPair";
import { ImageCarousel } from "@/containers/home/molecules/ImageCarousel";
import { TrustItem } from "@/containers/home/molecules/TrustItem";
import { assets } from "@/content/assets";
import { site } from "@/content/site";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

/**
 * The five room frames beside the copy, resolved here in the Server Component
 * and handed to the client island as plain props — the carousel must never
 * import the photography registry itself (DECISIONS.md D25).
 *
 * Read from `assets` by id rather than filtered by `page`, so the order below
 * is the display order and is not at the mercy of registry ordering.
 */
const COLLAGE_IDS = [
  "home-intro-room-1",
  "home-intro-room-2",
  "home-intro-room-3",
  "home-intro-room-4",
  "home-intro-room-5",
] as const;

const collageSlides = COLLAGE_IDS.map((id) => assets.find((asset) => asset.id === id)).filter(
  (asset): asset is NonNullable<typeof asset> => Boolean(asset),
);

const [storyHref = "/our-story", roomsHref = "/accommodation"] = INTRO_CTA_HREFS;
const [storyLabel = "Our Story", roomsLabel = "View Rooms"] = site.homepage.introCtas;

/**
 * The introduction: a display-sized lede, the two approved paragraphs, a stat
 * rail and the two CTAs, against the collage carousel.
 *
 * This is one of the two places on the page where a photograph earns its
 * keep — a hotel that sells "a garden estate in the middle of the capital"
 * has to show what it is selling somewhere above the fold-and-a-half.
 * Everything else on the page is type-led.
 *
 * It shows rooms, not the facade: the section's primary CTA is "View Rooms",
 * and a single exterior shot beside it was answering a question nobody in this
 * part of the page is asking. Five frames rather than one because the range —
 * Superior Room through Deluxe Suite — *is* the pitch, and a still frame can
 * only make it once.
 *
 * The carousel sits slightly low against the text baseline, which is the
 * collage device rather than a tidy 50/50 split.
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

        {collageSlides.length > 0 && (
          <Reveal index={1} direction={oppositeOf(motion)} media>
            <Box sx={{ mt: { md: 7 } }}>
              <ImageCarousel
                slides={collageSlides}
                sizes="(max-width: 900px) 100vw, 45vw"
                label="Rooms and suites"
              />
            </Box>
          </Reveal>
        )}
      </Box>
    </SectionShell>
  );
}
