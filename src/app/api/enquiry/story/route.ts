import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/story";
import { storyEnquirySchema } from "@/schemas/storyEnquiry";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: storyEnquirySchema });
}
