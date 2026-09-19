"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { useKudaraEstimator } from "@/containers/events/hooks/useKudaraEstimator";
import { KudaraCateringPicker } from "@/containers/events/molecules/KudaraCateringPicker";
import { KudaraEstimateSummary } from "@/containers/events/molecules/KudaraEstimateSummary";
import { KudaraLayoutPicker } from "@/containers/events/molecules/KudaraLayoutPicker";

/**
 * The Kudara Hall estimator: choose a layout and party, choose catering and
 * extras, watch an indicative total build, and hand the numbers to the RFP
 * form below.
 *
 * 'use client' justification: `useKudaraEstimator` holds the state and the
 * store hand-off. All pricing is in the tested `kudaraQuote.ts`; every child
 * here is presentational. The summary panel is `position: sticky` from `lg`
 * so the total stays in view while the choices are made.
 */
export function KudaraEstimatorForm() {
  const { quote, applied, applyToProposal, layouts, cateringTiers, extras, controls } =
    useKudaraEstimator();

  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 6, lg: 8 },
        gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.3fr) minmax(0, 0.7fr)" },
        alignItems: "start",
      }}
    >
      <Box sx={{ display: "grid", gap: 6 }}>
        <KudaraLayoutPicker controls={controls} layouts={layouts} quote={quote} />
        <KudaraCateringPicker controls={controls} tiers={cateringTiers} extras={extras} />
        <Text variant="caption" color="text.secondary" sx={{ textWrap: "pretty" }}>
          Indicative rates for planning only — hire, catering and extras are all placeholders and
          are confirmed on your written proposal.
        </Text>
      </Box>

      <KudaraEstimateSummary quote={quote} applied={applied} onApply={applyToProposal} />
    </Box>
  );
}
