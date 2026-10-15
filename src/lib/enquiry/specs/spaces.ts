import {
  EVENTS_REQUEST_TYPES,
  enquiryCopy,
  requestTypeOptions,
  timeOptions,
} from "@/containers/spaces/copy/enquiry";
import { signatureExperiences } from "@/containers/spaces/copy/experiences";
import { contactCopy } from "@/content/contact-copy";
import { identity } from "@/content/identity";
import { spaces } from "@/content/spaces";
import type { EnquirySpec } from "@/lib/enquiry/types";
import { inboxFor } from "@/lib/mail/inbox";
import type { SpacesEnquiry } from "@/schemas/spacesEnquiry";

const labelMap = (entries: { value: string; label: string }[]) =>
  new Map(entries.map((entry) => [entry.value, entry.label]));

const REQUEST = labelMap([...requestTypeOptions]);
const TIME = labelMap([...timeOptions]);
const SPACE = labelMap(spaces.map((space) => ({ value: space.id, label: space.name })));
const EXPERIENCE = labelMap(signatureExperiences.map((e) => ({ value: e.id, label: e.title })));

const label = (map: Map<string, string>, value: string) => map.get(value) ?? "—";

/** Private hire goes to the events team on the general inbox; the rest to reservations. */
const inbox = (values: SpacesEnquiry) =>
  EVENTS_REQUEST_TYPES.includes(values.requestType) ? identity.email : inboxFor("spaces");

export const spec: EnquirySpec<SpacesEnquiry> = {
  kind: "spaces",
  to: inbox,
  subject: (values) => `Lounges & Spaces — ${label(REQUEST, values.requestType)}`,
  replyTo: (values) => values.email,
  toFields: (values) => [
    { label: "Request", value: label(REQUEST, values.requestType) },
    {
      label: "Space",
      value: values.space === "any" ? "Recommend one" : label(SPACE, values.space),
    },
    { label: "Experience", value: label(EXPERIENCE, values.experience) },
    { label: "Guests", value: String(values.guests) },
    { label: "Date", value: values.date || "—" },
    { label: "Time", value: label(TIME, values.time) },
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone || "—" },
    { label: "Message", value: values.message || "—" },
  ],
  messages: {
    success: enquiryCopy.messages.success,
    failure: enquiryCopy.messages.failed,
    rateLimited: contactCopy.messages.rateLimited,
  },
};
