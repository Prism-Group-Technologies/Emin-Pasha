"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";

/**
 * The Kudara estimator after hydration. It carries the estimator state, the
 * pricing model and the RFP store hand-off, and nobody needs it to read about
 * the hall — so it is code-split and the placeholder reserves its height so
 * the swap-in moves nothing.
 */
const KudaraEstimatorForm = dynamic(
  () =>
    import("@/containers/events/organisms/KudaraEstimatorForm").then((m) => m.KudaraEstimatorForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: 560 }} /> },
);

export function DeferredKudaraEstimator() {
  return <KudaraEstimatorForm />;
}
