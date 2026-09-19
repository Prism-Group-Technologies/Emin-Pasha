import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { diningPackages, packagesNote, sections } from "@/containers/dining/copy";
import { DiningPackageCard } from "@/containers/dining/molecules/DiningPackageCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Four ways to book the property for a group — the chef's table, the private
 * room, a rooftop takeover, a working meal. Each card routes to the same
 * reservation form with the occasion noted. No package invents a facility;
 * see `copy/packages.ts`.
 */
export function PrivateDiningSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.privateDining.eyebrow}
      heading={sections.privateDining.heading}
      description={sections.privateDining.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
        }}
      >
        {diningPackages.map((pkg, index) => (
          <Reveal key={pkg.id} index={index} fill>
            <DiningPackageCard pkg={pkg} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {packagesNote}
      </Text>
    </SectionShell>
  );
}
