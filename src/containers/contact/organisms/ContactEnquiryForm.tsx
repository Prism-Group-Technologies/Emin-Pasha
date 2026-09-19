"use client";

import { Box } from "@/components/atoms/Box";
import { Divider } from "@/components/atoms/Divider";
import { formCopy } from "@/containers/contact/copy/form";
import { intentById } from "@/containers/contact/copy/intents";
import { useContactEnquiry } from "@/containers/contact/hooks/useContactEnquiry";
import { ContactIdentityFields } from "@/containers/contact/molecules/ContactIdentityFields";
import { EnquirySuccess } from "@/containers/contact/molecules/EnquirySuccess";
import { FormStepHeading } from "@/containers/contact/molecules/FormStepHeading";
import { FormSubmitRow } from "@/containers/contact/molecules/FormSubmitRow";
import { IntentDetailFields } from "@/containers/contact/molecules/IntentDetailFields";
import { IntentPicker } from "@/containers/contact/molecules/IntentPicker";
import { ReplyPreferenceFields } from "@/containers/contact/molecules/ReplyPreferenceFields";
import type { ContactIntent } from "@/schemas/contact";

const STEP_ONE_ID = "contact-step-intent";

export interface ContactEnquiryFormProps {
  /** Intent → the WhatsApp hand-off for it, resolved server-side (DECISIONS.md D25). */
  whatsappByIntent: Record<ContactIntent, string>;
}

/**
 * The adaptive, two-step enquiry: pick what it is about, and the form reshapes
 * — dates, headcount and the message prompt follow the intent — then who you
 * are and how to reply. Presentational: every piece of state and the
 * submission live in `useContactEnquiry`, and every input lives in a molecule.
 *
 * 'use client' justification: react-hook-form state, watched fields and
 * submission.
 */
export function ContactEnquiryForm({ whatsappByIntent }: ContactEnquiryFormProps) {
  const { form, onSubmit, result, sent, startOver, intent, phoneRequired, submitting } =
    useContactEnquiry();

  if (sent) {
    return (
      <EnquirySuccess
        message={result}
        whatsappHref={whatsappByIntent[intent]}
        onStartOver={startOver}
      />
    );
  }

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 4 }}>
      <FormStepHeading
        id={STEP_ONE_ID}
        eyebrow={formCopy.eyebrow}
        heading={formCopy.heading}
        lead={formCopy.lead}
      />
      <IntentPicker form={form} labelledBy={STEP_ONE_ID} />
      <IntentDetailFields form={form} intent={intent} />

      <Divider sx={{ my: 2 }} />

      <FormStepHeading eyebrow={formCopy.detailsEyebrow} heading={formCopy.detailsHeading} />
      <ContactIdentityFields form={form} phoneRequired={phoneRequired} />
      <ReplyPreferenceFields form={form} />
      <FormSubmitRow
        form={form}
        submitting={submitting}
        result={result}
        desk={intentById(intent).desk}
      />
    </Box>
  );
}
