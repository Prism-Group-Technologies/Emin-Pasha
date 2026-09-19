import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { eventTypeCards, sections } from "@/containers/events/copy";
import { EventTypeCard } from "@/containers/events/molecules/EventTypeCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * The event-type selector — five occasions as cards, each routing to the RFP
 * form with the occasion in mind. The first choice an organiser makes, so it
 * sits directly under the hero. No card invents a facility; see
 * `copy/eventTypes.ts`.
 */
export function EventTypesSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow={sections.eventTypes.eyebrow}
      heading={sections.eventTypes.heading}
      description={sections.eventTypes.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 4, md: 5 },
          alignItems: "stretch",
        }}
      >
        {eventTypeCards.map((card, index) => (
          <Reveal key={card.id} index={index} fill>
            <EventTypeCard card={card} />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
