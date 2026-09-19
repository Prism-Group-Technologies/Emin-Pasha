import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { MEMBERSHIP_ANCHOR_ID } from "@/containers/wellness/anchors";
import { GymOnTheFloorSection } from "@/containers/wellness/organisms/GymOnTheFloorSection";
import { MembershipSection } from "@/containers/wellness/organisms/MembershipSection";
import { SeasonalOffersSection } from "@/containers/wellness/organisms/SeasonalOffersSection";
import { SignatureTreatmentsSection } from "@/containers/wellness/organisms/SignatureTreatmentsSection";
import { StickyEnquireCta } from "@/containers/wellness/organisms/StickyEnquireCta";
import { WellnessAssuranceSection } from "@/containers/wellness/organisms/WellnessAssuranceSection";
import { WellnessClosingCtaSection } from "@/containers/wellness/organisms/WellnessClosingCtaSection";
import { WellnessEnquirySection } from "@/containers/wellness/organisms/WellnessEnquirySection";
import { WellnessFaqSection } from "@/containers/wellness/organisms/WellnessFaqSection";
import { WellnessVoicesSection } from "@/containers/wellness/organisms/WellnessVoicesSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { gym } from "@/content/wellness";
import { whatsappWellnessUrl } from "@/lib/directions";
import { alternatingDirection as d } from "@/theme/motion";

const HERO_STATS = [
  { value: "6am–9pm", label: "open every day" },
  { value: "Public", label: "membership open" },
  { value: "Certified", label: "personal trainers" },
  { value: "Renovated", label: "cutting-edge kit" },
];

/**
 * Emin Pasha Gym. Targets "gym membership Nakasero" — the approved §6 copy
 * already states that membership is open to non-residents.
 *
 * A Server Component that only composes section organisms, in funnel order:
 * credibility → what's on the floor → membership tiers + a sample timetable →
 * gym sessions with indicative prices → seasonal intakes → the enquiry form →
 * voices → FAQ → closing. Rates and class times are invented and flagged
 * "indicative"; the 6am–9pm hours and the non-resident membership are the
 * approved facts.
 */
export function GymContainer() {
  return (
    <>
      <PageHero
        image={pageHeroImage("gym")}
        eyebrow="§ THE GYM"
        headline={gym.name}
        lede={gym.description}
        label={gym.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Spa & Wellness", href: "/spa-and-wellness" },
          { label: gym.name },
        ]}
        primaryCta={{ label: "Book on WhatsApp", href: whatsappWellnessUrl }}
        secondaryCta={{ label: "See membership", href: `#${MEMBERSHIP_ANCHOR_ID}` }}
        stats={HERO_STATS}
      />

      <WellnessAssuranceSection motion={d(1)} facility="gym" />
      <GymOnTheFloorSection motion={d(2)} />
      <MembershipSection motion={d(3)} />
      <SignatureTreatmentsSection motion={d(4)} facility="gym" />
      <SeasonalOffersSection motion={d(5)} facility="gym" />
      <WellnessEnquirySection motion={d(6)} interest="gym" />
      <WellnessVoicesSection motion={d(7)} />
      <WellnessFaqSection motion={d(8)} />
      <WellnessClosingCtaSection motion={d(9)} />

      <SectionShell motion={d(10)} heading="Also here">
        <RelatedLinks hrefs={["/spa", "/swimming-pool", "/spa-etiquette", "/accommodation"]} />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
