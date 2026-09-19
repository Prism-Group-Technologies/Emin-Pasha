import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { WhatsAppCta } from "@/containers/wellness/molecules/WhatsAppCta";
import { EtiquetteIntroSection } from "@/containers/wellness/organisms/EtiquetteIntroSection";
import { EtiquetteRulesSection } from "@/containers/wellness/organisms/EtiquetteRulesSection";
import { StickyEnquireCta } from "@/containers/wellness/organisms/StickyEnquireCta";
import { WellnessClosingCtaSection } from "@/containers/wellness/organisms/WellnessClosingCtaSection";
import { pageHeroImage } from "@/content/pageHeroes";
import { policies } from "@/content/policies";
import { alternatingDirection as d } from "@/theme/motion";

const etiquette = policies.find((section) => section.id === "spa-etiquette");

/**
 * Spa etiquette. The approved §14 policy section is rendered **verbatim** —
 * this is the page a guest is held to, so the wording is the wording — but on
 * the same visual system as the rest of Spa & Wellness: a framed opener with
 * three at-a-glance facts, then one card per clause (`EtiquetteRulesSection`)
 * with a plain-language heading and icon over the exact policy text. Only the
 * framing copy (`copy/etiquette.ts`) and the conversion surfaces around it are
 * additions. A Server Component that only composes section organisms.
 */
export function EtiquetteContainer() {
  if (!etiquette) {
    return null;
  }

  return (
    <>
      <PageHero
        image={pageHeroImage("spa-etiquette")}
        eyebrow="§ SPA ETIQUETTE"
        headline={etiquette.title}
        lede="A few things worth knowing before your treatment — arrival times, health disclosure, minimum ages and pool safety."
        label={etiquette.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Spa & Wellness", href: "/spa-and-wellness" },
          { label: etiquette.title },
        ]}
      />

      <EtiquetteIntroSection motion={d(1)} />
      <EtiquetteRulesSection motion={d(2)} />

      <SectionShell
        motion={d(3)}
        heading="Ready to book?"
        description="Pick the facility you are after and message the wellness desk — we will hold a therapist, a trainer or a lane for you, usually the same day."
        action={<WhatsAppCta label="Book on WhatsApp" size="large" />}
      >
        <Stack spacing={4}>
          <Text variant="overline" component="p" color="text.secondary">
            Spa &amp; Wellness
          </Text>
          <RelatedLinks hrefs={["/spa", "/gym", "/swimming-pool"]} />
        </Stack>
      </SectionShell>

      <WellnessClosingCtaSection motion={d(4)} />

      <StickyEnquireCta />
    </>
  );
}
