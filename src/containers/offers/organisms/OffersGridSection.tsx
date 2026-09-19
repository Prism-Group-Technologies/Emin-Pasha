import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { OFFERS_ANCHOR_ID } from "@/containers/offers/anchors";
import { gridOffers, offerAsset } from "@/containers/offers/catalogue";
import { sections } from "@/containers/offers/copy";
import { OfferCard } from "@/containers/offers/molecules/OfferCard";
import { OfferGrid } from "@/containers/offers/organisms/OfferGrid";
import { whatsappOfferClaimUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { grid } = sections;

/**
 * The offer catalogue as a filterable grid on the raised ground. Every card
 * is built here, on the server — asset slot, formatted price and a per-offer
 * WhatsApp claim URL — and handed to the `OfferGrid` island, which only
 * decides which cards are visible.
 */
export function OffersGridSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell
      id={OFFERS_ANCHOR_ID}
      variant="raised"
      motion={motion}
      eyebrow={grid.eyebrow}
      heading={grid.heading}
      description={grid.description}
    >
      <OfferGrid
        ids={gridOffers.map((offer) => offer.id)}
        categories={gridOffers.map((offer) => offer.category)}
        filterLabel={grid.filterLabel}
      >
        {gridOffers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            asset={offerAsset(offer.assetId)}
            claimHref={whatsappOfferClaimUrl(offer.title)}
            claimLabel={grid.claimLabel}
          />
        ))}
      </OfferGrid>
      <Text
        variant="body2"
        color="text.secondary"
        sx={{ mt: 6, maxWidth: "72ch", fontStyle: "italic" }}
      >
        {grid.disclaimer}
      </Text>
    </SectionShell>
  );
}
