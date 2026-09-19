import { SectionShell } from "@/components/templates/SectionShell";
import { sections } from "@/containers/spaces/copy/sections";
import { DayTimeline } from "@/containers/spaces/organisms/DayTimeline";
import type { RevealDirection } from "@/theme/motion";

/** "A day in the lounges" — the estate hour by hour, with a day / evening switch. */
export function DayInTheLoungesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      bodyMotion={motion}
      variant="raised"
      eyebrow={sections.day.eyebrow}
      heading={sections.day.heading}
      description={sections.day.description}
    >
      <DayTimeline />
    </SectionShell>
  );
}
