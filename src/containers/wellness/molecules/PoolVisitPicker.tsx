"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { RadioGroup } from "@/components/molecules/RadioGroup";
import type { PoolVisitType } from "@/containers/wellness/copy/poolPlanner";
import type { PoolPlannerEstimator } from "@/containers/wellness/hooks/usePoolPlanner";

/**
 * Step one of the planner: pick a visit, then set the party. The steppers
 * only show for visits that are priced per person — a lane is one lane, and
 * the family day is a fixed group — so the guest is never asked for a number
 * that does not change the total. Presentational; state is `usePoolPlanner`.
 */
export function PoolVisitPicker({
  estimator,
  visitTypes,
}: {
  estimator: PoolPlannerEstimator;
  visitTypes: PoolVisitType[];
}) {
  const selected = visitTypes.find((visit) => visit.id === estimator.visitTypeId);
  const countsPeople = selected?.charge === "per-person" || selected?.charge === "enquire";

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <RadioGroup
        legend="Which visit?"
        name="pool-visit-type"
        value={estimator.visitTypeId}
        onChange={(_, value) => estimator.setVisitType(value)}
        options={visitTypes.map((visit) => ({ value: visit.id, label: visit.label }))}
      />

      {selected && (
        <Text variant="body2" color="text.secondary" sx={{ textWrap: "pretty" }}>
          {selected.hint} · {selected.unit}
        </Text>
      )}

      {countsPeople ? (
        <Box sx={{ display: "grid", gap: 3, maxWidth: 360 }}>
          <NumberStepper
            id="pool-adults"
            label="Adults"
            value={estimator.adults}
            onChange={estimator.setAdults}
            min={1}
            max={150}
          />
          <NumberStepper
            id="pool-children"
            label="Children (under 12)"
            value={estimator.children}
            onChange={estimator.setChildren}
            min={0}
            max={60}
          />
        </Box>
      ) : (
        <Text variant="body2" color="text.secondary">
          {selected?.charge === "per-family"
            ? "Covers two adults and up to three children."
            : "Priced as a single booking."}
        </Text>
      )}
    </Box>
  );
}
