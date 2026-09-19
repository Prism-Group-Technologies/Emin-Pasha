import { PageHero } from "@/components/organisms/PageHero";
import { FAQ_TOPIC_ORDER, QUESTIONS_ANCHOR_ID } from "@/containers/faq/anchors";
import { faqCatalogue } from "@/containers/faq/catalogue";
import { heroCopy } from "@/containers/faq/copy";
import { identity } from "@/content/identity";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappFaqUrl } from "@/lib/directions";

const { stats } = heroCopy;

/**
 * The FAQ promise above the fold: search the answers, or ask a person on
 * WhatsApp. The figure rail counts the real catalogue and topic list, so the
 * numbers can never drift from the page, and the check-in time renders from
 * `content/identity.ts`.
 */
export function FaqHero() {
  return (
    <PageHero
      image={pageHeroImage("faq")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label={heroCopy.label}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      primaryCta={{ label: heroCopy.primaryCta, href: `#${QUESTIONS_ANCHOR_ID}` }}
      secondaryCta={{ label: heroCopy.secondaryCta, href: whatsappFaqUrl }}
      stats={[
        { value: String(faqCatalogue.length), label: stats.answers },
        { value: String(FAQ_TOPIC_ORDER.length), label: stats.topics },
        { value: identity.checkInTime, label: stats.checkIn },
        { value: stats.replyValue, label: stats.replyLabel },
      ]}
    />
  );
}
