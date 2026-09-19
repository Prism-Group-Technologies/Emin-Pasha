"use client";

import { Box } from "@/components/atoms/Box";
import { bookingFormCopy } from "@/containers/experiences/transfer/copy/bookingForm";
import { useTransferBooking } from "@/containers/experiences/transfer/hooks/useTransferBooking";
import { ExtrasPicker } from "@/containers/experiences/transfer/molecules/ExtrasPicker";
import { FormStep } from "@/containers/experiences/transfer/molecules/FormStep";
import { JourneyFields } from "@/containers/experiences/transfer/molecules/JourneyFields";
import { PartyFields } from "@/containers/experiences/transfer/molecules/PartyFields";
import { ServicePicker } from "@/containers/experiences/transfer/molecules/ServicePicker";
import { TransferContactFields } from "@/containers/experiences/transfer/molecules/TransferContactFields";
import { TransferQuotePanel } from "@/containers/experiences/transfer/molecules/TransferQuotePanel";
import { VehiclePicker } from "@/containers/experiences/transfer/molecules/VehiclePicker";

const s = bookingFormCopy.steps;

/**
 * The transfer booking form: five short numbered steps on the left, the live
 * indicative fare on the right (sticky from `lg`, stacked below on smaller
 * screens so the submit button follows the last field).
 *
 * 'use client' justification: `useTransferBooking` owns react-hook-form, URL
 * pre-selection, the priced journey state and submission. Every child is
 * presentational, and all pricing lives in the tested `transferQuote.ts`.
 */
export function TransferBookingForm({ whatsappHref }: { whatsappHref: string }) {
  const { form, journey, onSubmit, result, submitting } = useTransferBooking();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{
        display: "grid",
        gap: { xs: 6, lg: 8 },
        gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.35fr) minmax(0, 0.65fr)" },
        alignItems: "start",
      }}
    >
      <Box sx={{ display: "grid", gap: { xs: 6, md: 7 } }}>
        <FormStep step={1} title={s.journey}>
          <ServicePicker journey={journey} />
          <JourneyFields form={form} journey={journey} />
        </FormStep>
        <FormStep step={2} title={s.vehicle}>
          <VehiclePicker journey={journey} />
        </FormStep>
        <FormStep step={3} title={s.party}>
          <PartyFields journey={journey} />
        </FormStep>
        <FormStep step={4} title={s.extras}>
          <ExtrasPicker journey={journey} />
        </FormStep>
        <FormStep step={5} title={s.details}>
          <TransferContactFields form={form} />
        </FormStep>
      </Box>

      <TransferQuotePanel
        quote={journey.quote}
        submitting={submitting}
        result={result}
        whatsappHref={whatsappHref}
      />
    </Box>
  );
}
