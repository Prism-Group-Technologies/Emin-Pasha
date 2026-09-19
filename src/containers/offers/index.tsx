import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/offers/copy";
import { offersSectionMotion as m } from "@/containers/offers/motion";
import { BookDirectPerksSection } from "@/containers/offers/organisms/BookDirectPerksSection";
import { FeaturedOfferSection } from "@/containers/offers/organisms/FeaturedOfferSection";
import { OfferAlertsSection } from "@/containers/offers/organisms/OfferAlertsSection";
import { OffersClosingSection } from "@/containers/offers/organisms/OffersClosingSection";
import { OffersFaqSection } from "@/containers/offers/organisms/OffersFaqSection";
import { OffersGridSection } from "@/containers/offers/organisms/OffersGridSection";
import { OffersHero } from "@/containers/offers/organisms/OffersHero";
import { SeasonalCalendarSection } from "@/containers/offers/organisms/SeasonalCalendarSection";
import { StickyClaimCta } from "@/containers/offers/organisms/StickyClaimCta";

/**
 * Offers, rebuilt as a conversion funnel — the same shape as the Contact,
 * Story, Wellness and Events redesigns. A Server Component that composes the
 * section organisms and holds no logic of its own; the client islands are the
 * category filter, the newsletter form, the FAQ accordion and the sticky bar.
 *
 * Every offer is claimed on WhatsApp, with a pre-written message naming it.
 * The order follows a visitor who arrives curious and leaves with a plan:
 *
 *   hero      — the promise, browse + WhatsApp CTAs, book-direct figures
 *   featured  — one spotlight package with its full inclusions and saving
 *   grid      — every offer, filterable by category, #offers
 *   perks     — what booking direct adds, beside the price-match promise
 *   calendar  — the seasonal year ahead; open = claim, soon = notify me
 *   alerts    — the newsletter as offer alerts for the not-yet-ready, #alerts
 *   faq       — pre-claim questions beside a plain-language terms card
 *   closing   — dark band, claim on WhatsApp or call
 *   related   — cross-sell into rooms, dining, spa and events
 *
 * Grounds alternate default / raised down the page, with the dark band
 * reserved for the closing ask. The two approved offers render verbatim from
 * `content/offers.ts` (via `catalogue.ts`); everything invented lives in
 * `containers/offers/copy`, labelled and outside the governed content layer.
 */
export function OffersContainer() {
  return (
    <>
      <OffersHero />
      <FeaturedOfferSection motion={m.featured} />
      <OffersGridSection motion={m.grid} />
      <BookDirectPerksSection motion={m.perks} />
      <SeasonalCalendarSection motion={m.calendar} />
      <OfferAlertsSection motion={m.alerts} />
      <OffersFaqSection motion={m.faq} />
      <OffersClosingSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks
          hrefs={["/accommodation", "/dining", "/spa-and-wellness", "/meetings-and-events"]}
        />
      </SectionShell>

      <StickyClaimCta />
    </>
  );
}
