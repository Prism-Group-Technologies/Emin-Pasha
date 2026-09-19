import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { STAY_ANCHOR_ID } from "@/containers/story/anchors";
import { sections, theHotelPageCopy } from "@/containers/story/copy";
import { HotelAddressSection } from "@/containers/story/organisms/HotelAddressSection";
import { HotelTodaySection } from "@/containers/story/organisms/HotelTodaySection";
import { NamedAfterSection } from "@/containers/story/organisms/NamedAfterSection";
import { StoryChaptersSection } from "@/containers/story/organisms/StoryChaptersSection";
import { StoryClosingSection } from "@/containers/story/organisms/StoryClosingSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { alternatingDirection } from "@/theme/motion";

/**
 * `/our-story/the-hotel` — "The Hotel".
 *
 * The bridge from the man to the house: what the building is, where it sits,
 * and how the story turns up in its named spaces.
 *
 *   hero        — the house in one screen, figures drawn from `identity.ts`
 *   hotel today — the reused "where the story lives now" band + fact rail
 *   address     — the Nakasero location, verbatim `identity` strings
 *   named after — the spaces that carry a name from the account
 *   onward      — the other two Our Story chapters
 *   related     — cross-sell into rooms, gardens and the spa
 *   closing     — book-direct on WhatsApp + all three channels
 *
 * A Server Component. All non-`identity` copy is `containers/story/copy`,
 * labelled and outside the governed layer.
 */
export function TheHotelPageContainer() {
  return (
    <>
      <PageHero
        image={pageHeroImage("story-the-hotel")}
        eyebrow={theHotelPageCopy.hero.eyebrow}
        headline={theHotelPageCopy.hero.headline}
        lede={theHotelPageCopy.hero.lede}
        label="The Hotel"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "The Hotel" },
        ]}
        primaryCta={{ label: "See the rooms", href: "/accommodation" }}
        secondaryCta={{ label: "Plan a stay", href: `/our-story#${STAY_ANCHOR_ID}` }}
        stats={theHotelPageCopy.hero.stats}
        minHeight={{ xs: 560, md: 660 }}
      />
      <HotelTodaySection motion={alternatingDirection(0)} />
      <HotelAddressSection motion={alternatingDirection(1)} />
      <NamedAfterSection motion={alternatingDirection(2)} />
      <StoryChaptersSection
        eyebrow={theHotelPageCopy.onward.eyebrow}
        heading={theHotelPageCopy.onward.heading}
        exclude="/our-story/the-hotel"
        motion={alternatingDirection(3)}
      />
      <SectionShell
        motion={alternatingDirection(4)}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks
          hrefs={["/accommodation", "/lounges-and-spaces", "/spa-and-wellness", "/dining"]}
        />
      </SectionShell>
      <StoryClosingSection motion={alternatingDirection(5)} />
    </>
  );
}
