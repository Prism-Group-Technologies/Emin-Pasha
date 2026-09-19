import { Box } from "@/components/atoms/Box";
import { Reveal } from "@/components/atoms/Reveal";
import { Stack } from "@/components/atoms/Stack";
import { Text } from "@/components/atoms/Text";
import { SectionShell } from "@/components/templates/SectionShell";
import type { SectionVariant } from "@/components/templates/sectionShellStyles";
import { type FacilityId, TREATMENTS_ANCHOR_ID } from "@/containers/wellness/anchors";
import { sections, signatureTreatments } from "@/containers/wellness/copy";
import { TreatmentCard } from "@/containers/wellness/molecules/TreatmentCard";
import { TreatmentGrid } from "@/containers/wellness/organisms/TreatmentGrid";
import type { RevealDirection } from "@/theme/motion";

const DISCLAIMER =
  "Indicative times and prices — the current menu, with exact durations and prices, is confirmed when you book.";

/**
 * The signature-treatment strip. On the hub it renders the filterable
 * `TreatmentGrid` client island across all three facilities; on a facility
 * page, pass `facility` and it renders that facility's treatments only, as a
 * plain server grid with no filter.
 *
 * `TreatmentCard` is a Server Component either way, so the cards are always
 * server-rendered — the client island only toggles visibility.
 */
export function SignatureTreatmentsSection({
  motion = "up",
  facility,
  variant = "raised",
}: {
  motion?: RevealDirection;
  facility?: FacilityId;
  variant?: SectionVariant;
}) {
  const treatments = facility
    ? signatureTreatments.filter((treatment) => treatment.facility === facility)
    : signatureTreatments;

  // Derive the widest desktop column count that still fills its last row, so a
  // facility with four treatments renders 2×2 rather than 3 + 1 with two empty
  // cells trailing to the right.
  const desktopColumns = treatments.length === 4 ? 2 : Math.min(treatments.length, 3);

  return (
    <SectionShell
      id={TREATMENTS_ANCHOR_ID}
      motion={motion}
      eyebrow={sections.treatments.eyebrow}
      heading={sections.treatments.heading}
      description={sections.treatments.description}
      variant={variant}
    >
      <Stack spacing={4}>
        {facility ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: `repeat(${desktopColumns}, minmax(0, 1fr))`,
              },
              gap: { xs: 5, md: 6 },
              alignItems: "stretch",
            }}
          >
            {treatments.map((treatment, index) => (
              <Reveal key={treatment.id} index={index} fill>
                <TreatmentCard treatment={treatment} />
              </Reveal>
            ))}
          </Box>
        ) : (
          <TreatmentGrid
            ids={treatments.map((treatment) => treatment.id)}
            facilities={treatments.map((treatment) => treatment.facility)}
          >
            {treatments.map((treatment) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </TreatmentGrid>
        )}
        <Text variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
          {DISCLAIMER}
        </Text>
      </Stack>
    </SectionShell>
  );
}
