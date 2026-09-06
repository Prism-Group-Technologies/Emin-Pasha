/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every other string on this site comes from `src/content/*`, which is a
 * verbatim transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md and is guarded
 * by `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the homepage the conversion surfaces the approved copy deck
 * never supplied (a trust strip, segmented lead paths, a book-direct argument,
 * section ledes and CTAs).
 *
 * It lives here — colocated with the homepage, outside `src/content` — on
 * purpose. `check:content` only scans the governed content layer, so this
 * cannot masquerade as approved copy, and promoting any of it later is a
 * deliberate move into `src/content/site.ts` after sign-off, not an accident.
 *
 * Every factual claim is traceable to already-approved content: rates from
 * `content/rooms.ts`, the pool/outlet counts and spa hours from
 * `site.positioning.elevatorPitch` and `site.homepage.featureTiles`, the
 * Nakasero positioning from `site.setting`, fibre/room-service/breakfast from
 * `rooms.commonInclusions`. Nothing here invents a fact — only the framing.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content/site.ts` under `homepage`.
 */

export { type TrustItemCopy, trustItems, introStats, introLede } from "./trust";
export { type PlanPathCopy, planPaths, planSection } from "./plan";
export {
  type BenefitCopy,
  bookDirect,
  roomsSection,
  offersSection,
  socialProofSection,
  featureSection,
  locationSection,
  closingSection,
} from "./sections";
