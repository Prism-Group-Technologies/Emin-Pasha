"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { contactCopy } from "@/content/contact-copy";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type ContactValues, contactSchema } from "@/schemas/contact";

export function useContactForm(defaultSubject: ContactValues["subject"] = "general") {
  const [result, setResult] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      subject: defaultSubject,
      name: "",
      email: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/contact",
      values,
      contactCopy.messages.failure,
    );
    // `pending` is deliberately surfaced as its own message: the enquiry is
    // recorded, but nothing was emailed, and saying otherwise would be a lie.
    setResult(response.pending ? contactCopy.messages.pending : response.message);
    setSent(response.ok);
    if (response.ok) {
      form.reset();
    }
  });

  return { form, onSubmit, result, sent, submitting: form.formState.isSubmitting };
}
