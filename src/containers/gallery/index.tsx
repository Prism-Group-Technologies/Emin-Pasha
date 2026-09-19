import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { galleryItems } from "@/containers/gallery/catalogue";
import { sections } from "@/containers/gallery/copy/sections";
import { gallerySectionMotion as m } from "@/containers/gallery/motion";
import { CollectionsSection } from "@/containers/gallery/organisms/CollectionsSection";
import { FilmSection } from "@/containers/gallery/organisms/FilmSection";
import { GalleryClosingSection } from "@/containers/gallery/organisms/GalleryClosingSection";
import { GalleryFaqSection } from "@/containers/gallery/organisms/GalleryFaqSection";
import { GalleryHero } from "@/containers/gallery/organisms/GalleryHero";
import { GalleryStatsSection } from "@/containers/gallery/organisms/GalleryStatsSection";
import { GuestLensSection } from "@/containers/gallery/organisms/GuestLensSection";
import { PhotosSection } from "@/containers/gallery/organisms/PhotosSection";
import { StickyGalleryCta } from "@/containers/gallery/organisms/StickyGalleryCta";
import { StoriesSection } from "@/containers/gallery/organisms/StoriesSection";

/**
 * The Gallery, rebuilt as a conversion funnel — the same shape as the Spaces,
 * Offers and Transfer redesigns. A Server Component that only composes
 * section organisms; the client islands are the collection explorer, the
 * photo wall + lightbox, the film chapter picker, the FAQ and the sticky bar.
 * WhatsApp is the only lead channel.
 *
 *   hero         — the pitch, a figure rail, "explore the collections" + WhatsApp
 *   collections  — six bookable mood collections, each also /gallery/<slug>
 *   stories      — first light, golden hour, lantern light
 *   photos       — the filterable wall; every photograph opens a "book this view" lightbox
 *   film         — estate film chapters + 360° tour card on the dark band
 *   stats        — the estate in four figures
 *   lens         — #EminPashaMoments guest wall + guest notes
 *   faq · closing · related · sticky bar
 */
export function GalleryContainer() {
  return (
    <>
      <GalleryHero />
      <CollectionsSection motion={m.collections} />
      <StoriesSection motion={m.stories} />
      <PhotosSection items={galleryItems} motion={m.photos} />
      <FilmSection motion={m.film} />
      <GalleryStatsSection motion={m.stats} />
      <GuestLensSection motion={m.lens} />
      <GalleryFaqSection motion={m.faq} />
      <GalleryClosingSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={["/accommodation", "/dining", "/spa-and-wellness", "/weddings"]} />
      </SectionShell>
      <StickyGalleryCta />
    </>
  );
}
