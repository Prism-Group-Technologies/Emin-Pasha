"use client";

import { Box } from "@/components/atoms/Box";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { Text } from "@/components/atoms/Text";
import type { useRfpForm } from "@/containers/events/hooks/useRfpForm";
import { RfpStepContact } from "@/containers/events/organisms/RfpStepContact";
import { RfpStepEvent } from "@/containers/events/organisms/RfpStepEvent";
import { RfpStepNeeds } from "@/containers/events/organisms/RfpStepNeeds";
import { rfpCopy } from "@/content/rfp-copy";

export interface RfpFieldsProps {
  rfp: ReturnType<typeof useRfpForm>;
  /** Which step to render; `null` renders every step (desktop). */
  step: number | null;
}

/**
 * One component drives both layouts — the mobile stepper passes a step index,
 * the desktop column passes `null` — so the two can never drift apart in what
 * they ask or how they validate.
 */
export function RfpFields({ rfp, step }: RfpFieldsProps) {
  const show = (index: number) => step === null || step === index;

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <HoneypotField {...rfp.form.register("website")} />

      {show(0) && <RfpStepEvent rfp={rfp} />}
      {show(1) && <RfpStepNeeds rfp={rfp} />}
      {show(2) && <RfpStepContact rfp={rfp} />}

      {step !== null && (
        <Text variant="body2" color="text.secondary">
          {`Step ${step + 1} of ${rfpCopy.steps.length} — ${rfpCopy.steps[step]?.title ?? ""}`}
        </Text>
      )}
    </Box>
  );
}
