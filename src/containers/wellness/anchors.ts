/**
 * In-page anchor ids and the facility-id union for the Spa & Wellness pages —
 * deliberately **import-free**, the same split `containers/dining/anchors.ts`
 * makes. The wellness client islands (the treatment filter, the enquiry form,
 * the sticky CTA) need these values, and pulling in the Zod-validated content
 * layer to get them would drag it into a client bundle (DECISIONS.md D25).
 */

/** Lead-capture surface — every on-page "ask us" / "enquire" CTA points here. */
export const ENQUIRE_ANCHOR_ID = "enquire";

/** The signature-treatments menu with its facility filter. */
export const TREATMENTS_ANCHOR_ID = "treatments";

/** The gym membership + class-timetable band. */
export const MEMBERSHIP_ANCHOR_ID = "membership";

/** The wellness-packages band. */
export const PACKAGES_ANCHOR_ID = "packages";

/**
 * The three facilities as named literals, so the invented `copy/` layer can
 * key its treatments, packages and pillars against a typed union. The values
 * match `content/wellness.ts` intent — "spa" / "gym" / "pool" — and the
 * `wellnessEnquirySchema` interest enum.
 */
export const FACILITY_ID = {
  spa: "spa",
  gym: "gym",
  pool: "pool",
} as const;

export type FacilityId = (typeof FACILITY_ID)[keyof typeof FACILITY_ID];

/** Scroll / display order for the facilities, so cross-links stay in sync. */
export const FACILITY_ORDER: FacilityId[] = [FACILITY_ID.spa, FACILITY_ID.gym, FACILITY_ID.pool];
