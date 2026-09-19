import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import { FEATURED_ANCHOR_ID, OFFERS_ANCHOR_ID } from "@/containers/offers/anchors";
import { offerAsset } from "@/containers/offers/catalogue";
import { featuredOffer as offer, sections } from "@/containers/offers/copy";
import { ClaimOnWhatsApp } from "@/containers/offers/molecules/ClaimOnWhatsApp";
import { OfferInclusions } from "@/containers/offers/molecules/OfferInclusions";
import { OfferMedia } from "@/containers/offers/molecules/OfferMedia";
import { OfferPill } from "@/containers/offers/molecules/OfferPill";
import { OfferPrice } from "@/containers/offers/molecules/OfferPrice";
import { OfferValidity } from "@/containers/offers/molecules/OfferValidity";
import { whatsappOfferClaimUrl } from "@/lib/directions";
import type { RevealDirection } from "@/theme/motion";

const { featured } = sections;

/**
 * The spotlight: one package, given the whole band. A tall photo with the
 * urgency pill on one side; on the other the pitch, the full inclusions in
 * two columns, the price with its saving, the validity, and both next steps.
 * Stacks photo-first on a phone, where the image is the hook.
 */
export function FeaturedOfferSection({ motion = "up" }: { motion?: RevealDirection }) {
  return (
    <SectionShell id={FEATURED_ANCHOR_ID} motion={motion}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
          gap: { xs: 6, md: 8 },
          alignItems: "center",
        }}
      >
        <Reveal direction={motion} media>
          <OfferMedia
            asset={offerAsset(offer.assetId)}
            radius="xl"
            ratio={{ xs: "4 / 3", md: "4 / 5" }}
            sizes="(min-width: 900px) 50vw, 100vw"
            overlay={offer.urgency && <OfferPill tone="gold">{offer.urgency}</OfferPill>}
          />
        </Reveal>

        <Reveal direction={motion} index={1}>
          <Box sx={{ display: "grid", gap: 4 }}>
            <Text
              variant="overline"
              component="p"
              color="text.secondary"
              sx={{ fontFamily: "var(--font-cartographic)" }}
            >
              {`§ ${offer.eyebrow.toUpperCase()}`}
            </Text>
            <Text variant="h2" component="h2" sx={{ textWrap: "balance" }}>
              {offer.title}
            </Text>
            <Text variant="subtitle1" color="text.secondary" sx={{ textWrap: "pretty" }}>
              {offer.pitch}
            </Text>
            <OfferInclusions
              items={offer.inclusions}
              columns={2}
              label={`Included in ${offer.title}`}
            />
            <Box
              sx={{
                pt: 4,
                borderTop: "1px solid",
                borderColor: "divider",
                display: "grid",
                gap: 3,
              }}
            >
              <OfferPrice
                priceUgx={offer.priceUgx}
                wasPriceUgx={offer.wasPriceUgx}
                priceUnit={offer.priceUnit}
                size="lg"
                savingPrefix={featured.savingPrefix}
              />
              <OfferValidity bookBy={offer.bookBy} />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, pt: 1 }}>
              <ClaimOnWhatsApp
                href={whatsappOfferClaimUrl(offer.title)}
                label={featured.claimLabel}
                offerTitle={offer.title}
                size="large"
              />
              <Button href={`#${OFFERS_ANCHOR_ID}`} variant="ghost" size="large">
                {featured.browseLabel}
              </Button>
            </Box>
          </Box>
        </Reveal>
      </Box>
    </SectionShell>
  );
}
