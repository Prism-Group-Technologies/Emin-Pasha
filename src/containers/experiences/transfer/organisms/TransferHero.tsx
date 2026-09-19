import { PageHero } from "@/components/organisms/PageHero";
import { BOOKING_ANCHOR_ID } from "@/containers/experiences/transfer/anchors";
import { vehicles } from "@/containers/experiences/transfer/copy/fleet";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { TRANSFER_PRICING } from "@/containers/experiences/transfer/copy/services";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { airportTransfer } from "@/content/experiences";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappTransferUrl } from "@/lib/directions";

const { hero } = transferSections;

const FROM_USD = Math.min(...vehicles.map((vehicle) => vehicle.transferUsd));

/** Derived from the copy layer, so the rail can never disagree with the fleet or the FAQ. */
const HERO_STATS = [
  { value: "≈ 60 min", label: "Entebbe to Nakasero" },
  { value: "24/7", label: "every flight covered" },
  { value: formatUsd(FROM_USD), label: "fixed fare, tolls in" },
  { value: `${TRANSFER_PRICING.complimentaryMinNights}+ nights`, label: "transfers on us" },
];

/**
 * The shared `PageHero` with a benefit-led `h1`, a booking CTA into `#book`,
 * a WhatsApp alternative, and a four-figure rail answering the three things
 * every arriving traveller asks first: how long, how much, and is it free.
 */
export function TransferHero() {
  return (
    <PageHero
      image={pageHeroImage("airport-transfer")}
      eyebrow={hero.eyebrow}
      headline={hero.headline}
      lede={hero.lede}
      label={airportTransfer.name}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Experiences" },
        { label: airportTransfer.name },
      ]}
      primaryCta={{ label: hero.primaryCtaLabel, href: `#${BOOKING_ANCHOR_ID}` }}
      secondaryCta={{ label: hero.secondaryCtaLabel, href: whatsappTransferUrl }}
      stats={HERO_STATS}
    />
  );
}
