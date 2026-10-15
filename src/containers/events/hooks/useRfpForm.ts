"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { contactCopy } from "@/content/contact-copy";
import { rfpCopy } from "@/content/rfp-copy";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type RfpInput, type RfpValues, rfpSchema } from "@/schemas/rfp";
import { useRfpStore } from "@/stores/rfpStore";

export type RfpStatus = "editing" | "submitting" | "sent" | "error";

/** Which fields must be valid before each step will advance. */
const STEP_FIELDS: (keyof RfpValues)[][] = [
  ["eventType", "startDate", "guests"],
  [],
  ["name", "email", "consent"],
];

/**
 * All RFP logic. Every keystroke is mirrored into the session-persisted
 * store, so a refresh mid-form does not lose the lead.
 */
export function useRfpForm() {
  const draft = useRfpStore((state) => state.draft);
  const step = useRfpStore((state) => state.step);
  const seedNonce = useRfpStore((state) => state.seedNonce);
  const setDraft = useRfpStore((state) => state.setDraft);
  const setStep = useRfpStore((state) => state.setStep);
  const clear = useRfpStore((state) => state.clear);
  const [status, setStatus] = useState<RfpStatus>("editing");
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<RfpInput, unknown, RfpValues>({
    resolver: zodResolver(rfpSchema),
    mode: "onTouched",
    defaultValues: {
      eventType: "wedding",
      startDate: "",
      guests: 50,
      spaces: [],
      accommodation: false,
      consent: false,
      website: "",
      ...draft,
    },
  });

  /** Persist on blur rather than on every keystroke — fewer writes, same safety. */
  const persist = useCallback(() => setDraft(form.getValues()), [form, setDraft]);

  /**
   * A deep-link seed (the Kudara Hall estimator hand-off) lands in the store
   * after the form has mounted, so its defaults have already been read. Reset
   * the form onto the seeded draft when the nonce changes — never on a plain
   * `setDraft`, which is the on-blur persist and must not wipe field state.
   */
  const lastSeed = useRef(seedNonce);
  useEffect(() => {
    if (seedNonce === lastSeed.current) {
      return;
    }
    lastSeed.current = seedNonce;
    form.reset({ ...form.getValues(), ...useRfpStore.getState().draft });
  }, [seedNonce, form]);

  const next = useCallback(async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const valid = fields.length === 0 || (await form.trigger(fields as never));
    if (valid) {
      persist();
      setStep(Math.min(step + 1, rfpCopy.steps.length - 1));
    }
  }, [form, persist, setStep, step]);

  const back = useCallback(() => setStep(Math.max(step - 1, 0)), [setStep, step]);

  /**
   * Submission goes through `submitEnquiry` like every other form, rather than
   * the hand-rolled `fetch` this hook used to carry. That is what routes the
   * RFP through Web3Forms, and it means `pending` is finally honoured here:
   * with no provider configured the lead is recorded but not delivered, so the
   * step shows the "not connected yet" line instead of a plain confirmation.
   */
  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("submitting");
    setMessage(null);
    const response = await submitEnquiry("/api/enquiry/rfp", values, rfpCopy.failure);
    if (!response.ok) {
      setStatus("error");
      setMessage(response.message);
      return;
    }
    setStatus("sent");
    // The RFP copy has no delivery-pending line of its own, so this reuses
    // the approved shared one rather than inventing a message (CLAUDE.md §3).
    setMessage(response.pending ? contactCopy.messages.pending : response.message);
    clear();
  });

  return { form, onSubmit, status, message, step, next, back, persist };
}
