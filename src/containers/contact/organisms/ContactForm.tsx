"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { HoneypotField } from "@/components/atoms/HoneypotField";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { SelectField } from "@/components/molecules/SelectField";
import { TextInput } from "@/components/molecules/TextInput";
import { Textarea } from "@/components/molecules/Textarea";
import { useContactForm } from "@/containers/contact/hooks/useContactForm";
import { FormHeading } from "@/containers/contact/organisms/FormHeading";
import { contactCopy } from "@/content/contact-copy";

const copy = contactCopy.form;

/**
 * 'use client' justification: react-hook-form state and submission.
 * Shares the same molecules as every other form on the site, so field
 * labelling, error wiring and `aria-describedby` behave identically.
 */
export function ContactForm() {
  const { form, onSubmit, result, sent, submitting } = useContactForm();
  const { errors } = form.formState;

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ display: "grid", gap: 4, maxWidth: 560 }}
    >
      <FormHeading heading={copy.heading} lead={copy.lead} />
      <HoneypotField {...form.register("website")} />

      <SelectField
        {...form.register("subject")}
        id="contact-subject"
        label={copy.subject}
        options={copy.subjects}
        fullWidth
      />
      <TextInput
        {...form.register("name")}
        id="contact-name"
        label={copy.name}
        autoComplete="name"
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        fullWidth
      />
      <TextInput
        {...form.register("email")}
        id="contact-email"
        type="email"
        label={copy.email}
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextInput
        {...form.register("phone")}
        id="contact-phone"
        type="tel"
        label={copy.phone}
        autoComplete="tel"
        fullWidth
      />
      <Textarea
        {...form.register("message")}
        id="contact-message"
        label={copy.message}
        minRows={4}
        error={Boolean(errors.message)}
        helperText={errors.message?.message}
        fullWidth
      />
      <Checkbox
        {...form.register("consent")}
        id="contact-consent"
        label={copy.consent}
        error={errors.consent?.message}
      />

      <Button type="submit" loading={submitting} sx={{ justifySelf: "start" }}>
        {submitting ? copy.submitting : copy.submit}
      </Button>

      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color={sent ? "text.secondary" : "error.main"}
        sx={{ minHeight: 40 }}
      >
        {result}
      </Text>
    </Box>
  );
}
