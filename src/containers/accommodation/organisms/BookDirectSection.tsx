import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { BOOKING_ANCHOR_ID } from "@/containers/accommodation/constants";
import { bookDirectSection } from "@/containers/accommodation/copy";
import { AmenityItem } from "@/containers/accommodation/molecules/AmenityItem";
import { whatsappBookingUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const listSx = {
  listStyle: "none",
  m: 0,
  p: 0,
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(4, minmax(0, 1fr))",
  },
  gap: { xs: 5, md: 6 },
} as const;

/**
 * The book-direct argument, stated rather than assumed: an independent
 * property competes on every search result against listings of itself, and
 * the visitor's default is that the aggregator is cheaper or safer. Left
 * unanswered, that assumption sends the booking — and its commission —
 * elsewhere. The WhatsApp link is a live hand-off, prefilled with a booking
 * opening, on the channel this market answers on.
 */
export function BookDirectSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      eyebrow={bookDirectSection.eyebrow}
      heading={bookDirectSection.heading}
      description={bookDirectSection.description}
      align="center"
      variant="raised"
      topRule
    >
      <Reveal direction={motion}>
        <Box component="ul" sx={listSx}>
          {bookDirectSection.benefits.map((benefit) => (
            <AmenityItem
              key={benefit.title}
              icon="check-circle"
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </Box>
      </Reveal>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: { xs: 7, md: 8 },
        }}
      >
        <Button href={`#${BOOKING_ANCHOR_ID}`} size="large">
          {bookDirectSection.primaryCta.label}
        </Button>
        <Button href={whatsappBookingUrl} variant="ghost" size="large">
          WhatsApp us
        </Button>
      </Box>
    </SectionShell>
  );
}
