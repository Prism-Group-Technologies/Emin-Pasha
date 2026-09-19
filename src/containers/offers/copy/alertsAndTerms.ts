/** ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED. See ./index.ts. */

/**
 * The offer-alerts band. The form itself is the sitewide newsletter
 * (`/api/enquiry/newsletter`), so its validation and result messages stay the
 * approved `content/shell.ts` strings; only the pitch around it is invented.
 */
export const alertsCopy = {
  eyebrow: "§ OFFER ALERTS",
  heading: "Hear about the next offer first",
  description:
    "Not ready to book yet? Join the list and we will write when a new package opens — before it is published anywhere else.",
  benefits: [
    "48-hour early access to every seasonal package",
    "List-only flash rates a few times a year",
    "Never more than two emails a month",
  ],
  formTitle: "Send me new offers",
  submitLabel: "Notify me",
};

/**
 * The terms summary beside the FAQ — it replaces the old "pending info"
 * notice. Plain-language invented wording, TODO(EMIN-Q08): the hotel's real
 * offer terms supersede every line here.
 */
export const termsCopy = {
  heading: "The small print, plainly",
  items: [
    "All prices are in Uganda Shillings and include VAT and service charge.",
    "Offers are subject to availability and are confirmed in writing when claimed.",
    "One offer per room night; offers cannot be exchanged for cash.",
    "Seasonal and gala packages may require a deposit to hold the booking.",
    "“Book by” dates are the last day to claim; stay dates are shown on each offer.",
  ],
  footnote: "Full terms for each offer are sent with your confirmation.",
};
