import { SectionShell } from "@/components/templates/SectionShell";
import { MATCHER_ANCHOR_ID } from "@/containers/spaces/anchors";
import { sections } from "@/containers/spaces/copy/sections";
import { SpaceMatcher } from "@/containers/spaces/organisms/SpaceMatcher";
import { spaces } from "@/content/spaces";
import type { RevealDirection } from "@/theme/motion";

/** Resolved on the server so only plain strings cross into the client island. */
const NAMES: Record<string, string> = Object.fromEntries(
  spaces.map((space) => [space.id, space.name]),
);

/** The matcher band — the page's first conversion surface, straight after the hero. */
export function SpaceMatcherSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={MATCHER_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.matcher.eyebrow}
      heading={sections.matcher.heading}
      description={sections.matcher.description}
    >
      <SpaceMatcher names={NAMES} />
    </SectionShell>
  );
}
