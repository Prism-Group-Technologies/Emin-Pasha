/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to give the Our Story page the conversion surfaces the approved
 * copy deck never supplied — a hero pitch, a namesake teaser, a visual
 * journey map, a values band, a "the hotel today" band, guest voices, a
 * press strip, an enquiry form and an FAQ.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/dining/copy` and `containers/wellness/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy, and promoting any of it is a deliberate move
 * into `src/content` after sign-off.
 *
 * Traceability. The **history is untouched** — the seven timeline chapters,
 * "why we carry this name", "what we take from it" and the GM message all
 * render verbatim from `content/story.ts`. Everything here is the *wrapper*
 * around that narrative: section ledes, the four value phrases lifted
 * verbatim from `story.whatWeTakeFromIt` and glossed, a "the hotel today"
 * band tied to the 2004 building asset, and placeholder voices / press
 * attributed to no real, named person or publication.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content`. TODO(EMIN-Q34): no mail provider is wired — the enquiry
 * form captures the lead and a person confirms.
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { namesakeCopy } from "./namesake";
export { journeyCopy } from "./journey";
export { storyValues, type StoryValue } from "./values";
export { hotelTodayCopy, hotelTodayFacts } from "./hotelToday";
export { namedAfter, type NamedAfterLink } from "./namedAfter";
export { storyVoices, type StoryVoice } from "./voices";
export { pressQuotes, type PressQuote } from "./press";
export { storyFaq, type StoryFaqItem } from "./faq";
export { enquiryCopy, storyFocusOptions, type StoryFocusOption } from "./enquiry";
export { namesakePageCopy, theHotelPageCopy, gmPageCopy, type StorySubPageHero } from "./pages";
