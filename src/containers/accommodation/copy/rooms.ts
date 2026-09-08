/** ⚠️ INVENTED / UNAPPROVED COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * One-line strapline per category, keyed to `content/rooms.ts` ids. Written
 * for this page; each line only reframes the room's own approved `capacity`
 * and `sellTo` fields.
 */
export const roomTaglines: Record<string, string> = {
  "superior-room":
    "Our largest room, and the corporate default — a dedicated work area on unlimited cabled fibre.",
  "garden-room": "Doors onto the landscaped grounds. The one guests ask for by name.",
  "garden-suites":
    "A separate living space for families and stays measured in weeks. Sleeps three.",
  "superior-suites": "A private lounge to work in, meet in, or close the door on. Sleeps three.",
};

/**
 * The §4 `[DRAFT — VERIFY]` descriptions, transcribed verbatim from the
 * non-exported block in `content/rooms.ts` so a DECISIONS.md sign-off does
 * not require re-typing them (TODO(EMIN-Q15)). Still unapproved: they name a
 * bed configuration and a view that the property has not verified.
 */
export const roomDescriptions: Record<string, string> = {
  "superior-room":
    "Our most generously appointed room. Superior Rooms pair the hotel's signature heritage detailing with the comforts of a thoroughly modern stay: a plush king bed, a spacious ensuite, a dedicated work area with fibre connectivity, and windows that open onto the quiet of Nakasero. Ideal for the business traveller who does not want to feel like one.",
  "garden-room":
    "Set closest to the landscaped grounds, Garden Rooms open onto greenery. Wake to birdsong rather than traffic, step out into the gardens before breakfast, and return to a calm, characterful interior at the end of the day. Our best-value entry into the Emin Pasha experience.",
  "garden-suites":
    "A suite with the gardens at its doorstep. Separate living and sleeping areas give couples, small families and extended-stay guests room to spread out, while the garden setting keeps the city at a comfortable distance. Accommodates up to three guests.",
  "superior-suites":
    "Space, quiet and the hotel's most characterful interiors. A separate lounge area makes the Superior Suite equally suited to a long stay, a small private meeting or an evening in with room service and the In-Room Dining Menu. Accommodates up to three guests.",
};
