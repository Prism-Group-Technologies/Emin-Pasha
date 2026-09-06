import { Box } from "@/components/atoms/Box";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import { HERO_SCRIM } from "@/components/organisms/Header/constants";
import { placeholderImageSrc } from "@/config/assets";
import { HeroBookingWidget, getBookingWidgetData } from "@/containers/booking";
import { activeHero } from "@/containers/home/constants";
import { ScrollCue } from "@/containers/home/molecules/ScrollCue";
import { HeroMedia } from "@/containers/home/organisms/HeroMedia";

/**
 * A Server Component. The poster is the LCP element, so it is a `next/image`
 * with `priority` **in the server HTML** — it starts downloading from the
 * document parse, not after hydration. Only the video layer beneath is a
 * client island (`HeroMedia`).
 *
 * CLS: the section is `100svh` with the poster `fill`-ing it, so the hero
 * occupies its final size before any image byte arrives. `svh` rather than
 * `vh` deliberately — on mobile `100vh` is taller than the visible viewport
 * until the URL bar collapses, which shifts everything below the fold.
 */
export function HeroVideo() {
  const bookingData = getBookingWidgetData();

  return (
    <Box
      component="section"
      aria-label={activeHero.headline}
      sx={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden" }}
    >
      <Image
        src={placeholderImageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <HeroMedia />
      <Box sx={{ position: "absolute", inset: 0, backgroundImage: HERO_SCRIM }} />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(11,11,10,0.35)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 6,
          px: { xs: 5, md: 8 },
          pb: { xs: 8, md: 9 },
          color: "common.white",
        }}
      >
        <Box sx={{ maxWidth: "22ch" }}>
          <Text
            component="h1"
            sx={{
              fontFamily: "var(--font-display)",
              fontSize: { xs: "2.4375rem", md: "4.75rem" },
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              mb: 3,
            }}
          >
            {activeHero.headline}
          </Text>
          <Text variant="subtitle1" sx={{ opacity: 0.92 }}>
            {activeHero.subheadline}
          </Text>
        </Box>
        <HeroBookingWidget data={bookingData} />
      </Box>
      <ScrollCue />
    </Box>
  );
}
