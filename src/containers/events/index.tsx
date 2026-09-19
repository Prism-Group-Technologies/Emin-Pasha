import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/events/copy";
import { eventsSectionMotion as m } from "@/containers/events/motion";
import { DifferentiatorsSection } from "@/containers/events/organisms/DifferentiatorsSection";
import { EventTypesSection } from "@/containers/events/organisms/EventTypesSection";
import { EventVoicesSection } from "@/containers/events/organisms/EventVoicesSection";
import { EventsClosingCtaSection } from "@/containers/events/organisms/EventsClosingCtaSection";
import { EventsFaqSection } from "@/containers/events/organisms/EventsFaqSection";
import { EventsHero } from "@/containers/events/organisms/EventsHero";
import { GallerySection } from "@/containers/events/organisms/GallerySection";
import { PackagesSection } from "@/containers/events/organisms/PackagesSection";
import { ProcessSection } from "@/containers/events/organisms/ProcessSection";
import { RfpSection } from "@/containers/events/organisms/RfpSection";
import { StickyEnquireCta } from "@/containers/events/organisms/StickyEnquireCta";
import { VenuesSection } from "@/containers/events/organisms/VenuesSection";

const EVENTS_RELATED_HREFS = [
  "/kudara-hall",
  "/meeting-rooms",
  "/business-centre",
  "/weddings",
  "/accommodation",
  "/dining",
];

/**
 * The Meetings & Events hub. A Server Component that composes the section
 * organisms and holds no logic of its own — the client islands are the venue
 * filter (`VenueGrid`), the FAQ accordion, the deferred RFP form and the
 * sticky "enquire" bar. Scroll motion is entirely CSS.
 *
 * The order is a funnel, not a brochure:
 *
 *   hero            — the "one address" pitch, the figures, two in-page CTAs
 *   event types     — the first choice: conference / meeting / wedding / …
 *   venues          — the five spaces, filterable, + indicative capacities
 *   process         — brief → proposal → site visit → confirm
 *   packages        — day-delegate, residential, board dinner, wedding
 *   differentiators — why organisers rebook
 *   voices          — three planner notes (placeholder attributions)
 *   gallery         — the rooms, dressed
 *   rfp             — the RFP form + three channels: the conversion surface
 *   faq             — the questions the events desk fields most
 *   closing         — the last exit, on all three contact channels
 *   related         — cross-sell into the rest of the estate
 *
 * Every capacity, package rate and delegate number is invented and labelled
 * "indicative" — see `containers/events/copy`. The venues, "three restaurants
 * for catering", secure parking, on-site rooms and the §14 group terms are
 * the approved §7/§14 facts the page is built on.
 */
export function EventsContainer() {
  return (
    <>
      <EventsHero />
      <EventTypesSection motion={m.eventTypes} />
      <VenuesSection motion={m.venues} />
      <ProcessSection motion={m.process} />
      <PackagesSection motion={m.packages} />
      <DifferentiatorsSection motion={m.differentiators} />
      <EventVoicesSection motion={m.voices} />
      <GallerySection motion={m.gallery} />
      <RfpSection motion={m.rfp} />
      <EventsFaqSection motion={m.faq} />
      <EventsClosingCtaSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={EVENTS_RELATED_HREFS} />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
