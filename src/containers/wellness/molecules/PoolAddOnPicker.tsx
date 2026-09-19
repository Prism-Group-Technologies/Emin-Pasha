"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import type { PoolAddOn } from "@/containers/wellness/copy/poolPlanner";
import type { PoolPlannerEstimator } from "@/containers/wellness/hooks/usePoolPlanner";

/**
 * Step two: shortlist any extras. Each toggle feeds straight into the running
 * indicative total via `usePoolPlanner`; per-head items are multiplied by the
 * party size in `poolQuote.ts`, so the number the guest sees always matches
 * what they will be quoted. Presentational.
 */
export function PoolAddOnPicker({
  estimator,
  addOns,
}: {
  estimator: PoolPlannerEstimator;
  addOns: PoolAddOn[];
}) {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Text variant="overline" component="p" color="text.secondary">
        Add extras (optional)
      </Text>
      {addOns.map((addOn) => (
        <Box key={addOn.id}>
          <Checkbox
            id={`pool-addon-${addOn.id}`}
            label={addOn.label}
            checked={estimator.isAddOnSelected(addOn.id)}
            onChange={() => estimator.toggleAddOn(addOn.id)}
          />
          <Text variant="body2" color="text.secondary" sx={{ pl: 4, textWrap: "pretty" }}>
            {addOn.hint}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
