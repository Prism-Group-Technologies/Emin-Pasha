import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/newsletter";
import { newsletterFormSchema } from "@/schemas/newsletter";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: newsletterFormSchema });
}
