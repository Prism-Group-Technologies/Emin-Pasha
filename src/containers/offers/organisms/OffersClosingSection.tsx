import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { contrastMutedSx } from "@/components/templates/sectionShellStyles";
import { sections } from "@/containers/offers/copy";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { identity } from "@/content/identity";
import { telephoneUrl, whatsappOffersUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";
import { colorTokens } from "@/theme/tokens";

const { closing } = sections;

/**
 * The last exit, on the dark contrast band so it cannot be scrolled past as
 * one more light section: claim on WhatsApp, or call. The band is fixed-dark
 * in both schemes, so its ghost button carries explicit light colours — the
 * same treatment as `HeroActions` and the contact closing band.
 */
export function OffersClosingSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="contrast" motion={motion}>
      <Reveal direction={motion}>
        <Box sx={{ maxWidth: "60ch", mx: "auto", textAlign: "center" }}>
          <Text
            variant="overline"
            component="p"
            sx={{ fontFamily: "var(--font-cartographic)", color: colorTokens.gold[300], mb: 4 }}
          >
            {closing.eyebrow}
          </Text>
          <Text variant="h2" component="h2" sx={{ mb: 4, textWrap: "balance" }}>
            {closing.heading}
          </Text>
          <Text variant="subtitle1" sx={[contrastMutedSx, { mb: 6, textWrap: "pretty" }]}>
            {closing.supporting}
          </Text>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
            <ClaimOnWhatsApp href={whatsappOffersUrl} label={closing.whatsapp} size="large" />
            <Button
              href={telephoneUrl}
              size="large"
              variant="ghost"
              startIcon={<Icon name="phone" />}
              sx={{ color: "common.white", borderColor: "rgba(251,250,247,0.6)" }}
            >
              {`${closing.call} ${identity.telephone}`}
            </Button>
          </Box>
        </Box>
      </Reveal>
    </SectionShell>
  );
}
