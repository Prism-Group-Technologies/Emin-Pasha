import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { DINING_RELATED_HREFS } from "@/containers/dining/constants";
import { sections } from "@/containers/dining/copy";
import { diningSectionMotion as m } from "@/containers/dining/motion";
import { AmbienceSection } from "@/containers/dining/organisms/AmbienceSection";
import { ClosingCtaSection } from "@/containers/dining/organisms/ClosingCtaSection";
import { CulinaryStorySection } from "@/containers/dining/organisms/CulinaryStorySection";
import { DiningFaqSection } from "@/containers/dining/organisms/DiningFaqSection";
import { DiningHero } from "@/containers/dining/organisms/DiningHero";
import { GuestVoicesSection } from "@/containers/dining/organisms/GuestVoicesSection";
import { HoursSection } from "@/containers/dining/organisms/HoursSection";
import { OutletsSection } from "@/containers/dining/organisms/OutletsSection";
import { PrivateDiningSection } from "@/containers/dining/organisms/PrivateDiningSection";
import { ReservationSection } from "@/containers/dining/organisms/ReservationSection";
import { SignatureMenuSection } from "@/containers/dining/organisms/SignatureMenuSection";

/**
 * The Dining index. A Server Component that composes the section organisms and
 * holds no logic of its own — the only client islands are the outlet filter
 * (`OutletGrid`), the menu tabs (`MenuTabs`), the FAQ accordion and the
 * deferred reservation form. Scroll motion is entirely CSS.
 *
 * The order is a funnel, not a brochure:
 *
 *   hero          — the pitch, the figures, and the two in-page CTAs
 *   outlets       — the five rooms, filterable by type
 *   menus         — a sample menu per outlet (tabbed)
 *   story         — the dumbwaiter, the tri-continental kitchen, the sourcing
 *   ambience      — three settings for the same kitchen
 *   private       — four ways to book the property for a group
 *   hours         — sample service times for every room
 *   reservation   — the enquiry form + three channels: the conversion surface, #reserve
 *   voices        — three diner notes (placeholder attributions)
 *   faq           — the six questions the reservations desk fields most
 *   closing       — the last exit, on all three contact channels
 *   related       — cross-sell into the rest of the estate
 *
 * The §12.3 approved intro's two points — the modern dumbwaiter and the
 * Asian/European/African influences — are carried by the hero lede and the
 * culinary-story band rather than restated in words of my own.
 */
export function DiningContainer() {
  return (
    <>
      <DiningHero />
      <OutletsSection motion={m.outlets} />
      <SignatureMenuSection motion={m.menus} />
      <CulinaryStorySection motion={m.story} />
      <AmbienceSection motion={m.ambience} />
      <PrivateDiningSection motion={m.privateDining} />
      <HoursSection motion={m.hours} />
      <ReservationSection motion={m.reservation} />
      <GuestVoicesSection motion={m.voices} />
      <DiningFaqSection motion={m.faq} />
      <ClosingCtaSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={DINING_RELATED_HREFS} />
      </SectionShell>
    </>
  );
}
