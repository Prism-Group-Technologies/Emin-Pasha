/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Every string on this site normally comes from `src/content/*`, a verbatim
 * transcription of docs/02_CONTENT_SOURCE_OF_TRUTH.md guarded by
 * `yarn check:content`. Nothing in this folder is from that source: it was
 * written to turn the Airport Transfer page from a single paragraph into a
 * booking funnel — a fleet with makes and models, indicative US-dollar fares,
 * a live quote, VIP meet & assist, chauffeur-by-the-hour, route timings,
 * chauffeur profiles, traveller voices and an FAQ.
 *
 * It lives here — colocated with the container, outside `src/content` — on
 * purpose, exactly as `containers/wellness/copy` and `containers/events/copy`
 * do. `check:content` only scans the governed layer, so this cannot
 * masquerade as approved copy, and promoting any of it is a deliberate move
 * into `src/content` after sign-off.
 *
 * Traceability. The approved §8 copy supplies: Entebbe International Airport,
 * well-maintained vehicles, professional chauffeurs, personalised luggage
 * help, flight monitoring, safety standards, reservations@ as the booking
 * address, and the complimentary transfer on stays of more than one week.
 * The "≈ 60 min" journey matches `containers/contact/copy/arrival.ts`.
 * **Vehicle models, seat counts, fares, waiting allowances, add-on prices,
 * chauffeur names and every testimonial are invented** — TODO(EMIN-Q09) /
 * TODO(EMIN-COPY) — and fares render as "indicative".
 *
 * Deliberately **no barrel re-exports**: `media.ts` pulls the Zod asset
 * schema, and the booking island must import leaf modules only (D25).
 */
export {};
