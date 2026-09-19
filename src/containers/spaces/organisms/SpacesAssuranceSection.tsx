import { SectionShell } from "@/components/templates/SectionShell";
import { assuranceItems } from "@/containers/spaces/copy/hero";
import { sections } from "@/containers/spaces/copy/sections";
import { AssuranceBar } from "@/containers/wellness/molecules/AssuranceBar";
import type { RevealDirection } from "@/theme/motion";

/** The practical strip under the hero, in the shared wellness `AssuranceBar`. */
export function SpacesAssuranceSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      bodyMotion={motion}
      variant="raised"
      eyebrow={sections.assurance.eyebrow}
    >
      <AssuranceBar items={assuranceItems} />
    </SectionShell>
  );
}
