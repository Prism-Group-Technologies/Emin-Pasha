"use client";

import dynamic from "next/dynamic";

import { Box } from "@/components/atoms/Box";

/** The contact form after hydration — same reasoning as the RFP form. */
const ContactForm = dynamic(
  () => import("@/containers/contact/organisms/ContactForm").then((m) => m.ContactForm),
  { ssr: false, loading: () => <Box sx={{ minHeight: 720 }} /> },
);

export function DeferredContactForm() {
  return <ContactForm />;
}
