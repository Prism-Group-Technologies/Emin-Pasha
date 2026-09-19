import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { spaPasses, spaPassesNote, spaSections } from "@/containers/wellness/copy";
import { MembershipTierCard } from "@/containers/wellness/molecules/MembershipTierCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Repeat-visit pricing for the spa — a single visit, the Monthly Spa Club
 * and the Annual. Reuses `MembershipTierCard` unchanged (the tiers are in the
 * same `MembershipTier` shape), so the card, the "Most popular" flag and the
 * WhatsApp CTA all render exactly as the gym's do. Rates flagged indicative.
 */
export function SpaPassesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.passes.eyebrow}
      heading={spaSections.passes.heading}
      description={spaSections.passes.description}
      variant="raised"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {spaPasses.map((tier, index) => (
          <Reveal key={tier.id} index={index} fill>
            <MembershipTierCard tier={tier} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "72ch" }}>
        {spaPassesNote}
      </Text>
    </SectionShell>
  );
}
