import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/spaces";
import { spacesEnquirySchema } from "@/schemas/spacesEnquiry";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: spacesEnquirySchema });
}
