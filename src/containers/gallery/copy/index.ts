/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source. The
 * approved deck gives the gallery a single lede and a flat photo list; this
 * folder supplies the conversion surfaces the page needs — six mood
 * collections (each also a `/gallery/<slug>` route), editorial stories, photo
 * captions, per-category "book this view" prices, a film reel and virtual
 * tour band, a guest lens wall, an FAQ and closing copy.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/spaces/copy` and `containers/offers/copy`
 * do. `check:content` only scans the governed layer, so none of this can
 * masquerade as approved copy.
 *
 * Traceability. Photographs from `content/assets.ts` keep their manifest ids
 * and alt text; only their display captions are new (`captions.ts`). Every
 * placeholder photo, US-dollar figure, statistic, guest handle and quote is
 * invented and labelled "indicative" or "placeholder" wherever it renders.
 * The only lead channel is WhatsApp (user decision, 2026-09-15).
 *
 * Client islands import the leaf modules, never this barrel or `./media`
 * (which pulls in the Zod asset schema).
 *
 * TODO(EMIN-COPY): client sign-off, then migrate approved items into
 * `src/content`. TODO(EMIN-Q44): real photography replaces every placeholder.
 */

export { heroCopy } from "./hero";
export { sections } from "./sections";
export { categoryOffers } from "./categoryOffers";
export { collectionCopy, type CollectionCopy } from "./collections";
export { stories, type Story } from "./stories";
export { filmChapters, tourCopy, type FilmChapter } from "./film";
export { lensTiles, lensVoices, lensCopy, type LensTile } from "./lens";
export { galleryStats } from "./stats";
export { galleryFaq } from "./faq";
