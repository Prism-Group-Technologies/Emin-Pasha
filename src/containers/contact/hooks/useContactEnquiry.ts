"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { formCopy } from "@/containers/contact/copy/form";
import { useIntentFromUrl } from "@/containers/contact/hooks/useIntentFromUrl";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type ContactIntent, type ContactValues, contactSchema } from "@/schemas/contact";

const blank = (intent: ContactIntent): ContactValues => ({
  intent,
  arrival: "",
  departure: "",
  eventDate: "",
  guests: "",
  name: "",
  email: "",
  phone: "",
  country: "",
  replyChannel: "email",
  contactTime: "any",
  message: "",
  consent: false,
  website: "",
});

/**
 * All adaptive-enquiry logic; every form component stays presentational.
 * Same shape as `useStoryEnquiry` / `useWellnessEnquiry` — RHF + `zodResolver`,
 * `submitEnquiry` for the success / pending / failure contract — plus the two
 * things this form adds:
 *
 *   - `intent` and `replyChannel` are *watched*, because they reshape the
 *     form (which date block shows, whether a phone number is required).
 *   - A successful send flips to a confirmation panel (`sent`) rather than
 *     resetting in place, and `startOver` returns to a clean form on the
 *     same intent, since a second enquiry is usually about the same thing.
 */
export function useContactEnquiry(defaultIntent: ContactIntent = "stay") {
  const [result, setResult] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: blank(defaultIntent),
  });
  useIntentFromUrl(form.setValue);

  // `useWatch`, not `form.watch` — the latter cannot be memoised by the React
  // Compiler (`react-hooks/incompatible-library`), same as `useStayDates`.
  const intent = useWatch({ control: form.control, name: "intent" });
  const replyChannel = useWatch({ control: form.control, name: "replyChannel" });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry("/api/enquiry/contact", values, formCopy.messages.failed);
    setResult(response.pending ? formCopy.messages.pending : response.message);
    setSent(response.ok);
  });

  const startOver = () => {
    form.reset(blank(intent));
    setResult(null);
    setSent(false);
  };

  return {
    form,
    onSubmit,
    result,
    sent,
    startOver,
    intent,
    phoneRequired: replyChannel !== "email",
    submitting: form.formState.isSubmitting,
  };
}
