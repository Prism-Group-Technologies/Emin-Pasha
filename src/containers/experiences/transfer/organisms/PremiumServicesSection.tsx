import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { premiumServices } from "@/containers/experiences/transfer/copy/inclusions";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { PremiumServiceCard } from "@/containers/experiences/transfer/molecules/PremiumServiceCard";
import type { RevealDirection } from "@/theme/motion";

const { premium } = transferSections;

/**
 * The two upsells — VIP meet & assist and chauffeur by the hour — as wide
 * photo-and-copy cards, stacked on phones and side by side from `lg`. Each
 * pre-selects its service in the booking form.
 */
export function PremiumServicesSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={premium.eyebrow}
      heading={premium.heading}
      description={premium.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {premiumServices.map((item, index) => (
          <Reveal key={item.id} index={index} fill>
            <PremiumServiceCard item={item} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
