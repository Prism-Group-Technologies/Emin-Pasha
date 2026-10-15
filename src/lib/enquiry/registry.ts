import type { AnyEnquirySpec } from "@/lib/enquiry/types";
import type { EnquiryKind } from "@/lib/mail/types";

/**
 * Every enquiry spec, behind a dynamic import.
 *
 * The browser needs a spec to build a Web3Forms payload, but only ever the
 * one kind the visitor just submitted. Static imports would pull all eleven —
 * the room catalogue, the spaces copy, the transfer quote engine — into the
 * chunk of every page carrying any form. These `import()` calls are reached
 * inside an already-async submit handler, so the cost is one small chunk
 * fetched after the click, and nothing is added to initial JS.
 *
 * Route handlers do **not** come through here: each imports its own spec
 * directly, since on the server code-splitting buys nothing.
 */
const LOADERS = {
  booking: () => import("@/lib/enquiry/specs/booking"),
  contact: () => import("@/lib/enquiry/specs/contact"),
  dining: () => import("@/lib/enquiry/specs/dining"),
  newsletter: () => import("@/lib/enquiry/specs/newsletter"),
  rfp: () => import("@/lib/enquiry/specs/rfp"),
  room: () => import("@/lib/enquiry/specs/room"),
  spa: () => import("@/lib/enquiry/specs/spa"),
  spaces: () => import("@/lib/enquiry/specs/spaces"),
  story: () => import("@/lib/enquiry/specs/story"),
  transfer: () => import("@/lib/enquiry/specs/transfer"),
} satisfies Record<EnquiryKind, () => Promise<unknown>>;

const KINDS = Object.keys(LOADERS) as EnquiryKind[];

/**
 * `/api/enquiry/dining` → `dining`. Every endpoint's last segment is its kind
 * by construction, which is what lets the forms keep calling `submitEnquiry`
 * with an endpoint string and gain Web3Forms delivery without a single hook
 * changing its arguments.
 */
export function kindFromEndpoint(endpoint: string): EnquiryKind | null {
  const segment = endpoint.split("?")[0]?.replace(/\/+$/, "").split("/").pop();
  return KINDS.find((kind) => kind === segment) ?? null;
}

export async function loadSpec(kind: EnquiryKind): Promise<AnyEnquirySpec> {
  const loaded = await LOADERS[kind]();
  return loaded.spec as AnyEnquirySpec;
}
