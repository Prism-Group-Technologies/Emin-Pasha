import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { FacilityId } from "@/containers/wellness/anchors";
import { seasonalOffers, spaSections } from "@/containers/wellness/copy";
import { SeasonalOfferCard } from "@/containers/wellness/molecules/SeasonalOfferCard";
import type { RevealDirection } from "@/theme/motion";

/**
 * Time-boxed treatments each facility runs for a few weeks — the urgency
 * band. `facility` picks the set from `seasonalOffers`; shared so gym and
 * pool get the same surface. Every price is flagged indicative on the card.
 */
export function SeasonalOffersSection({
  motion = "up",
  facility,
}: {
  motion?: RevealDirection;
  facility: FacilityId;
}) {
  const offers = seasonalOffers[facility];

  return (
    <SectionShell
      motion={motion}
      eyebrow={spaSections.seasonal.eyebrow}
      heading={spaSections.seasonal.heading}
      description={spaSections.seasonal.description}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: 5, md: 6 },
          alignItems: "stretch",
        }}
      >
        {offers.map((offer, index) => (
          <Reveal key={offer.id} index={index} fill>
            <SeasonalOfferCard offer={offer} />
          </Reveal>
        ))}
      </Box>
      <Text variant="body2" color="text.secondary" sx={{ mt: 6, maxWidth: "68ch" }}>
        Dates and prices are indicative — the wellness desk confirms what is running, and holds your
        place, when you enquire.
      </Text>
    </SectionShell>
  );
}
