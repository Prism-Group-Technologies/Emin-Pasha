"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { enquiryCopy } from "@/containers/story/copy/enquiry";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type StoryEnquiry, type StoryFocus, storyEnquirySchema } from "@/schemas/storyEnquiry";

/**
 * All "Stay in the story" enquiry-form logic; the form component stays
 * presentational. Same shape as `containers/wellness/hooks/useWellnessEnquiry`
 * — RHF + `zodResolver`, `submitEnquiry` for the success/pending/failure
 * contract, and a plain result string the form renders in an `aria-live`
 * region.
 */
export function useStoryEnquiry(defaultFocus: StoryFocus = "any") {
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<StoryEnquiry>({
    resolver: zodResolver(storyEnquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      focus: defaultFocus,
      preferredDate: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry("/api/enquiry/story", values, enquiryCopy.messages.failed);
    setResult(response.pending ? enquiryCopy.messages.pending : response.message);
    if (response.ok && !response.pending) {
      form.reset();
    }
  });

  return { form, onSubmit, result, submitting: form.formState.isSubmitting };
}
