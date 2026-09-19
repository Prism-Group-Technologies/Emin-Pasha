import { PageHero } from "@/components/organisms/PageHero";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { PHOTOS_ANCHOR_ID } from "@/containers/gallery/anchors";
import { sections } from "@/containers/gallery/copy/sections";
import { collectionSectionMotion as m } from "@/containers/gallery/motion";
import { CollectionIntroSection } from "@/containers/gallery/organisms/CollectionIntroSection";
import { GalleryClosingSection } from "@/containers/gallery/organisms/GalleryClosingSection";
import { OtherCollectionsSection } from "@/containers/gallery/organisms/OtherCollectionsSection";
import { PhotosSection } from "@/containers/gallery/organisms/PhotosSection";
import { StickyGalleryCta } from "@/containers/gallery/organisms/StickyGalleryCta";
import type { GalleryCollectionView } from "@/containers/gallery/types";
import { pageHeroImage } from "@/content/pageHeroes";

/**
 * One mood collection at `/gallery/<slug>` — hero, the bento + summary, the
 * collection's own photo wall with the "book this view" lightbox, the sibling
 * collections, and the shared closing band and sticky bar. Pure composition,
 * like the hub; every organism is shared with it.
 */
export function CollectionContainer({ collection }: { collection: GalleryCollectionView }) {
  const stats = [
    { value: String(collection.items.length), label: "photographs" },
    { value: formatUsd(collection.priceUsd), label: `from, ${collection.priceUnit}` },
    { value: String(collection.highlights.length), label: "things included" },
  ];

  return (
    <>
      <PageHero
        image={pageHeroImage("gallery-collection")}
        eyebrow={`§ GALLERY · ${collection.title.toUpperCase()}`}
        headline={collection.title}
        lede={collection.summary}
        label={collection.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
          { label: collection.title },
        ]}
        primaryCta={{ label: sections.collections.ask, href: collection.whatsappHref }}
        secondaryCta={{ label: "See every photograph", href: `#${PHOTOS_ANCHOR_ID}` }}
        stats={stats}
      />
      <CollectionIntroSection collection={collection} motion={m.intro} />
      <PhotosSection
        items={collection.items}
        motion={m.photos}
        heading={`${collection.title}, photograph by photograph`}
        description={`Open any frame full-screen and ask about that exact view. ${collection.bestFor}.`}
      />
      <OtherCollectionsSection current={collection.slug} motion={m.others} />
      <GalleryClosingSection motion={m.closing} />
      <StickyGalleryCta browseHref="/gallery#collections" />
    </>
  );
}
