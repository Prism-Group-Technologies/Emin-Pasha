import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { spaGroupOffers, spaSections } from "@/containers/wellness/copy";
import { WellnessPackageCard } from "@/containers/wellness/molecules/WellnessPackageCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Group takeovers of the spa — a bridal morning and an executive reset day.
 * Reuses `WellnessPackageCard` unchanged (the offers are in the same
 * `WellnessPackage` shape), so the includes list, the indicative price and
 * the WhatsApp CTA render exactly as the packages band's do.
 */
export function SpaGroupsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.groups.eyebrow}
      heading={spaSections.groups.heading}
      description={spaSections.groups.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {spaGroupOffers.map((pkg, index) => (
          <Reveal key={pkg.id} index={index} fill>
            <WellnessPackageCard pkg={pkg} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "72ch" }}>
        Group prices are indicative and per person. Composition, dietary needs, timings and group
        terms are set with the wellness desk when you book.
      </Text>
    </SectionShell>
  );
}
