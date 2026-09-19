import { PageHero } from "@/components/organisms/PageHero";
import { formatUsd } from "@/containers/experiences/transfer/currency";
import { MATCHER_ANCHOR_ID } from "@/containers/spaces/anchors";
import { signatureExperiences } from "@/containers/spaces/copy/experiences";
import { heroCopy } from "@/containers/spaces/copy/hero";
import { spaceProfiles } from "@/containers/spaces/copy/profiles";
import { pageHeroImage } from "@/content/pageHeroes";
import { whatsappLoungesUrl } from "@/lib/directions";

const FROM_USD = Math.min(...signatureExperiences.map((experience) => experience.priceUsd));
const MAX_GUESTS = Math.max(...spaceProfiles.map((profile) => profile.standing));

/** Derived from the copy layer, so the rail can never disagree with the cards below. */
const HERO_STATS = [
  { value: String(spaceProfiles.length), label: "lounges & gardens" },
  { value: "07:00 – late", label: "first coffee to nightcap" },
  { value: formatUsd(FROM_USD), label: "signature experiences from" },
  { value: `${MAX_GUESTS}`, label: "guests in the gardens" },
];

/**
 * The shared `PageHero` with a benefit-led `h1`, the matcher as the primary
 * in-page CTA, WhatsApp as the secondary, and a four-figure rail.
 */
export function SpacesHero() {
  return (
    <PageHero
      image={pageHeroImage("spaces")}
      eyebrow={heroCopy.eyebrow}
      headline={heroCopy.headline}
      lede={heroCopy.lede}
      label="Lounges & Spaces"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Lounges & Spaces" }]}
      primaryCta={{ label: heroCopy.primaryCtaLabel, href: `#${MATCHER_ANCHOR_ID}` }}
      secondaryCta={{ label: heroCopy.secondaryCtaLabel, href: whatsappLoungesUrl }}
      stats={HERO_STATS}
      minHeight={{ xs: 580, md: 700 }}
    />
  );
}
