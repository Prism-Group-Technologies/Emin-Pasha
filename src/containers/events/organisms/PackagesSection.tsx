import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { PACKAGES_ANCHOR_ID } from "@/containers/events/anchors";
import { eventPackages, packagesNote, sections } from "@/containers/events/copy";
import { EventPackageCard } from "@/containers/events/molecules/EventPackageCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The bundled delegate packages — day-delegate, residential, board dinner and
 * garden wedding. Each card routes to the RFP form. Every rate is an invented
 * placeholder and flagged as such on the card and in the note below the grid;
 * see `copy/packages.ts`.
 */
export function PackagesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={PACKAGES_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.packages.eyebrow}
      heading={sections.packages.heading}
      description={sections.packages.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {eventPackages.map((pkg, index) => (
          <Reveal key={pkg.id} index={index} fill>
            <EventPackageCard pkg={pkg} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        {packagesNote}
      </Text>
    </SectionShell>
  );
}
