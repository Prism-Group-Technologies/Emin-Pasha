import { AssetImage } from "@/components/atoms/AssetImage";
import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";
import { PendingInfoNotice } from "@/components/molecules/PendingInfoNotice";
import { SectionShell } from "@/components/templates/SectionShell";
import { RelatedLinks } from "@/containers/accommodation/organisms/RelatedLinks";
import { FactList } from "@/containers/wellness/molecules/FactList";
import { DeferredWellnessEnquiryForm } from "@/containers/wellness/organisms/DeferredWellnessEnquiryForm";
import { assets } from "@/content/assets";
import { pool, poolPageIntro } from "@/content/wellness";
import { wellnessCopy } from "@/content/wellness-copy";
import { alternatingDirection } from "@/theme/motion";

const asset = assets.find((item) => item.id === "spa-pool");

/**
 * The pool. Targets "swimming pool open to public Kampala" — public access is
 * the fact that search wants, and the approved copy states it outright.
 *
 * The "300ft" figure is **omitted**: Q17 asks whether it is length, perimeter
 * or something else and no DECISIONS.md entry resolves it, so per the Step 11
 * brief the number is left out rather than published in an unverified form.
 * `poolPageIntro` is the approved sentence with that one clause removed;
 * every other attribute stands. See DECISIONS.md D45.
 *
 * The safety rules are rendered prominently rather than buried: "there is no
 * lifeguard on duty" is the single most important thing on this page.
 */
export function PoolContainer() {
  return (
    <>
      <SectionShell
        motion={alternatingDirection(0)}
        eyebrow="§ THE POOL"
        heading={pool.name}
        headingLevel="h1"
      >
        <Stack spacing={5}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Spa & Wellness", href: "/spa-and-wellness" },
              { label: pool.name },
            ]}
          />
          <Text variant="subtitle1" sx={{ maxWidth: "70ch" }}>
            {poolPageIntro}
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
            {pool.rules && (
              <Box sx={{ p: 4, border: "1px solid", borderColor: "error.main" }}>
                <FactList heading="Pool safety" items={pool.rules} />
              </Box>
            )}
            <PendingInfoNotice
              subject="Day-pass rates"
              todoId="EMIN-Q11"
              action={wellnessCopy.pending.pool}
            />
          </Stack>
          <DeferredWellnessEnquiryForm interest="pool" />
        </Box>
      </SectionShell>

      <SectionShell motion={alternatingDirection(3)} heading="Also here" variant="raised">
        <RelatedLinks hrefs={["/spa", "/gym", "/spa-etiquette", "/accommodation"]} />
      </SectionShell>
    </>
  );
}
