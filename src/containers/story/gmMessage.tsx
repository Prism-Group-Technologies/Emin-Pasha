import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { STAY_ANCHOR_ID } from "@/containers/story/anchors";
import { gmPageCopy, sections } from "@/containers/story/copy";
import { GmWelcomeSection } from "@/containers/story/organisms/GmWelcomeSection";
import { StoryChaptersSection } from "@/containers/story/organisms/StoryChaptersSection";
import { StoryClosingSection } from "@/containers/story/organisms/StoryClosingSection";
import { ValuesSection } from "@/containers/story/organisms/ValuesSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { alternatingDirection } from "@/theme/motion";

/**
 * `/our-story/message-from-the-general-manager` — the welcome, on its own
 * route (Q65: kept as a standalone link until the merge-vs-route call is
 * made).
 *
 *   hero      — the title and a one-line framing
 *   welcome   — the reused `GmWelcomeSection`, here carrying the `framing`
 *               copy in its header (why the message is unattributed, and what
 *               it promises) above `story.generalManagerMessage` verbatim,
 *               unattributed beyond "The General Manager" (§12.4)
 *   values    — the four verbatim principles the welcome is built on
 *   onward    — the other two Our Story chapters
 *   related   — cross-sell into rooms, contact and the spa
 *   closing   — book-direct on WhatsApp + all three channels
 *
 * The message renders verbatim from `content/story.ts`; the framing is
 * `containers/story/copy`, labelled and outside the governed layer. It used
 * to sit in its own `SectionShell` immediately above the welcome, which
 * stacked two near-identical intro bands — it now folds into
 * `GmWelcomeSection`'s split header instead. A Server Component.
 */
export function GmMessagePageContainer() {
  return (
    <>
      <PageHero
        image={pageHeroImage("story-gm")}
        eyebrow={gmPageCopy.hero.eyebrow}
        headline={gmPageCopy.hero.headline}
        lede={gmPageCopy.hero.lede}
        label="Message from the General Manager"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Story", href: "/our-story" },
          { label: "Message from the General Manager" },
        ]}
        primaryCta={{ label: "Plan a stay", href: `/our-story#${STAY_ANCHOR_ID}` }}
        secondaryCta={{ label: "Read our history", href: "/our-story/emin-pasha" }}
        align="center"
        minHeight={{ xs: 480, md: 560 }}
      />
      <GmWelcomeSection motion={alternatingDirection(0)} framing={gmPageCopy.framing} />
      <ValuesSection motion={alternatingDirection(1)} />
      <StoryChaptersSection
        eyebrow={gmPageCopy.onward.eyebrow}
        heading={gmPageCopy.onward.heading}
        exclude="/our-story/message-from-the-general-manager"
        motion={alternatingDirection(2)}
      />
      <SectionShell
        motion={alternatingDirection(3)}
        eyebrow={sections.related.eyebrow}
        heading={sections.related.heading}
      >
        <RelatedLinks hrefs={["/accommodation", "/spa-and-wellness", "/dining", "/contact"]} />
      </SectionShell>
      <StoryClosingSection motion={alternatingDirection(4)} />
    </>
  );
}
