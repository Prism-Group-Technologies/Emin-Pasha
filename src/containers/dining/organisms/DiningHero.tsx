import { PageHero } from "@/components/organisms/PageHero";
import { heroCopy } from "@/containers/dining/copy";
import { pageHeroImage } from "@/content/pageHeroes";

/**
 * The Dining index's above-the-fold block: the shared `PageHero` with the
 * invented pitch, the traceable figure rail, and two in-page CTAs — down to
 * the reservation form and across to the sample menus.
 */
export function DiningHero() {
  return (
    <PageHero
      image={pageHeroImage("dining")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Dining"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dining" }]}
      primaryCta={heroCopy.primaryCta}
      secondaryCta={heroCopy.secondaryCta}
      stats={heroCopy.stats}
      minHeight={{ xs: 250, md: 280 }}
    />
  );
}
