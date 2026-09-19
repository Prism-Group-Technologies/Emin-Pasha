import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { inRoomAmenities, roomInclusionsSection } from "@/containers/accommodation/copy";
import { AmenityItem } from "@/containers/accommodation/molecules/AmenityItem";
import type { RevealDirection } from "@/theme/motion";

/**
 * What the nightly rate actually buys, as a grid of glyphs rather than the
 * bulleted list this used to be inside the detail body.
 *
 * Same six items the hub band leads with — the four approved inclusions from
 * `content/rooms.ts` plus the garden outlook and the quiet that the approved
 * intro line and `site.setting` already state. They are reused rather than
 * rewritten precisely because they are the same facts: a room page that
 * restated them in its own words would be a second, unverified source for
 * something the content layer already governs.
 *
 * Raised surface, so the page alternates tone from the cream band above it
 * instead of running one unbroken field from the hero to the footer.
 */
export function RoomInclusions({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={roomInclusionsSection.eyebrow}
      heading={roomInclusionsSection.heading}
      description={roomInclusionsSection.description}
      variant="raised"
    >
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
        }}
      >
        {inRoomAmenities.map((item, index) => (
          <Reveal key={item.title} index={index} fill>
            <AmenityItem icon={item.icon} title={item.title} description={item.description} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
