import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { TREATMENTS_ANCHOR_ID } from "@/containers/wellness/anchors";
import { GiftVoucherSection } from "@/containers/wellness/organisms/GiftVoucherSection";
import { JourneySection } from "@/containers/wellness/organisms/JourneySection";
import { SeasonalOffersSection } from "@/containers/wellness/organisms/SeasonalOffersSection";
import { SignatureRitualSection } from "@/containers/wellness/organisms/SignatureRitualSection";
import { SignatureTreatmentsSection } from "@/containers/wellness/organisms/SignatureTreatmentsSection";
import { SpaEnhancementsSection } from "@/containers/wellness/organisms/SpaEnhancementsSection";
import { SpaGroupsSection } from "@/containers/wellness/organisms/SpaGroupsSection";
import { SpaOfferingsSection } from "@/containers/wellness/organisms/SpaOfferingsSection";
import { SpaPassesSection } from "@/containers/wellness/organisms/SpaPassesSection";
import { StickyEnquireCta } from "@/containers/wellness/organisms/StickyEnquireCta";
import { TherapistsSection } from "@/containers/wellness/organisms/TherapistsSection";
import { WellnessAssuranceSection } from "@/containers/wellness/organisms/WellnessAssuranceSection";
import { WellnessClosingCtaSection } from "@/containers/wellness/organisms/WellnessClosingCtaSection";
import { WellnessEnquirySection } from "@/containers/wellness/organisms/WellnessEnquirySection";
import { WellnessFaqSection } from "@/containers/wellness/organisms/WellnessFaqSection";
import { WellnessPackagesSection } from "@/containers/wellness/organisms/WellnessPackagesSection";
import { WellnessVoicesSection } from "@/containers/wellness/organisms/WellnessVoicesSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { spa, spaPageIntro } from "@/content/wellness";
import { whatsappWellnessUrl } from "@/lib/directions";
import { alternatingDirection as d } from "@/theme/motion";

const HERO_STATS = [
  { value: "7am–9pm", label: "open every day" },
  { value: "16+", label: "spa minimum age" },
  { value: "6", label: "signature treatments" },
  { value: "Turkish bath", label: "in full" },
];

/**
 * Swanky Spa. Targets "best spa in Kampala" / "Turkish bath Kampala" through
 * the approved copy itself, which already names the Turkish bath.
 *
 * A Server Component that only composes section organisms — the client
 * islands are the treatment strip, the add-on shortlist estimator, the FAQ
 * accordion, the deferred enquiry form and the sticky bar. The order is a
 * funnel: credibility → what's on offer → the flagship ritual → the menu and
 * its add-ons → packages, seasonal treatments and repeat-visit passes → what
 * a visit is like and who runs it → groups → the enquiry form → vouchers →
 * proof → FAQ → the last exit. Every price is invented and flagged
 * "indicative"; the §6 offerings and the 7am–9pm hours are the approved facts
 * (see `containers/wellness/copy`).
 */
export function SpaContainer() {
  return (
    <>
      <PageHero
        image={pageHeroImage("spa")}
        eyebrow="§ SWANKY SPA"
        headline={spa.name}
        lede={spaPageIntro}
        label={spa.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Spa & Wellness", href: "/spa-and-wellness" },
          { label: spa.name },
        ]}
        primaryCta={{ label: "Book on WhatsApp", href: whatsappWellnessUrl }}
        secondaryCta={{ label: "See the treatment list", href: `#${TREATMENTS_ANCHOR_ID}` }}
        stats={HERO_STATS}
      />

      <WellnessAssuranceSection motion={d(1)} facility="spa" variant="raised" />
      <SpaOfferingsSection motion={d(2)} />
      <SignatureRitualSection motion={d(3)} />
      <SignatureTreatmentsSection motion={d(4)} facility="spa" />
      <SpaEnhancementsSection motion={d(5)} />
      <WellnessPackagesSection motion={d(6)} variant="raised" />
      <SeasonalOffersSection motion={d(7)} facility="spa" />
      <SpaPassesSection motion={d(8)} />
      <JourneySection motion={d(9)} variant="default" />
      <TherapistsSection motion={d(10)} />
      <SpaGroupsSection motion={d(11)} />
      <WellnessEnquirySection motion={d(12)} interest="spa" />
      <GiftVoucherSection motion={d(13)} />
      <WellnessVoicesSection motion={d(14)} variant="raised" />
      <WellnessFaqSection motion={d(15)} />
      <WellnessClosingCtaSection motion={d(16)} />

      <SectionShell motion={d(17)} heading="Before you visit">
        <RelatedLinks hrefs={["/spa-etiquette", "/swimming-pool", "/gym", "/accommodation"]} />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
