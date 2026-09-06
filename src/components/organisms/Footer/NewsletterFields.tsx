"use client";

import type { FormEventHandler } from "react";

import type { UseFormRegisterReturn } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Checkbox } from "@/components/molecules/Checkbox";
import { TextInput } from "@/components/molecules/TextInput";
import type { FooterData } from "@/components/organisms/Footer/footerData";

/**
 * What `register()` spreads onto a field, absent in the pre-hydration pass.
 * A **type-only** import of react-hook-form: erased at build, so naming the
 * shape here costs the first-load bundle nothing — the library itself stays
 * behind the deferred boundary.
 */
type FieldBinding = Partial<UseFormRegisterReturn>;

export interface NewsletterFieldsProps {
  copy: FooterData["newsletter"];
  emailField?: FieldBinding;
  consentField?: FieldBinding;
  emailError?: string;
  consentError?: string;
  defaultEmail?: string;
  autoFocusEmail?: boolean;
  submitting?: boolean;
  result?: string | null;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

/**
 * The newsletter's markup, shared by both of its states: the server-rendered
 * pass with no bindings, and the react-hook-form pass once
 * `useDeferredHydration` has promoted it. One component, so the two can never
 * differ — which is what keeps the swap invisible and CLS at zero, since the
 * DOM it produces is identical either way.
 *
 * Before hydration the fields are real, focusable and typeable; they simply
 * are not yet validated. `useDeferredHydration` lifts whatever was typed into
 * `defaultEmail` when it promotes, so nothing entered in that window is lost.
 *
 * The result line is `aria-live="polite"` (CLAUDE.md §10) and always in the
 * DOM with a reserved height, so a message appearing after submit cannot
 * push the footer around.
 */
export function NewsletterFields({
  copy,
  emailField,
  consentField,
  emailError,
  consentError,
  defaultEmail,
  autoFocusEmail = false,
  submitting = false,
  result = null,
  onSubmit,
}: NewsletterFieldsProps) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 3 }}>
      <TextInput
        {...emailField}
        id="newsletter-email"
        name={emailField?.name ?? "email"}
        type="email"
        size="small"
        label={copy.emailLabel}
        defaultValue={defaultEmail}
        autoFocus={autoFocusEmail}
        error={Boolean(emailError)}
        helperText={emailError}
        autoComplete="email"
        fullWidth
      />
      <Checkbox
        {...consentField}
        id="newsletter-consent"
        name={consentField?.name ?? "consent"}
        label={copy.consentLabel}
        error={consentError}
      />
      <Button type="submit" loading={submitting} sx={{ justifySelf: "start" }}>
        {copy.submitLabel}
      </Button>
      <Text
        role="status"
        aria-live="polite"
        variant="body2"
        color="text.secondary"
        sx={{ minHeight: 40 }}
      >
        {result}
      </Text>
    </Box>
  );
}
