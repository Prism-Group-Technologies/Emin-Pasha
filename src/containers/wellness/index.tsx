import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { OutletCard } from "@/containers/dining/molecules/OutletCard";
import { gym, pool, poolPageIntro, spa, spaPageIntro } from "@/content/wellness";
import { alternatingDirection } from "@/theme/motion";

/**
 * Spa & Wellness hub. The three facilities each get their own route because
 * each has genuinely distinct, searchable intent — "best spa in Kampala",
 * "gym membership Nakasero" and "swimming pool open to public Kampala" are
 * three different searches by three different people.
 */
export function WellnessContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ SPA & WELLNESS"
        heading="Spa & Wellness"
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Spa & Wellness" }]} />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            {spaPageIntro}
          </Text>
        </Stack>
      </SectionShell>

      <SectionShell motion={alternatingDirection(1)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 6, md: 5 },
          }}
        >
          <OutletCard
            id="swanky-spa"
            name={spa.name}
            description={spa.description}
            href="/spa"
            kicker={spa.hours}
          />
          <OutletCard
            id="emin-pasha-gym"
            name={gym.name}
            description={gym.description}
            href="/gym"
            kicker={gym.hours}
          />
          <OutletCard
            id="swimming-pool"
            name={pool.name}
            description={poolPageIntro}
            href="/swimming-pool"
          />
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(2)} heading="Before you visit" variant="raised">
        <Text variant="body1" color="text.secondary" sx={{ maxWidth: "70ch" }}>
          Please read our spa etiquette — it covers arrival times, health disclosure, minimum ages
          and pool safety.
        </Text>
        <Box sx={{ mt: 5 }}>
          <RelatedLinks hrefs={["/spa-etiquette"]} />
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here">
        <RelatedLinks hrefs={["/accommodation", "/dining", "/offers"]} />
      </SectionShell>
    </>
  );
}
