import { contactCopy } from "@/content/contact-copy";
import { rfpCopy } from "@/content/rfp-copy";
import type { EnquirySpec } from "@/lib/enquiry/types";
import type { RfpValues } from "@/schemas/rfp";

export const spec: EnquirySpec<RfpValues> = {
  kind: "rfp",
  subject: "Event enquiry (RFP)",
  replyTo: (values) => values.email,
  toFields: (values) => [
    { label: "Event type", value: values.eventType },
    { label: "Start date", value: values.startDate },
    { label: "End date", value: values.endDate || "—" },
    { label: "Guests", value: String(values.guests) },
    { label: "Accommodation needed", value: values.accommodation ? "yes" : "no" },
    { label: "Catering", value: values.catering ?? "—" },
    { label: "Budget", value: values.budget ?? "—" },
    { label: "Company", value: values.company ?? "—" },
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone ?? "—" },
    { label: "Message", value: values.message ?? "—" },
  ],
  messages: {
    success: rfpCopy.success.body,
    failure: rfpCopy.failure,
    rateLimited: contactCopy.messages.rateLimited,
  },
};
