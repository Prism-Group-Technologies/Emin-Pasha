import { contactCopy } from "@/content/contact-copy";
import { shell } from "@/content/shell";
import { handleEnquiry } from "@/lib/api/envelope";
import { newsletterFormSchema } from "@/schemas/newsletter";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "newsletter",
    schema: newsletterFormSchema,
    subject: "Newsletter signup",
    replyTo: (values) => values.email,
    toFields: (values) => [
      { label: "Email", value: values.email },
      { label: "Consent", value: values.consent ? "given" : "not given" },
    ],
    messages: {
      success: shell.newsletter.messages.subscribed,
      failure: shell.newsletter.messages.failed,
      rateLimited: contactCopy.messages.rateLimited,
    },
  });
}
