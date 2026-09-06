import type { Metadata } from "next";

import { ContactContainer } from "@/containers/contact";
import { seoMeta } from "@/content/seo";

const meta = seoMeta.find((entry) => entry.page === "contact");

export const metadata: Metadata = {
  title: meta?.title ?? "Contact | The Emin Pasha Hotel & Spa",
  description:
    meta?.description ??
    "Call +256 312 264 712, message us on WhatsApp, or write to info@eminpasha.com. Plot 27 Akii Bua Road, Nakasero, Kampala.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContainer />;
}
