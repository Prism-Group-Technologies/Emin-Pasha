import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { STAY_ANCHOR_ID } from "@/containers/story/anchors";
import { namesakePageCopy, sections } from "@/containers/story/copy";
import { FullStorySection } from "@/containers/story/organisms/FullStorySection";
import { JourneyMapSection } from "@/containers/story/organisms/JourneyMapSection";
import { NamesakeSection } from "@/containers/story/organisms/NamesakeSection";
import { StoryChaptersSection } from "@/containers/story/organisms/StoryChaptersSection";
import { StoryClosingSection } from "@/containers/story/organisms/StoryClosingSection";
import { ValuesSection } from "@/containers/story/organisms/ValuesSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { alternatingDirection } from "@/theme/motion";

/**
 * `/our-story/emin-pasha` — "Emin Pasha — Our Namesake".
 *
 * The biography, on its own route. The `/our-story` hub is the funnel; this
 * page is the reference document behind it, so it leads with the account
 * itself rather than a pitch:
 *
 *   hero      — who he was, in one screen, with the traceable figures
 *   namesake  — the portrait teaser + the verbatim pull quote
 *   journey   — the seven chapters as the horizontal "Equatorial Line"
 *   full story— the PRESERVED pillar: sticky ToC + verbatim `StoryArticle`
 *   values    — the four verbatim principles of `whatWeTakeFromIt`
 *   onward    — the other two Our Story chapters
 *   related   — cross-sell into the spaces that carry a name from the story
 *   closing   — book-direct on WhatsApp + all three channels
 *
 * Every date, place and claim renders verbatim from `content/story.ts`. The
 * wrapper copy is `containers/story/copy`, labelled and outside the governed
 * layer. A Server Component; the client islands live inside the reused
 * organisms (the sticky ToC, the FAQ accordion is not on this page).
 */
export function NamesakePageContainer() {
  return (
    <>
      <PageHero
        image={pageHeroImage("story-namesake")}
        eyebrow={namesakePageCopy.hero.eyebrow}
        headline={namesakePageCopy.hero.headline}
        lede={namesakePageCopy.hero.lede}
        label="Emin Pasha — Our Namesake"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Emin Pasha" },
        ]}
        primaryCta={{ label: "Plan a stay in the story", href: `/our-story#${STAY_ANCHOR_ID}` }}
        secondaryCta={{ label: "Read the full account", href: "#the-life" }}
        stats={namesakePageCopy.hero.stats}
        minHeight={{ xs: 560, md: 660 }}
      />
      <NamesakeSection motion={alternatingDirection(0)} />
      <JourneyMapSection motion={alternatingDirection(1)} />
      <FullStorySection motion={alternatingDirection(2)} />
      <ValuesSection motion={alternatingDirection(3)} />
      <StoryChaptersSection
        eyebrow={namesakePageCopy.onward.eyebrow}
        heading={namesakePageCopy.onward.heading}
        exclude="/our-story/emin-pasha"
        motion={alternatingDirection(4)}
      />
      <SectionShell
        motion={alternatingDirection(5)}
        eyebrow={sections.namedAfter.eyebrow}
        heading={sections.namedAfter.heading}
      >
        <RelatedLinks
          hrefs={[
            "/dining/hakki-pasha-restaurant-bar",
            "/dining/sir-samuel-baker-fine-dining",
            "/lounges-and-spaces",
            "/accommodation",
          ]}
        />
      </SectionShell>
      <StoryClosingSection motion={alternatingDirection(6)} />
    </>
  );
}
