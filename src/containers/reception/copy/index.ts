/**
 * ⚠️ INVENTED MARKETING COPY — NOT YET CLIENT-APPROVED.
 *
 * Nothing in this folder comes from docs/02_CONTENT_SOURCE_OF_TRUTH.md. The
 * hotel's approved content says four things about reception — that check-in is
 * 14h00 and check-out 10h00, that late check-out is booked at the desk, and
 * that front desk staff greet guests on arrival — and says nothing at all
 * about concierge, currency, laundry or transport. Every other sentence here
 * was written for this build and needs sign-off before launch. The entries
 * that do restate approved facts carry `approvedSource: true` so a reviewer
 * can tell the two apart without diffing against the source document.
 *
 * The one confirmed addition is the 24-hour desk, which the hotel verified for
 * this build and which `@/content/faq` now states as an approved answer.
 */
export { receptionGroups } from "./serviceGroups";
export { receptionSections, receptionStats } from "./sections";
export { receptionAsset, receptionAssets } from "./media";
export { receptionServices, servicesInGroup } from "./services";
