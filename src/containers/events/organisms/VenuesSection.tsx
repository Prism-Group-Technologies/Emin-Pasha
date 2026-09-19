import { Box } from "@/components/atoms/Box";
import { SectionShell } from "@/components/templates/SectionShell";
import { VENUES_ANCHOR_ID } from "@/containers/events/anchors";
import { sections, venues } from "@/containers/events/copy";
import { VenueCapacityTable } from "@/containers/events/molecules/VenueCapacityTable";
import { VenueCard } from "@/containers/events/molecules/VenueCard";
import { VenueGrid } from "@/containers/events/organisms/VenueGrid";
import type { RevealDirection } from "@/theme/motion";

/**
 * The five venues as a filterable grid, followed by the full indicative
 * capacity table. The cards are Server Components built here and handed to
 * `VenueGrid` as children — the client filter only toggles visibility, so the
 * invented `copy/` layer and Zod never cross the boundary.
 */
export function VenuesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={VENUES_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.venues.eyebrow}
      heading={sections.venues.heading}
      description={sections.venues.description}
    >
      <VenueGrid ids={venues.map((venue) => venue.id)} suits={venues.map((venue) => venue.suits)}>
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </VenueGrid>

      <Box sx={{ mt: { xs: 7, md: 9 } }}>
        <VenueCapacityTable venues={venues} />
      </Box>
    </SectionShell>
  );
}
