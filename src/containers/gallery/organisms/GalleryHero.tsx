import { PageHero } from "@/components/organisms/PageHero";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { COLLECTIONS_ANCHOR_ID } from "@/containers/gallery/anchors";
import { galleryCollections, galleryItems } from "@/containers/gallery/catalogue";
import { heroCopy } from "@/containers/gallery/copy/hero";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappGalleryUrl } from "@/lib/directions";

const FROM_USD = Math.min(...galleryCollections.map((collection) => collection.priceUsd));

/** Counted from the catalogue, so the rail can never disagree with the wall below. */
const HERO_STATS = [
  { value: String(galleryItems.length), label: heroCopy.photographsLabel },
  { value: String(galleryCollections.length), label: heroCopy.collectionsLabel },
  { value: formatUsd(FROM_USD), label: heroCopy.fromLabel },
  { value: heroCopy.replyValue, label: heroCopy.replyLabel },
];

/**
 * The shared `PageHero` with a benefit-led `h1`, the collections as the
 * primary in-page CTA, WhatsApp as the secondary, and a four-figure rail.
 */
export function GalleryHero() {
  return (
    <PageHero
      image={pageHeroImage("gallery")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Gallery"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      primaryCta={{ label: heroCopy.primaryCtaLabel, href: `#${COLLECTIONS_ANCHOR_ID}` }}
      secondaryCta={{ label: heroCopy.secondaryCtaLabel, href: whatsappGalleryUrl }}
      stats={HERO_STATS}
      minHeight={{ xs: 580, md: 700 }}
    />
  );
}
