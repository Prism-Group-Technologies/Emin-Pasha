"use client";

import { NewsletterFields } from "@/components/organisms/Footer/NewsletterFields";
import type { FooterData } from "@/components/organisms/Footer/footerData";
import { useNewsletterForm } from "@/hooks/useNewsletterForm";

export interface NewsletterFormProps {
  copy: FooterData["newsletter"];
  /** Carried over from the pre-hydration pass so keystrokes are not dropped. */
  defaultEmail?: string;
  autoFocusEmail?: boolean;
}

/**
 * The hydrated newsletter. Everything below this boundary — react-hook-form,
 * the Zod resolver and the newsletter schema — is what
 * `useDeferredHydration` keeps out of the first-load bundle; the fields
 * themselves are server-rendered by `NewsletterFields` either way.
 *
 * 'use client' justification: form state and submission.
 */
export function NewsletterForm({ copy, defaultEmail, autoFocusEmail }: NewsletterFormProps) {
  const { form, onSubmit, result, submitting } = useNewsletterForm(defaultEmail);
  const { errors } = form.formState;

  return (
    <NewsletterFields
      copy={copy}
      emailField={form.register("email")}
      consentField={form.register("consent")}
      emailError={errors.email?.message}
      consentError={errors.consent?.message}
      defaultEmail={defaultEmail}
      autoFocusEmail={autoFocusEmail}
      submitting={submitting}
      result={result}
      onSubmit={onSubmit}
    />
  );
}
