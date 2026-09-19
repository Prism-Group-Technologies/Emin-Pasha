import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/spaces/copy/sections";
import { spacesSectionMotion as m } from "@/containers/spaces/motion";
import { DayInTheLoungesSection } from "@/containers/spaces/organisms/DayInTheLoungesSection";
import { LoungeCircleSection } from "@/containers/spaces/organisms/LoungeCircleSection";
import { MomentsSection } from "@/containers/spaces/organisms/MomentsSection";
import { PrivateHireSection } from "@/containers/spaces/organisms/PrivateHireSection";
import { SignatureExperiencesSection } from "@/containers/spaces/organisms/SignatureExperiencesSection";
import { SpaceMatcherSection } from "@/containers/spaces/organisms/SpaceMatcherSection";
import { SpaceSpotlightsSection } from "@/containers/spaces/organisms/SpaceSpotlightsSection";
import { SpacesAssuranceSection } from "@/containers/spaces/organisms/SpacesAssuranceSection";
import { SpacesClosingSection } from "@/containers/spaces/organisms/SpacesClosingSection";
import { SpacesCompareSection } from "@/containers/spaces/organisms/SpacesCompareSection";
import { SpacesEnquirySection } from "@/containers/spaces/organisms/SpacesEnquirySection";
import { SpacesFaqSection } from "@/containers/spaces/organisms/SpacesFaqSection";
import { SpacesHero } from "@/containers/spaces/organisms/SpacesHero";
import { SpacesVoicesSection } from "@/containers/spaces/organisms/SpacesVoicesSection";
import { StickySpacesCta } from "@/containers/spaces/organisms/StickySpacesCta";
import { WeeklyRhythmSection } from "@/containers/spaces/organisms/WeeklyRhythmSection";

/**
 * Lounges & Spaces, rebuilt as a conversion funnel — the same shape as the
 * Story, Wellness, Events and Transfer redesigns. A Server Component that only
 * composes section organisms; the client islands are the matcher, the day /
 * evening timeline, the reserve buttons, the deferred form, the FAQ and the
 * sticky bar. Still one hub page with on-page anchors, not a route per space
 * (PLAN.md §5, risk 9).
 *
 *   hero         — the pitch, a figure rail, "find your space" + WhatsApp
 *   assurance    — walk-ins, bar, fireside, alcoves, gardens, parking
 *   matcher      — occasion × hour × party → ranked spaces → seeds the form
 *   spaces       — three editorial chapters, approved copy verbatim
 *   compare      — the three side by side
 *   day          — the estate hour by hour, day / evening toggle
 *   experiences  — six priced, reservable rituals (USD, indicative)
 *   rhythm       — the standing week, Band Night linked to /offers
 *   private hire — four minimum-spend tiers on the dark band
 *   moments      — occasions as a bento grid
 *   circle       — the Lounge Circle membership
 *   voices       — three placeholder guest notes
 *   reserve      — the form + next steps + direct lines, #reserve
 *   faq · closing · related · sticky bar
 */
export function SpacesContainer() {
  return (
    <>
      <SpacesHero />
      <SpacesAssuranceSection motion={m.assurance} />
      <SpaceMatcherSection motion={m.matcher} />
      <SpaceSpotlightsSection motion={m.spaces} />
      <SpacesCompareSection motion={m.compare} />
      <DayInTheLoungesSection motion={m.day} />
      <SignatureExperiencesSection motion={m.experiences} />
      <WeeklyRhythmSection motion={m.rhythm} />
      <PrivateHireSection motion={m.privateHire} />
      <MomentsSection motion={m.moments} />
      <LoungeCircleSection motion={m.circle} />
      <SpacesVoicesSection motion={m.voices} />
      <SpacesEnquirySection motion={m.reserve} />
      <SpacesFaqSection motion={m.faq} />
      <SpacesClosingSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={["/dining", "/meetings-and-events", "/offers", "/accommodation"]} />
      </SectionShell>
      <StickySpacesCta />
    </>
  );
}
