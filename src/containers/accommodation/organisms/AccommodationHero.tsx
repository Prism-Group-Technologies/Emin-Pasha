import { PageHero } from "@/components/organisms/PageHero";
import { heroCopy } from "@/containers/accommodation/copy";
import { pageHeroImage } from "@/content/pageHeroes";

/**
 * The Accommodation index's above-the-fold pitch. A thin wrapper over the
 * shared `PageHero` — the eyebrow, headline, figure rail and the two in-page
 * CTAs (down to the booking widget, across to the comparison table) come from
 * `copy/hero.ts`; the lede is the verbatim approved `accommodationPageIntro`,
 * passed in by the container.
 */
export function AccommodationHero({ lede }: { lede: string }) {
  return (
    <PageHero
      image={pageHeroImage("accommodation")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={lede}
      label="Rooms & Suites"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Accommodation" }]}
      primaryCta={heroCopy.primaryCta}
      secondaryCta={heroCopy.secondaryCta}
      stats={heroCopy.stats}
      minHeight={{ xs: 560, md: 680 }}
    />
  );
}
