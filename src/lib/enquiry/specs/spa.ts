import { contactCopy } from "@/content/contact-copy";
import { wellnessCopy } from "@/content/wellness-copy";
import type { EnquirySpec } from "@/lib/enquiry/types";
import type { WellnessEnquiry } from "@/schemas/wellnessEnquiry";

const INTEREST_LABEL: Record<string, string> = {
  any: "Not sure yet — help me choose",
  spa: "Spa treatments",
  pool: "Swimming pool",
};

export const spec: EnquirySpec<WellnessEnquiry> = {
  kind: "spa",
  subject: "Spa / pool enquiry",
  replyTo: (values) => values.email,
  toFields: (values) => [
    { label: "Interested in", value: INTEREST_LABEL[values.interest] ?? values.interest },
    { label: "Preferred date", value: values.preferredDate || "—" },
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone || "—" },
    { label: "Message", value: values.message ?? "—" },
  ],
  messages: {
    success: "Thank you — we have your enquiry and will come back to you.",
    failure: wellnessCopy.enquiry.messages.failed,
    rateLimited: contactCopy.messages.rateLimited,
  },
};
