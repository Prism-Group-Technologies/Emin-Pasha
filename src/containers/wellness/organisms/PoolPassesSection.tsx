import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { MEMBERSHIP_ANCHOR_ID } from "@/containers/wellness/anchors";
import { poolPasses, poolPassesNote } from "@/containers/wellness/copy/poolPasses";
import { poolSections } from "@/containers/wellness/copy/poolSections";
import { MembershipTierCard } from "@/containers/wellness/molecules/MembershipTierCard";
import type { RevealDirection } from "@/theme/motion";

const { passes } = poolSections;

/**
 * Repeat-visit pricing for the pool — a ten-swim card, a monthly Swim Season
 * and a Family Year. Reuses `MembershipTierCard` unchanged (the tiers are in
 * the gym's `MembershipTier` shape), so the "Most popular" flag and the
 * WhatsApp CTA render exactly as the gym's do. Rates flagged indicative.
 */
export function PoolPassesSection({
  motion = "up",
  variant = "default",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      id={MEMBERSHIP_ANCHOR_ID}
      motion={motion}
      eyebrow={passes.eyebrow}
      heading={passes.heading}
      description={passes.description}
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
        {poolPasses.map((tier, index) => (
          <Reveal key={tier.id} index={index} fill>
            <MembershipTierCard tier={tier} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "72ch" }}>
        {poolPassesNote}
      </Text>
    </SectionShell>
  );
}
