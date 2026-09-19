import { PageHero } from "@/components/organisms/PageHero";
import { heroCopy } from "@/containers/events/copy";
import { pageHeroImage } from "@/content/pageHeroes";

/**
 * The Meetings & Events hub's above-the-fold block: the shared `PageHero`
 * with the invented pitch, a figure rail restating the approved §7 argument,
 * and two in-page CTAs — down to the RFP form and across to the venues. A
 * Server Component; both CTAs are in-page anchors.
 */
export function EventsHero() {
  return (
    <PageHero
      image={pageHeroImage("events")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Meetings & Events"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Meetings & Events" }]}
      primaryCta={heroCopy.primaryCta}
      secondaryCta={heroCopy.secondaryCta}
      stats={heroCopy.stats}
      minHeight={{ xs: 560, md: 680 }}
    />
  );
}
