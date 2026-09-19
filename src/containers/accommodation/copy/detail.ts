/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * Section furniture for the four room-detail pages.
 *
 * Nothing here states a fact the governed layer does not already carry. The
 * gallery lede describes the photographs the page is showing; the inclusions
 * lede reframes `content/rooms.ts`; the policy lede reframes
 * `childrenAndExtraBeds`; the "other rooms" lede names only the rate floor
 * already published on the hub. No square metres, no bed configuration, no
 * view claim — the source flags all three as unverified (TODO(EMIN-Q15)).
 *
 * The two headings that name a room take it as an argument rather than
 * hard-coding four near-identical strings, so a renamed category is renamed
 * here with it.
 */
export const roomGallerySection = {
  eyebrow: "§ THE ROOM IN FULL",
  heading: (roomName: string) => `Every angle of the ${roomName}`,
  description:
    "Photographed as the room is kept, not staged for a brochure. Open any frame for the full-screen view.",
  lightboxCta: "Check dates",
};

export const roomInclusionsSection = {
  eyebrow: "§ IN THIS ROOM",
  heading: "What comes with every night",
  description:
    "The same standard in every category, from the Deluxe Room up — no resort fee, no tiers on the essentials, nothing revealed at a final step.",
};

export const roomPoliciesSection = {
  eyebrow: "§ GOOD TO KNOW",
  heading: "Before you book",
  description:
    "Children and extra beds, then the questions reservations answer most — check-in and check-out, breakfast, Wi-Fi and the cancellation terms.",
  policiesTitle: "Children & extra beds",
};

export const otherRoomsSection = {
  eyebrow: "§ THE OTHER THREE",
  heading: "Not quite the right fit?",
  description:
    "Four categories share the gardens, the fibre and the breakfast. What changes is the space and who it suits.",
};

/**
 * The reassurance rail under the booking widget. Each line restates something
 * already published: the UGX-only rate card and its included breakfast
 * (`content/rooms.ts`), the direct-booking argument (`copy/sections.ts`), and
 * the same-working-day reply the closing band already promises.
 */
export const bookingCardCopy = {
  assurances: [
    "Rates in Ugandan shillings, à la carte breakfast included",
    "Booked direct — the people confirming your room are the ones at the gate",
    "Reservations reply the same working day",
  ],
};
