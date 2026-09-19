/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

export interface GalleryShot {
  assetId: string;
  /** Cartographic caption under the frame. */
  caption: string;
}

/**
 * The set-up gallery strip — one dressed room per frame, so an organiser can
 * see the space working rather than empty. Every caption maps onto an
 * approved §5/§7 space; the imagery is placeholder (see `./media.ts`).
 */
export const galleryShots: GalleryShot[] = [
  { assetId: "events-gallery-conference", caption: "Kudara Hall · theatre, 500" },
  { assetId: "events-gallery-banquet", caption: "Kudara Hall · banquet, 320" },
  { assetId: "events-gallery-ceremony", caption: "Equatorial Gardens · ceremony" },
  { assetId: "events-gallery-reception", caption: "Rooftop · drinks reception" },
  { assetId: "events-gallery-cabaret", caption: "Meeting rooms · cabaret" },
  { assetId: "events-gallery-breakout", caption: "Meeting rooms · breakout, U-shape" },
];
