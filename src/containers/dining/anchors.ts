/**
 * In-page anchor ids and the outlet-id union — deliberately **import-free**.
 *
 * The Dining client islands (`OutletGrid`, `MenuTabs`, the reservation form
 * and FAQ) need these values, and `containers/dining/constants.ts` imports the
 * Zod-validated content layer, which must not be dragged into a client bundle
 * (DECISIONS.md D25). Splitting the plain data out keeps that boundary clean.
 */

/** Reservation enquiry surface — every "reserve a table" CTA points here. */
export const RESERVE_ANCHOR_ID = "reserve";

/** The signature-menu section. */
export const MENUS_ANCHOR_ID = "menus";

/** The outlet directory / filter grid. */
export const OUTLETS_ANCHOR_ID = "outlets";

/**
 * The five outlet ids as named literals, so the invented `copy/` layer can
 * key its menus, hours and per-outlet meta against a typed union. The values
 * match `content/dining.ts` exactly.
 */
export const OUTLET_ID = {
  hakkiPasha: "hakki-pasha-restaurant-bar",
  sirSamuelBaker: "sir-samuel-baker-fine-dining",
  rooftopTerrace: "rooftop-terrace",
  manutea: "manutea-wine-whisky-lounge",
  inRoom: "in-room-dining",
} as const;

export type OutletId = (typeof OUTLET_ID)[keyof typeof OUTLET_ID];

/** Scroll order to the outlet list, so cross-links stay in sync. */
export const OUTLET_ORDER: OutletId[] = [
  OUTLET_ID.hakkiPasha,
  OUTLET_ID.sirSamuelBaker,
  OUTLET_ID.rooftopTerrace,
  OUTLET_ID.manutea,
  OUTLET_ID.inRoom,
];
