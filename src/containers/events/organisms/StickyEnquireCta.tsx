import { StickyEnquireBar } from "@/containers/events/molecules/StickyEnquireBar";
import { whatsappEventsUrl } from "@/lib/directions";

/**
 * The page-scoped sticky "enquire" bar. A Server Component whose only job is
 * to resolve the one `whatsappEventsUrl` from `lib/directions` and hand it to
 * the client `StickyEnquireBar` as a plain string, so the Zod-validated
 * content layer stays off the client (DECISIONS.md D25). Mirrors
 * `wellness/organisms/StickyEnquireCta`.
 */
export function StickyEnquireCta() {
  return <StickyEnquireBar whatsappHref={whatsappEventsUrl} />;
}
