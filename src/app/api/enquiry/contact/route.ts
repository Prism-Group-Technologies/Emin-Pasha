import { contactCopy } from "@/content/contact-copy";
import { handleEnquiry } from "@/lib/api/envelope";
import { contactSchema } from "@/schemas/contact";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "contact",
    schema: contactSchema,
    subject: "Website contact form",
    replyTo: (values) => values.email,
    toFields: (values) => [
      { label: "Subject", value: values.subject },
      { label: "Name", value: values.name },
      { label: "Email", value: values.email },
      { label: "Phone", value: values.phone ?? "—" },
      { label: "Message", value: values.message },
    ],
    messages: {
      success: contactCopy.messages.success,
      failure: contactCopy.messages.failure,
      rateLimited: contactCopy.messages.rateLimited,
    },
  });
}
