import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { PACKAGES_ANCHOR_ID } from "@/containers/wellness/anchors";
import { packagesNote, sections, wellnessPackages } from "@/containers/wellness/copy";
import { WellnessPackageCard } from "@/containers/wellness/molecules/WellnessPackageCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Three bundled wellness days — a half day for one, an afternoon for two, a
 * reset for a team. Each card routes to the WhatsApp desk with the intent
 * already named. Prices are flagged indicative here and on every card.
 *
 * `variant` defaults to the plain band; a page passes `"raised"` when the
 * section sits between two plain bands and needs a tonal step.
 */
export function WellnessPackagesSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      id={PACKAGES_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.packages.eyebrow}
      heading={sections.packages.heading}
      description={sections.packages.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {wellnessPackages.map((pkg, index) => (
          <Reveal key={pkg.id} index={index} fill>
            <WellnessPackageCard pkg={pkg} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {packagesNote}
      </Text>
    </SectionShell>
  );
}
