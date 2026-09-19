import { StickyCtaBar } from "@/containers/wellness/molecules/StickyCtaBar";
import { whatsappWellnessUrl } from "@/lib/directions";

/**
 * The page-scoped sticky "book" bar. A Server Component whose only job is to
 * resolve the one `whatsappWellnessUrl` from `lib/directions` and hand it to
 * the client `StickyCtaBar` as a plain string, so the Zod-validated content
 * layer stays off the client (DECISIONS.md D25).
 */
export function StickyEnquireCta() {
  return <StickyCtaBar whatsappHref={whatsappWellnessUrl} />;
}
