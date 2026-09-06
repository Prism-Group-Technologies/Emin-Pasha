"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { wellnessCopy } from "@/content/wellness-copy";
import { submitEnquiry } from "@/lib/submitEnquiry";
import {
  type WellnessEnquiry,
  type WellnessInterest,
  wellnessEnquirySchema,
} from "@/schemas/wellnessEnquiry";

/** All enquiry-form logic; the form component stays presentational. */
export function useWellnessEnquiry(defaultInterest: WellnessInterest) {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<WellnessEnquiry>({
    resolver: zodResolver(wellnessEnquirySchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", interest: defaultInterest, consent: false, message: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/spa",
      values,
      wellnessCopy.enquiry.messages.failed,
    );
    setResult(response.pending ? wellnessCopy.enquiry.messages.pending : response.message);
    if (response.ok && !response.pending) {
      form.reset();
    }
  });

  return { form, onSubmit, result, submitting: form.formState.isSubmitting };
}
