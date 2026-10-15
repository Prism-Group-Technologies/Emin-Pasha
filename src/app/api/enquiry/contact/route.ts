import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/contact";
import { contactSchema } from "@/schemas/contact";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: contactSchema });
}
