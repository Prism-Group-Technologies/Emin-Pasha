import { formCopy } from "@/containers/contact/copy/form";
import { contactCopy } from "@/content/contact-copy";
import type { EnquirySpec } from "@/lib/enquiry/types";
import { contactFields, contactInbox, contactSubject } from "@/lib/mail/contactEnquiry";
import type { ContactValues } from "@/schemas/contact";

export const spec: EnquirySpec<ContactValues> = {
  kind: "contact",
  subject: contactSubject,
  to: contactInbox,
  replyTo: (values) => values.email,
  toFields: contactFields,
  messages: {
    success: formCopy.messages.success,
    failure: formCopy.messages.failed,
    rateLimited: contactCopy.messages.rateLimited,
  },
};
