"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { usePoolPlanner } from "@/containers/wellness/hooks/usePoolPlanner";
import { PoolAddOnPicker } from "@/containers/wellness/molecules/PoolAddOnPicker";
import { PoolPlannerContactFields } from "@/containers/wellness/molecules/PoolPlannerContactFields";
import { PoolPlannerEstimate } from "@/containers/wellness/molecules/PoolPlannerEstimate";
import { PoolVisitPicker } from "@/containers/wellness/molecules/PoolVisitPicker";

/**
 * The pool visit planner: pick a visit, set the party, shortlist extras, add
 * your details, and watch an indicative total build as you go.
 *
 * 'use client' justification: `usePoolPlanner` holds the estimator state and
 * runs the react-hook-form submission. All pricing lives in the tested
 * `poolQuote.ts`; every child here is presentational. The estimate panel is
 * `position: sticky` from `lg`, so the total stays in view while the details
 * are filled in. The result line is `aria-live` with a reserved height, so
 * the page never shifts when it arrives.
 */
export function PoolPlannerForm() {
  const { form, onSubmit, result, submitting, quote, visitTypes, addOns, estimator } =
    usePoolPlanner();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{
        display: "grid",
        gap: { xs: 6, lg: 8 },
        gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.3fr) minmax(0, 0.7fr)" },
        alignItems: "start",
      }}
    >
      <Box sx={{ display: "grid", gap: 6 }}>
        <PoolVisitPicker estimator={estimator} visitTypes={visitTypes} />
        <PoolAddOnPicker estimator={estimator} addOns={addOns} />
        <Box>
          <Text variant="h5" component="h3" sx={{ mb: 3 }}>
            Your details
          </Text>
          <PoolPlannerContactFields form={form} />
        </Box>
      </Box>

      <PoolPlannerEstimate quote={quote} submitting={submitting} result={result} />
    </Box>
  );
}
