/** ⚠️ INVENTED / UNAPPROVED COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * One-line strapline per category, keyed to `content/rooms.ts` ids. Written
 * for this page; each line only reframes the room's own approved `capacity`
 * and `sellTo` fields.
 */
export const roomTaglines: Record<string, string> = {
  "apartment-room":
    "Our largest room, and the corporate default — a private kitchenette and a dedicated work area on unlimited cabled fibre.",
  "deluxe-room": "The value-led way in, for couples, leisure and first-time guests. Sleeps two.",
  "deluxe-suites":
    "A separate living space for families and stays measured in weeks. Sleeps three.",
  "vip-suite": "A private lounge to work in, meet in, or close the door on. Sleeps three.",
};

/**
 * The §4 `[DRAFT — VERIFY]` descriptions (TODO(EMIN-Q15)). Still unapproved:
 * they name a bed configuration and a view that the property has not
 * verified. The two renamed categories keep their draft's structure and
 * claims; only the category name and, for the Apartment Room, the kitchenette
 * the delivered photography actually shows have changed.
 */
export const roomDescriptions: Record<string, string> = {
  "apartment-room":
    "Our most generously appointed room. Apartment Rooms pair the hotel's signature heritage detailing with the comforts of a thoroughly modern stay: a plush king bed, a private kitchenette, a dedicated work area with fibre connectivity, and windows that open onto the quiet of Nakasero. Ideal for the business traveller who does not want to feel like one.",
  "deluxe-room":
    "Deluxe Rooms pair a calm, characterful interior with the hotel's signature heritage detailing and the quiet of Nakasero beyond the window. Comfortable for couples, leisure guests and first-time visitors, and our best-value entry into the Emin Pasha experience.",
  "deluxe-suites":
    "Separate living and sleeping areas give couples, small families and extended-stay guests room to spread out, with the quiet of Nakasero keeping the city at a comfortable distance. Accommodates up to three guests.",
  "vip-suite":
    "Space, quiet and the hotel's most characterful interiors. A separate lounge area makes the VIP Suite equally suited to a long stay, a small private meeting or an evening in with room service and the In-Room Dining Menu. Accommodates up to three guests.",
};
