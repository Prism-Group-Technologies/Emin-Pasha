"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";
import type { SelectOption } from "@/components/molecules/SelectField";

/**
 * The reservation form after hydration — deferred so react-hook-form, the date
 * picker and the field molecules stay out of the initial bundle, the same
 * reasoning as the story and wellness deferred forms. The loading box
 * reserves the form's height so nothing shifts when it mounts.
 */
const SpacesEnquiryForm = dynamic(
  () => import("@/containers/spaces/organisms/SpacesEnquiryForm").then((m) => m.SpacesEnquiryForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: 720 }} /> },
);

export function DeferredSpacesEnquiryForm({ spaceOptions }: { spaceOptions: SelectOption[] }) {
  return <SpacesEnquiryForm spaceOptions={spaceOptions} />;
}
