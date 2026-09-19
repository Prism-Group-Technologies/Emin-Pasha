"use client";

import { useEffect } from "react";

import type { UseFormSetValue } from "react-hook-form";

import { type ContactValues, contactIntentEnum } from "@/schemas/contact";

/**
 * Pre-selects the intent from `?intent=events` so any page on the site can
 * deep-link a visitor into the right version of the form — the Weddings page
 * linking to `/contact?intent=events#enquire`, say.
 *
 * Reads `window.location` in an effect rather than `useSearchParams`: the form
 * is a client-only deferred island, and `useSearchParams` would force a
 * Suspense boundary onto an otherwise static route for no benefit. An unknown
 * value is ignored, so a hand-typed URL can never put the form in a state the
 * schema rejects.
 */
export function useIntentFromUrl(setValue: UseFormSetValue<ContactValues>) {
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("intent");
    const parsed = contactIntentEnum.safeParse(requested);
    if (parsed.success) {
      setValue("intent", parsed.data);
    }
  }, [setValue]);
}
