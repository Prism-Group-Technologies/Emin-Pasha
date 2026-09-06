import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { PendingInfoNotice } from "@/components/molecules/PendingInfoNotice";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { FactList } from "@/containers/wellness/molecules/FactList";
import { HoursBadge } from "@/containers/wellness/molecules/HoursBadge";
import { DeferredWellnessEnquiryForm } from "@/containers/wellness/organisms/DeferredWellnessEnquiryForm";
import { assets } from "@/content/assets";
import { spa, spaPageIntro, spaServices } from "@/content/wellness";
import { wellnessCopy } from "@/content/wellness-copy";
import { alternatingDirection } from "@/theme/motion";

const asset = assets.find((item) => item.id === "spa-treatment-room");

/**
 * Swanky Spa. Targets "best spa in Kampala" / "Turkish bath Kampala" through
 * the approved copy itself, which already names the Turkish bath — no keyword
 * phrasing is bolted on.
 *
 * There is no treatment menu, no duration and no price in the source, and all
 * three are forbidden to invent (§0.7), so the menu section is an explicit
 * pending state plus a real enquiry form.
 */
export function SpaContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ SWANKY SPA"
        heading={spa.name}
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Spa & Wellness", href: "/spa-and-wellness" },
              { label: spa.name },
            ]}
          />
          <HoursBadge hours={spa.hours} />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            {spaPageIntro}
          </Text>
        </Stack>
      </SectionShell>

      {asset && (
        <SectionShell motion={alternatingDirection(1)} variant="bleed">
          <AssetImage asset={asset} sizes="100vw" priority />
        </SectionShell>
      )}

      <SectionShell motion={alternatingDirection(2)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" },
            gap: { xs: 6, md: 8 },
            alignItems: "start",
          }}
        >
          <Stack spacing={6}>
            <FactList heading="What we offer" items={spaServices.map((service) => service.name)} />
            <PendingInfoNotice
              subject="Treatment menu, durations and prices"
              todoId="EMIN-Q11"
              action={wellnessCopy.pending.spa}
            />
          </Stack>
          <DeferredWellnessEnquiryForm interest="spa" />
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Before you visit" variant="raised">
        <RelatedLinks hrefs={["/spa-etiquette", "/swimming-pool", "/gym", "/accommodation"]} />
      </SectionShell>
    </>
  );
}
