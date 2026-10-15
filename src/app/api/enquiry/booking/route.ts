import { handleEnquiry } from "@/lib/api/envelope";
import { spec } from "@/lib/enquiry/specs/booking";
import { bookingSearchSchema } from "@/schemas/booking";

export const dynamic = "force-dynamic";

/** Fallback delivery for the booking enquiry; the spec owns subject and fields. */
export function POST(request: Request) {
  return handleEnquiry(request, { ...spec, schema: bookingSearchSchema });
}
