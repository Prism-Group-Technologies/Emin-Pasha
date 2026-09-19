import { formCopy } from "@/containers/contact/copy/form";
import { contactCopy } from "@/content/contact-copy";
import { handleEnquiry } from "@/lib/api/envelope";
import { contactFields, contactInbox, contactSubject } from "@/lib/mail/contactEnquiry";
import { contactSchema } from "@/schemas/contact";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "contact",
    schema: contactSchema,
    subject: contactSubject,
    to: contactInbox,
    replyTo: (values) => values.email,
    toFields: contactFields,
    messages: {
      success: formCopy.messages.success,
      failure: formCopy.messages.failed,
      rateLimited: contactCopy.messages.rateLimited,
    },
  });
}
