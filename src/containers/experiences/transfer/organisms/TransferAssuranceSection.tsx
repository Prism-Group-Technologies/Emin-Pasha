import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { transferAssurance } from "@/containers/experiences/transfer/copy/journey";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { AssuranceBar } from "@/containers/wellness/molecules/AssuranceBar";
import type { RevealDirection } from "@/theme/motion";

const { assurance } = transferSections;

/**
 * The credibility strip straight under the hero — six reasons to book with
 * the hotel rather than take a taxi at the kerb. Reuses the wellness
 * `AssuranceBar` (2-up → 3-up → 6-up), fed transfer-specific items.
 */
export function TransferAssuranceSection({
  motion = "up",
  variant = "raised",
}: {
  motion?: RevealDirection;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={assurance.eyebrow}
      heading={assurance.heading}
      variant={variant}
    >
      <AssuranceBar items={transferAssurance} />
    </SectionShell>
  );
}
