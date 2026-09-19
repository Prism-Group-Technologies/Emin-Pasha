import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/wellness/copy";
import { wellnessSectionMotion as m } from "@/containers/wellness/motion";
import { JourneySection } from "@/containers/wellness/organisms/JourneySection";
import { MembershipSection } from "@/containers/wellness/organisms/MembershipSection";
import { PillarsSection } from "@/containers/wellness/organisms/PillarsSection";
import { SignatureTreatmentsSection } from "@/containers/wellness/organisms/SignatureTreatmentsSection";
import { StickyEnquireCta } from "@/containers/wellness/organisms/StickyEnquireCta";
import { WellnessClosingCtaSection } from "@/containers/wellness/organisms/WellnessClosingCtaSection";
import { WellnessEnquirySection } from "@/containers/wellness/organisms/WellnessEnquirySection";
import { WellnessFaqSection } from "@/containers/wellness/organisms/WellnessFaqSection";
import { WellnessHero } from "@/containers/wellness/organisms/WellnessHero";
import { WellnessPackagesSection } from "@/containers/wellness/organisms/WellnessPackagesSection";
import { WellnessVoicesSection } from "@/containers/wellness/organisms/WellnessVoicesSection";

/**
 * The Spa & Wellness hub. A Server Component that composes the section
 * organisms and holds no logic of its own — the client islands are the
 * treatment filter (`TreatmentGrid`), the FAQ accordion, the deferred
 * enquiry form and the sticky "book" bar. Scroll motion is entirely CSS.
 *
 * The order is a funnel, not a brochure:
 *
 *   hero          — the pitch, the approved figures, and the two CTAs
 *   pillars       — spa / gym / pool, the first choice to make
 *   treatments    — the signature menu with indicative prices, filterable
 *   packages      — three bundled wellness days
 *   journey       — what a first visit actually looks like
 *   membership    — gym tiers + a sample class timetable
 *   enquiry       — the on-page form + three channels: the conversion surface
 *   voices        — three visitor notes (placeholder attributions)
 *   faq           — the questions the wellness desk fields most
 *   closing       — the last exit, WhatsApp plus all three channels
 *   related       — cross-sell into the rest of the estate
 *
 * Every price, duration, membership rate and class time is invented and
 * labelled "indicative" — see `containers/wellness/copy`. The spa (7am–9pm)
 * and gym (6am–9pm) hours, the pool's public access and the gym's
 * non-resident membership are the approved §6 facts the page is built on.
 */
export function WellnessContainer() {
  return (
    <>
      <WellnessHero />
      <PillarsSection motion={m.pillars} />
      <SignatureTreatmentsSection motion={m.treatments} />
      <WellnessPackagesSection motion={m.packages} />
      <JourneySection motion={m.journey} />
      <MembershipSection motion={m.membership} />
      <WellnessEnquirySection motion={m.enquiry} />
      <WellnessVoicesSection motion={m.voices} />
      <WellnessFaqSection motion={m.faq} />
      <WellnessClosingCtaSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={["/accommodation", "/dining", "/offers"]} />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
