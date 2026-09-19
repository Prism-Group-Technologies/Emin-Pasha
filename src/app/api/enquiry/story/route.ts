import { enquiryCopy, storyFocusOptions } from "@/containers/story/copy/enquiry";
import { contactCopy } from "@/content/contact-copy";
import { handleEnquiry } from "@/lib/api/envelope";
import { storyEnquirySchema } from "@/schemas/storyEnquiry";

export const dynamic = "force-dynamic";

const FOCUS_LABEL = new Map<string, string>(
  storyFocusOptions.map((option) => [option.value, option.label]),
);
const focusLabel = (value: string) => FOCUS_LABEL.get(value) ?? value;

export function POST(request: Request) {
  return handleEnquiry(request, {
    kind: "story",
    schema: storyEnquirySchema,
    subject: "Our Story — stay & heritage enquiry",
    replyTo: (values) => values.email,
    toFields: (values) => [
      { label: "About", value: focusLabel(values.focus) },
      { label: "Rough dates", value: values.preferredDate || "—" },
      { label: "Name", value: values.name },
      { label: "Email", value: values.email },
      { label: "Phone", value: values.phone || "—" },
      { label: "Message", value: values.message ?? "—" },
    ],
    messages: {
      success: enquiryCopy.messages.success,
      failure: enquiryCopy.messages.failed,
      rateLimited: contactCopy.messages.rateLimited,
    },
  });
}
