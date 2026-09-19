"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { RadioGroup } from "@/components/molecules/RadioGroup";
import type { KudaraCateringTier, KudaraExtra } from "@/containers/events/copy";
import type { KudaraEstimatorControls } from "@/containers/events/hooks/useKudaraEstimator";

/**
 * Step two of the estimator: choose a catering tier, then shortlist extras.
 * Each extra says how it is charged — once, or per delegate — so the running
 * total never surprises. Presentational; the toggles are the hook's.
 */
export function KudaraCateringPicker({
  controls,
  tiers,
  extras,
}: {
  controls: KudaraEstimatorControls;
  tiers: KudaraCateringTier[];
  extras: KudaraExtra[];
}) {
  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <RadioGroup
        legend="Catering"
        name="kudara-catering"
        value={controls.cateringId}
        onChange={(_, value) => controls.setCatering(value)}
        options={tiers.map((tier) => ({ value: tier.id, label: `${tier.label} — ${tier.hint}` }))}
      />

      <Box sx={{ display: "grid", gap: 1 }}>
        <Text component="p" variant="overline" color="text.secondary">
          Extras
        </Text>
        {extras.map((extra) => (
          <Box key={extra.id}>
            <Checkbox
              id={`kudara-extra-${extra.id}`}
              checked={controls.isExtraSelected(extra.id)}
              onChange={() => controls.toggleExtra(extra.id)}
              label={`${extra.label} — ${extra.hint}${extra.perDelegate ? " (per delegate)" : ""}`}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
