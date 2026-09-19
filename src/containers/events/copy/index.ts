/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Meetings & Events pages the conversion surfaces the
 * approved copy deck never supplied — a hero pitch, an event-type selector, a
 * filterable venue directory with indicative capacities, a four-step planning
 * process, bundled delegate packages with indicative rates, buying-reason
 * differentiators, planner voices, a set-up gallery and an FAQ.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/dining/copy` and `containers/wellness/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy, and promoting any of it is a deliberate move
 * into `src/content` after sign-off.
 *
 * Traceability. Every structural claim ties back to already-approved content:
 * Kudara Hall, the private meeting rooms, the business centre and the
 * Equatorial Gardens are approved §5/§7 spaces; "three restaurants for
 * catering", "secure parking", "accommodation on site" and the dedicated F&B
 * team are approved §7 amenities; the §14 group booking terms (14-day
 * confirmation, rooming lists 7 days out, 50% deposit above 10 rooms) are
 * approved. The **capacities by layout, the package rates and the delegate
 * numbers are invented** — the source has none of them (TODO(EMIN-Q12)) — and
 * are labelled "indicative, confirmed on proposal" wherever they render.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content` and replace the indicative capacities and rates with the real
 * ones.
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { eventTypeCards, type EventTypeCard } from "./eventTypes";
export {
  venues,
  capacitiesNote,
  LAYOUT_LABELS,
  LAYOUT_ORDER,
  type VenueEntry,
  type LayoutKey,
} from "./venues";
export { processSteps, type ProcessStep } from "./process";
export { eventPackages, packagesNote, type EventPackage } from "./packages";
export { differentiators, type Differentiator } from "./differentiators";
export { eventVoices, type EventVoice } from "./voices";
export { eventFaq, type EventFaqItem } from "./faq";
export { galleryShots, type GalleryShot } from "./gallery";
export { eventsAssets, eventsAsset } from "./media";

/* ---- bespoke Kudara Hall venue page ---------------------------------- */
export { kudaraSections } from "./kudaraSections";
export {
  kudaraLayouts,
  kudaraLayoutsNote,
  type KudaraLayout,
  type LayoutDiagram,
} from "./kudaraLayouts";
export {
  kudaraProduction,
  kudaraProductionNote,
  type KudaraSpecGroup,
  type KudaraSpecItem,
} from "./kudaraProduction";
export {
  kudaraCateringPackages,
  kudaraCateringNote,
  kudaraCateringTiers,
  KUDARA_DAY_HIRE_UGX,
  type KudaraCateringPackage,
  type KudaraCateringTier,
} from "./kudaraCatering";
export { kudaraExtras, type KudaraExtra } from "./kudaraExtras";
export {
  kudaraCaseStudies,
  kudaraRunOfShow,
  kudaraFactSheet,
  kudaraPlannerNote,
  type KudaraCaseStudy,
  type KudaraRunStep,
  type KudaraFactSheetPoint,
} from "./kudaraProof";
export { kudaraAsset } from "./kudaraMedia";
