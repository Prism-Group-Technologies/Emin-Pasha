import { PageHero } from "@/components/organisms/PageHero";
import { ENQUIRE_ANCHOR_ID } from "@/containers/contact/anchors";
import { heroCopy } from "@/containers/contact/copy";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappUrl } from "@/lib/directions";

/**
 * The Contact hero: the promise ("a person, not a queue"), the two highest-
 * intent actions — the on-page enquiry and a WhatsApp chat — and a rail of
 * service figures, so the reply-time argument is made before the first scroll.
 * Composes the shared `PageHero`; nothing Contact-specific leaks into it.
 */
export function ContactHero() {
  return (
    <PageHero
      image={pageHeroImage("contact")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Contact"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      primaryCta={{ label: heroCopy.primaryCta, href: `#${ENQUIRE_ANCHOR_ID}` }}
      secondaryCta={{ label: heroCopy.secondaryCta, href: whatsappUrl }}
      stats={heroCopy.stats}
    />
  );
}
