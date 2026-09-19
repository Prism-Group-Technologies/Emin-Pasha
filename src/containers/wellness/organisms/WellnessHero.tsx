import { PageHero } from "@/components/organisms/PageHero";
import { TREATMENTS_ANCHOR_ID } from "@/containers/wellness/anchors";
import { heroCopy } from "@/containers/wellness/copy";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappWellnessUrl } from "@/lib/directions";

/**
 * The Spa & Wellness hub's above-the-fold block: the shared `PageHero` with
 * the invented pitch, a figure rail of approved §6 facts, and two CTAs — out
 * to WhatsApp to book, and down to the treatment list. A Server Component;
 * the WhatsApp CTA is a plain external anchor.
 */
export function WellnessHero() {
  return (
    <PageHero
      image={pageHeroImage("wellness")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Spa & Wellness"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Spa & Wellness" }]}
      primaryCta={{ label: heroCopy.primaryCtaLabel, href: whatsappWellnessUrl }}
      secondaryCta={{ label: heroCopy.secondaryCtaLabel, href: `#${TREATMENTS_ANCHOR_ID}` }}
      stats={heroCopy.stats}
      minHeight={{ xs: 560, md: 680 }}
    />
  );
}
