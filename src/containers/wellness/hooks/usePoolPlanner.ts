"use client";

import { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { poolAddOns, poolVisitTypes } from "@/containers/wellness/copy/poolPlanner";
import { buildPoolQuote } from "@/containers/wellness/poolQuote";
import { wellnessCopy } from "@/content/wellness-copy";
import { submitEnquiry } from "@/lib/submitEnquiry";
import { type PoolPlannerContact, poolPlannerSchema } from "@/schemas/poolPlanner";
import type { WellnessEnquiry } from "@/schemas/wellnessEnquiry";

const ADULTS_MAX = 150;
const CHILDREN_MAX = 60;

/** Fold the planner's priced choices into a normal wellness enquiry payload. */
function toEnquiry(contact: PoolPlannerContact, summary: string): WellnessEnquiry {
  const message = [summary, contact.notes ? `Notes: ${contact.notes}` : null]
    .filter(Boolean)
    .join("\n")
    .slice(0, 1000);
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    interest: "pool",
    preferredDate: contact.preferredDate,
    message,
    consent: contact.consent,
  };
}

/**
 * All state and submission for the pool visit planner — the visit choice, the
 * party steppers, the add-on shortlist, the derived indicative quote, and the
 * contact form. Kept out of the form organism (like `useWellnessEnquiry` and
 * `useAddOnEstimator`) so the molecules stay presentational and the pricing
 * rule stays in the tested `poolQuote.ts`.
 */
export function usePoolPlanner() {
  const [visitTypeId, setVisitTypeId] = useState<string>(poolVisitTypes[0]?.id ?? "");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [addOnIds, setAddOnIds] = useState<ReadonlySet<string>>(() => new Set());
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<PoolPlannerContact>({
    resolver: zodResolver(poolPlannerSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", preferredDate: "", notes: "", consent: false },
  });

  const quote = useMemo(
    () =>
      buildPoolQuote(
        { visitTypeId, adults, children, addOnIds: [...addOnIds] },
        {
          visitTypes: poolVisitTypes,
          addOns: poolAddOns,
        },
      ),
    [visitTypeId, adults, children, addOnIds],
  );

  const toggleAddOn = (id: string) =>
    setAddOnIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const onSubmit = form.handleSubmit(async (contact) => {
    setResult(null);
    const response = await submitEnquiry(
      "/api/enquiry/spa",
      toEnquiry(contact, quote.summary),
      wellnessCopy.enquiry.messages.failed,
    );
    setResult(response.pending ? wellnessCopy.enquiry.messages.pending : response.message);
    if (response.ok && !response.pending) {
      form.reset();
      setAddOnIds(new Set());
    }
  });

  return {
    form,
    onSubmit,
    result,
    submitting: form.formState.isSubmitting,
    quote,
    visitTypes: poolVisitTypes,
    addOns: poolAddOns,
    estimator: {
      visitTypeId,
      setVisitType: setVisitTypeId,
      adults,
      setAdults: (value: number) => setAdults(Math.min(Math.max(value, 1), ADULTS_MAX)),
      children,
      setChildren: (value: number) => setChildren(Math.min(Math.max(value, 0), CHILDREN_MAX)),
      isAddOnSelected: (id: string) => addOnIds.has(id),
      toggleAddOn,
    },
  };
}

export type PoolPlanner = ReturnType<typeof usePoolPlanner>;
export type PoolPlannerEstimator = PoolPlanner["estimator"];
