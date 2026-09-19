import { SectionShell } from "@/components/templates/SectionShell";
import { spaceProfile } from "@/containers/spaces/copy/profiles";
import { sections } from "@/containers/spaces/copy/sections";
import {
  type CompareRow,
  SpacesCompareTable,
} from "@/containers/spaces/molecules/SpacesCompareTable";
import { spaces } from "@/content/spaces";
import type { RevealDirection } from "@/theme/motion";

const ROWS: CompareRow[] = spaces.flatMap((space) => {
  const profile = spaceProfile(space.id);
  return profile ? [{ id: space.id, name: space.name, profile }] : [];
});

/** "At a glance" — the comparison table, for visitors who shortlist before they read. */
export function SpacesCompareSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      bodyMotion={motion}
      eyebrow={sections.compare.eyebrow}
      heading={sections.compare.heading}
      description={sections.compare.description}
    >
      <SpacesCompareTable rows={ROWS} />
    </SectionShell>
  );
}
