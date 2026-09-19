/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Dining pages the conversion surfaces the approved copy
 * deck never supplied — a hero pitch, sample menus, opening hours, a culinary
 * story, private-dining offerings, guest voices, section ledes and CTAs, and
 * the table-reservation enquiry form's interface copy.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/accommodation/copy` and `containers/home/copy`
 * do. `check:content` only scans the governed layer, so this cannot masquerade
 * as approved copy, and promoting any of it is a deliberate move into
 * `src/content` after sign-off.
 *
 * Traceability. Every structural claim ties back to already-approved content:
 * the three restaurants + two bars, the modern dumbwaiter, the Asian/European/
 * African influences and 24/7 in-room dining are all in `content/dining.ts`;
 * the namesakes are in `content/dining.ts` (`namedForNote`) and the story
 * pillar; Friday Band Night is in `content/offers.ts`; the Nakasero garden
 * setting is in `content/identity.ts` and `content/site.ts`. The **menus,
 * dish names, prices and opening hours are invented** — the source has none of
 * them (TODO(EMIN-Q12)) — and are labelled "sample menu, seasonal" wherever
 * they render.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content` and replace the sample menus/hours with the real ones.
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { outletMenus, type OutletMenu, type MenuCourse, type MenuItem } from "./menus";
export { outletHours, type OutletHours, type HoursRow } from "./hours";
export { culinaryStory, ambiences, type Ambience } from "./experience";
export { diningPackages, packagesNote, type DiningPackage } from "./packages";
export { diningVoices, type DiningVoice } from "./voices";
export { diningFaq, type DiningFaqItem } from "./faq";
export { outletMeta, type OutletMeta } from "./outlets";
export { outletFacts, type OutletFact } from "./facts";
export { outletIntros, type OutletIntro } from "./rooms";
export { reservationCopy } from "./reservation";
