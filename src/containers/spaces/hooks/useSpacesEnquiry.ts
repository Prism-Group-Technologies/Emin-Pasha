"use client";

import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { enquiryCopy } from "@/containers/spaces/copy/enquiry";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type SpacesEnquiry, spacesEnquirySchema } from "@/schemas/spacesEnquiry";
import { useSpacesEnquiryStore } from "@/stores/spacesEnquiryStore";

const DEFAULTS: SpacesEnquiry = {
  requestType: "table",
  space: "any",
  experience: "none",
  guests: 2,
  date: "",
  time: "evening",
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
  website: "",
};

/**
 * All reservation-form logic; the form organism stays presentational. RHF +
 * `zodResolver` on the shared `spacesEnquirySchema`, `submitEnquiry` for the
 * success / pending / failure contract, and a watch on the store's `nonce` so
 * a hand-off from the matcher or a card resets the live form onto its seed
 * while keeping whatever contact details were already typed.
 */
export function useSpacesEnquiry() {
  const [result, setResult] = useState<string | null>(null);
  const nonce = useSpacesEnquiryStore((state) => state.nonce);

  const form = useForm<SpacesEnquiry>({
    resolver: zodResolver(spacesEnquirySchema),
    mode: "onTouched",
    // A hand-off made before this deferred island mounted is picked up here.
    defaultValues: { ...DEFAULTS, ...useSpacesEnquiryStore.getState().seed },
  });

  const lastNonce = useRef(nonce);
  useEffect(() => {
    if (nonce === lastNonce.current) {
      return;
    }
    lastNonce.current = nonce;
    form.reset({ ...form.getValues(), ...useSpacesEnquiryStore.getState().seed });
  }, [nonce, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/spaces",
      values,
      enquiryCopy.messages.failed,
    );
    setResult(response.pending ? enquiryCopy.messages.pending : response.message);
    if (response.ok && !response.pending) {
      form.reset(DEFAULTS);
    }
  });

  return {
    form,
    onSubmit,
    result,
    seeded: nonce > 0,
    submitting: form.formState.isSubmitting,
  };
}
