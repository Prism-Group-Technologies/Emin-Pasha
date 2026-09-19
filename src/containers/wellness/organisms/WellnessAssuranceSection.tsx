import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import type { FacilityId } from "@/containers/wellness/anchors";
import { assuranceItems, spaSections } from "@/containers/wellness/copy";
import { AssuranceBar } from "@/containers/wellness/molecules/AssuranceBar";
import type { RevealDirection } from "@/theme/motion";

/**
 * The credibility strip that sits directly under a facility hero — certified
 * staff, hygiene, access and age rules in plain terms. `facility` picks the
 * right set from `assuranceItems`; the copy is shared across spa, gym and
 * pool so the three pages open with the same reassurance. `variant` lets a
 * page choose the tonal step it needs to keep bands alternating.
 */
export function WellnessAssuranceSection({
  motion = "up",
  facility,
  variant = "default",
}: {
  motion?: RevealDirection;
  facility: FacilityId;
  variant?: SectionVariant;
}) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.assurance.eyebrow}
      heading={spaSections.assurance.heading}
      description={spaSections.assurance.description}
      variant={variant}
    >
      <AssuranceBar items={assuranceItems[facility]} />
    </SectionShell>
  );
}
