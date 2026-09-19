/** ⚠️ INVENTED — see ./index.ts. Bracketed values are placeholders to fill from company records. */
import { identity } from "@/content/identity";

/**
 * Who stands behind the documents. The trading name and address render from
 * `content/identity.ts`; the legal entity, registration and data-protection
 * officer details are unknown to this build and stay visibly bracketed so
 * they cannot ship looking finished.
 */
export const LEGAL_ENTITY = {
  tradingName: identity.name,
  address: identity.address,
  telephone: identity.telephone,
  email: identity.email,
  registeredName: "[Registered company name]",
  registrationNumber: "[Company registration number]",
  pdpoRegistration: "[PDPO registration number]",
  dpoName: "[Data Protection Officer name]",
  dpoEmail: "[privacy contact email]",
  updated: "15 September 2026",
  regulator: "the Personal Data Protection Office (PDPO) of Uganda",
};
