import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/spa";
import { wellnessEnquirySchema } from "@/schemas/wellnessEnquiry";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: wellnessEnquirySchema });
}
