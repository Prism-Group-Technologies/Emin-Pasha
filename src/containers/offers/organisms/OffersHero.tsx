import { PageHero } from "@/components/organisms/PageHero";
import { OFFERS_ANCHOR_ID } from "@/containers/offers/anchors";
import { liveOfferCount } from "@/containers/offers/catalogue";
import { heroCopy } from "@/containers/offers/copy";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappOffersUrl } from "@/lib/directions";

/**
 * The Offers hero: the promise, the two highest-intent actions — jump to the
 * offers, or claim straight away on WhatsApp — and a figure rail that makes
 * the book-direct argument before the first scroll. The live-package figure
 * is counted from the catalogue, so it can never drift from the grid.
 */
export function OffersHero() {
  const stats = [
    ...heroCopy.stats.slice(0, 1),
    { value: String(liveOfferCount), label: heroCopy.liveCountLabel },
    ...heroCopy.stats.slice(1),
  ];

  return (
    <PageHero
      image={pageHeroImage("offers")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Offers"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      primaryCta={{ label: heroCopy.primaryCta, href: `#${OFFERS_ANCHOR_ID}` }}
      secondaryCta={{ label: heroCopy.secondaryCta, href: whatsappOffersUrl }}
      stats={stats}
    />
  );
}
