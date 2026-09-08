import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { COMPARISON_ANCHOR_ID } from "@/containers/accommodation/constants";
import { comparisonSection } from "@/containers/accommodation/copy";
import { ComparisonCards } from "@/containers/accommodation/molecules/ComparisonCards";
import { ComparisonTable } from "@/containers/accommodation/organisms/ComparisonTable";
import { rooms } from "@/content/rooms";
import type { RevealDirection } from "@/theme/motion";

/**
 * The four categories side by side, and the target of the hero's "compare
 * the rooms" anchor. On the raised surface so it reads as a decision aid set
 * apart from the browsing grid above it. A real table from `md` up; a stack
 * of per-room cards below it, where the table would scroll sideways.
 */
export function ComparisonSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={COMPARISON_ANCHOR_ID}
      motion={motion}
      eyebrow={comparisonSection.eyebrow}
      heading={comparisonSection.heading}
      description={comparisonSection.description}
      variant="raised"
    >
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ComparisonTable rooms={rooms} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <ComparisonCards rooms={rooms} />
      </Box>
    </SectionShell>
  );
}
