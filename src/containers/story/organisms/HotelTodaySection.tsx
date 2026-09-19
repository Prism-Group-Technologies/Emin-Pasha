import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { HeroStat } from "@/components/organisms/PageHero/HeroStat";
import { SectionShell } from "@/components/templates/SectionShell";
import { hotelTodayCopy, hotelTodayFacts, sections } from "@/containers/story/copy";
import { assets } from "@/content/assets";
import type { RevealDirection } from "@/theme/motion";

const hotelImage = assets.find((asset) => asset.id === "story-the-hotel");

/**
 * The bridge from the man to the building: a photograph placeholder of the
 * house beside an invented précis and a rail of facts drawn from
 * `content/identity.ts`, with the exits into the rooms and the gardens.
 */
export function HotelTodaySection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.hotelToday.eyebrow}
      heading={sections.hotelToday.heading}
      description={sections.hotelToday.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
          gap: { xs: 5, md: 8 },
          alignItems: "center",
        }}
      >
        {hotelImage && <AssetImage asset={hotelImage} sizes="(max-width: 900px) 100vw, 620px" />}

        <Box>
          <Text variant="body1" color="text.secondary" sx={{ maxWidth: "58ch" }}>
            {hotelTodayCopy.body}
          </Text>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
              gap: 4,
              my: 6,
            }}
          >
            {hotelTodayFacts.map((fact) => (
              <HeroStat key={fact.label} value={fact.value} label={fact.label} />
            ))}
          </Box>
          <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
            <Button href={hotelTodayCopy.ctaHref}>{hotelTodayCopy.ctaLabel}</Button>
            <Button href={hotelTodayCopy.secondaryCtaHref} variant="ghost">
              {hotelTodayCopy.secondaryCtaLabel}
            </Button>
          </Stack>
        </Box>
      </Box>
    </SectionShell>
  );
}
