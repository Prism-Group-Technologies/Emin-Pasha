"use client";

import { useCallback, useMemo, useState } from "react";

import { ENQUIRE_ANCHOR_ID } from "@/containers/events/anchors";
import { kudaraCateringTiers } from "@/containers/events/copy/kudaraCatering";
import { kudaraExtras } from "@/containers/events/copy/kudaraExtras";
import { kudaraLayouts } from "@/containers/events/copy/kudaraLayouts";
import { buildKudaraQuote } from "@/containers/events/kudaraQuote";
import { useRfpStore } from "@/stores/rfpStore";

const DELEGATES_MAX = 700;
const DAYS_MAX = 5;
const OPTIONS = {
  layouts: kudaraLayouts,
  cateringTiers: kudaraCateringTiers,
  extras: kudaraExtras,
};

/**
 * All state for the Kudara Hall estimator — the layout choice, the delegate
 * and day steppers, the catering tier, the extras shortlist and the derived
 * indicative quote — plus the hand-off that seeds the RFP form and scrolls to
 * it. Pricing itself lives in the tested `kudaraQuote.ts`; every molecule that
 * consumes this stays presentational, the same split `usePoolPlanner` makes.
 */
export function useKudaraEstimator() {
  const [layoutId, setLayoutId] = useState(kudaraLayouts[0]?.id ?? "");
  const [delegates, setDelegates] = useState(150);
  const [days, setDays] = useState(1);
  const [cateringId, setCateringId] = useState("day-delegate");
  const [extraIds, setExtraIds] = useState<ReadonlySet<string>>(() => new Set());
  const [applied, setApplied] = useState(false);
  const seedDraft = useRfpStore((state) => state.seedDraft);

  const clearApplied = useCallback(() => setApplied(false), []);

  const quote = useMemo(
    () =>
      buildKudaraQuote({ layoutId, delegates, days, cateringId, extraIds: [...extraIds] }, OPTIONS),
    [layoutId, delegates, days, cateringId, extraIds],
  );

  const toggleExtra = useCallback(
    (id: string) => {
      setExtraIds((current) => {
        const next = new Set(current);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
      clearApplied();
    },
    [clearApplied],
  );

  const applyToProposal = useCallback(() => {
    const tier = kudaraCateringTiers.find((entry) => entry.id === cateringId);
    seedDraft({
      eventType: "conference",
      guests: Math.max(1, Math.round(delegates)),
      spaces: ["Kudara Hall"],
      catering: tier && tier.perDelegateUgx > 0 ? tier.label : undefined,
      message: quote.summary,
    });
    setApplied(true);
    document
      .getElementById(ENQUIRE_ANCHOR_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [cateringId, delegates, quote.summary, seedDraft]);

  const clamp = (value: number, max: number) => Math.min(Math.max(Math.round(value), 1), max);

  return {
    quote,
    applied,
    applyToProposal,
    layouts: kudaraLayouts,
    cateringTiers: kudaraCateringTiers,
    extras: kudaraExtras,
    controls: {
      layoutId,
      setLayout: (id: string) => {
        setLayoutId(id);
        clearApplied();
      },
      delegates,
      setDelegates: (value: number) => {
        setDelegates(clamp(value, DELEGATES_MAX));
        clearApplied();
      },
      days,
      setDays: (value: number) => {
        setDays(clamp(value, DAYS_MAX));
        clearApplied();
      },
      cateringId,
      setCatering: (id: string) => {
        setCateringId(id);
        clearApplied();
      },
      isExtraSelected: (id: string) => extraIds.has(id),
      toggleExtra,
    },
  };
}

export type KudaraEstimator = ReturnType<typeof useKudaraEstimator>;
export type KudaraEstimatorControls = KudaraEstimator["controls"];
