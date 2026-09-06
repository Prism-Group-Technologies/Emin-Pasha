import { ScrollProgress } from "@/containers/home/molecules/ScrollProgress";
import { homeSectionMotion as m } from "@/containers/home/motion";
import { ClosingCta } from "@/containers/home/organisms/ClosingCta";
import { FeatureTiles } from "@/containers/home/organisms/FeatureTiles";
import { HeroVideo } from "@/containers/home/organisms/HeroVideo";
import { IntroBlock } from "@/containers/home/organisms/IntroBlock";
import { LocationBlock } from "@/containers/home/organisms/LocationBlock";
import { OffersStrip } from "@/containers/home/organisms/OffersStrip";
import { PillarsSection } from "@/containers/home/organisms/PillarsSection";
import { PlanYourVisit } from "@/containers/home/organisms/PlanYourVisit";
import { RoomsRates } from "@/containers/home/organisms/RoomsRates";
import { SocialProof } from "@/containers/home/organisms/SocialProof";
import { StorySection } from "@/containers/home/organisms/StorySection";
import { TrustBar } from "@/containers/home/organisms/TrustBar";
import { WhyBookDirect } from "@/containers/home/organisms/WhyBookDirect";

/**
 * The homepage. A Server Component that composes thirteen section organisms
 * and holds no logic of its own — the only client islands on the page are the
 * hero video layer, the hero booking widget, the Plan Your Visit tabs and the
 * click-to-load map. The sticky booking bar is mounted once in the root layout,
 * not here — it runs on every route.
 *
 * Scroll motion is entirely CSS: `revealSx`, `Reveal` and `ScrollProgress` are
 * driven by `animation-timeline`, so the page's reveal animations add no
 * JavaScript and no hydration work at all.
 *
 * Each section is handed a reveal direction from `./motion` rather than
 * choosing one itself, because which side a band enters from depends on where
 * it sits in this list — see that module. The directions alternate, so the page
 * hands the eye left and right on the way down instead of pulling it straight
 * through twelve identical vertical fades. Two-column sections take it further
 * and send their halves in against each other. Below `md` every lateral reveal
 * collapses to a vertical rise, because a sideways translate on a narrow
 * viewport is how a page acquires a horizontal scrollbar.
 *
 * The order is a funnel, not a brochure:
 *
 *   hero          — the promise
 *   trust bar     — qualification, in three seconds, before any scroll
 *   intro         — the argument, with the one photograph that earns its place
 *   plan visit    — the fork: stay / host an event / spend the day. The
 *                   earliest possible conversion point for all three audiences
 *   estate        — six reasons to explore further
 *   rooms & rates — the price, published, rather than hidden behind a flow
 *   story         — the thing no competitor can copy, and the site's link magnet
 *   pillars       — the brand, for anyone still reading
 *   offers        — the standing invitation for the local market
 *   proof         — three attributed reviews
 *   book direct   — the answer to "should I book on an aggregator instead?"
 *   location      — the NAP, the map, and directions
 *   closing       — the last exit, on all three contact channels
 *
 * Conversion surfaces are deliberately spread rather than stacked at the end:
 * a visitor who is ready at the trust bar should not have to scroll past nine
 * sections to act, and one who needs the whole argument still gets it.
 */
export function HomeContainer() {
  return (
    <>
      <ScrollProgress />
      <HeroVideo />
      <TrustBar motion={m.trustBar} />
      <IntroBlock motion={m.intro} />
      <PlanYourVisit motion={m.planYourVisit} />
      <FeatureTiles motion={m.featureTiles} />
      <RoomsRates motion={m.roomsRates} />
      <StorySection motion={m.story} />
      <PillarsSection motion={m.pillars} />
      <OffersStrip motion={m.offers} />
      <SocialProof motion={m.socialProof} />
      <WhyBookDirect motion={m.whyBookDirect} />
      <LocationBlock motion={m.location} />
      <ClosingCta motion={m.closingCta} />
    </>
  );
}
