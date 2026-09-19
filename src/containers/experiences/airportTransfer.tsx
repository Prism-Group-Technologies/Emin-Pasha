import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { transferSections } from "@/containers/experiences/transfer/copy/sections";
import { ChauffeurStandardsSection } from "@/containers/experiences/transfer/organisms/ChauffeurStandardsSection";
import { FleetSection } from "@/containers/experiences/transfer/organisms/FleetSection";
import { HowItWorksSection } from "@/containers/experiences/transfer/organisms/HowItWorksSection";
import { InclusionsSection } from "@/containers/experiences/transfer/organisms/InclusionsSection";
import { LongStayBenefitSection } from "@/containers/experiences/transfer/organisms/LongStayBenefitSection";
import { PremiumServicesSection } from "@/containers/experiences/transfer/organisms/PremiumServicesSection";
import { RouteSection } from "@/containers/experiences/transfer/organisms/RouteSection";
import { StickyTransferCta } from "@/containers/experiences/transfer/organisms/StickyTransferCta";
import { TransferAssuranceSection } from "@/containers/experiences/transfer/organisms/TransferAssuranceSection";
import { TransferBookingSection } from "@/containers/experiences/transfer/organisms/TransferBookingSection";
import { TransferClosingSection } from "@/containers/experiences/transfer/organisms/TransferClosingSection";
import { TransferFaqSection } from "@/containers/experiences/transfer/organisms/TransferFaqSection";
import { TransferHero } from "@/containers/experiences/transfer/organisms/TransferHero";
import { TransferVoicesSection } from "@/containers/experiences/transfer/organisms/TransferVoicesSection";
import { alternatingDirection as d } from "@/theme/motion";

const { related } = transferSections;

/**
 * Airport transfer — rebuilt from a single paragraph into a booking funnel.
 * Targets "Entebbe airport transfer" / "Entebbe to Kampala transfer": the
 * airport, the journey time and the fare are what search and travellers want.
 *
 * A Server Component that only composes section organisms, in funnel order:
 * hook (hero) → credibility → process → product (fleet, on the one dark
 * band) → what's included → upsells → route planning → the people → the
 * booking form with a live fare (a client island) → proof → the long-stay
 * cross-sell (dark) → FAQ → closing → related. Bands alternate raised/plain
 * so every section reads as its own step.
 *
 * The approved §8 facts (Entebbe International Airport, flight monitoring,
 * the complimentary-over-one-week benefit, reservations@) render as before.
 * **Fleet models, fares, timings, chauffeurs and voices are invented** and
 * live in `transfer/copy/` flagged INVENTED — TODO(EMIN-Q09) / EMIN-COPY —
 * with every price labelled "indicative".
 */
export function AirportTransferContainer() {
  return (
    <>
      <TransferHero />

      <TransferAssuranceSection motion={d(1)} variant="raised" />
      <HowItWorksSection motion={d(2)} />
      <FleetSection motion={d(3)} variant="contrast" />
      <InclusionsSection motion={d(4)} />
      <PremiumServicesSection motion={d(5)} variant="raised" />
      <RouteSection motion={d(6)} />
      <ChauffeurStandardsSection motion={d(7)} variant="raised" />
      <TransferBookingSection motion={d(8)} />
      <TransferVoicesSection motion={d(9)} variant="raised" />
      <LongStayBenefitSection motion={d(10)} />
      <TransferFaqSection motion={d(11)} />
      <TransferClosingSection motion={d(12)} />

      <SectionShell motion={d(13)} eyebrow={related.eyebrow} heading={related.heading}>
        <RelatedLinks hrefs={["/accommodation", "/offers", "/contact", "/spa"]} />
      </SectionShell>

      <StickyTransferCta />
    </>
  );
}
