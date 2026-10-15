import { contactCopy } from "@/content/contact-copy";
import { shell } from "@/content/shell";
import type { EnquirySpec } from "@/lib/enquiry/types";
import type { NewsletterFormValues } from "@/schemas/newsletter";

export const spec: EnquirySpec<NewsletterFormValues> = {
  kind: "newsletter",
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
};
