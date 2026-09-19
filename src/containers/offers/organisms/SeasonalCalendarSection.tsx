import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { ALERTS_ANCHOR_ID, CALENDAR_ANCHOR_ID } from "@/containers/offers/anchors";
import { seasonalCalendar, sections } from "@/containers/offers/copy";
import { CalendarEntryCard } from "@/containers/offers/molecules/CalendarEntryCard";
import { whatsappOfferClaimUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { calendar } = sections;

/**
 * The year ahead as a 3 × 2 grid of dated packages (2-up on a tablet, one
 * column on a phone). Open packages are claimed on WhatsApp; the ones not yet
 * on sale point at the offer-alerts sign-up, so early interest becomes a lead
 * instead of a bounce.
 */
export function SeasonalCalendarSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={CALENDAR_ANCHOR_ID}
      variant="raised"
      motion={motion}
      eyebrow={calendar.eyebrow}
      heading={calendar.heading}
      description={calendar.description}
    >
      <Box
        component="ol"
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 5, md: 6 },
        }}
      >
        {seasonalCalendar.map((entry, index) => (
          <Box component="li" key={entry.id}>
            <Reveal index={index} fill>
              <CalendarEntryCard
                entry={entry}
                claimHref={whatsappOfferClaimUrl(entry.title)}
                claimLabel={calendar.openLabel}
                notifyHref={`#${ALERTS_ANCHOR_ID}`}
                notifyLabel={calendar.soonLabel}
              />
            </Reveal>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
