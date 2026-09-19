import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { SPACES_ANCHOR_ID } from "@/containers/spaces/anchors";
import { spaceProfile } from "@/containers/spaces/copy/profiles";
import { sections } from "@/containers/spaces/copy/sections";
import { SpaceChapterNav } from "@/containers/spaces/molecules/SpaceChapterNav";
import { SpaceSpotlight } from "@/containers/spaces/organisms/SpaceSpotlight";
import { spaces } from "@/content/spaces";
import type { RevealDirection } from "@/theme/motion";

const CHAPTERS = spaces.flatMap((space) => {
  const profile = spaceProfile(space.id);
  return profile ? [{ space, profile }] : [];
});

/** The three approved spaces as alternating editorial chapters, with a jump nav above. */
export function SpaceSpotlightsSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={SPACES_ANCHOR_ID}
      motion={motion}
      variant="raised"
      eyebrow={sections.spaces.eyebrow}
      heading={sections.spaces.heading}
      description={sections.spaces.description}
    >
      <SpaceChapterNav
        items={CHAPTERS.map(({ space, profile }) => ({
          id: space.id,
          number: profile.number,
          name: space.name,
        }))}
      />
      <Box sx={{ display: "grid", gap: { xs: 9, md: 10 } }}>
        {CHAPTERS.map(({ space, profile }, index) => (
          <SpaceSpotlight key={space.id} space={space} profile={profile} flip={index % 2 === 1} />
        ))}
      </Box>
    </SectionShell>
  );
}
