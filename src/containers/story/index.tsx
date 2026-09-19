import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { sections } from "@/containers/story/copy";
import { storySectionMotion as m } from "@/containers/story/motion";
import { FullStorySection } from "@/containers/story/organisms/FullStorySection";
import { GmWelcomeSection } from "@/containers/story/organisms/GmWelcomeSection";
import { HotelTodaySection } from "@/containers/story/organisms/HotelTodaySection";
import { JourneyMapSection } from "@/containers/story/organisms/JourneyMapSection";
import { NamedAfterSection } from "@/containers/story/organisms/NamedAfterSection";
import { NamesakeSection } from "@/containers/story/organisms/NamesakeSection";
import { PressSection } from "@/containers/story/organisms/PressSection";
import { StickyEnquireCta } from "@/containers/story/organisms/StickyEnquireCta";
import { StoryChaptersSection } from "@/containers/story/organisms/StoryChaptersSection";
import { StoryClosingSection } from "@/containers/story/organisms/StoryClosingSection";
import { StoryEnquirySection } from "@/containers/story/organisms/StoryEnquirySection";
import { StoryFaqSection } from "@/containers/story/organisms/StoryFaqSection";
import { StoryHero } from "@/containers/story/organisms/StoryHero";
import { StoryVoicesSection } from "@/containers/story/organisms/StoryVoicesSection";
import { ValuesSection } from "@/containers/story/organisms/ValuesSection";

/**
 * The Our Story pillar page, rebuilt as a conversion funnel — the same shape
 * as the Dining, Wellness and Events redesigns. A Server Component that
 * composes the section organisms and holds no logic of its own; the client
 * islands are the FAQ accordion, the deferred enquiry form and the sticky
 * bar. Scroll motion is entirely CSS.
 *
 * The order is a funnel, not a brochure:
 *
 *   hero        — the pitch, the traceable figures, and the two in-page CTAs
 *   namesake    — a portrait teaser + a verbatim pull quote, into the account
 *   journey     — the seven chapters as a horizontal "Equatorial Line" map
 *   full story  — the PRESERVED pillar: sticky ToC + verbatim StoryArticle
 *   values      — the four verbatim principles of `whatWeTakeFromIt`
 *   hotel today — the bridge from the man to the heritage house, into rooms
 *   named after — the internal-linking spine as a card band
 *   gm          — the General Manager's welcome, verbatim, unattributed
 *   voices      — three placeholder guest notes about the sense of place
 *   press       — a placeholder recognition strip
 *   enquiry     — the "Stay in the story" form + three channels, #stay
 *   faq         — five questions about the name and the building
 *   closing     — the last exit, book-direct on WhatsApp + all three channels
 *   related     — cross-sell into the rest of the estate
 *
 * The history is untouched: every date, place and claim renders verbatim from
 * `content/story.ts`. Everything invented lives in `containers/story/copy`,
 * labelled and outside the governed content layer.
 */
export function StoryContainer() {
  return (
    <>
      <StoryHero />
      <NamesakeSection motion={m.namesake} />
      <JourneyMapSection motion={m.journey} />
      <FullStorySection motion={m.fullStory} />
      <ValuesSection motion={m.values} />
      <HotelTodaySection motion={m.hotelToday} />
      <NamedAfterSection motion={m.namedAfter} />
      <StoryChaptersSection
        eyebrow={sections.chapters.eyebrow}
        heading={sections.chapters.heading}
        motion={m.namedAfter}
      />
      <GmWelcomeSection motion={m.gm} />
      <StoryVoicesSection motion={m.voices} />
      <PressSection motion={m.press} />
      <StoryEnquirySection motion={m.enquiry} />
      <StoryFaqSection motion={m.faq} />
      <StoryClosingSection motion={m.closing} />
      <SectionShell
        motion={m.related}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks
          hrefs={[
            "/accommodation",
            "/dining/hakki-pasha-restaurant-bar",
            "/dining/sir-samuel-baker-fine-dining",
            "/lounges-and-spaces",
          ]}
        />
      </SectionShell>

      <StickyEnquireCta />
    </>
  );
}
