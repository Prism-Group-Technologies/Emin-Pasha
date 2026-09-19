import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { FLEET_ANCHOR_ID } from "@/containers/experiences/transfer/anchors";
import { vehicles } from "@/containers/experiences/transfer/copy/fleet";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { FleetCard } from "@/containers/experiences/transfer/molecules/FleetCard";
import type { RevealDirection } from "@/theme/motion";

const { fleet } = transferSections;

/**
 * The fleet — the page's product shelf — on the dark `contrast` band, the
 * one emphatic ground on the page, with the cards staying light so the cars
 * read as a menu laid on black (the same treatment as the spa's flagship
 * ritual band). 1-up → 2×2 → a row of four from `lg`, never 3+1.
 */
export function FleetSection({
  motion = "up",
  variant = "contrast",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      id={FLEET_ANCHOR_ID}
      motion={motion}
      eyebrow={fleet.eyebrow}
      heading={fleet.heading}
      description={fleet.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {vehicles.map((vehicle, index) => (
          <Reveal key={vehicle.id} index={index} fill>
            <FleetCard vehicle={vehicle} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
