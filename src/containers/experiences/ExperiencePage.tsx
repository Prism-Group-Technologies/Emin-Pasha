import type { ReactNode } from "react";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { PageHero } from "@/components/organisms/PageHero";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { pageHeroImage } from "@/content/pageHeroes";
import { alternatingDirection } from "@/theme/motion";

export interface ExperiencePageProps {
  /** Route key for the hero photograph — see `@/content/pageHeroes`. */
  heroKey: string;
  eyebrow: string;
  heading: string;
  intro: string;
  body: string;
  assetId: string;
  cta?: { label: string; href: string };
  children?: ReactNode;
  relatedHrefs: string[];
}

/** Shared shape for the two Experiences pages — the shared `PageHero`, a prose
 * body with an optional CTA, then the cross-sell row. */
export function ExperiencePage(props: ExperiencePageProps) {
  return (
    <>
      <PageHero
        image={pageHeroImage(props.heroKey)}
        eyebrow={props.eyebrow}
        headline={props.heading}
        lede={props.intro}
        label={props.heading}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Experiences" },
          { label: props.heading },
        ]}
        primaryCta={props.cta}
      />

      <SectionShell motion={alternatingDirection(2)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.3fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={5}>
            <Text variant="body1" color="text.secondary">
              {props.body}
            </Text>
            {props.children}
          </Stack>
          {props.cta && (
            <Button href={props.cta.href} size="large">
              {props.cta.label}
            </Button>
          )}
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here" variant="raised">
        <RelatedLinks hrefs={props.relatedHrefs} />
      </SectionShell>
    </>
  );
}
