import { contactCopy } from "@/content/contact-copy";
import { wellnessCopy } from "@/content/wellness-copy";
import { handleEnquiry } from "@/lib/api/envelope";
import { wellnessEnquirySchema } from "@/schemas/wellnessEnquiry";

export const dynamic = "force-dynamic";

const INTEREST_LABEL: Record<string, string> = {
  any: "Not sure yet — help me choose",
  spa: "Spa treatments",
  gym: "Gym membership",
  pool: "Swimming pool",
};

export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "spa",
    schema: wellnessEnquirySchema,
    subject: "Spa / gym / pool enquiry",
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
  });
}
