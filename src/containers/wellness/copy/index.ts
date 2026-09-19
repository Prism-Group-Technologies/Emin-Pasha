/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Spa & Wellness pages the conversion surfaces the
 * approved copy deck never supplied — a hero pitch, a signature-treatment
 * menu with indicative prices, wellness packages, a visit journey, gym
 * membership tiers and a class timetable, visitor voices, section ledes and
 * an FAQ.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/dining/copy` and `containers/accommodation/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy, and promoting any of it is a deliberate move
 * into `src/content` after sign-off.
 *
 * Traceability. Every structural claim ties back to already-approved content:
 * tailored massage, facials, deep sea-salt treatments and the Turkish bath
 * are in `content/wellness.ts`; the gym's equipment, classes, trainers and
 * non-resident membership are in `content/wellness.ts`; the pool's public
 * access and poolside gardens are in `content/wellness.ts`; the spa (7am–9pm)
 * and gym (6am–9pm) hours are the two the source approves. The **prices,
 * durations, membership rates and class times are invented** —
 * TODO(EMIN-Q11) — and are labelled "indicative" wherever they render.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content` and replace the indicative prices with the real list.
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { wellnessPillars, type WellnessPillar } from "./pillars";
export { signatureTreatments, type Treatment } from "./treatments";
export { wellnessPackages, packagesNote, type WellnessPackage } from "./packages";
export { wellnessJourney, type JourneyStep } from "./journey";
export {
  membershipTiers,
  membershipNote,
  classTimetable,
  type MembershipTier,
  type ClassSlot,
} from "./membership";
export { wellnessVoices, type WellnessVoice } from "./voices";
export { wellnessFaq, type WellnessFaqItem } from "./faq";
export { wellnessAssets, wellnessAsset } from "./media";

// Spa-only conversion bands (see spaSections.ts / spa.tsx).
export { spaSections } from "./spaSections";
export { assuranceItems, type AssuranceItem } from "./assurance";
export { turkishBathRitual } from "./ritual";
export { spaEnhancements, type SpaEnhancement } from "./enhancements";
export { seasonalOffers, type SeasonalOffer } from "./seasonal";
export { spaPasses, spaPassesNote } from "./passes";
export { therapists, type Therapist } from "./therapists";
export { spaGroupOffers } from "./groups";
export { giftVouchers, type GiftVoucher } from "./vouchers";
export { spaAssets, spaAsset } from "./spaMedia";

// Swimming-pool conversion bands (see poolSections.ts / pool.tsx). Client
// islands import the leaf modules directly, never this barrel (D25).
export { poolSections } from "./poolSections";
export { poolAccessOptions, poolSafetyFacts, type PoolAccessOption } from "./poolAccess";
export { poolPasses, poolPassesNote } from "./poolPasses";
export { poolEvents, privateHireIncludes, type PoolEvent } from "./poolEvents";
export { poolAssets, poolAsset } from "./poolMedia";
export { poolFaq } from "./poolFaq";
export {
  poolAddOns,
  poolVisitTypes,
  type PoolAddOn,
  type PoolChargeBasis,
  type PoolVisitType,
} from "./poolPlanner";
export {
  etiquetteFacts,
  etiquetteIntro,
  etiquetteRuleMeta,
  type EtiquetteRuleMeta,
} from "./etiquette";
