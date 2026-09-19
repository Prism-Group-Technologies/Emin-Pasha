"use client";

import { Box } from "@/components/atoms/Box";
import { Text } from "@/components/atoms/Text";
import { NumberStepper } from "@/components/molecules/NumberStepper";
import { RadioGroup } from "@/components/molecules/RadioGroup";
import type { KudaraLayout } from "@/containers/events/copy";
import type { KudaraEstimatorControls } from "@/containers/events/hooks/useKudaraEstimator";
import type { KudaraQuote } from "@/containers/events/kudaraQuote";

/**
 * Step one of the estimator: pick a layout, then set the delegate count and
 * the number of days. The capacity line reads live off the quote, so an
 * organiser sees straight away when their headcount is past the indicative
 * maximum for the layout they picked. Presentational — state is the hook.
 */
export function KudaraLayoutPicker({
  controls,
  layouts,
  quote,
}: {
  controls: KudaraEstimatorControls;
  layouts: KudaraLayout[];
  quote: KudaraQuote;
}) {
  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <RadioGroup
        legend="How is the room set?"
        name="kudara-layout"
        value={controls.layoutId}
        onChange={(_, value) => controls.setLayout(value)}
        options={layouts.map((layout) => ({
          value: layout.id,
          label: `${layout.label} — up to ${layout.capacity} (indicative)`,
        }))}
      />

      <Box sx={{ display: "grid", gap: 3, maxWidth: 360 }}>
        <NumberStepper
          id="kudara-delegates"
          label="Delegates"
          value={controls.delegates}
          onChange={controls.setDelegates}
          min={1}
          max={700}
        />
        <NumberStepper
          id="kudara-days"
          label="Days"
          value={controls.days}
          onChange={controls.setDays}
          min={1}
          max={5}
        />
      </Box>

      {quote.layout && (
        <Text
          variant="body2"
          color={quote.overCapacity ? "error.main" : "text.secondary"}
          sx={{ textWrap: "pretty" }}
        >
          {quote.overCapacity
            ? `${controls.delegates} delegates is above the indicative ${quote.layout.label.toLowerCase()} maximum of ${quote.layout.capacity} — send the numbers and the team will advise on staging.`
            : `Comfortably within the indicative ${quote.layout.label.toLowerCase()} maximum of ${quote.layout.capacity}.`}
        </Text>
      )}
    </Box>
  );
}
