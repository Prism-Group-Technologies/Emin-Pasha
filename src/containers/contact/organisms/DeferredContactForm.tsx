"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";
import type { ContactEnquiryFormProps } from "@/containers/contact/organisms/ContactEnquiryForm";

/**
 * The enquiry form after hydration — deferred so react-hook-form, Zod and the
 * MUI X date picker stay out of the Contact page's first-load bundle, the
 * same reasoning as the RFP, dining and story forms. The loading box reserves
 * the form's height so nothing shifts when it mounts.
 */
const ContactEnquiryForm = dynamic(
  () =>
    import("@/containers/contact/organisms/ContactEnquiryForm").then((m) => m.ContactEnquiryForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: { xs: 1180, sm: 980 } }} /> },
);

export function DeferredContactForm(props: ContactEnquiryFormProps) {
  return <ContactEnquiryForm {...props} />;
}
