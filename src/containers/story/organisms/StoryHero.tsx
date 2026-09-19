import { PageHero } from "@/components/organisms/PageHero";
import { STAY_ANCHOR_ID } from "@/containers/story/anchors";
import { heroCopy } from "@/containers/story/copy";
import { pageHeroImage } from "@/content/pageHeroes";

/**
 * The Our Story hub's above-the-fold block: the shared `PageHero` with the
 * invented pitch, a figure rail of facts drawn from `content/story.ts` and
 * `content/identity.ts`, and two CTAs — down to the enquiry form to plan a
 * stay, and down to the full account to read it. A Server Component.
 *
 * The secondary CTA targets `#the-life`, the anchor the preserved
 * `StoryArticle` already owns, so "Read his story" lands on the timeline
 * rather than the section wrapper.
 */
export function StoryHero() {
  return (
    <PageHero
      image={pageHeroImage("story")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Our Story"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
      primaryCta={{ label: heroCopy.primaryCtaLabel, href: `#${STAY_ANCHOR_ID}` }}
      secondaryCta={{ label: heroCopy.secondaryCtaLabel, href: "#the-life" }}
      stats={heroCopy.stats}
      minHeight={{ xs: 560, md: 680 }}
    />
  );
}
