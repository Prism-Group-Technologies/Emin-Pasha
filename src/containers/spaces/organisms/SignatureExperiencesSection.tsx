import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { signatureExperiences } from "@/containers/spaces/copy/experiences";
import { sections } from "@/containers/spaces/copy/sections";
import { ExperienceCard } from "@/containers/spaces/molecules/ExperienceCard";
import { spaces } from "@/content/spaces";
import type { RevealDirection } from "@/theme/motion";

const NAMES = new Map(spaces.map((space) => [space.id, space.name]));

/** Six priced, reservable rituals — the page's "reasons to book ahead". */
export function SignatureExperiencesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.experiences.eyebrow}
      heading={sections.experiences.heading}
      description={sections.experiences.description}
    >
      <Box
        sx={{
          display: "grid",
          gap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        {signatureExperiences.map((experience, index) => (
          <Reveal key={experience.id} index={index} fill>
            <ExperienceCard
              experience={experience}
              spaceName={NAMES.get(experience.spaceId) ?? ""}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
