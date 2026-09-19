"use client";

import type { UseFormReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { formCopy } from "@/containers/contact/copy/form";
import type { ContactValues } from "@/schemas/contact";

export interface FormSubmitRowProps {
  form: UseFormReturn<ContactValues>;
  submitting: boolean;
  result: string | null;
  /** The desk the chosen intent routes to — named so the visitor knows who reads it. */
  desk: string;
}

/**
 * Consent, the submit button and the reassurance around it: who receives the
 * enquiry, and that the details go nowhere else. The result line is
 * `aria-live` with a reserved height, so an error arriving cannot shift the
 * form (CLS stays at 0). Success never renders here — the form swaps to
 * `EnquirySuccess` instead.
 */
export function FormSubmitRow({ form, submitting, result, desk }: FormSubmitRowProps) {
  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Checkbox
        {...form.register("consent")}
        id="contact-consent"
        label={formCopy.fields.consent}
        error={form.formState.errors.consent?.message}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: 3,
        }}
      >
        <Button
          type="submit"
          size="large"
          loading={submitting}
          endIcon={<Icon name="arrow-forward" />}
        >
          {submitting ? formCopy.submitting : formCopy.submit}
        </Button>
        <Text variant="body2" color="text.secondary">
          {formCopy.routedTo} <strong>{desk}</strong>
        </Text>
      </Box>
      <Text
        variant="caption"
        color="text.secondary"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Icon name="verified" sx={{ fontSize: 16, color: "primary.main" }} aria-hidden />
        {formCopy.privacy}
      </Text>
      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="error.main"
        sx={{ minHeight: 24 }}
      >
        {result}
      </Text>
    </Box>
  );
}
