import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { PreselectButton } from "@/containers/experiences/transfer/molecules/PreselectButton";
import { type RevealDirection } from "@/theme/motion";
import { colorTokens } from "@/theme/tokens";

const { benefit } = transferSections;
const { ink, gold } = colorTokens;

/**
 * The approved §8 long-stay benefit ("complimentary on stays of more than
 * one week") given its own emphatic band, because it is the page's strongest
 * cross-sell: it turns a transfer enquiry into a longer room booking.
 *
 * Runs on the fixed dark `contrast` band, so its type uses the band's fixed
 * `contrastCopy` / `contrastMuted` / gold tokens rather than scheme-dependent
 * text colours — identical and legible in light and dark mode. The ghost
 * button carries an explicit light border for the same reason as the hero's.
 */
export function LongStayBenefitSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell variant="contrast" motion={motion}>
      <Reveal direction={motion}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, md: 8 },
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "auto minmax(0, 1fr) auto" },
          }}
        >
          <IconBadge name="king-bed" size={72} />
          <Box sx={{ display: "grid", gap: 3, maxWidth: "60ch" }}>
            <Text
              variant="overline"
              component="p"
              sx={{ fontFamily: "var(--font-cartographic)", color: gold[300] }}
            >
              {benefit.eyebrow}
            </Text>
            <Text variant="h3" component="h2" sx={{ color: ink.contrastCopy, textWrap: "balance" }}>
              {benefit.heading}
            </Text>
            <Text variant="body1" sx={{ color: ink.contrastMuted, textWrap: "pretty" }}>
              {benefit.supporting}
            </Text>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <PreselectButton label={benefit.primaryCtaLabel} preselect="service" value="return" />
            <Button
              href="/accommodation"
              variant="ghost"
              sx={{ color: ink.contrastCopy, borderColor: "rgba(251,250,247,0.6)" }}
            >
              {benefit.secondaryCtaLabel}
            </Button>
          </Box>
        </Box>
      </Reveal>
    </SectionShell>
  );
}
