"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { shell } from "@/content/shell";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type NewsletterFormValues, newsletterFormSchema } from "@/schemas/newsletter";

/**
 * Verified against react-hook-form@7.84.0 + @hookform/resolvers@5.7.1: the
 * installed resolver's `zod.d.ts` declares Zod-4 overloads
 * (`Zod4Type` → `Resolver<z4.input<T>, Context, z4.output<T>>`) alongside the
 * Zod-3 ones, so `zodResolver(schema)` types correctly against zod@4.4.3
 * with no cast.
 */
export function useNewsletterForm(defaultEmail = "") {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
    // Seeded from whatever was typed into the server-rendered fields before
    // this hook's chunk arrived (`useDeferredHydration`), so promoting the
    // form mid-keystroke does not silently discard the address.
    defaultValues: { email: defaultEmail, consent: false },
    mode: "onTouched",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/newsletter",
      values,
      shell.newsletter.messages.failed,
    );
    // `pending` means recorded-but-not-delivered (TODO(EMIN-Q34)) — never
    // shown as a confirmed subscription.
    setResult(response.pending ? shell.newsletter.messages.pending : response.message);
    if (response.ok && !response.pending) {
      form.reset();
    }
  });

  return { form, onSubmit, result, submitting: form.formState.isSubmitting };
}
