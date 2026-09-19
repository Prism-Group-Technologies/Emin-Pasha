import { z } from "zod";

import { SPACE_IDS } from "@/containers/spaces/anchors";
import {
  GUESTS_MAX,
  PHONE_REQUIRED_TYPES,
  enquiryCopy,
  requestTypeOptions,
  timeOptions,
} from "@/containers/spaces/copy/enquiry";
import { signatureExperiences } from "@/containers/spaces/copy/experiences";
import { spaceProfile } from "@/containers/spaces/copy/profiles";

const { errors } = enquiryCopy;

/**
 * Lead capture for the Lounges & Spaces page — a table, a signature
 * experience, private hire, a garden photoshoot or the Lounge Circle.
 *
 * There is no booking engine for the lounges, so this is how a visitor makes
 * the request they would otherwise make by phone; a host confirms every one.
 * Shared by the client form (via `zodResolver`) and `POST /api/enquiry/spaces`.
 * Every enum is built from the same option lists the form renders, and the
 * imports are all import-free copy modules, so no content layer reaches the
 * client bundle (D25).
 *
 * Cross-field rules live in `superRefine` so each error lands on its field:
 * a party larger than the chosen space holds standing, and a missing phone
 * for the request types a planner calls back about.
 */
const tupleOf = <T extends readonly string[]>(values: T) =>
  values as unknown as [T[number], ...T[number][]];

export const spacesRequestEnum = z.enum(tupleOf(requestTypeOptions.map((o) => o.value)));
export const spacesTimeEnum = z.enum(tupleOf(timeOptions.map((o) => o.value)));
export const spacesSpaceEnum = z.enum(["any", ...SPACE_IDS]);
export const spacesExperienceEnum = z.enum(
  tupleOf(["none", ...signatureExperiences.map((experience) => experience.id)]),
);

export const spacesEnquirySchema = z
  .object({
    requestType: spacesRequestEnum,
    space: spacesSpaceEnum,
    experience: spacesExperienceEnum,
    guests: z
      .number({ error: errors.guests })
      .int({ error: errors.guests })
      .min(1, { error: errors.guests })
      .max(GUESTS_MAX, { error: errors.guests }),
    date: z.string().trim().max(10).optional(),
    time: spacesTimeEnum,
    name: z.string().trim().min(2, { error: errors.name }),
    email: z.email({ error: errors.email }),
    phone: z.string().trim().max(40).optional(),
    message: z.string().trim().max(1000).optional(),
    consent: z.boolean().refine((value) => value, { error: errors.consent }),
    website: z.string().max(0).optional(),
  })
  .superRefine((values, ctx) => {
    const standing = spaceProfile(values.space)?.standing;
    if (standing !== undefined && values.guests > standing) {
      ctx.addIssue({ code: "custom", path: ["guests"], message: errors.capacity });
    }
    if (PHONE_REQUIRED_TYPES.includes(values.requestType) && !values.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: errors.phone });
    }
  });

export type SpacesEnquiry = z.infer<typeof spacesEnquirySchema>;
