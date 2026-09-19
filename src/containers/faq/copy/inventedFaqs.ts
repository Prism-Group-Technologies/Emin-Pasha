/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */
import { arrivalWellnessFaqs } from "./faqArrivalWellness";
import { eventsPoliciesFaqs } from "./faqEventsPolicies";
import { stayDiningFaqs } from "./faqStayDining";

/** The invented answers, split across files only to respect `max-lines`. */
export const inventedFaqs = [...stayDiningFaqs, ...arrivalWellnessFaqs, ...eventsPoliciesFaqs];
