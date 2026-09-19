/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to turn the FAQ from a plain list into a help centre that converts
 * — a hero pitch, quick-answer cards, 24 additional questions, topic
 * placements, plan-your-stay guides, trust promises and a closing band.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/contact/copy` and `containers/offers/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy.
 *
 * Traceability. The 13 approved answers in `content/faq.ts` render
 * **verbatim** and remain the only answers in the page's `FAQPage` JSON-LD
 * (`app/faq/page.tsx`); invented answers are visible on the page but never
 * enter structured data. Check-in/out times render from `content/identity.ts`
 * and the guest reviews are the three approved `content/testimonials.ts`.
 * Everything else — the extra answers, lead times, distances, reply windows,
 * guide copy — is service wording to confirm.
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved answers into
 * `src/content/faq.ts` (which also adds them to the JSON-LD).
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { approvedFaqTopics } from "./topics";
export { inventedFaqs } from "./inventedFaqs";
export { quickAnswers, type QuickAnswer } from "./quickAnswers";
export { trustPromises, type TrustPromise } from "./trust";
export { faqGuides, type FaqGuide } from "./guides";
export { faqGuideAsset } from "./media";
