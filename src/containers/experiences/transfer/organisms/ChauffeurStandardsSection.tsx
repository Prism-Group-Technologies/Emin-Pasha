import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { StatBlock } from "@/components/molecules/StatBlock";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { chauffeurStandards, chauffeurs } from "@/containers/experiences/transfer/copy/chauffeurs";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { ChauffeurCard } from "@/containers/experiences/transfer/molecules/ChauffeurCard";
import type { RevealDirection } from "@/theme/motion";

const { standards } = transferSections;

/**
 * "Your chauffeur" — four standards as stat blocks over three profile cards.
 * Putting faces and names to the service is what turns "a driver" into "my
 * driver", the single biggest trust lever for a traveller landing at night.
 */
export function ChauffeurStandardsSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={standards.eyebrow}
      heading={standards.heading}
      description={standards.description}
      variant={variant}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 5, md: 6 },
          mb: { xs: 7, md: 8 },
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" },
        }}
      >
        {chauffeurStandards.map((standard) => (
          <StatBlock key={standard.label} value={standard.value} label={standard.label} />
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        {chauffeurs.map((chauffeur, index) => (
          <Reveal key={chauffeur.id} index={index} fill>
            <ChauffeurCard chauffeur={chauffeur} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
