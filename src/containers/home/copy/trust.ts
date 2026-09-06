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

export interface TrustItemCopy {
  /** The figure or short fact — carries the visual weight. */
  value: string;
  /** What the figure is. */
  label: string;
}

/**
 * The credibility strip directly beneath the hero. Six facts a visitor uses to
 * decide, in under three seconds, whether this property is the right tier —
 * the "one obvious path, no hunting" principle applied to qualification
 * rather than navigation.
 */
export const trustItems: TrustItemCopy[] = [
  { value: "Nakasero", label: "Kampala's embassy quarter" },
  { value: "Est. 2004", label: "Independent & boutique" },
  { value: "3 + 2", label: "Restaurants & bars" },
  { value: "300ft", label: "Garden swimming pool" },
  { value: "7am–9pm", label: "Spa, seven days" },
  { value: "Unlimited", label: "Fibre in every room" },
];

/** The stat rail alongside the introduction — scale, stated plainly. */
export const introStats: TrustItemCopy[] = [
  { value: "4", label: "Room & suite categories" },
  { value: "6", label: "Dining & lounge venues" },
  { value: "1", label: "Garden estate, city centre" },
];

export const introLede = "Arrive somewhere. Don't merely check in.";
