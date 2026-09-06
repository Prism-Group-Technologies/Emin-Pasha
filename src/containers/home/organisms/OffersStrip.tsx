import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { SectionShell } from "@/components/templates/SectionShell";
import { offersSection } from "@/containers/home/copy";
import { OfferCard } from "@/containers/home/molecules/OfferCard";
import { offers, offersPageIntro } from "@/content/offers";
import type { RevealDirection } from "@/theme/motion";

/**
 * Friday Band Night and the Equatorial Sunset Happy Hour — the two standing
 * invitations that convert the Kampala local market, which the positioning
 * work flags as this property's most underused segment.
 *
 * The section now carries a "See all offers" CTA. The approved CTA library has
 * no label for this context, so the label is invented (see
 * `containers/home/copy.ts`) — a deliberate, flagged departure, not an
 * oversight: a section whose entire job is to convert local walk-in demand
 * cannot be the one section on the page with no way out of it.
 */
export function OffersStrip({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      motion={motion}
      eyebrow="§ WHAT IS ON"
      heading={offersPageIntro}
      description={offersSection.description}
      variant="raised"
      action={
        <Button href={offersSection.action.href} variant="ghost">
          {offersSection.action.label}
        </Button>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
        }}
      >
        {offers.map((offer, index) => (
          <Reveal key={offer.id} index={index} fill>
            <OfferCard
              name={offer.name}
              description={offer.description}
              priceUgx={offer.priceUgx}
              schedule={offer.schedule}
              ctaLabel={offersSection.offerCtas[offer.id] ?? offersSection.offerCtaFallback}
              ctaHref={offersSection.offerCtaHref}
            />
          </Reveal>
        ))}
      </Box>
    </SectionShell>
  );
}
