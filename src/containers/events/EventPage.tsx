import type { ReactNode } from "react";

import { PageHero } from "@/components/organisms/PageHero";
import { type HeroStatItem } from "@/components/organisms/PageHero/HeroStatRail";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { sections, venues } from "@/containers/events/copy";
import { DifferentiatorsSection } from "@/containers/events/organisms/DifferentiatorsSection";
import { EventVoicesSection } from "@/containers/events/organisms/EventVoicesSection";
import { EventsClosingCtaSection } from "@/containers/events/organisms/EventsClosingCtaSection";
import { EventsFaqSection } from "@/containers/events/organisms/EventsFaqSection";
import { PackagesSection } from "@/containers/events/organisms/PackagesSection";
import { ProcessSection } from "@/containers/events/organisms/ProcessSection";
import { RfpSection } from "@/containers/events/organisms/RfpSection";
import { StickyEnquireCta } from "@/containers/events/organisms/StickyEnquireCta";
import { VenueIntroSection } from "@/containers/events/organisms/VenueIntroSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { alternatingDirection } from "@/theme/motion";

export interface EventPageProps {
  /** Route key for the hero photograph — see `@/content/pageHeroes`. */
  heroKey: string;
  eyebrow: string;
  heading: string;
  intro: string;
  breadcrumb: string;
  /** Two to four traceable figures on the hero rail. */
  stats?: HeroStatItem[];
  /** Verified inclusions, rendered as a checked list. */
  inclusions?: string[];
  /** Copy-layer venue ids whose indicative capacity table this page shows. */
  venueIds?: string[];
  /**
   * Page-specific full-width sections, rendered between the inclusions block
   * and the shared funnel. Each child is expected to bring its own
   * `SectionShell`, so it is a sibling of the intro shell, not nested inside it.
   */
  children?: ReactNode;
  relatedHrefs: string[];
  showGroupTerms?: boolean;
}

/**
 * The shared shape of the four venue pages under Meetings & Events (Kudara
 * Hall, Meeting Rooms, Business Centre, Weddings).
 *
 * Each keeps its own hero, inclusions and indicative capacity table, then
 * inherits the same conversion funnel the hub uses — process, packages,
 * differentiators, planner voices, the RFP form, FAQ and the closing band —
 * so an organiser who lands deep on one venue is never sent back to the hub
 * to enquire. That navigation is where event leads are lost.
 */
export function EventPage(props: EventPageProps) {
  const pageVenues = venues.filter((venue) => props.venueIds?.includes(venue.id));
  const m = (index: number) => alternatingDirection(index);

  return (
    <>
      <PageHero
        image={pageHeroImage(props.heroKey)}
        eyebrow={props.eyebrow}
        headline={props.heading}
        lede={props.intro}
        label={props.heading}
        stats={props.stats}
        primaryCta={{ label: "Request a proposal", href: `#${ENQUIRE_ANCHOR_ID}` }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Meetings & Events", href: "/meetings-and-events" },
          ...(props.breadcrumb ? [{ label: props.breadcrumb }] : []),
        ]}
      />

      <VenueIntroSection
        motion={m(0)}
        inclusions={props.inclusions}
        venues={pageVenues}
        showGroupTerms={props.showGroupTerms !== false}
      />

      {props.children}

      <ProcessSection motion={m(1)} variant="raised" />
      <PackagesSection motion={m(2)} />
      <DifferentiatorsSection motion={m(3)} />
      <EventVoicesSection motion={m(4)} />
      <RfpSection motion={m(5)} />
      <EventsFaqSection motion={m(6)} />
      <EventsClosingCtaSection motion={m(7)} />

      <SectionShell
        motion={m(8)}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={props.relatedHrefs} />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
