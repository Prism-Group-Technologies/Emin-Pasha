"use client";

import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { rfpCopy } from "@/content/rfp-copy";
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

  const next = useCallback(async () => {
    const fields = STEP_FIELDS[step] ?? [];
    const valid = fields.length === 0 || (await form.trigger(fields as never));
    if (valid) {
      persist();
      setStep(Math.min(step + 1, rfpCopy.steps.length - 1));
    }
  }, [form, persist, setStep, step]);

  const back = useCallback(() => setStep(Math.max(step - 1, 0)), [setStep, step]);

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("submitting");
    setMessage(null);
    try {
      const response = await fetch("/api/enquiry/rfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { ok: boolean; message: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setMessage(payload.message ?? rfpCopy.failure);
        return;
      }
      setStatus("sent");
      setMessage(payload.message);
      clear();
    } catch {
      setStatus("error");
      setMessage(rfpCopy.failure);
    }
  });

  return { form, onSubmit, status, message, step, next, back, persist };
}
