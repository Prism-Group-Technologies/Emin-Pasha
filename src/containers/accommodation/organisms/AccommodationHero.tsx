import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { HeroShell } from "@/components/molecules/HeroShell";
import { placeholderImageSrc } from "@/config/assets";
import { heroCopy } from "@/containers/accommodation/copy";
import { HeroStatRail } from "@/containers/accommodation/molecules/HeroStatRail";

/**
 * The above-the-fold pitch. Composes the shared `HeroShell` (priority image =
 * LCP, gradient scrim, bottom-aligned overlay column) and stays type-led:
 * there is no booking widget here — the page carries a dedicated "check
 * dates" section and the sitewide sticky bar — so the hero stays fast and its
 * two CTAs are in-page anchors to that widget and to the comparison table.
 */
export function AccommodationHero({ lede }: { lede: string }) {
  return (
    <HeroShell
      imageSrc={placeholderImageSrc}
      label="Rooms & Suites"
      minHeight={{ xs: 560, md: 680 }}
    >
      <Box sx={{ maxWidth: "38ch", display: "grid", gap: 3 }}>
        <Text
          variant="overline"
          component="p"
          sx={{ fontFamily: "var(--font-cartographic)", letterSpacing: "0.16em", opacity: 0.9 }}
        >
          {heroCopy.eyebrow}
        </Text>
        <Text
          component="h1"
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: { xs: "2.5rem", md: "4rem" },
            lineHeight: 1.03,
            letterSpacing: "-0.015em",
            textWrap: "balance",
          }}
        >
          {heroCopy.headline}
        </Text>
        <Text variant="subtitle1" sx={{ opacity: 0.92, textWrap: "pretty" }}>
          {lede}
        </Text>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Button href={heroCopy.primaryCta.href} size="large">
          {heroCopy.primaryCta.label}
        </Button>
        <Button
          href={heroCopy.secondaryCta.href}
          variant="ghost"
          size="large"
          sx={{ color: "common.white", borderColor: "rgba(251,250,247,0.6)" }}
        >
          {heroCopy.secondaryCta.label}
        </Button>
      </Box>

      <HeroStatRail stats={heroCopy.stats} />
    </HeroShell>
  );
}
