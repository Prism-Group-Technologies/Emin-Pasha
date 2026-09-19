/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source. The
 * approved deck gives the three §5 spaces one description each and no hours,
 * capacities, menus or rates; this folder supplies the conversion surfaces the
 * page needs — a matcher, per-space facts, priced signature experiences, a
 * weekly rhythm, private-hire tiers, a membership, voices and an FAQ.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/story/copy` and `containers/wellness/copy`
 * do. `check:content` only scans the governed layer, so none of this can
 * masquerade as approved copy.
 *
 * Traceability. The three approved descriptions and the Mehmed Pasha
 * `namedForNote` still render **verbatim** from `content/spaces.ts`; the
 * Acropole seating zones restate that description's own fireplace / bar /
 * alcove split, and the Friday Band Night and Sunset Happy Hour entries link
 * to the approved offers rather than restating them. Every capacity, hour and
 * US-dollar figure is invented and labelled "indicative" wherever it renders.
 *
 * Client islands import the leaf modules, never this barrel or `./media`
 * (which pulls in the Zod asset schema).
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content`. TODO(EMIN-Q34): no mail provider is wired.
 */

export { heroCopy, assuranceItems } from "./hero";
export { sections } from "./sections";
export { spaceProfiles, spaceProfile, type SpaceProfile } from "./profiles";
export { dayMoments, type DayMoment, type DayPart } from "./day";
export { signatureExperiences, type SignatureExperience } from "./experiences";
export { weeklyRhythm, type RhythmEntry } from "./rhythm";
export { hireTiers, hireInclusions, type HireTier } from "./privateHire";
export { moments, type Moment } from "./moments";
export { circleCopy, circlePerks, type CirclePerk } from "./circle";
export { spacesVoices } from "./voices";
export { spacesFaq } from "./faq";
