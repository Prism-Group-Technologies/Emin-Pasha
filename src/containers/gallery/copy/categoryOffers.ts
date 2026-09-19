/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import type { GalleryCategory } from "@/containers/gallery/anchors";

export interface CategoryOffer {
  /** What the view can be booked as, completing "Book …". */
  label: string;
  priceUsd: number;
  unit: string;
}

/**
 * The "book this view" line every photograph carries in the lightbox, keyed by
 * its category. Invented, indicative US-dollar starting rates.
 */
export const categoryOffers: Record<GalleryCategory, CategoryOffer> = {
  rooms: { label: "A garden-view room or suite", priceUsd: 180, unit: "per night" },
  dining: { label: "A table for dinner", priceUsd: 45, unit: "per guest" },
  spaces: { label: "Afternoon tea or a fireside table", priceUsd: 18, unit: "per guest" },
  wellness: { label: "A spa treatment or day pass", priceUsd: 65, unit: "per treatment" },
  events: { label: "A celebration on the estate", priceUsd: 55, unit: "per guest" },
  estate: { label: "A stay on the estate", priceUsd: 195, unit: "per night" },
};
