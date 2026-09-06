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
import { gym, gymOfferings } from "@/content/wellness";
import { wellnessCopy } from "@/content/wellness-copy";
import { alternatingDirection } from "@/theme/motion";

const asset = assets.find((item) => item.id === "spa-gym");

/**
 * Emin Pasha Gym. Targets "gym membership Nakasero" — the approved §6 copy
 * already states that membership is open to non-residents, which is the
 * fact that search is actually looking for.
 *
 * Membership tiers and rates do not exist in the source and are forbidden to
 * invent (§0.7), so the page states that membership is available, says the
 * rates are not published yet, and captures the enquiry.
 */
export function GymContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ THE GYM"
        heading={gym.name}
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Spa & Wellness", href: "/spa-and-wellness" },
              { label: gym.name },
            ]}
          />
          <HoursBadge hours={gym.hours} />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            {gym.description}
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
            <FactList heading="In the gym" items={gymOfferings} />
            <PendingInfoNotice
              subject="Membership options and rates"
              todoId="EMIN-Q11"
              action={wellnessCopy.pending.gym}
            />
          </Stack>
          <DeferredWellnessEnquiryForm interest="gym" />
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here" variant="raised">
        <RelatedLinks hrefs={["/spa", "/swimming-pool", "/spa-etiquette", "/accommodation"]} />
      </SectionShell>
    </>
  );
}
