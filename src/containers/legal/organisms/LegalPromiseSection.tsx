import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { MediaFrame } from "@/components/atoms/MediaFrame";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { legalPromiseAsset, legalSections } from "@/containers/legal/copy";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { whatsappBookingUrl } from "@/lib/directions";
import { type RevealDirection, oppositeOf } from "@/theme/motion";

const { promise } = legalSections;

/**
 * The turn from reassurance to desire: trust earned on a legal page is the
 * best moment to invite a stay. A placeholder garden photograph beside the
 * discretion promise, three proof points and two booking CTAs.
 */
export function LegalPromiseSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell motion="none">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 6fr)" },
          gap: { xs: 6, md: 9 },
          alignItems: "center",
        }}
      >
        <Reveal direction={motion} media>
          <MediaFrame radius="xl" hoverZoom sx={{ maxWidth: { xs: 420, md: "none" }, mx: "auto" }}>
            <AssetImage asset={legalPromiseAsset} sizes="(max-width: 900px) 100vw, 45vw" />
          </MediaFrame>
        </Reveal>
        <Reveal direction={oppositeOf(motion)}>
          <Box sx={{ display: "grid", gap: 4 }}>
            <Text
              variant="overline"
              component="p"
              sx={{ fontFamily: "var(--font-cartographic)", color: "text.secondary" }}
            >
              {promise.eyebrow}
            </Text>
            <Text variant="h2" component="h2" sx={{ textWrap: "balance" }}>
              {promise.heading}
            </Text>
            <Text variant="subtitle1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {promise.body}
            </Text>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2 }}>
              {promise.points.map((point) => (
                <Box
                  component="li"
                  key={point}
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <Icon
                    name="check-circle"
                    fontSize="small"
                    aria-hidden
                    sx={{ color: "primary.main" }}
                  />
                  <Text>{point}</Text>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, pt: 2 }}>
              <Button href="/accommodation" size="large">
                {promise.primaryCta}
              </Button>
              <ClaimOnWhatsApp
                href={whatsappBookingUrl}
                label={promise.secondaryCta}
                variant="ghost"
                size="large"
              />
            </Box>
          </Box>
        </Reveal>
      </Box>
    </SectionShell>
  );
}
