/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Offers page the conversion surfaces the approved copy
 * deck never supplied — a hero pitch, a featured package, stay / dining /
 * wellness / corporate / seasonal packages with indicative prices and savings,
 * book-direct perks and a price-match promise, a seasonal calendar, an
 * offer-alerts pitch, an FAQ and a terms summary.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/wellness/copy` and `containers/contact/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy.
 *
 * Traceability. The two **approved** offers — Friday Band Night and the
 * Equatorial Sunset Happy Hour — are not copied here: `catalogue.ts` maps them
 * in verbatim from `content/offers.ts`. Every room type, outlet, spa service
 * and venue named in an invented package is an approved one; the **prices,
 * savings, allocations, dates and policies are invented** and flagged
 * indicative wherever they render. Per the brief, no new bar offer is
 * invented. Images reuse the existing `content/assets.ts` slots.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved packages into
 * `src/content/offers.ts`. TODO(EMIN-Q08): real offer terms and validity.
 */

export { heroCopy, sections } from "./sections";
export type { FeaturedOffer, OfferItem } from "./offerTypes";
export { featuredOffer } from "./featured";
export { diningOffers, stayOffers } from "./stayAndDining";
export { corporateOffers, seasonalOffers, wellnessOffers } from "./wellnessCorporateSeasonal";
export { bookDirectPerks, guaranteeCopy, type BookDirectPerk } from "./perks";
export { seasonalCalendar, type CalendarEntry, type CalendarStatus } from "./calendar";
export { offersFaq, type OffersFaqItem } from "./faq";
export { alertsCopy, termsCopy } from "./alertsAndTerms";
