import { enquiryCopy, storyFocusOptions } from "@/containers/story/copy/enquiry";
import { contactCopy } from "@/content/contact-copy";
import type { EnquirySpec } from "@/lib/enquiry/types";
import type { StoryEnquiry } from "@/schemas/storyEnquiry";

const FOCUS_LABEL = new Map<string, string>(
  storyFocusOptions.map((option) => [option.value, option.label]),
);
const focusLabel = (value: string) => FOCUS_LABEL.get(value) ?? value;

export const spec: EnquirySpec<StoryEnquiry> = {
  kind: "story",
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
};
