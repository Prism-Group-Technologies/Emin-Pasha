import { PageHero } from "@/components/organisms/PageHero";
import { LEGAL_PATH, LEGAL_TOPIC_PHRASE, SETTINGS_ANCHOR_ID } from "@/containers/legal/anchors";
import { cookieSettingsLabel, cookieSettingsHero as hero } from "@/containers/legal/catalogue";
import { cookieSettingsMotion as m } from "@/containers/legal/motion";
import {
  CookieFaqSection,
  CookieSettingsSection,
  CookieStepsSection,
} from "@/containers/legal/organisms/CookieSettingsSections";
import { LegalClosingSection } from "@/containers/legal/organisms/LegalClosingSection";
import { LegalPromiseSection } from "@/containers/legal/organisms/LegalPromiseSection";
import { LegalRelatedSection } from "@/containers/legal/organisms/LegalRelatedSection";
import { StickyLegalCta } from "@/containers/legal/organisms/StickyLegalCta";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappLegalTopicUrl } from "@/lib/directions";

const PLAN_HREFS = ["/accommodation", "/offers", "/faq"];

/**
 * /cookie-settings — a control panel rather than a document, in the same
 * funnel shell as the legal documents. The panel drives the shared consent
 * store, so a choice saved here is the banner's and the dialog's choice too.
 *
 *   hero → live controls (#your-choices) → how it works → quick answers →
 *   discretion promise → closing → related / keep planning, + sticky bar
 */
export function CookieSettingsContainer() {
  const whatsappHref = whatsappLegalTopicUrl(LEGAL_TOPIC_PHRASE["cookie-settings"]);

  return (
    <>
      <PageHero
        image={pageHeroImage("legal")}
        eyebrow={hero.eyebrow}
        headline={hero.headline}
        lede={hero.lede}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: cookieSettingsLabel }]}
        primaryCta={{ label: hero.primaryCta, href: `#${SETTINGS_ANCHOR_ID}` }}
        secondaryCta={{ label: hero.secondaryCta, href: LEGAL_PATH.cookies }}
        minHeight={{ xs: 460, md: 520 }}
        stats={hero.stats}
      />
      <CookieSettingsSection motion={m.settings} />
      <CookieStepsSection motion={m.steps} />
      <CookieFaqSection motion={m.faq} />
      <LegalPromiseSection motion={m.promise} />
      <LegalClosingSection whatsappHref={whatsappHref} motion={m.closing} />
      <LegalRelatedSection
        currentId="cookie-settings"
        planHrefs={PLAN_HREFS}
        motion={{ related: m.related, plan: m.plan }}
      />
      <StickyLegalCta whatsappHref={whatsappHref} contentsAnchorId={SETTINGS_ANCHOR_ID} />
    </>
  );
}
