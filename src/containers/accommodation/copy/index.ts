/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every other string on this site comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Accommodation pages the conversion surfaces the
 * approved copy deck never supplied (a hero pitch, a book-direct argument,
 * an amenities inventory, stay packages, section ledes and CTAs).
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/home/copy` does. `check:content` only scans
 * the governed layer, so this cannot masquerade as approved copy, and
 * promoting any of it is a deliberate move into `src/content` after sign-off.
 *
 * Every factual claim is traceable to already-approved content: rates and
 * inclusions from `content/rooms.ts`, check-in/out from `content/identity.ts`,
 * the estate (spa hours, 300ft pool, three restaurants, Kudara Hall, transfer)
 * from `content/site.ts` and `content/faq.ts`, Friday Band Night from
 * `content/offers.ts`. Nothing here invents a fact — only the framing.
 *
 * The four room descriptions in `./rooms` are the §4 `[DRAFT — VERIFY]` text,
 * transcribed here so a DECISIONS.md sign-off does not require re-typing them.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content`.
 */

export { heroCopy, type HeroStatCopy } from "./hero";
export {
  roomsSection,
  amenitiesSection,
  comparisonSection,
  packagesSection,
  bookDirectSection,
  bookingSection,
  guestVoicesSection,
  faqSection,
  locationSection,
  closingSection,
  type BenefitCopy,
} from "./sections";
export { estateAmenities, inRoomAmenities, type AmenityCopy } from "./amenities";
export { stayPackages, packagesDisclaimer, type StayPackageCopy } from "./packages";
export { roomTaglines, roomDescriptions } from "./rooms";
export {
  roomGallerySection,
  roomInclusionsSection,
  roomPoliciesSection,
  otherRoomsSection,
  bookingCardCopy,
} from "./detail";
