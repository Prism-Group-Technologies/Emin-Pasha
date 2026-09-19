import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { MEMBERSHIP_ANCHOR_ID } from "@/containers/wellness/anchors";
import {
  classTimetable,
  membershipNote,
  membershipTiers,
  sections,
} from "@/containers/wellness/copy";
import { ClassTimetable } from "@/containers/wellness/molecules/ClassTimetable";
import { MembershipTierCard } from "@/containers/wellness/molecules/MembershipTierCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Gym membership tiers and a sample class timetable — the conversion surface
 * for "gym membership Nakasero". Rates and times are flagged indicative; the
 * CTA on every tier goes to the WhatsApp desk to be priced.
 */
export function MembershipSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={MEMBERSHIP_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.membership.eyebrow}
      heading={sections.membership.heading}
      description={sections.membership.description}
    >
      <Stack spacing={7}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 5, md: 6 },
            alignItems: "stretch",
          }}
        >
          {membershipTiers.map((tier, index) => (
            <Reveal key={tier.id} index={index} fill>
              <MembershipTierCard tier={tier} />
            </Reveal>
          ))}
        </Box>

        <Text variant="body2" color="text.secondary" sx={{ maxWidth: "72ch" }}>
          {membershipNote}
        </Text>

        <Box>
          <Text variant="h4" component="h3" sx={{ mb: 4 }}>
            A week of classes
          </Text>
          <ClassTimetable slots={classTimetable} />
        </Box>
      </Stack>
    </SectionShell>
  );
}
