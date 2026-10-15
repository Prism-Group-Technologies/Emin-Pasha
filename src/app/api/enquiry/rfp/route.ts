import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/rfp";
import { rfpSchema } from "@/schemas/rfp";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: rfpSchema });
}
