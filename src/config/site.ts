import { identity } from "@/content/identity";

import { env } from "./env";

/**
 * Site-level constants derived from src/content and src/config/env — never
 * re-declare a raw copy string here, import it instead (CLAUDE.md §5.4).
 */
export const site = {
  name: identity.name,
  shortName: identity.shortName,
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en-UG",
  contact: {
    telephone: identity.telephone,
    email: identity.email,
    reservationsEmail: identity.reservationsEmail,
    whatsapp: identity.whatsapp,
  },
} as const;
