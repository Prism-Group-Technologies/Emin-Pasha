"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";
import type { WellnessInterest } from "@/schemas/wellnessEnquiry";

/** The wellness enquiry form after hydration — same reasoning as the others. */
const WellnessEnquiryForm = dynamic(
  () =>
    import("@/containers/wellness/organisms/WellnessEnquiryForm").then(
      (m) => m.WellnessEnquiryForm,
    ),
  { ssr: false, loading: () => <Box sx={{ minHeight: 620 }} /> },
);

export function DeferredWellnessEnquiryForm({ interest }: { interest: WellnessInterest }) {
  return <WellnessEnquiryForm interest={interest} />;
}
