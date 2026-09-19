import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { deskTeam, sections } from "@/containers/contact/copy";
import { DeskMemberCard } from "@/containers/contact/molecules/DeskMemberCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The people behind the inbox. Faces and languages turn "contact us" into
 * "talk to Amina on the desk", which is the strongest argument a boutique hotel has against
 * a booking site. Profiles are placeholders (see `copy/team.ts`).
 */
export function TeamSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.team.eyebrow}
      heading={sections.team.heading}
      description={sections.team.description}
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
        }}
      >
        {deskTeam.map((member, index) => (
          <Reveal key={member.id} index={index} fill>
            <DeskMemberCard member={member} ctaPrefix={sections.team.cta} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
