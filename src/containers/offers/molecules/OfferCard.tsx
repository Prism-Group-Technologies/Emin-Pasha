import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { cardSurface } from "@/components/templates/sectionShellStyles";
import { OFFER_CATEGORY_LABEL } from "@/containers/offers/anchors";
import type { OfferItem } from "@/containers/offers/copy";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { OfferInclusions } from "@/containers/offers/molecules/OfferInclusions";
import { OfferMedia } from "@/containers/offers/molecules/OfferMedia";
import { OfferPill } from "@/containers/offers/molecules/OfferPill";
import { OfferPrice } from "@/containers/offers/molecules/OfferPrice";
import { OfferValidity } from "@/containers/offers/molecules/OfferValidity";
import type { AssetRef } from "@/schemas/content/assetRef";

export interface OfferCardProps {
  offer: OfferItem;
  asset?: AssetRef;
  claimHref: string;
  claimLabel: string;
}

/**
 * One offer in the grid, top to bottom: the photo with its category and
 * urgency pills, the title and one-line pitch, what's included, the time
 * facts, then — pinned to the bottom edge so a row of cards shares a baseline
 * — the price and the WhatsApp claim button.
 *
 * Built on `cardSurface()` with the padding lifted off the root so the photo
 * runs edge to edge; the copy carries the padding instead.
 */
export function OfferCard({ offer, asset, claimHref, claimLabel }: OfferCardProps) {
  return (
    <Box component="article" sx={[cardSurface(), { p: { xs: 0, md: 0 }, overflow: "hidden" }]}>
      <OfferMedia
        asset={asset}
        radius="none"
        sizes="(min-width: 1200px) 400px, (min-width: 600px) 50vw, 100vw"
        overlay={
          <>
            <OfferPill tone="overlay">{OFFER_CATEGORY_LABEL[offer.category]}</OfferPill>
            {offer.urgency && <OfferPill tone="gold">{offer.urgency}</OfferPill>}
          </>
        }
      />

      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, flexGrow: 1, p: { xs: 5, md: 6 } }}
      >
        <Text variant="h4" component="h3" sx={{ textWrap: "balance" }}>
          {offer.title}
        </Text>
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {offer.summary}
        </Text>
        <OfferInclusions items={offer.inclusions} label={`Included in ${offer.title}`} />
        <OfferValidity schedule={offer.schedule} bookBy={offer.bookBy} />

        <Box
          sx={{
            mt: "auto",
            pt: 4,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "grid",
            gap: 4,
          }}
        >
          <OfferPrice
            priceUgx={offer.priceUgx}
            wasPriceUgx={offer.wasPriceUgx}
            priceUnit={offer.priceUnit}
            fallback={offer.schedule ? "Prices as listed above" : undefined}
          />
          <ClaimOnWhatsApp href={claimHref} label={claimLabel} offerTitle={offer.title} fullWidth />
        </Box>
      </Box>
    </Box>
  );
}
