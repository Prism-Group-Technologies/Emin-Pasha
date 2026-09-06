import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { FactList } from "@/containers/wellness/molecules/FactList";
import { policies } from "@/content/policies";
import { alternatingDirection } from "@/theme/motion";

const etiquette = policies.find((section) => section.id === "spa-etiquette");

/**
 * Spa etiquette, rendered from the approved §14 policy section verbatim —
 * arrival, mobile phones, personal items and liability, health disclosure,
 * alcohol, the 16+ minimum age, pool safety and smoking. Not paraphrased:
 * this is the page a guest is held to, so the wording is the wording.
 */
export function EtiquetteContainer() {
  if (!etiquette) {
    return null;
  }

  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ SPA ETIQUETTE"
        heading={etiquette.title}
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Spa & Wellness", href: "/spa-and-wellness" },
              { label: etiquette.title },
            ]}
          />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            A few things worth knowing before your treatment.
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <FactList items={etiquette.items} />
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Book your visit" variant="raised">
        <RelatedLinks hrefs={["/spa", "/gym", "/swimming-pool"]} />
      </SectionShell>
    </>
  );
}
