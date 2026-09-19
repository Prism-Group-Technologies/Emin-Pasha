import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { ENQUIRE_ANCHOR_ID } from "@/containers/wellness/anchors";
import { poolFaq } from "@/containers/wellness/copy/poolFaq";
import { poolSections } from "@/containers/wellness/copy/poolSections";
import { PoolExperienceSection } from "@/containers/wellness/organisms/PoolExperienceSection";
import { PoolPassesSection } from "@/containers/wellness/organisms/PoolPassesSection";
import { PoolPlannerSection } from "@/containers/wellness/organisms/PoolPlannerSection";
import { PoolPrivateHireSection } from "@/containers/wellness/organisms/PoolPrivateHireSection";
import { PoolWaysToSwimSection } from "@/containers/wellness/organisms/PoolWaysToSwimSection";
import { SeasonalOffersSection } from "@/containers/wellness/organisms/SeasonalOffersSection";
import { StickyEnquireCta } from "@/containers/wellness/organisms/StickyEnquireCta";
import { WellnessAssuranceSection } from "@/containers/wellness/organisms/WellnessAssuranceSection";
import { WellnessClosingCtaSection } from "@/containers/wellness/organisms/WellnessClosingCtaSection";
import { WellnessFaqSection } from "@/containers/wellness/organisms/WellnessFaqSection";
import { WellnessVoicesSection } from "@/containers/wellness/organisms/WellnessVoicesSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { pool } from "@/content/wellness";
import { whatsappWellnessUrl } from "@/lib/directions";
import { alternatingDirection as d } from "@/theme/motion";

const { hero, related } = poolSections;

const HERO_STATS = [
  { value: "Public", label: "open to the city" },
  { value: "1.60m", label: "maximum depth" },
  { value: "Gardens", label: "poolside setting" },
  { value: "Private hire", label: "for poolside events" },
];

/**
 * The pool. Targets "swimming pool open to public Kampala" — public access is
 * the fact search wants, and the approved copy states it outright. The "300ft"
 * figure is **omitted** (Q17 unresolved; DECISIONS.md D45).
 *
 * A Server Component that only composes section organisms, in funnel order:
 * credibility → the pool + safety → day-rate options → season passes → private
 * hire and events → the visit planner (the on-page lead form, a client island)
 * → seasonal swims → proof → FAQ → closing. Prices are invented and flagged
 * "indicative"; the safety rules stay rendered prominently, not buried.
 */
export function PoolContainer() {
  return (
    <>
      <PageHero
        image={pageHeroImage("pool")}
        eyebrow={hero.eyebrow}
        headline={pool.name}
        lede={hero.lede}
        label={pool.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Spa & Wellness", href: "/spa-and-wellness" },
          { label: pool.name },
        ]}
        primaryCta={{ label: hero.primaryCtaLabel, href: whatsappWellnessUrl }}
        secondaryCta={{ label: hero.secondaryCtaLabel, href: `#${ENQUIRE_ANCHOR_ID}` }}
        stats={HERO_STATS}
      />

      <WellnessAssuranceSection motion={d(1)} facility="pool" variant="raised" />
      <PoolExperienceSection motion={d(2)} />
      <PoolWaysToSwimSection motion={d(3)} variant="raised" />
      <PoolPassesSection motion={d(4)} />
      <PoolPrivateHireSection motion={d(5)} variant="raised" />
      <PoolPlannerSection motion={d(6)} />
      <SeasonalOffersSection motion={d(7)} facility="pool" />
      <WellnessVoicesSection motion={d(8)} variant="raised" />
      <WellnessFaqSection motion={d(9)} items={poolFaq} copy={poolSections.faq} />
      <WellnessClosingCtaSection motion={d(10)} />

      <SectionShell motion={d(11)} eyebrow={related.eyebrow} heading={related.heading}>
        <RelatedLinks hrefs={["/spa", "/gym", "/spa-etiquette", "/accommodation"]} />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
