"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";

/**
 * The story enquiry form after hydration — deferred so react-hook-form and
 * the field molecules stay out of the initial bundle, the same reasoning as
 * the dining and wellness deferred forms. The loading box reserves the
 * form's height so nothing shifts when it mounts.
 */
const StoryEnquiryForm = dynamic(
  () => import("@/containers/story/organisms/StoryEnquiryForm").then((m) => m.StoryEnquiryForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: 560 }} /> },
);

export function DeferredStoryEnquiryForm() {
  return <StoryEnquiryForm />;
}
