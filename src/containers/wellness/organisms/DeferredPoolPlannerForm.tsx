"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";

/** The pool planner after hydration — same deferral pattern as the wellness enquiry form. */
const PoolPlannerForm = dynamic(
  () => import("@/containers/wellness/organisms/PoolPlannerForm").then((m) => m.PoolPlannerForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: 760 }} /> },
);

export function DeferredPoolPlannerForm() {
  return <PoolPlannerForm />;
}
