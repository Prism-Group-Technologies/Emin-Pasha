import { SectionShell } from "@/components/templates/SectionShell";
import { NAMED_AFTER_ANCHOR_ID } from "@/containers/story/anchors";
import { namedAfterEntries } from "@/containers/story/catalogue";
import { sections } from "@/containers/story/copy";
import { NamedAfterIndex } from "@/containers/story/molecules/NamedAfterIndex";
import type { RevealDirection } from "@/theme/motion";

/**
 * The internal-linking spine as a spotlight index — the pillar page passes its
 * authority to the commercial pages that carry names from the story
 * (CLAUDE.md §9). Names and attributions come from the record; the nudges
 * are invented.
 *
 * **Why the dark band.** This section and `StoryChaptersSection` render back
 * to back on `/our-story` and again on `/our-story/the-hotel`. As two
 * identically-surfaced card grids they read as one repeated component rather
 * than as two different offers, which is most of why the pair looked
 * unfinished. `contrast` is the one ground that is the same in both colour
 * schemes, and its contrast ratios against gold and both copy values are
 * already verified in `sectionShellStyles.ts` — so the tonal break costs no
 * dark-mode work and no accessibility risk.
 *
 * A Server Component. It resolves the photography and hands the finished
 * `AssetRef`s to the one client island below it.
 */
export function NamedAfterSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={NAMED_AFTER_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.namedAfter.eyebrow}
      heading={sections.namedAfter.heading}
      description={sections.namedAfter.description}
      variant="contrast"
    >
      <NamedAfterIndex entries={namedAfterEntries} />
    </SectionShell>
  );
}
